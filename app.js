/* FORGE v0.3 — statuses saved directly to GitHub Issues, session-only optional editing credential. */
(function () {
"use strict";
var REPO="Leomgl/forge-app", API="https://api.github.com/repos/"+REPO+"/issues", CACHE_KEY="forge-public-issues-v2", DRAFT_KEY="forge-draft-v2";
var issues=[],loading=false,sessionToken="",pendingChange=null,saving=false;
var apps=[
 {id:"NEXUS",mark:"N",repo:"Leomgl/nexus-app",desc:"Second cerveau, contacts, rappels, budget et intégrations chiffrées."},
 {id:"GAMING",mark:"G",repo:"Leomgl/gaming-app",desc:"Jeux, stockage PS5, saisons, notifications et liens NEXUS."},
 {id:"RITUEL",mark:"R",repo:"Leomgl/rituel-app",desc:"Routines, stocks, statistiques et push iPhone."},
 {id:"VESTIAIRE",mark:"V",repo:"Leomgl/Vestiaire-app",desc:"Dressing, import Fits, mannequin et superposition des tenues."}
];
function id(n){return document.getElementById(n);}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function clean(s){return String(s||"").replace(/<!-- FORGE_META:[\s\S]*?-->/g,"").replace(/[#*_`>]/g,"").trim();}
function parseMeta(item){
 var m=String(item.body||"").match(/<!-- FORGE_META:\s*(\{[^\n]+\})\s*-->/);
 if(m){try {var x=JSON.parse(m[1]);if(x&&typeof x.project==="string")return x;}catch(e){}}
 var prefix=String(item.title||"").match(/^\[([A-Z]+)\]/);
 return {project:prefix?prefix[1]:"AUTRE",type:"ticket",priority:"normale"};
}
const WORKFLOW={todo:"À faire",doing:"En cours",done:"Terminé"};
function workflow(item){if(item.state==="closed")return "done";return parseMeta(item).workflow==="doing"?"doing":"todo";}
function updateWorkflowBody(item,target){
 var body=String(item.body||""),meta=parseMeta(item);
 meta.workflow=target;meta.format=Math.max(3,Number(meta.format)||0);
 var marker="<!-- FORGE_META: "+JSON.stringify(meta)+" -->";
 if(/<!-- FORGE_META:\s*\{[^\n]+\}\s*-->/.test(body))return body.replace(/<!-- FORGE_META:\s*\{[^\n]+\}\s*-->/,marker);
 return marker+"\n\n"+body;
}
function age(date){try{return new Date(date).toLocaleDateString("fr-FR",{day:"numeric",month:"short",year:"numeric"});}catch(e){return "—";}}
function setStatus(text){id("loadInfo").textContent=text;}
function render(){
 var q=id("search").value.toLocaleLowerCase("fr").trim(),project=id("projectFilter").value,status=id("statusFilter").value;
 var filtered=issues.filter(function(item){
 var meta=parseMeta(item);
 return (project==="all"||meta.project===project)&&(status==="all"||workflow(item)===status)&&(!q||String(item.number).includes(q.replace("#",""))||[item.title,item.body,meta.project].join(" ").toLocaleLowerCase("fr").includes(q));
 });
 id("issueCount").textContent=issues.length;
 if(!filtered.length){id("issues").innerHTML='<div class="empty">Aucune issue ne correspond aux filtres. Pour un nouveau signalement, utilise le formulaire ci-dessous.</div>';return;}
 id("issues").innerHTML=filtered.map(function(item){
 var m=parseMeta(item),published=item.html_url||("https://github.com/"+REPO+"/issues/"+item.number),state=workflow(item);
 return '<article class="issue" data-issue="'+Number(item.number)+'">'
 +'<span class="issue-num">#'+Number(item.number)+'</span><div class="issue-body">'
 +'<a class="issue-title" href="'+esc(published)+'" target="_blank" rel="noopener noreferrer">'+esc(item.title)+'</a>'
 +'<div class="issue-preview">'+esc(clean(item.body).slice(0,230))+'</div><div class="issue-meta"><span class="pill app">'+esc(m.project||"AUTRE")+'</span>'
 +'<span class="pill">'+esc(m.type||"Ticket")+'</span><span class="age">Mis à jour '+esc(age(item.updated_at))+'</span></div>'
 +'<div class="issue-actions"><label class="status-label">État <select class="status-picker" data-number="'+Number(item.number)+'" aria-label="État du ticket '+Number(item.number)+'" '+(saving?"disabled":"")+'>'+
 ["todo","doing","done"].map(function(st){return '<option value="'+st+'" '+(st===state?'selected':'')+'>'+WORKFLOW[st]+'</option>';}).join("")+
 '</select></label><a class="issue-link" href="'+esc(published)+'" target="_blank" rel="noopener noreferrer">Voir dans GitHub ↗</a></div></div></article>';
 }).join("");

}
async function load(){
 if(loading)return;loading=true;id("refresh").disabled=true;setStatus("Connexion aux issues publiques GitHub…");
 try {
  var results=[],n=1,more=true;
  while(more&&n<=4){
   var r=await fetch(API+"?state=all&per_page=100&page="+n,{headers:apiHeaders(false),cache:"no-store"});
   if(!r.ok)throw Error("GitHub a répondu "+r.status+(r.status===403?" (limite API possible)":""));
   var part=await r.json();
   if(!Array.isArray(part))throw Error("Réponse GitHub inattendue");
   results=results.concat(part.filter(function(x){return !x.pull_request;}));
   more=part.length===100;n++;
  }
  issues=results.sort(function(a,b){return new Date(b.updated_at)-new Date(a.updated_at);});
  try{localStorage.setItem(CACHE_KEY,JSON.stringify({at:Date.now(),issues:issues}));}catch(e){}
  setStatus(issues.length+" ticket(s) depuis GitHub. Source publique actualisée "+new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})+".");
 }catch(err){
  var cached;try{cached=JSON.parse(localStorage.getItem(CACHE_KEY)||"null");}catch(e){}
  if(cached&&Array.isArray(cached.issues)){issues=cached.issues;setStatus("Hors ligne ou API indisponible : ancien instantané affiché. "+err.message);}
  else {issues=[];setStatus("Issues non accessibles pour le moment : "+err.message+". Ouvre GitHub directement.");}
 }finally{loading=false;id("refresh").disabled=false;render();}
}
function editMode(){
 id("editMode").textContent=sessionToken?"Édition active · Déconnecter":"Activer l'édition";
 id("editMode").classList.toggle("active",!!sessionToken);
 id("editInfo").textContent=sessionToken
  ?"Édition autorisée pour cette session seulement : aucune clé enregistrée sur l'appareil."
  :"Lecture publique. Pour modifier un état depuis FORGE, active l'édition GitHub.";
}
function authOpen(){
 id("authMessage").textContent=pendingChange?"Autorise l'édition pour enregistrer l'état du ticket #"+pendingChange.number+".":"";
 id("authModal").hidden=false;
 id("tokenField").value="";
 id("tokenField").focus();
}
function authClose(){id("authModal").hidden=true;id("tokenField").value="";pendingChange=null;render();}
function authSave(e){
 e.preventDefault();
 var token=id("tokenField").value.trim();
 if(!/^(github_pat_|ghp_)/.test(token)||token.length<30){
  id("authMessage").textContent="Jeton GitHub non reconnu. Utilise un jeton personnel limité au dépôt forge-app (permission Issues : lecture/écriture).";
  return;
 }
 sessionToken=token;id("tokenField").value="";id("authModal").hidden=true;editMode();
 var next=pendingChange;pendingChange=null;
 if(next)saveWorkflow(next.number,next.target);
 else setStatus("Mode édition activé pour cette session. Sélectionne l'état d'un ticket.");
}
function apiHeaders(write){
 var h={"Accept":"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"};
 if(sessionToken)h.Authorization="Bearer "+sessionToken;
 if(write)h["Content-Type"]="application/json";
 return h;
}
async function githubRequest(url,options){
 var res=await fetch(url,Object.assign({cache:"no-store",headers:apiHeaders(false)},options||{}));
 if(!res.ok){
  if(res.status===401||res.status===403&&sessionToken){
   // Don't keep rejected credentials in memory.
   if(res.status===401)sessionToken="";
   editMode();
  }
  var hint=res.status===401?" (jeton invalide ou expiré)":res.status===403?" (droits Issues ou limite API à vérifier)":res.status===422?" (données refusées par GitHub)":"";
  throw Error("GitHub HTTP "+res.status+hint);
 }
 return res.json();
}
async function saveWorkflow(number,target){
 if(saving)return;
 var current=issues.find(function(x){return x.number===number;});
 if(!current||!WORKFLOW[target]){setStatus("Impossible de retrouver le ticket.");render();return;}
 if(workflow(current)===target){render();return;}
 if(!sessionToken){pendingChange={number:number,target:target};authOpen();return;}
 saving=true;render();setStatus("Enregistrement du ticket #"+number+" sur GitHub…");
 try{
  var url=API+"/"+number;
  var fresh=await githubRequest(url);
  if(fresh.updated_at!==current.updated_at||workflow(fresh)!==workflow(current)){
   throw Error("Le ticket #"+number+" a changé sur GitHub depuis le dernier chargement. Actualise avant de modifier.");
  }
  var payload={body:updateWorkflowBody(fresh,target)};
  var newState=target==="done"?"closed":"open";
  if(fresh.state!==newState){
   payload.state=newState;
   payload.state_reason=newState==="closed"?"completed":"reopened";
  }
  var updated=await githubRequest(url,{method:"PATCH",headers:apiHeaders(true),body:JSON.stringify(payload)});
  if(workflow(updated)!==target)throw Error("GitHub n'a pas confirmé l'état attendu. Actualise pour vérifier.");
  issues=issues.map(function(x){return x.number===number?updated:x;})
   .sort(function(a,b){return new Date(b.updated_at)-new Date(a.updated_at);});
  try{localStorage.setItem(CACHE_KEY,JSON.stringify({at:Date.now(),issues:issues}));}catch(e){}
  setStatus("Ticket #"+number+" → "+WORKFLOW[target]+" : enregistré sur GitHub et visible pour l'assistant.");
 }catch(e){
  setStatus("Statut non modifié : "+e.message);
 }finally{saving=false;render();}
}
function onStatusChange(e){
 if(!e.target.classList.contains("status-picker"))return;
 var number=Number(e.target.getAttribute("data-number")),target=e.target.value;
 if(!Number.isSafeInteger(number)||number<1||!WORKFLOW[target])return;
 saveWorkflow(number,target);
}
function makeApps(){
 id("apps").innerHTML=apps.map(function(p){
 return '<article class="appcard"><span class="appmark">'+p.mark+'</span><b>'+p.id+'</b><p>'+esc(p.desc)+'</p>'
 +'<a target="_blank" rel="noopener noreferrer" href="https://github.com/'+p.repo+'">Voir le dépôt ↗</a></article>';
 }).join("");
}
var fields=["tProject","tType","tPriority","tVersion","tTitle","tDescription","tSteps","tExpected","tConstraints"];
function draft(){
 var r={};fields.forEach(function(k){r[k]=id(k).value;});return r;
}
function persist(){try{localStorage.setItem(DRAFT_KEY,JSON.stringify(draft()));}catch(e){}}
function restore(){try{var d=JSON.parse(localStorage.getItem(DRAFT_KEY)||"{}");fields.forEach(function(k){if(typeof d[k]==="string"&&id(k))id(k).value=d[k];});}catch(e){}}
function issueBody(d){
 var p=apps.find(function(a){return a.id===d.tProject;});
 var meta=JSON.stringify({project:d.tProject,type:d.tType,priority:d.tPriority,version:d.tVersion||null,workflow:"todo",format:3});
 return '<!-- FORGE_META: '+meta+' -->\n'
 +'## Demande / problème\n'+d.tDescription.trim()+'\n\n'
 +'## Étapes de reproduction / vérification\n'+(d.tSteps.trim()||"Non renseignées")+'\n\n'
 +'## Résultat attendu / critères de recette\n'+(d.tExpected.trim()||"À préciser pendant le diagnostic")+'\n\n'
 +'## Contraintes / éléments à préserver\n'+(d.tConstraints.trim()||"Identifier pendant le diagnostic")+'\n\n'
 +'## Contexte technique et procédure pour l’assistant\n'
 +'- Dépôt à analyser : https://github.com/'+p.repo+'\n'
 +'- Version observée : '+(d.tVersion.trim()||"Non fournie, vérifier la version réellement servie")+'\n'
 +'- Priorité exprimée : '+d.tPriority+'\n'
 +'- Point de départ : https://github.com/Leomgl/forge-app/blob/main/docs/AI-START-HERE.md\n'
 +'- Dépendances : https://github.com/Leomgl/forge-app/blob/main/docs/DEPENDENCIES.md\n'
 +'- Lire le README actuel, code concerné, tests et commits récents avant toute modification.\n'
 +'- Documenter l’impact sur les données/migrations, les régressions possibles, les tests réalisés et les tests iPhone restant à faire.\n\n'
 +'## Suivi de livraison (à remplir lors du traitement)\n'
 +'- [ ] Diagnostic confirmé\n- [ ] Changement limité et tests de non-régression\n'
 +'- [ ] Commit/PR et fichiers modifiés référencés\n- [ ] Recette iPhone explicitement indiquée\n'
 +'- [ ] Documentation et dépendances mises à jour si nécessaire\n';
}
function publish(){
 var d=draft(),msg=id("composeMessage");
 if(!d.tTitle.trim()||!d.tDescription.trim()){msg.textContent="Ajoute au minimum un titre et une description.";id(!d.tTitle.trim()?"tTitle":"tDescription").focus();return;}
 var title="["+d.tProject+"]["+d.tType.toUpperCase()+"] "+d.tTitle.trim();
 var body=issueBody(d),url=new URL("https://github.com/"+REPO+"/issues/new");
 url.searchParams.set("title",title);url.searchParams.set("body",body);
 if(url.href.length>9000){msg.textContent="Le texte est trop long pour un formulaire GitHub prérempli fiable. Raccourcis le brouillon, ou copie-le dans GitHub.";return;}
 persist();
 msg.textContent="Ouverture de GitHub : connecte-toi et confirme « Submit new issue ». Ce brouillon seul n'est pas encore publié.";
 window.open(url.href,"_blank","noopener,noreferrer");
}
function reset(){
 if(!confirm("Effacer ton brouillon local ? Les tickets déjà publiés sur GitHub ne seront pas touchés."))return;
 fields.forEach(function(k){id(k).value=["tProject","tType","tPriority"].includes(k)?({tProject:"NEXUS",tType:"bug",tPriority:"normale"}[k]):"";});
 try{localStorage.removeItem(DRAFT_KEY);}catch(e){}
 id("composeMessage").textContent="Brouillon effacé.";
}
function start(){
 makeApps();restore();editMode();
 id("issues").addEventListener("change",onStatusChange);
 id("editMode").addEventListener("click",function(){if(sessionToken){sessionToken="";editMode();setStatus("Mode édition désactivé, aucune clé conservée.");render();}else authOpen();});
 id("authForm").addEventListener("submit",authSave);
 id("authCancel").addEventListener("click",authClose);
 id("authModal").addEventListener("click",function(e){if(e.target===id("authModal"))authClose();});
 document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!id("authModal").hidden)authClose();});
 ["search","projectFilter","statusFilter"].forEach(function(k){id(k).addEventListener(k==="search"?"input":"change",render);});
 fields.forEach(function(k){id(k).addEventListener("input",persist);id(k).addEventListener("change",persist);});
 id("refresh").addEventListener("click",load);id("publish").addEventListener("click",publish);id("resetDraft").addEventListener("click",reset);
 load();
 if("serviceWorker" in navigator&&location.protocol==="https:")navigator.serviceWorker.register("./sw.js").catch(function(){});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
