// Compile the exact sources (including shared BLOCKS) into a self-contained Worker.
import fs from "node:fs/promises";
const root=new URL("../",import.meta.url);
const resources=[
 ["/","index.html","text/html; charset=utf-8"],
 ["/app.mjs","app.mjs","text/javascript; charset=utf-8"],
 ["/styles.css","styles.css","text/css; charset=utf-8"],
 ["/sw.js","sw.js","text/javascript; charset=utf-8"],
 ["/manifest.webmanifest","manifest.webmanifest","application/manifest+json"],
 ["/icon.svg","icon.svg","image/svg+xml"],
 ["/blocks/theme.mjs","blocks/theme.mjs","text/javascript; charset=utf-8"],
 ["/blocks/shell.mjs","blocks/shell.mjs","text/javascript; charset=utf-8"],
 ["/blocks/settings.mjs","blocks/settings.mjs","text/javascript; charset=utf-8"]
];
const assets={};
for(const [route,file,contentType] of resources){assets[route]={body:await fs.readFile(new URL(file,root),"utf8"),contentType};}
const template=await fs.readFile(new URL("worker.template.mjs",root),"utf8");
if(!template.includes("__ASSETS__"))throw Error("Template placeholder missing");
const built=template.replace("__ASSETS__",JSON.stringify(assets));
await fs.mkdir(new URL("dist/",root),{recursive:true});
await fs.writeFile(new URL("dist/worker.mjs",root),built,"utf8");
console.log("LABORATOIRE_BUILD_OK",Object.keys(assets).length,"assets",built.length,"bytes");
