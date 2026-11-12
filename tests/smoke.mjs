// FORGE — smoke tests unitaires sans dépendances npm.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
const src=fs.readFileSync(new URL("../app.js",import.meta.url),"utf8");
new vm.Script(src,{filename:"app.js"});
const needle='if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();';
assert.ok(src.includes(needle),"entrypoint UI changed: adapt test extraction");
const isolated=src.replace(needle,'globalThis.FORGE_TEST = {parseMeta,issueBody,clean,workflow,updateWorkflowBody,priorityOf,PRIORITIES,apps};');
const context=vm.createContext({});
new vm.Script(isolated,{filename:"app-tests.js"}).runInContext(context);
const api=context.FORGE_TEST;
assert.equal(api.parseMeta({title:"[NEXUS][BUG] Tri",body:'<!-- FORGE_META: {"project":"NEXUS","type":"bug","priority":"haute","format":2} -->'}).project,"NEXUS");
assert.equal(api.parseMeta({title:"[RITUEL] Autre",body:""}).project,"RITUEL");
assert.equal(api.clean('<!-- FORGE_META: {"project":"GAMING"} -->\n## Test'),"Test");
const md=api.issueBody({tProject:"GAMING",tType:"evolution",tPriority:"normale",tVersion:"0.7",tDescription:"Évolution",tSteps:"1. Test",tExpected:"Doit marcher",tConstraints:"Préserver NEXUS LINK"});
assert.match(md,/github.com\/Leomgl\/gaming-app/);
assert.match(md,/"project":"GAMING"/);
assert.match(md,/Préserver NEXUS LINK/);

const source={number:9,title:"[NEXUS][TEST] Déjà existant",state:"open",updated_at:"2026-11-11T12:00:00Z",
 body:'<!-- FORGE_META: {"project":"NEXUS","type":"test","priority":"normale","format":2} -->\\n## Demande\\nConserver les détails.'};
