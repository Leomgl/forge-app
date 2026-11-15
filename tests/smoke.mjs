// FORGE V0.10.0 — tests du cockpit nouvelle génération ; aucune dépendance npm.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
const read=path=>fs.readFileSync(new URL("../"+path,import.meta.url),"utf8");
const app=read("app.js"),html=read("index.html"),edge=read("edge-worker/index.mjs");
const detail=read("ticket-detail.js"),sw=read("sw.js");
new vm.Script(app,{filename:"app.js"});
new vm.Script(edge.replace("export default {","const EDGE_HANDLER = {"),{filename:"edge-worker/index.mjs"});
new vm.Script(detail,{filename:"ticket-detail.js"});
const needle='if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();';
assert.ok(app.includes(needle),"L'entrypoint a changé ; adapter le banc");
const isolated=app.replace(needle,'globalThis.FORGE_TEST={parseMeta,clean,workflow,updateWorkflowBody,priorityOf,apps,issueBody,currentEra,NEW_ERA_FIRST_ISSUE,render,showView,routeView,issueMatches,setIssuesForTest:function(items){issues=items;}};');
const context=vm.createContext({});
new vm.Script(isolated,{filename:"app-unit.js"}).runInContext(context);
const test=context.FORGE_TEST;

assert.deepEqual(Array.from(test.apps,a=>a.id),["LINK","FORGE"]);
assert.equal(test.NEW_ERA_FIRST_ISSUE,40);
assert.ok(test.apps.some(a=>a.repo==="Leomgl/link-app"));
assert.ok(test.apps.some(a=>a.repo==="Leomgl/forge-app"));
const before={number:39,title:"[GENERAL][EVOLUTION] Archive",state:"closed",updated_at:"2026-11-15T01:00:00Z",body:'<!-- FORGE_META: {"project":"GENERAL","workflow":"done"} -->'};
const now={number:40,title:"[GENERAL][IDEE] Nouveau cycle",state:"open",updated_at:"2026-11-15T19:00:00Z",body:'<!-- FORGE_META: {"project":"GENERAL","workflow":"todo","priority":"normale"} -->'};
const working={number:41,title:"[LINK][EVOLUTION] Contrat",state:"open",updated_at:"2026-11-15T19:01:00Z",body:'<!-- FORGE_META: {"project":"LINK","workflow":"doing","priority":"haute"} -->'};
const done={number:42,title:"[FORGE][TEST] Recette",state:"closed",updated_at:"2026-11-15T19:02:00Z",body:'<!-- FORGE_META: {"project":"FORGE","workflow":"done"} -->'};
assert.equal(test.currentEra(before),false);
assert.equal(test.currentEra(now),true);
assert.equal(test.currentEra({number:43,title:"[DELETED][BUG] Test",body:'<!-- FORGE_META: {"project":"DELETED"} -->'}),false);
assert.equal(test.workflow(now),"todo");
assert.equal(test.workflow(working),"doing");
assert.equal(test.workflow(done),"done");
assert.equal(test.priorityOf(working),"haute");
assert.equal(test.currentEra({...now,number:38}),false);
assert.equal(test.currentEra({...working,number:44}),true);
assert.match(test.updateWorkflowBody(now,"doing"),/"workflow":"doing"/);
assert.equal((test.updateWorkflowBody(now,"doing").match(/FORGE_META:/g)||[]).length,1);
const body=test.issueBody({tProject:"GENERAL",tType:"idee",tPriority:"normale",tScope:"newapp",tScopeDetails:"Produit à cadrer",tVersion:"",tDescription:"Définir une future app",tSteps:"",tExpected:"Cahier des charges validé",tConstraints:"Préserver LINK"});
assert.match(body,/"project":"GENERAL"/);
assert.match(body,/"scope":"newapp"/);
assert.match(body,/Nouvelle app/);
assert.match(body,/Cahier des charges validé/);
assert.doesNotMatch(body,/github\.com\/undefined/);
const linkBody=test.issueBody({tProject:"LINK",tType:"test",tPriority:"haute",tScope:"all",tScopeDetails:"",tVersion:"0.12.0",tDescription:"Tester LINK",tSteps:"1. Test",tExpected:"Le hub fonctionne",tConstraints:"D1"});
assert.match(linkBody,/github\.com\/Leomgl\/link-app/);
assert.throws(()=>test.issueBody({tProject:"DELETED",tType:"bug"}),/Application inconnue/);

