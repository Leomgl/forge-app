/* FORGE v0.8 — ticket detail retaining source tab for navigation. */
(function () {
"use strict";
const ROOT="https://api.github.com/repos/Leomgl/forge-app/issues/";
const dlg=document.getElementById("ticketDialog");
if(!dlg)return;
const $=id=>document.getElementById(id);
let current=0,loadKey=0,authenticated=false,posting=false,previousFocus=null,returnHash="#tickets";
function safeUrl(raw){
 try{const u=new URL(String(raw||""));return (u.protocol==="https:"||u.protocol==="http:")?u.href:null;}
 catch{return null;}
}
function inline(parent,source){
 const re=/\[([^\]]{1,200})\]\((https?:\/\/[^\s)]+)\)|\*\*([^*\n]+)\*\*|`([^`\n]+)`|(https?:\/\/[^\s<>]+)/g;
 let pos=0,m;
 while((m=re.exec(source))){
  if(m.index>pos)parent.appendChild(document.createTextNode(source.slice(pos,m.index)));
  let el;
  if(m[1]!==undefined){const u=safeUrl(m[2]);if(u){el=document.createElement("a");el.href=u;el.target="_blank";el.rel="noopener noreferrer";el.textContent=m[1];}else el=document.createTextNode(m[0]);}
  else if(m[3]!==undefined){el=document.createElement("strong");el.textContent=m[3];}
  else if(m[4]!==undefined){el=document.createElement("code");el.textContent=m[4];}
  else {const u=safeUrl(m[5].replace(/[.,;!?]+$/,""));if(u){el=document.createElement("a");el.href=u;el.target="_blank";el.rel="noopener noreferrer";el.textContent=u;}else el=document.createTextNode(m[0]);}
  parent.appendChild(el);pos=re.lastIndex;
 }
 if(pos<source.length)parent.appendChild(document.createTextNode(source.slice(pos)));
}
function markdown(target,value){
 target.replaceChildren();
 const lines=String(value||"").replace(/<!-- FORGE_META:\s*\{[^\n]+\}\s*-->/g,"").trim().split(/\r?\n/);
 let list=null,code=null,paragraph=null;
 function reset(){list=null;paragraph=null;}
 for(const line of lines){
  if(/^\s*```/.test(line)){
   if(code){code=null;}else {reset();const pre=document.createElement("pre");code=document.createElement("code");pre.appendChild(code);target.appendChild(pre);}
   continue;
  }
  if(code){code.textContent+=line+"\n";continue;}
  if(!line.trim()){reset();continue;}
  const heading=line.match(/^(#{1,5})\s+(.+)$/);
  const bullet=line.match(/^\s*(?:[-*]|\d+\.)\s+(.+)$/);
  const quote=line.match(/^>\s?(.*)$/);
  if(heading){reset();const h=document.createElement("h"+Math.min(5,heading[1].length+1));inline(h,heading[2]);target.appendChild(h);}
  else if(bullet){
   paragraph=null;
   if(!list){list=document.createElement("ul");target.appendChild(list);}
   const li=document.createElement("li");
   const check=bullet[1].match(/^\[([ xX])\]\s*(.*)$/);
   if(check){const mark=document.createElement("span");mark.className="ticket-check";mark.textContent=check[1].toLowerCase()==="x"?"☑ ":"☐ ";li.appendChild(mark);inline(li,check[2]);}
   else inline(li,bullet[1]);list.appendChild(li);
  }else if(quote){reset();const block=document.createElement("blockquote");inline(block,quote[1]);target.appendChild(block);}
  else {list=null;if(!paragraph){paragraph=document.createElement("p");target.appendChild(paragraph);}else paragraph.appendChild(document.createElement("br"));inline(paragraph,line);}
 }
}
function date(iso){try{return new Date(iso).toLocaleString("fr-FR",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});}catch{return "—";}}
function status(text){$("ticketMessage").textContent=text;}
async function api(path){
 const r=await fetch(ROOT+path,{headers:{Accept:"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"},cache:"no-store"});
 if(!r.ok)throw Error("GitHub indisponible ("+r.status+(r.status===403?" — limite API possible":"")+")");
 return r.json();
}
async function auth(){
 try{
  const r=await fetch("/auth/status",{credentials:"same-origin",headers:{Accept:"application/json"},cache:"no-store"});
  const data=r.ok?await r.json():null;
  authenticated=!!(data&&data.authenticated);
 }catch{authenticated=false;}
 const field=$("ticketReply"),submit=$("ticketReplySubmit");
 field.disabled=!authenticated;submit.disabled=!authenticated||posting;
 $("ticketReplyHint").textContent=authenticated
  ?"Ta réponse sera publiée comme commentaire GitHub sur ce ticket public."
  :"Lecture seule : connecte-toi avec GitHub sur Forge pour répondre, ou utilise le lien GitHub.";
}
function renderComments(comments){
 const root=$("ticketComments");root.replaceChildren();
 $("ticketCommentCount").textContent=comments.length+" échange"+(comments.length>1?"s":"");
 if(!comments.length){const p=document.createElement("p");p.className="ticket-empty";p.textContent="Aucun commentaire pour le moment. Les prochains comptes rendus apparaîtront ici.";root.appendChild(p);return;}
 for(const comment of comments){
  const card=document.createElement("article");card.className="ticket-comment";
  const head=document.createElement("div");head.className="ticket-comment-head";
  const who=document.createElement("strong");who.textContent=comment.user?.login||"Compte GitHub";
  const when=document.createElement("span");when.textContent=date(comment.created_at);
  head.append(who,when);card.appendChild(head);
  const body=document.createElement("div");body.className="ticket-md";markdown(body,comment.body);
  card.appendChild(body);
  if(safeUrl(comment.html_url)){const link=document.createElement("a");link.href=comment.html_url;link.target="_blank";link.rel="noopener noreferrer";link.className="ticket-comment-link";link.textContent="Voir sur GitHub ↗";card.appendChild(link);}
  root.appendChild(card);
 }
}
async function loadComments(number,key){
 const root=$("ticketComments");root.textContent="Chargement des échanges…";
 const all=[];let truncated=false;
 for(let page=1;page<=10;page++){
  const result=await api(number+"/comments?per_page=100&page="+page);
  if(!Array.isArray(result))throw Error("Réponse commentaires inattendue");
  all.push(...result);
  if(result.length<100)break;
  if(page===10)truncated=true;
 }
 if(key!==loadKey)return;
 renderComments(all);
 if(truncated)$("ticketCommentCount").textContent+=" · limite d'affichage atteinte";
}
function open(number){
 if(!Number.isSafeInteger(number)||number<=0)return;
 const selected=document.querySelector(".bottom-nav-item.active");
 returnHash=selected?.getAttribute("href")||"#tickets";
 current=number;const key=++loadKey;previousFocus=document.activeElement;
 dlg.hidden=false;document.body.classList.add("ticket-open");$("ticketClose").focus();
 $("ticketTitle").textContent="Ticket #"+number;
 $("ticketCaption").textContent="Chargement du ticket…";
 $("ticketBody").textContent="Lecture de GitHub…";
 $("ticketComments").textContent="Chargement des échanges…";
 $("ticketCommentCount").textContent="";
 $("ticketReply").value="";
 $("ticketGithub").href="https://github.com/Leomgl/forge-app/issues/"+number;
 status("");
 Promise.allSettled([api(String(number)),loadComments(number,key),auth()]).then(results=>{
  if(key!==loadKey)return;
  const issue=results[0];
  if(issue.status==="fulfilled"&&!issue.value.pull_request){
   const it=issue.value;$("ticketTitle").textContent=it.title||"Ticket #"+number;
   const marker=String(it.body||"").match(/<!-- FORGE_META:\s*(\{[^\n]+\})\s*-->/);
   let m={};if(marker){try{m=JSON.parse(marker[1]);}catch{}}
   const label=it.state==="closed"?"Terminé":m.workflow==="doing"?"En cours":"À faire";
   $("ticketCaption").textContent="#"+number+" · "+(m.project==="GENERAL"?"GÉNÉRAL":m.project||"FORGE")+(m.project==="GENERAL"&&m.scope?" · "+({all:"Toutes les apps",multiple:"Plusieurs apps",newapp:"Nouvelle app",other:"Projet général"}[m.scope]||"Projet général"):"")+" · "+(m.type||"Ticket")+" · "+label+" · "+(m.priority||"normale")+" · actualisé "+date(it.updated_at);
   markdown($("ticketBody"),it.body||"Aucune description.");
  }else {
   $("ticketBody").textContent="Impossible de charger la demande. Utilise « Voir sur GitHub » pour y accéder.";
   $("ticketCaption").textContent="Lecture indisponible";
  }
  if(results[1].status==="rejected")$("ticketComments").textContent="Impossible de récupérer les commentaires : "+results[1].reason.message+". Consulte le ticket sur GitHub.";
 }).catch(()=>{if(key===loadKey)status("Erreur de chargement du ticket.");});
}
function close(){
 ++loadKey;current=0;dlg.hidden=true;document.body.classList.remove("ticket-open");
 if(previousFocus?.isConnected)previousFocus.focus();
}
function syncHash(){
 const m=location.hash.match(/^#ticket\/([1-9]\d*)$/);
 if(m){const n=Number(m[1]);if(n!==current)open(n);}else if(current)close();
}
async function reply(e){
 e.preventDefault();if(posting||!current)return;
 const number=current,body=$("ticketReply").value.trim();
 if(!authenticated){status("Connexion GitHub nécessaire pour répondre.");return;}
 if(!body){status("Écris un commentaire avant de publier.");return;}
 if(body.length>12000){status("Commentaire trop long (12 000 caractères maximum).");return;}
 posting=true;$("ticketReplySubmit").disabled=true;status("Publication sur GitHub…");
 try{
  const r=await fetch("/api/comments",{method:"POST",credentials:"same-origin",cache:"no-store",headers:{"Content-Type":"application/json","X-Forge-Action":"1"},body:JSON.stringify({number,body})});
  const data=await r.json().catch(()=>({}));
  if(r.status===401){await auth();throw Error("Session expirée, reconnecte-toi.");}
  if(!r.ok||!data.comment?.id)throw Error(data.error||"GitHub n'a pas confirmé le commentaire.");
  if(number!==current)return;
  $("ticketReply").value="";
  const key=loadKey;
  try{await loadComments(number,key);}catch{
   renderComments([data.comment]);status("Commentaire publié, mais l'historique complet est momentanément indisponible.");return;
  }
  status("Commentaire publié et confirmé sur GitHub.");
 }catch(err){if(number===current)status("Non publié : "+err.message);}
 finally{posting=false;$("ticketReplySubmit").disabled=!authenticated;}
}
function returnToView(){location.hash=returnHash;}
$("ticketClose").addEventListener("click",returnToView);
dlg.addEventListener("click",e=>{if(e.target===dlg)returnToView();});
dlg.addEventListener("keydown",e=>{
 if(e.key==="Escape"){e.preventDefault();returnToView();}
 if(e.key==="Tab"){
  const controls=Array.from(dlg.querySelectorAll('a[href],button:not([disabled]),textarea:not([disabled])')).filter(el=>el.getClientRects().length);
  if(!controls.length)return;
  if(e.shiftKey&&document.activeElement===controls[0]){e.preventDefault();controls[controls.length-1].focus();}
  else if(!e.shiftKey&&document.activeElement===controls[controls.length-1]){e.preventDefault();controls[0].focus();}
 }
});
$("ticketReplyForm").addEventListener("submit",reply);
window.addEventListener("hashchange",syncHash);
syncHash();
})();