assert.equal(api.workflow(source),"todo","legacy issue defaults to À faire");
const doingBody=api.updateWorkflowBody(source,"doing");
assert.ok(doingBody.includes("Conserver les détails."),"body must not be erased");
assert.equal(api.workflow({...source,body:doingBody}),"doing","open + doing metadata = En cours");
assert.equal(api.workflow({...source,body:doingBody,state:"closed"}),"done","closed always means Terminé");
assert.equal(api.workflow({...source,body:api.updateWorkflowBody(source,"todo")}),"todo");
assert.equal((doingBody.match(/FORGE_META:/g)||[]).length,1,"only one metadata marker");
assert.ok(doingBody.includes('"format":3'),"metadata upgraded without data loss");
const noMarker={title:"[RITUEL] Bug",state:"open",body:"## Notes\\nOrigine"};
assert.ok(api.updateWorkflowBody(noMarker,"doing").includes("## Notes\\nOrigine"),"unmarked legacy body preserved");
assert.ok(api.issueBody({tProject:"NEXUS",tType:"test",tPriority:"normale",tVersion:"",tDescription:"a",tSteps:"",tExpected:"",tConstraints:""}).includes('"workflow":"todo"'),"new issues default to todo");
const html=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");
assert.match(html,/Content-Security-Policy/);
assert.match(html,/https:\/\/api.github.com/);
assert.match(html,/id="editMode"/);
assert.match(html,/id="workflowSummary"/);
assert.doesNotMatch(html,/id="tokenField"/,"PAT input must be removed");
assert.match(html,/id="authNotice"/);
assert.match(html,/id="cloudEntry"/);
assert.match(src,/clientIdFormat/);
assert.match(src,/authResult/);
assert.match(src,/forge-hub\.q9pfwtztsc\.workers\.dev/);
assert.match(src,/\/auth\/status/);
assert.match(src,/\/api\/workflow/);
assert.match(src,/\/api\/issues/);
assert.doesNotMatch(src,/sessionToken|github_pat_/,"no token management in frontend");
const edge=fs.readFileSync(new URL("../edge-worker/index.mjs",import.meta.url),"utf8");
new vm.Script(edge.replace("export default {","const EDGE_HANDLER = {"),{filename:"edge-worker/index.mjs"});
assert.match(edge,/GITHUB_CLIENT_SECRET/);
assert.match(edge,/GITHUB_CLIENT_ID/);
assert.match(edge,/"User-Agent":"Forge-Leomgl-Hub"/);
assert.match(edge,/phase==="profile"/);
assert.match(edge,/phase==="session"/);
assert.match(src,/profile:"GitHub a validé/);
assert.match(src,/session:"GitHub a validé/);
assert.match(edge,/HttpOnly; Secure; SameSite=Lax/);
assert.match(edge,/async function authStart/);
assert.match(edge,/async function authCallback/);
assert.match(edge,/checkMutation/);
assert.match(edge,/issue\.updated_at|item\.updated_at/);
const sw=fs.readFileSync(new URL("../sw.js",import.meta.url),"utf8");
assert.match(sw,/u\.pathname\.startsWith\("\/auth\/"\)/);
assert.match(sw,/u\.pathname\.startsWith\("\/api\/"\)/);
const manifest=JSON.parse(fs.readFileSync(new URL("../manifest.webmanifest",import.meta.url),"utf8"));
assert.equal(manifest.display,"standalone");
console.log("FORGE smoke: syntax, workflow, body preservation, token-free OAuth UI, edge gateway, SW exclusions OK");

// V0.5: project registry, priorities and board markers.
assert.ok(api.apps.some(x=>x.id==="SANTE"&&x.repo==="Leomgl/sante-app"));
assert.ok(api.apps.some(x=>x.id==="GARAGE"&&x.repo==="Leomgl/garage-app"));
assert.equal(api.priorityOf({title:"[SANTE][BUG] Traitement",body:'<!-- FORGE_META: {"project":"SANTE","priority":"critique"} -->'}),"critique");
assert.equal(api.priorityOf({title:"[GARAGE][EVOLUTION] Kit",body:""}),"normale");
assert.equal(api.PRIORITIES.critique.rank,0);
assert.match(html,/id="priorityFilter"/);
assert.match(html,/id="advancedOptions"/);
assert.match(html,/id="projectFilter"/);
assert.match(src,/function populateProjects\(/);
assert.match(src,/class="issue-column col-/);
assert.match(edge,/NEXUS\|GAMING\|RITUEL\|VESTIAIRE\|SANTE\|GARAGE\|FORGE/);
console.log("FORGE V0.5: catalog, priorities, board and compact form OK");


// FORGE V0.6 — syntax, accessible detail, safe Markdown and comment API.
const detail=fs.readFileSync(new URL("../ticket-detail.js",import.meta.url),"utf8");
new vm.Script(detail,{filename:"ticket-detail.js"});
assert.match(detail,/\/issues\//);
assert.match(detail,/comments\?per_page=100&page=/);
assert.match(detail,/\/api\/comments/);
assert.doesNotMatch(detail,/innerHTML|outerHTML|insertAdjacentHTML/,"untrusted Markdown must use DOM text nodes");
assert.match(html,/id="ticketDialog"/);
assert.match(html,/id="ticketReplyForm"/);
assert.match(html,/src="\.\/ticket-detail\.js"/);
assert.match(src,/href="#ticket\//);
assert.match(edge,/p==="\/api\/comments"/);
assert.match(edge,/kind==="comment"/);
assert.match(edge,/checkMutation\(req\)/);
assert.match(edge,/target\.pull_request/);
assert.match(edge,/ticket-detail\\\.js/);
assert.match(sw,/ticket-detail\.js/);
assert.match(sw,/forge-v0\.6\.0/);

// Exercise the Markdown sanitizer without a browser: strings become text nodes.
function fakeNode(tag){
 const node={tag,children:[],_text:"",appendChild(child){this.children.push(child);return child;},replaceChildren(){this.children=[];this._text="";}};
 Object.defineProperty(node,"textContent",{get(){return this._text+this.children.map(x=>x.textContent).join("");},set(v){this._text=String(v);this.children=[];}});
 return node;
}
const mock={createElement:tag=>fakeNode(tag),createTextNode:s=>{const n=fakeNode("#text");n.textContent=s;return n;}};
const startDetail=detail.indexOf("function safeUrl("),endDetail=detail.indexOf("function date(");
assert.ok(startDetail>=0&&endDetail>startDetail);
const markdownContext=vm.createContext({URL,document:mock});
new vm.Script(detail.slice(startDetail,endDetail)+"\nglobalThis.MD_TEST={safeUrl,markdown};").runInContext(markdownContext);
const mdTest=markdownContext.MD_TEST;
assert.equal(mdTest.safeUrl("javascript:alert(1)"),null);
assert.equal(mdTest.safeUrl("data:text/html,<script>"),null);
assert.match(mdTest.safeUrl("https://github.com/Leomgl/forge-app"),/^https:\/\//);
const node=fakeNode("root");
mdTest.markdown(node,'<!-- FORGE_META: {"project":"FORGE"} -->\n## Livraison\n- [x] **Validé**\n<script>alert(1)</script>\n[malveillant](javascript:alert(1))');
assert.ok(node.children.some(x=>x.tag==="h3"));
assert.match(node.textContent,/Livraison/);
assert.match(node.textContent,/Validé/);
assert.doesNotMatch(node.textContent,/FORGE_META/);
assert.ok(!node.children.some(x=>x.tag==="script"),"HTML must remain literal text");
console.log("FORGE V0.6: detail view, safe Markdown and comments API OK");


// FORGE V0.7 — GENERAL is a ticket scope, not a fake application.
const globalTicket={
 tProject:"GENERAL",tType:"evolution",tPriority:"haute",tScope:"all",
 tScopeDetails:"Refonte de tous les logos",tVersion:"",tTitle:"Logos",
 tDescription:"Créer une identité cohérente sur toutes les PWA",
 tSteps:"",tExpected:"Logos harmonisés",tConstraints:"Préserver les reconnaissances visuelles"
};
const generalBody=api.issueBody(globalTicket);
assert.match(generalBody,/"project":"GENERAL"/);
assert.match(generalBody,/"scope":"all"/);
assert.match(generalBody,/Portée : Toutes les apps/);
assert.match(generalBody,/Refonte de tous les logos/);
assert.doesNotMatch(generalBody,/https:\/\/github\.com\/undefined/);
assert.match(generalBody,/Dépôts à identifier lors du diagnostic/);
const newAppBody=api.issueBody({...globalTicket,tScope:"newapp",tScopeDetails:"Nouvelle idée"});
assert.match(newAppBody,/"scope":"newapp"/);
assert.match(newAppBody,/Nouvelle app/);
assert.doesNotMatch(newAppBody,/Dépôt à analyser :/);
const legacyBody=api.issueBody({...globalTicket,tProject:"NEXUS"});
assert.match(legacyBody,/github.com\/Leomgl\/nexus-app/);
assert.doesNotMatch(legacyBody,/"scope":/);
assert.ok(!api.apps.some(a=>a.id==="GENERAL"),"GENERAL must not appear in the application catalog");
assert.match(src,/id\("tProject"\)\.addEventListener\("change",toggleGeneral\)/);
assert.match(src,/value="GENERAL"/);
assert.match(html,/id="generalScopeFields"/);
assert.match(html,/id="tScope"/);
assert.match(html,/id="tScopeDetails"/);
assert.match(edge,/FORGE\|GENERAL/);
assert.match(sw,/forge-v0\.7\.0/);
console.log("FORGE V0.7: general ticket creation, scope, filters, and existing apps OK");
