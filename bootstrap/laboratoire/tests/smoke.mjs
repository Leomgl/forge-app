// LABORATOIRE v0.1.0 — real-source smoke tests, no npm dependencies.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import {applyTheme,normalizeTheme,THEMES} from "../blocks/theme.mjs";
import {mountAppShell} from "../blocks/shell.mjs";
import {mountSettings} from "../blocks/settings.mjs";
const base=new URL("../",import.meta.url);
const get=p=>fs.readFileSync(new URL(p,base),"utf8");
for(const path of ["app.mjs","sw.js","worker.template.mjs","blocks/shell.mjs","blocks/settings.mjs","blocks/theme.mjs"]){
 execFileSync(process.execPath,["--check",fileURLToPath(new URL(path,base))]);
}
const manifest=JSON.parse(get("manifest.webmanifest"));
assert.equal(manifest.display,"standalone");
assert.equal(manifest.start_url,"/");
assert.equal(manifest.scope,"/");
assert.ok(manifest.icons.some(icon=>icon.src==="/icon.svg"));
const html=get("index.html"),app=get("app.mjs"),style=get("styles.css"),sw=get("sw.js");
assert.match(html,/name="apple-mobile-web-app-capable"/);
assert.match(html,/src="\/app\.mjs"/);
assert.match(app,/mountAppShell/);
assert.match(app,/mountSettings/);
assert.match(app,/FEUILLE 01/);
assert.match(app,/FEUILLE 02/);
assert.doesNotMatch(app,/Notification\.requestPermission|PushManager|\bfetch\(/);
assert.match(style,/:root\[data-theme="paper"\]/);
assert.match(style,/env\(safe-area-inset-bottom\)/);
assert.match(style,/prefers-reduced-motion/);
assert.match(sw,/laboratoire-v0\.1\.0/);
assert.doesNotMatch(sw,/push|notificationclick|setInterval/i);
assert.equal(normalizeTheme("paper"),"paper");
assert.equal(normalizeTheme("unsafe"),"graphite");
const el={dataset:{}};
assert.equal(applyTheme(el,"paper"),"paper");
assert.equal(el.dataset.theme,"paper");
assert.equal(Object.keys(THEMES).length,2);
class FakeNode {
 constructor(tag){this.tagName=tag.toUpperCase();this.children=[];this.dataset={};this.attributes={};this.handlers={};this.className="";this.textContent="";this.hidden=false;this.classList={toggle:(key,on)=>{const names=new Set(this.className.split(" ").filter(Boolean));if(on)names.add(key);else names.delete(key);this.className=[...names].join(" ");}};}
 append(...nodes){this.children.push(...nodes);}
 replaceChildren(...nodes){this.children=[...nodes];}
 addEventListener(event,handler){this.handlers[event]=handler;}
 setAttribute(k,v){this.attributes[k]=v;}
 querySelectorAll(query){const found=[];const search=e=>{if(query==="button[data-tab]"&&e.tagName==="BUTTON"&&e.dataset.tab)found.push(e);for(const child of e.children)if(child instanceof FakeNode)search(child);};search(this);return found;}
 click(){this.handlers.click?.();}
}
globalThis.document={createElement:tag=>new FakeNode(tag)};
const root=new FakeNode("div");const received=[];
const shell=mountAppShell(root,{title:"LABORATOIRE",version:"V0.1.0",tabs:[{id:"one",label:"Feuille 01"},{id:"two",label:"Feuille 02"}],onNavigate:id=>received.push(id)});
assert.equal(shell.active,"one");
assert.equal(received.at(-1),"one");
assert.equal(shell.setActive("two"),true);
assert.equal(shell.active,"two");
assert.equal(received.at(-1),"two");
assert.equal(shell.setActive("unknown"),false);
const settingsRoot=new FakeNode("div");const events=[];
const settings=mountSettings(settingsRoot,{version:"V0.1.0",sections:[{id:"settings",title:"Préférences",fields:[{kind:"toggle",key:"test",label:"Tester",value:true},{kind:"select",key:"style",label:"Style",value:"a",options:[{value:"a",label:"A"},{value:"b",label:"B"}]}]}],onChange:(key,value)=>events.push([key,value]),onUpdate:async()=>"Vérification effectuée"});
assert.equal(settingsRoot.children.length,1);
assert.deepEqual(settings.getValues(),{});
settings.update({version:"V0.1.1"});
assert.equal(settingsRoot.children.length,1);
settings.destroy();assert.equal(settingsRoot.children.length,0);
shell.destroy();assert.equal(root.children.length,0);
execFileSync(process.execPath,[fileURLToPath(new URL("scripts/build.mjs",base))],{stdio:"pipe"});
const worker=get("dist/worker.mjs");
assert.ok(!worker.includes("=__ASSETS__"));
assert.ok(worker.length>5000);
assert.doesNotMatch(worker,/env\.[A-Z_]+|GITHUB_CLIENT_SECRET|D1_DATABASE|LINK_NOTIFICATION/i);
const context=vm.createContext({Request,Response,URL,Object});
new vm.Script(worker.replace("export default {","globalThis.labWorker = {")).runInContext(context);
const handler=context.labWorker;
const url=p=>new Request("https://laboratoire.example"+p);
const home=await handler.fetch(url("/"));
assert.equal(home.status,200);
assert.match(home.headers.get("content-type"),/text\/html/);
assert.match(await home.text(),/LABORATOIRE/);
assert.match(home.headers.get("content-security-policy"),/default-src 'self'/);
const block=await handler.fetch(url("/blocks/settings.mjs"));
assert.equal(block.status,200);
assert.match(await block.text(),/mountSettings/);
const missing=await handler.fetch(url("/no-such-leaf"));
assert.equal(missing.status,404);
const deny=await handler.fetch(new Request("https://laboratoire.example/",{method:"POST"}));
assert.equal(deny.status,405);
const head=await handler.fetch(new Request("https://laboratoire.example/",{method:"HEAD"}));
assert.equal(head.status,200);assert.equal(await head.text(),"");
console.log("LABORATOIRE v0.1.0: PWA, shell, settings, themes, isolated Worker and CSP — PASS");
