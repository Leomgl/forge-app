// LABORATOIRE v0.1.0 — an isolated PWA proving real BLOCKS module reuse.
import {THEMES,applyTheme,normalizeTheme} from "./blocks/theme.mjs";
import {mountAppShell} from "./blocks/shell.mjs";
import {mountSettings} from "./blocks/settings.mjs";

const VERSION="V0.1.0";
const DEMOS=[
 {id:"shell",num:"01",title:"Structure d'application",category:"INTERFACE",description:"En-tête, navigation, états et deux identités graphiques."},
 {id:"settings",num:"02",title:"Réglages universels",category:"COMPOSANT",description:"Un même bloc, deux contextes de produits différents."}
];
const $=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
function readTheme(){try{return normalizeTheme(localStorage.getItem("lab-theme-v1"));}catch{return "graphite";}}
function writeTheme(value){try{localStorage.setItem("lab-theme-v1",value);}catch{}}
let theme=applyTheme(document.documentElement,readTheme());
let scenario="personal";
const preferences={};

const shell=mountAppShell(document.getElementById("root"),{
 title:"LABORATOIRE",subtitle:"Une feuille après l'autre",version:VERSION,
 tabs:[{id:"carnet",label:"Feuilles"},{id:"shell",label:"Structure"},{id:"settings",label:"Réglages"}],
 onNavigate:render
});
function headline(tag,eyebrow,title,detail){
 const wrap=$(tag,"lab-headline");wrap.append($("span","bk-eyebrow",eyebrow),$("h1",null,title));
 if(detail)wrap.append($("p","lab-lead",detail));return wrap;
}
function button(text,onClick,cls="bk-button"){
 const b=$("button",cls,text);b.type="button";b.addEventListener("click",onClick);return b;
}
function render(id,outlet){
 outlet.replaceChildren();
 if(id==="carnet")return renderCarnet(outlet);
 if(id==="shell")return renderShell(outlet);
 if(id==="settings")return renderSettings(outlet);
}
function renderCarnet(outlet){
 outlet.append(headline("section","CENTRE D'ESSAI","La pile de feuilles.","On construit un bloc, on l'essaie sous plusieurs apparences, puis on le valide avant de passer à la feuille suivante."));
 const intro=$("div","lab-topline");
 intro.append($("span","lab-indicator","● V0.1 · Prototype isolé"),$("span","lab-light","Aucune donnée métier"));
 outlet.append(intro);
 const list=$("div","lab-sheet-list");
 for(const demo of DEMOS){
  const card=$("button","lab-sheet");
  card.type="button";
  const meta=$("div","lab-sheet-meta");meta.append($("span","lab-sheet-number",demo.num),$("span","lab-tag","EN ESSAI"));
  const title=$("h2",null,demo.title),desc=$("p",null,demo.description);
  const foot=$("div","lab-sheet-footer");foot.append($("span",null,demo.category),$("span",null,"Ouvrir la feuille →"));
  card.append(meta,title,desc,foot);
  card.addEventListener("click",()=>shell.setActive(demo.id));
  list.append(card);
 }
 outlet.append(list);
 const note=$("p","lab-note","Ces feuilles sont notre atelier, pas des applications métiers. Les blocs restent indépendants de LINK tant qu'aucun contrat de test n'est validé.");
 outlet.append(note);
}
function renderShell(outlet){
 outlet.replaceChildren();
 outlet.append(headline("section","FEUILLE 01 · BLOCKS/SHELL","Structure d'application","L'en-tête et la barre de navigation que tu utilises ici sont déjà rendus par notre composant partagé."));
 const panel=$("section","lab-panel");panel.append($("h2",null,"Changer l'identité graphique"),$("p","lab-muted","La structure ne change pas : seuls les design tokens sont modifiés."));
 const controls=$("div","lab-choices");controls.setAttribute("role","group");controls.setAttribute("aria-label","Identité graphique");
 for(const value of Object.keys(THEMES)){
  const b=button(THEMES[value].label,()=>{
   theme=applyTheme(document.documentElement,value);writeTheme(theme);renderShell(outlet);
  },"bk-button lab-choice"+(theme===value?" selected":""));
  b.setAttribute("aria-pressed",String(theme===value));controls.append(b);
 }
 panel.append(controls);
 const preview=$("div","lab-example");
 preview.append($("span","bk-eyebrow","ÉTAT DE DÉMONSTRATION"),$("h3",null,"Un écran, plusieurs styles."),$("p",null,"Cartes, espaces et contrôles suivent les mêmes variables d'interface."),$("span","lab-example-pill","Contenu fictif"));
 panel.append(preview);outlet.append(panel);
 outlet.append($("p","lab-note","À tester sur l'iPhone : mode clair/sombre, barre inférieure, zones tactiles, retour au carnet et affichage plein écran."));
}
async function checkUpdate(){
 if(!("serviceWorker" in navigator))throw Error("Service Worker indisponible sur ce navigateur");
 const registration=await navigator.serviceWorker.getRegistration();
 if(!registration)throw Error("Installation PWA non encore enregistrée");
 await registration.update();return "Vérification terminée. Si une nouvelle version existe, ferme et rouvre la PWA.";
}
function sectionPreset(){
 if(scenario==="personal")return [
  {id:"prefs",title:"Préférences",description:"Mon espace",open:true,fields:[
   {kind:"toggle",key:"compact",label:"Affichage compact",description:"Démonstration locale uniquement",value:false},
   {kind:"select",key:"density",label:"Densité de l'interface",value:"normal",options:[{label:"Normale",value:"normal"},{label:"Aérée",value:"spacious"}]}
  ]},
  {id:"privacy",title:"Confidentialité",description:"Protection des informations",fields:[
   {kind:"info",label:"Dans le LAB, aucune donnée personnelle n'est envoyée à un serveur."},
   {kind:"toggle",key:"confirm",label:"Demander confirmation",value:true}
  ]}
 ];
 return [
  {id:"prefs",title:"Gestion d'événements",description:"Scénario fictif",open:true,fields:[
   {kind:"toggle",key:"compact",label:"Résumé des événements",value:true},
   {kind:"select",key:"density",label:"Présentation",value:"cards",options:[{label:"Cartes",value:"cards"},{label:"Liste",value:"list"}]}
  ]},
  {id:"privacy",title:"Autorisations",description:"Simulation, sans connexion LINK",fields:[
   {kind:"info",label:"Les vrais échanges et notifications passeront exclusivement par LINK."},
   {kind:"toggle",key:"confirm",label:"Validation avant partage",value:true}
  ]}
 ];
}
function renderSettings(outlet){
 outlet.replaceChildren();
 outlet.append(headline("section","FEUILLE 02 · BLOCKS/SETTINGS","Réglages universels","Même architecture dans toutes les apps, mais sections et présentation adaptées à leur contexte."));
 const options=$("div","lab-switcher");
 options.setAttribute("role","group");options.setAttribute("aria-label","Contexte de démonstration");
 for(const [value,label] of [["personal","Espace personnel"],["events","Gestion d'événements"]]){
  const b=button(label,()=>{scenario=value;renderSettings(outlet);},"bk-button lab-choice"+(scenario===value?" selected":""));
  b.setAttribute("aria-pressed",String(scenario===value));options.append(b);
 }
 outlet.append(options);
 const block=$("section","lab-component-mount");outlet.append(block);
 mountSettings(block,{version:VERSION,sections:sectionPreset(),about:"Laboratoire v0.1.0 · Démonstration locale et indépendante de LINK.",onUpdate:checkUpdate,onChange:(key,value)=>{preferences[key]=value;}});
 const foot=$("p","lab-note","Expérience : change de contexte. La structure Version → Catégories → À propos et son composant restent identiques.");
 outlet.append(foot);
}
if("serviceWorker" in navigator&&location.protocol==="https:"){
 navigator.serviceWorker.register("/sw.js",{scope:"/"}).catch(()=>{});
}
