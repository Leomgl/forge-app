/* FORGE v0.5 — workflow board, priority, centralized app registry; OAuth unchanged. */
(function () {
"use strict";
var REPO="Leomgl/forge-app", API="https://api.github.com/repos/"+REPO+"/issues", CACHE_KEY="forge-public-issues-v2", DRAFT_KEY="forge-draft-v2";
var issues=[],loading=false,saving=false,auth={configured:false,authenticated:false,login:null,edge:false,missing:[],clientIdFormat:"unknown"};
var GATEWAY="https://forge-hub.q9pfwtztsc.workers.dev/";
var apps=[
 {id:"NEXUS",mark:"N",repo:"Leomgl/nexus-app",desc:"Second cerveau, contacts, rappels, budget et intégrations chiffrées."},
 {id:"GAMING",mark:"G",repo:"Leomgl/gaming-app",desc:"Jeux, stockage PS5, saisons, notifications et liens NEXUS."},
 {id:"RITUEL",mark:"R",repo:"Leomgl/rituel-app",desc:"Routines, stocks, statistiques et push iPhone."},
 {id:"VESTIAIRE",mark:"V",repo:"Leomgl/Vestiaire-app",desc:"Dressing, import Fits, mannequin et superposition des tenues."},
 {id:"SANTE",mark:"S",repo:"Leomgl/sante-app",desc:"Carnet de santé chiffré, traitements, habitudes et liaison NEXUS."},
 {id:"GARAGE",mark:"G",repo:"Leomgl/garage-app",desc:"Inventaire privé, localisation des objets, prêts et kits de départ."},
 {id:"FORGE",mark:"F",repo:"Leomgl/forge-app",desc:"Mémoire des tickets, connexion GitHub et pilotage du développement."}
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
const PRIORITIES={critique:{label:"Critique",rank:0},haute:{label:"Haute",rank:1},normale:{label:"Normale",rank:2},basse:{label:"Basse",rank:3}};
function priorityOf(item){var raw=String(parseMeta(item).priority||"normale").toLowerCase();return PRIORITIES[raw]?raw:"normale";}
function ticketCard(item){
 var m=parseMeta(item),published=item.html_url||("https://github.com/"+REPO+"/issues/"+item.number),state=workflow(item),priority=priorityOf(item);
 return '<article class="issue" data-issue="'+Number(item.number)+'">'
 +'<div class="issue-top"><span class="issue-num">#'+Number(item.number)+'</span><span class="pill priority '+priority+'">'+PRIORITIES[priority].label+'</span></div>'
 +'<a class="issue-title" href="'+esc(published)+'" target="_blank" rel="noopener noreferrer">'+esc(item.title)+'</a>'
 +'<div class="issue-preview">'+esc(clean(item.body).slice(0,150))+'</div>'
 +'<div class="issue-meta"><span class="pill app">'+esc(m.project||"AUTRE")+'</span><span class="pill">'+esc(m.type||"Ticket")+'</span><span class="age">'+esc(age(item.updated_at))+'</span></div>'
 +'<div class="issue-actions"><label class="status-label">État <select class="status-picker" data-number="'+Number(item.number)+'" aria-label="État du ticket '+Number(item.number)+'" '+(saving?"disabled":"")+'>'+
 ["todo","doing","done"].map(function(st){return '<option value="'+st+'" '+(st===state?'selected':'')+'>'+WORKFLOW[st]+'</option>';}).join("")
 +'</select></label><a class="issue-link" href="'+esc(published)+'" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></article>';
}
function render(){
 var q=id("search").value.toLocaleLowerCase("fr").trim(),project=id("projectFilter").value,status=id("statusFilter").value,priority=id("priorityFilter").value;
 var scoped=issues.filter(function(item){
  var m=parseMeta(item);
  return (project==="all"||m.project===project)&&(priority==="all"||priorityOf(item)===priority)
   &&(!q||String(item.number).includes(q.replace("#",""))||[item.title,item.body,m.project].join(" ").toLocaleLowerCase("fr").includes(q));
 });
 var totals={todo:0,doing:0,done:0};
 scoped.forEach(function(item){totals[workflow(item)]++;});
 id("workflowSummary").innerHTML=["todo","doing","done"].map(function(st){
  return '<button type="button" class="statbox '+st+(status===st?' selected':'')+'" data-filter="'+st+'" aria-pressed="'+(status===st)+'"><span>'+WORKFLOW[st]+'</span><strong>'+totals[st]+'</strong></button>';
 }).join("");
 id("issueCount").textContent=issues.length;
 var states=status==="all"?["todo","doing","done"]:[status];
 id("issues").innerHTML=states.map(function(st){
  var group=scoped.filter(function(item){return workflow(item)===st;}).sort(function(a,b){
    return PRIORITIES[priorityOf(a)].rank-PRIORITIES[priorityOf(b)].rank||new Date(b.updated_at)-new Date(a.updated_at);
  });
  return '<section class="issue-column col-'+st+'" aria-label="'+WORKFLOW[st]+'">'
   +'<div class="column-heading"><span class="column-indicator"></span><h3>'+WORKFLOW[st]+'</h3><span class="column-count">'+group.length+'</span></div>'
   +'<div class="column-list">'+(group.length?group.map(ticketCard).join(""):'<div class="column-empty">Aucun ticket ici.</div>')+'</div></section>';
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
 id("editMode").textContent=auth.authenticated?(auth.login+" · Déconnexion"):auth.edge&&auth.configured?"Se connecter avec GitHub":auth.edge?"Vérifier la connexion":"Ouvrir FORGE sécurisé";
 id("editMode").classList.toggle("active",auth.authenticated);
 id("editInfo").textContent=auth.authenticated
  ?"Compte GitHub connecté : modifications enregistrées dans FORGE."
  :auth.configured?"Une connexion GitHub suffit pour créer et modifier tes tickets."
  :auth.edge?"Connexion GitHub non prête. Vérifie les variables Cloudflare indiquées ci-dessous."
  :"Tu utilises l'ancienne adresse GitHub Pages. L'édition directe se fait dans FORGE sur Cloudflare.";
 id("publish").textContent=auth.authenticated?"Créer le ticket":"Publier via GitHub ↗";
 const notice=id("authNotice");
 const params=new URL(location.href).searchParams;
 const authResult=params.get("auth");
 const errors={setup:"Configuration GitHub incomplète sur Cloudflare.",state:"Connexion expirée ou retour GitHub non reconnu : retente depuis FORGE.",exchange:"GitHub a refusé l'échange du code : vérifie Client ID, Client Secret et Callback URL.",account:"Tu t'es connecté avec un compte différent de Leomgl.",oauth:"Connexion GitHub interrompue. Relance la connexion.",profile:"GitHub a validé l’autorisation, mais FORGE n’a pas pu lire le profil utilisateur. Vérifie la configuration de l’application GitHub.",session:"GitHub a validé ton identité, mais FORGE n’a pas pu sécuriser la session. Le serveur doit être corrigé.",error:"Connexion GitHub non terminée.",ok:""};
 let message="";
 if(!auth.edge)message="Ancienne adresse détectée. Ouvre FORGE sur Cloudflare, puis ajoute cette nouvelle adresse à l'écran d'accueil de ton iPhone.";
 else if(!auth.configured){
  const missing=(auth.missing||[]).join(", ");
  message="Connexion GitHub indisponible : "+(missing?"variable(s) manquante(s) : "+missing+".":"vérifie la configuration de la GitHub App.");
 }else if(authResult&&errors[authResult])message=errors[authResult];
 else if(authResult==="ok"&&!auth.authenticated)message="Retour GitHub reçu, mais la session n'est pas reconnue sur cette installation. Rouvre FORGE depuis la même adresse Cloudflare.";
 if(auth.clientIdFormat==="check-client-id"&&auth.edge)message+=" Vérifie que GITHUB_CLIENT_ID contient bien le Client ID de la GitHub App.";
 notice.hidden=!message;
 notice.textContent=message;
 const cloud=id("cloudEntry");cloud.hidden=auth.edge;
}
async function authCheck(){
 try{
  const r=await fetch("/auth/status",{headers:{Accept:"application/json"},credentials:"same-origin",cache:"no-store"});
  if(!r.ok||!(r.headers.get("content-type")||"").includes("application/json"))throw Error("gateway missing");
  const v=await r.json();
  auth={configured:!!v.configured,authenticated:!!v.authenticated,login:v.login||null,edge:true,missing:Array.isArray(v.missing)?v.missing:[],clientIdFormat:v.clientIdFormat||"unknown"};
 }catch{auth={configured:false,authenticated:false,login:null,edge:false,missing:[],clientIdFormat:"unknown"};}
 editMode();
}
async function editClick(){
 if(auth.authenticated){
  if(!confirm("Déconnecter GitHub de FORGE sur cet appareil ?"))return;
  try{
   const r=await fetch("/auth/logout",{method:"POST",headers:{"Content-Type":"application/json","X-Forge-Action":"1"},credentials:"same-origin",body:"{}"});
   if(!r.ok)throw Error("Connexion indisponible");
   await authCheck();setStatus("Compte GitHub déconnecté.");
  }catch(e){setStatus("Déconnexion non confirmée : "+e.message);}
 }else if(!auth.edge){window.location.href=GATEWAY;}
 else if(!auth.configured){editMode();id("authNotice").scrollIntoView({behavior:"smooth",block:"center"});}
 else window.location.href="/auth/login";
}
function apiHeaders(write){
 const h={Accept:"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"};
 if(write){h["Content-Type"]="application/json";h["X-Forge-Action"]="1";}return h;
}
async function writeApi(endpoint,payload){
 const r=await fetch(endpoint,{method:"POST",headers:apiHeaders(true),credentials:"same-origin",cache:"no-store",body:JSON.stringify(payload)});
 const data=await r.json().catch(()=>({}));
 if(r.status===401){await authCheck();throw Error("Session expirée. Reconnecte-toi avec GitHub.");}
 if(!r.ok)throw Error(data.error||"GitHub a refusé ("+r.status+")");
 return data;
}
async function saveWorkflow(number,target){
 if(saving)return;
 const current=issues.find(x=>x.number===number);
 if(!current||!WORKFLOW[target]){setStatus("Ticket introuvable.");render();return;}
 if(workflow(current)===target){render();return;}
 if(!auth.authenticated){setStatus("Connecte-toi à GitHub pour modifier ce ticket.");editClick();render();return;}
 saving=true;render();setStatus("Enregistrement du ticket #"+number+"…");
 try{
  const data=await writeApi("/api/workflow",{number,target,updated_at:current.updated_at});
  const updated=data.issue;
  if(workflow(updated)!==target)throw Error("GitHub n'a pas confirmé le statut.");
  issues=issues.map(x=>x.number===number?updated:x).sort((a,b)=>new Date(b.updated_at)-new Date(a.updated_at));
  try{localStorage.setItem(CACHE_KEY,JSON.stringify({at:Date.now(),issues}));}catch{}
  setStatus("Ticket #"+number+" → "+WORKFLOW[target]+" : enregistré sur GitHub.");
 }catch(e){setStatus("Non enregistré : "+e.message);}
 finally{saving=false;render();}
}
function onStatusChange(e){
 if(!e.target.classList.contains("status-picker"))return;
 const number=Number(e.target.getAttribute("data-number")),target=e.target.value;
 if(Number.isSafeInteger(number)&&number>=1&&WORKFLOW[target])saveWorkflow(number,target);
}
function populateProjects(){
 ["projectFilter","tProject"].forEach(function(key){
  var el=id(key),previous=el.value,all=key==="projectFilter";
  el.innerHTML=(all?'<option value="all">Toutes les apps</option>':"")+apps.map(function(p){return '<option value="'+esc(p.id)+'">'+esc(p.id==="SANTE"?"SANTÉ":p.id)+'</option>';}).join("");
  el.value=previous&&Array.from(el.options).some(function(o){return o.value===previous;})?previous:(all?"all":"NEXUS");
 });
}
function makeApps(){
 id("apps").innerHTML=apps.filter(function(p){return p.id!=="FORGE";}).map(function(p){
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
async function publish(){
 var d=draft(),msg=id("composeMessage");
 if(!d.tTitle.trim()||!d.tDescription.trim()){msg.textContent="Ajoute au minimum un titre et une description.";id(!d.tTitle.trim()?"tTitle":"tDescription").focus();return;}
 var title="["+d.tProject+"]["+d.tType.toUpperCase()+"] "+d.tTitle.trim();
 var body=issueBody(d),url=new URL("https://github.com/"+REPO+"/issues/new");
 if(auth.authenticated){
  const btn=id("publish");btn.disabled=true;msg.textContent="Création du ticket dans GitHub…";
  try{
   const result=await writeApi("/api/issues",{title,body});
   resetAfterPublication();msg.textContent="Ticket #"+result.issue.number+" publié !";await load();
  }catch(e){msg.textContent="Publication non effectuée : "+e.message;}
  finally{btn.disabled=false;}return;
 }
 url.searchParams.set("title",title);url.searchParams.set("body",body);
 if(url.href.length>9000){msg.textContent="Le texte est trop long pour un formulaire GitHub prérempli fiable. Raccourcis le brouillon, ou copie-le dans GitHub.";return;}
 persist();
 msg.textContent="Ouverture de GitHub : connecte-toi et confirme « Submit new issue ». Ce brouillon seul n'est pas encore publié.";
 window.open(url.href,"_blank","noopener,noreferrer");
}
function resetAfterPublication(){fields.forEach(k=>{id(k).value=["tProject","tType","tPriority"].includes(k)?({tProject:"NEXUS",tType:"bug",tPriority:"normale"}[k]):"";});try{localStorage.removeItem(DRAFT_KEY);}catch{}}
function reset(){
 if(!confirm("Effacer ton brouillon local ? Les tickets déjà publiés sur GitHub ne seront pas touchés."))return;
 fields.forEach(function(k){id(k).value=["tProject","tType","tPriority"].includes(k)?({tProject:"NEXUS",tType:"bug",tPriority:"normale"}[k]):"";});
 try{localStorage.removeItem(DRAFT_KEY);}catch(e){}
 id("composeMessage").textContent="Brouillon effacé.";
}
function start(){
 populateProjects();makeApps();restore();editMode();authCheck();
 id("issues").addEventListener("change",onStatusChange);
 id("workflowSummary").addEventListener("click",function(e){
  var btn=e.target.closest("[data-filter]");if(!btn)return;
  var next=btn.getAttribute("data-filter");if(!WORKFLOW[next])return;
  id("statusFilter").value=id("statusFilter").value===next?"all":next;render();
 });
 id("editMode").addEventListener("click",editClick);
 ["search","projectFilter","statusFilter","priorityFilter"].forEach(function(k){id(k).addEventListener(k==="search"?"input":"change",render);});
 fields.forEach(function(k){id(k).addEventListener("input",persist);id(k).addEventListener("change",persist);});
 id("refresh").addEventListener("click",load);id("publish").addEventListener("click",publish);id("resetDraft").addEventListener("click",reset);
 load();
 if("serviceWorker" in navigator&&location.protocol==="https:")navigator.serviceWorker.register("./sw.js").catch(function(){});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
