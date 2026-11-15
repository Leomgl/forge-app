// BLOCKS v0.1.0 — Themes are presentation only; no app or network coupling.
export const THEMES=Object.freeze({
 graphite:Object.freeze({name:"graphite",label:"Graphite",description:"Interface sombre, contraste affirmé"}),
 paper:Object.freeze({name:"paper",label:"Papier",description:"Interface claire, accents doux"})
});
export function normalizeTheme(name){return Object.hasOwn(THEMES,name)?name:"graphite";}
export function applyTheme(element,name){
 if(!element||!element.dataset)throw new TypeError("Theme target must be a DOM element");
 const next=normalizeTheme(name);element.dataset.theme=next;return next;
}
