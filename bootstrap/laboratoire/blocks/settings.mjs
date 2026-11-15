// BLOCKS v0.1.0 — A stable settings architecture with configurable app-specific sections.
const node=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
export function mountSettings(target,config={}){
 if(!target||typeof target.replaceChildren!=="function")throw new TypeError("Missing settings root");
 let settings=config;const state=new Map();
 const notify=(key,value)=>{state.set(key,value);if(typeof settings.onChange==="function")settings.onChange(key,value);};
 const render=()=>{
  target.replaceChildren();
  const wrapper=node("div","bk-settings");
  const header=node("div","bk-settings-heading");
  const heading=node("div");
  heading.append(node("span","bk-eyebrow","PRÉFÉRENCES"),node("h2",null,"Réglages"));
  const ver=node("div","bk-settings-version");
  ver.append(node("small",null,"VERSION ACTUELLE"),node("strong",null,settings.version||"V0.1.0"));
  header.append(heading,ver);wrapper.append(header);
  const search=node("input","bk-settings-search");
  search.type="search";search.placeholder="Rechercher un réglage…";search.setAttribute("aria-label","Rechercher dans les réglages");
  wrapper.append(search);
  const sections=node("div","bk-settings-sections");wrapper.append(sections);
  const spec=Array.isArray(settings.sections)?settings.sections:[];
  const all=[...spec,{id:"about",title:"À propos",description:"Version et mise à jour",fields:[{kind:"info",label:settings.about||"Application expérimentale ; aucune donnée réelle."},{kind:"action",key:"check-update",label:"Rechercher une mise à jour",action:"update"}]}];
  const rows=[];
  for(const section of all){
   if(!section||!section.title)continue;
   const details=node("details","bk-settings-section");details.open=section.open??section.id===spec[0]?.id;
   const summary=node("summary",null);summary.append(node("strong",null,section.title));
   if(section.description)summary.append(node("small",null,section.description));
   details.append(summary);
   const body=node("div","bk-settings-body");
   for(const field of section.fields||[]){
    if(field.kind==="info"){
     body.append(node("p","bk-settings-info",field.label||""));continue;
    }
    if(field.kind==="action"){
     const btn=node("button","bk-button bk-button-secondary",field.label||"Lancer");btn.type="button";
     const status=node("p","bk-form-status");status.setAttribute("role","status");
     btn.addEventListener("click",async()=>{
      if(field.action!=="update")return;
      btn.disabled=true;status.textContent="Vérification…";
      try{
       if(typeof settings.onUpdate!=="function")throw new Error("Vérification indisponible");
       const message=await settings.onUpdate();status.textContent=message||"Vérification effectuée.";
      }catch(error){status.textContent="Impossible de vérifier : "+error.message;}finally{btn.disabled=false;}
     });
     body.append(btn,status);continue;
    }
    const key=String(field.key||field.label||"");
    const line=node("label","bk-settings-field");
    const left=node("span","bk-settings-field-label");
    left.append(node("strong",null,field.label||key));
    if(field.description)left.append(node("small",null,field.description));
    line.append(left);
    if(field.kind==="toggle"){
     const input=node("input","bk-settings-toggle");input.type="checkbox";input.checked=state.has(key)?Boolean(state.get(key)):Boolean(field.value);
     input.addEventListener("change",()=>notify(key,input.checked));
     line.append(input);
    }else if(field.kind==="select"){
     const input=node("select","bk-settings-select");
     for(const option of field.options||[]){const o=node("option",null,option.label);o.value=option.value;input.append(o);}
     input.value=state.has(key)?state.get(key):field.value;
     input.addEventListener("change",()=>notify(key,input.value));line.append(input);
    }else continue;
    body.append(line);
   }
   if(typeof section.decorate==="function")section.decorate(body);
   details.append(body);sections.append(details);
   rows.push({details,term:(section.title+" "+(section.description||"")+" "+(section.fields||[]).map(f=>f.label||"").join(" ")).toLocaleLowerCase("fr")});
  }
  const empty=node("p","bk-empty","Aucun réglage ne correspond à cette recherche.");
  empty.hidden=true;sections.append(empty);
  search.addEventListener("input",()=>{
   const term=search.value.trim().toLocaleLowerCase("fr");let count=0;
   for(const row of rows){const match=!term||row.term.includes(term);row.details.hidden=!match;if(match)count++;}
   empty.hidden=count!==0;
  });
  target.append(wrapper);
 };
 render();
 return {update(next){settings={...settings,...next};render();},getValues(){return Object.fromEntries(state);},destroy(){target.replaceChildren();}};
}
