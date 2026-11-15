// BLOCKS v0.1.0 — Independent PWA app shell.
const make=(tag,className,text)=>{const e=document.createElement(tag);if(className)e.className=className;if(text!==undefined)e.textContent=text;return e;};
export function mountAppShell(root,options={}){
 if(!root||typeof root.replaceChildren!=="function")throw new TypeError("Missing app shell root");
 const frame=make("div","bk-app-frame");
 const head=make("header","bk-header");
 const brand=make("div","bk-brand");
 const logo=make("span","bk-brand-mark","L.");
 logo.setAttribute("aria-hidden","true");
 const captions=make("div","bk-brand-captions");
 const label=make("strong","bk-brand-title",options.title||"Laboratoire");
 const subtitle=make("small","bk-brand-subtitle",options.subtitle||"Carnet d'expériences");
 captions.append(label,subtitle);brand.append(logo,captions);
 const version=make("span","bk-header-version",options.version||"");
 head.append(brand,version);
 const main=make("main","bk-main");main.id="main-content";main.tabIndex=-1;
 const nav=make("nav","bk-navigation");nav.setAttribute("aria-label","Navigation principale");
 frame.append(head,main,nav);root.replaceChildren(frame);
 let tabs=[],active=null;
 const setActive=id=>{
  if(!tabs.some(t=>t.id===id))return false;
  active=id;
  for(const b of nav.querySelectorAll("button[data-tab]")){
   const yes=b.dataset.tab===id;b.classList.toggle("active",yes);
   b.setAttribute("aria-current",yes?"page":"false");
  }
  if(typeof options.onNavigate==="function")options.onNavigate(id,main);
  return true;
 };
 const setTabs=items=>{
  tabs=Array.isArray(items)?items.filter(t=>t&&typeof t.id==="string"&&typeof t.label==="string"):[];nav.replaceChildren();
  for(const tab of tabs){
   const button=make("button","bk-nav-item",tab.label);button.type="button";button.dataset.tab=tab.id;
   button.addEventListener("click",()=>setActive(tab.id));nav.append(button);
  }
  if(tabs.length)setActive(tabs.some(t=>t.id===active)?active:tabs[0].id);
 };
 setTabs(options.tabs||[]);
 return {outlet:main,setTabs,setActive,setVersion(v){version.textContent=String(v||"");},destroy(){root.replaceChildren();},get active(){return active;}};
}
