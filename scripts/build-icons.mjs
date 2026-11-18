// Deterministic FORGE distribution of BLOCKS icons; no fork of the canonical module.
import fs from "node:fs";import path from "node:path";import crypto from "node:crypto";import {execFileSync} from "node:child_process";
const lock=JSON.parse(fs.readFileSync(new URL("../blocks.lock.json",import.meta.url)));
const blocks=path.resolve(process.env.BLOCKS_APP_DIR||new URL("../../blocks-app",import.meta.url).pathname);
const sha=execFileSync("git",["-C",blocks,"rev-parse","HEAD"],{encoding:"utf8"}).trim();
if(sha!==lock.commit)throw Error("BLOCKS_COMMIT_MISMATCH");
const body=fs.readFileSync(path.join(blocks,"src/icons.mjs"),"utf8");
if(crypto.createHash("sha256").update(body).digest("hex")!==lock.integrity["./blocks/icons.mjs"])throw Error("ICONS_HASH_MISMATCH");
fs.mkdirSync(new URL("../blocks/",import.meta.url),{recursive:true});
fs.writeFileSync(new URL("../blocks/icons.mjs",import.meta.url),"// Generated distribution from Leomgl/blocks-app icons@1.0.0 — do not edit here.\\n".replace("\\\\n","\\n")+body);
console.log("FORGE_ICONS_PIN_OK");
