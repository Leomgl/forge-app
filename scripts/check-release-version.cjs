'use strict';
/** Verify PWA release identity and future code-change version increments. */
const fs=require('node:fs'),{execFileSync}=require('node:child_process');
const read=f=>fs.readFileSync(f,'utf8');
const html=read('index.html'),app=read('app.js'),sw=read('sw.js'),detail=read('ticket-detail.js'),doc=read('README.md');
const match=sw.match(/const CACHE="forge-v(\d+\.\d+\.\d+)-/);
if(!match)throw Error('FORGE_VERSION_CACHE_MISSING');
const version=match[1];
if(!html.includes('FORGE <strong>v'+version+'</strong>')||
 !html.includes('<span>V'+version+'</span>')||
 !app.startsWith('/* FORGE v'+version)||
 !detail.startsWith('/* FORGE v'+version)||
 !doc.includes('## V'+version+' —'))
 throw Error('FORGE_RELEASE_VERSION_DRIFT '+version);
if(!html.includes('id="forge-check-update"')||!html.includes('id="settings" hidden')||
 !app.includes('navigator.serviceWorker.getRegistration()'))throw Error('FORGE_SETTINGS_MISSING');
if(process.env.GITHUB_ACTIONS){
 const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
 const base=process.env.GITHUB_EVENT_NAME==='pull_request'?
  git('merge-base','origin/'+process.env.GITHUB_BASE_REF,'HEAD'):git('rev-parse','HEAD^');
 const changed=git('diff','--name-only',base,'HEAD').split('\n').filter(Boolean);
 const deployable=p=>!p.startsWith('tests/')&&!p.startsWith('scripts/')&&!p.startsWith('.github/')&&p!=='README.md'&&/\.(js|mjs|css|html|webmanifest|svg|png)$/.test(p);
 if(changed.some(deployable)){
  const prior=git('show',base+':sw.js').match(/forge-v(\d+\.\d+\.\d+)/)?.[1];
  if(!prior)throw Error('FORGE_PREVIOUS_VERSION_UNKNOWN');
  const next=version.split('.').map(Number),old=prior.split('.').map(Number);
  const bump=next[0]>old[0]||next[0]===old[0]&&(next[1]>old[1]||next[1]===old[1]&&next[2]>old[2]);
  if(!bump)throw Error('FORGE_NEW_DEPLOYABLE_WITHOUT_BUMP '+prior+' -> '+version);
 }
}
console.log('FORGE_VERSION_OK',version);
