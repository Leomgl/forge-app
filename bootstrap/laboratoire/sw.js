// LABORATOIRE v0.1.0 — isolated offline shell; no push handler and no API interception.
const CACHE="laboratoire-v0.1.0";
const FILES=["/","/index.html","/app.mjs","/styles.css","/manifest.webmanifest","/icon.svg","/blocks/theme.mjs","/blocks/shell.mjs","/blocks/settings.mjs"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));self.skipWaiting();});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("laboratoire-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",event=>{
 const req=event.request;if(req.method!=="GET")return;
 const url=new URL(req.url);if(url.origin!==self.location.origin||!FILES.includes(url.pathname))return;
 event.respondWith(fetch(req).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(req,copy)));}return response;})
  .catch(()=>caches.match(req).then(hit=>hit||caches.match("/"))));
});
