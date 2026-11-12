import test from "node:test";
import assert from "node:assert/strict";
import worker from "./worker.mjs";
const BASE="https://link-app.q9pfwtztsc.workers.dev";
const request=(path,method="GET")=>worker.fetch(new Request(BASE+path,{method}));
test("PWA assets",async()=>{
 const home=await request("/");assert.equal(home.status,200);
 const html=await home.text();assert.match(html,/apple-mobile-web-app-capable/);
 assert.match(html,/manifest\.webmanifest/);assert.match(html,/bottom-nav/);
 assert.match(home.headers.get("content-security-policy"),/script-src 'self'/);
 for(const route of ["/manifest.webmanifest","/sw.js","/icon-180.png","/app.js","/app.css"])assert.equal((await request(route)).status,200);
});
test("registry is a snapshot, not live link status",async()=>{
 const res=await request("/api/v1/catalog"),cat=await res.json();
 assert.equal(cat.apps.length,6);assert.equal(cat.links.length,7);
 assert.equal(cat.schema,"link.registry.v1");assert.equal(res.headers.get("cache-control"),"no-store");
});
test("only LINK service is measured",async()=>{
 const data=await (await request("/api/v1/status")).json();
 assert.equal(data.service,"link-app");assert.equal(data.mode,"read-only");
 assert.equal(data.linksManaged,0);assert.equal(data.contractsInventoried,7);
});
test("writes are rejected",async()=>{
 for(const path of ["/api/v1/catalog","/api/v1/status","/api/v1/pair","/"]){
  const res=await request(path,"POST");assert.equal(res.status,405);
  assert.equal((await res.json()).error,"READ_ONLY");
 }
});
test("bundle excludes legacy secrets",async()=>{
 const js=await (await request("/app.js")).text();
 assert.doesNotMatch(js,/LINK_PEPPER|PRIVATE_KEY|writerVerifier/i);
 const html=await (await request("/")).text();
 assert.match(html,/Les cases de préparation sont uniquement des notes locales/);
});