const keys=["search","projectFilter","statusFilter","priorityFilter","workflowSummary","issueCount","navActiveCount",
 "issues","completedSearch","completedProjectFilter","completedPriorityFilter","completedCount","completedIssues",
 "tickets","completed","composer","context","settings","homeIntro"];
const elements=Object.fromEntries(keys.map(k=>[k,{value:k==="search"||k==="completedSearch"?"":"all",
 innerHTML:"",textContent:"",hidden:["completed","composer","context","settings"].includes(k)}]));
const nav=["tickets","completed","composer","context","settings"].map(view=>({dataset:{view},
 classList:{toggle(){},contains(){return false}},setAttribute(){},removeAttribute(){}}));
context.document={getElementById:k=>elements[k],querySelectorAll:s=>s===".bottom-nav-item"?nav:[]};
context.window={scrollTo(){}};
context.location={hash:"#tickets"};
test.setIssuesForTest([before,now,working,done]);
test.render();
assert.equal(elements.issueCount.textContent,2,"anciennes issues non comptées");
assert.equal(elements.navActiveCount.textContent,2);
assert.match(elements.issues.innerHTML,/Nouveau cycle/);
assert.match(elements.issues.innerHTML,/Contrat/);
assert.doesNotMatch(elements.issues.innerHTML,/Archive/);
assert.equal(elements.completedCount.textContent,1);
assert.match(elements.completedIssues.innerHTML,/Recette/);
assert.doesNotMatch(elements.completedIssues.innerHTML,/Archive/);
test.showView("settings");
assert.equal(elements.settings.hidden,false);
test.showView("completed");
assert.equal(elements.completed.hidden,false);
assert.equal(elements.settings.hidden,true);

assert.match(html,/id="editMode"/);
assert.match(html,/id="ticketDialog"/);
assert.match(html,/id="completedIssues"/);
assert.match(html,/id="forge-settings-search"/);
assert.match(html,/id="forge-check-update"/);
assert.match(html,/FORGE <strong>v0\.10\.1<\/strong>/);
assert.doesNotMatch(html,/id="tokenField"/);
assert.match(app,/\/auth\/status/);
assert.match(app,/\/api\/workflow/);
assert.match(app,/\/api\/issues/);
assert.doesNotMatch(app,/sessionToken|github_pat_/);
assert.match(edge,/GITHUB_CLIENT_SECRET/);
assert.match(edge,/GITHUB_CLIENT_ID/);
assert.match(edge,/HttpOnly; Secure; SameSite=Lax/);
assert.match(edge,/async function authStart/);
assert.match(edge,/async function authCallback/);
assert.match(edge,/p==="\/api\/comments"/);
assert.match(edge,/checkMutation/);
assert.match(edge,/LINK\|FORGE\|GENERAL/);
assert.doesNotMatch(edge,/\\[(?:OBSOLETE|DELETED)\\]/);
assert.match(detail,/\/api\/comments/);
assert.match(detail,/\/issues\//);
assert.doesNotMatch(detail,/innerHTML|outerHTML|insertAdjacentHTML/);
assert.match(sw,/forge-v0\.10\.1/);
assert.match(sw,/u\.pathname\.startsWith\("\/auth\/"\)/);
assert.match(sw,/u\.pathname\.startsWith\("\/api\/"\)/);
assert.equal(JSON.parse(read("manifest.webmanifest")).display,"standalone");
for(const path of ["README.md","AGENTS.md","docs/APP-MAP.md","docs/AI-START-HERE.md","docs/DEPENDENCIES.md","docs/DECISIONS.md","docs/TICKET-PROTOCOL.md"]){
 const source=read(path);
 assert.doesNotMatch(source,/github\.com\/Leomgl\/(?:nexus-app|gaming-app|rituel-app|Vestiaire-app|sante-app|garage-app)/i,path);
}
console.log("FORGE V0.10.0: catalogue LINK/FORGE, séparation des générations, tickets, OAuth, commentaires et PWA — OK");
