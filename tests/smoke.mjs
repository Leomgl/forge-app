// FORGE — smoke tests unitaires sans dépendances npm.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
const src=fs.readFileSync(new URL("../app.js",import.meta.url),"utf8");
new vm.Script(src,{filename:"app.js"});
const needle='if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();';
assert.ok(src.includes(needle),"entrypoint UI changed: adapt test extraction");
const isolated=src.replace(needle,'globalThis.FORGE_TEST = {parseMeta,issueBody,clean,workflow,updateWorkflowBody};');
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
const manifest=JSON.parse(fs.readFileSync(new URL("../manifest.webmanifest",import.meta.url),"utf8"));
assert.equal(manifest.display,"standalone");
console.log("FORGE smoke: syntax, workflow, body preservation, Markdown, CSP, manifest OK");
