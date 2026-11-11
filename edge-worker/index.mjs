/* FORGE edge gateway v0.4 — GitHub App OAuth / dedicated origin.
   Configure secrets: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET. Cookie key derived with HKDF.
   No GitHub personal access token and no token exposed to browser code. */
const REPO = "Leomgl/forge-app";
const USER_ID = 242448324;
const ROOT = "https://raw.githubusercontent.com/Leomgl/forge-app/main/";
const API = "https://api.github.com/repos/" + REPO + "/issues";
const ACCEPT = {Accept:"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"};
const COOKIE = "forge_session";
const STATES = {todo:true,doing:true,done:true};
const decoder = new TextDecoder(), encoder = new TextEncoder();
function json(data,status=200,headers={}) { return new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store",...headers}}); }
function redirect(to,headers={}) {return new Response(null,{status:302,headers:{"Location":to,"cache-control":"no-store",...headers}});}
function fail(error,status=400){return json({error},status);}
function cookies(req) { return Object.fromEntries((req.headers.get("cookie")||"").split(";").map(x=>x.trim()).filter(Boolean).map(x=>{let i=x.indexOf("=");return [x.slice(0,i),x.slice(i+1)];})); }
function b64(bytes){let str="";for(const v of bytes)str+=String.fromCharCode(v);return btoa(str).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");}
function from64(s){const v=atob(s.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-s.length%4)%4));return Uint8Array.from(v,c=>c.charCodeAt(0));}
function random(){return b64(crypto.getRandomValues(new Uint8Array(32)));}
function ownUrl(req){return new URL(req.url).origin;}
function setCookie(name,value,maxAge,path="/"){
 return name+"="+value+"; Path="+path+"; Max-Age="+maxAge+"; HttpOnly; Secure; SameSite=Lax";
}
function clearCookie(name,path="/"){return setCookie(name,"",0,path);}
function ready(env){return !!(env.GITHUB_CLIENT_ID&&env.GITHUB_CLIENT_SECRET);}
async function cryptoKey(env){
 const material=await crypto.subtle.importKey("raw",encoder.encode(env.GITHUB_CLIENT_SECRET),"HKDF",false,["deriveKey"]);
 return crypto.subtle.deriveKey({name:"HKDF",hash:"SHA-256",salt:encoder.encode("FORGE-APP-SESSION-2026"),info:encoder.encode("cookie-encryption-v1")},
 material,{name:"AES-GCM",length:256},false,["encrypt","decrypt"]);
}
async function seal(obj,env){
 const iv=crypto.getRandomValues(new Uint8Array(12));
 const encrypted=await crypto.subtle.encrypt({name:"AES-GCM",iv},await cryptoKey(env),encoder.encode(JSON.stringify(obj)));
 return b64(iv)+"."+b64(new Uint8Array(encrypted));
}
async function unseal(value,env){
 try {const [a,b]=String(value||"").split(".");
 const bytes=await crypto.subtle.decrypt({name:"AES-GCM",iv:from64(a)},await cryptoKey(env),from64(b));
 return JSON.parse(decoder.decode(bytes));}catch{return null;}
}
function sessionCookie(token){return setCookie(COOKIE,token,2592000);}
function checkMutation(req){
 const url=new URL(req.url);
 return req.headers.get("Origin")===url.origin &&
 req.headers.get("X-Forge-Action")==="1" &&
 /^application\/json(?:;|$)/i.test(req.headers.get("content-type")||"");
}
function github(path,token,options={}){
 return fetch("https://api.github.com"+path,{...options,headers:{...ACCEPT,"Authorization":"Bearer "+token,...(options.headers||{})},cache:"no-store"});
}
async function tokenExchange(env,body){
 const r=await fetch("https://github.com/login/oauth/access_token",{
 method:"POST",headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlencoded"},
 body:new URLSearchParams({client_id:env.GITHUB_CLIENT_ID,client_secret:env.GITHUB_CLIENT_SECRET,...body})});
 const data=await r.json();
 if(!r.ok||data.error||!data.access_token)throw Error("Authentification GitHub refusée");
 return data;
}
async function authStart(req,env){
 if(!ready(env))return redirect("/?auth=setup");
 const state=random(),verifier=random();
 const challenge=b64(new Uint8Array(await crypto.subtle.digest("SHA-256",encoder.encode(verifier))));
 const redirectUri=ownUrl(req)+"/auth/callback";
 const u=new URL("https://github.com/login/oauth/authorize");
 u.searchParams.set("client_id",env.GITHUB_CLIENT_ID);
 u.searchParams.set("redirect_uri",redirectUri);
 u.searchParams.set("state",state);
 u.searchParams.set("scope","offline_access");
 u.searchParams.set("code_challenge",challenge);
 u.searchParams.set("code_challenge_method","S256");
 return redirect(u.toString(),{"Set-Cookie":setCookie("forge_oauth",state+"."+verifier,600,"/auth")});
}
async function authCallback(req,env){
 const params=new URL(req.url).searchParams;
 const cookie=cookies(req).forge_oauth||"";
 const sep=cookie.indexOf(".");
 const state=sep>=0?cookie.slice(0,sep):"",verifier=sep>=0?cookie.slice(sep+1):"";
 if(!state||!verifier||params.get("state")!==state||!params.get("code")){
 return redirect("/?auth=error",{"Set-Cookie":clearCookie("forge_oauth","/auth")});
 }
 try{
 const token=await tokenExchange(env,{code:params.get("code"),redirect_uri:ownUrl(req)+"/auth/callback",code_verifier:verifier});
 const profileRes=await github("/user",token.access_token);
 if(!profileRes.ok)throw Error("Cannot verify GitHub identity");
 const profile=await profileRes.json();
 if(profile.id!==USER_ID||String(profile.login).toLowerCase()!=="leomgl")throw Error("Wrong GitHub account");
 // A GitHub App user token can only reach explicitly installed repositories.
 const session={access:token.access_token,refresh:token.refresh_token||"",
 accessUntil:Date.now()+Math.max(0,(token.expires_in||28800)-60)*1000,
 refreshUntil:Date.now()+Math.max(0,(token.refresh_token_expires_in||0)-60)*1000,
 login:profile.login,id:profile.id};
 return redirect("/?auth=ok",{"Set-Cookie":sessionCookie(await seal(session,env))});
 }catch{
 return redirect("/?auth=error",{"Set-Cookie":clearCookie("forge_oauth","/auth")});
 }
}
async function withSession(req,env){
 let value=cookies(req)[COOKIE];
 if(!value||!ready(env))return {session:null};
 let s=await unseal(value,env);
 if(!s||s.id!==USER_ID||s.login?.toLowerCase()!=="leomgl")return {session:null};
 if(Date.now()+300000>=s.accessUntil){
 if(!s.refresh||Date.now()>=s.refreshUntil)return {session:null};
 try{
 const refreshed=await tokenExchange(env,{grant_type:"refresh_token",refresh_token:s.refresh});
 s={...s,access:refreshed.access_token,refresh:refreshed.refresh_token||"",
 accessUntil:Date.now()+Math.max(0,(refreshed.expires_in||28800)-60)*1000,
 refreshUntil:Date.now()+Math.max(0,(refreshed.refresh_token_expires_in||0)-60)*1000};
 return {session:s,cookie:sessionCookie(await seal(s,env))};
 }catch{return {session:null};}
 }
 return {session:s};
}
function statusIssue(item){if(item.state==="closed")return "done";return meta(item).workflow==="doing"?"doing":"todo";}
function meta(item){
 const found=String(item.body||"").match(/<!-- FORGE_META:\s*(\{[^\n]+\})\s*-->/);
 if(found){try{return JSON.parse(found[1]);}catch{}}
 const project=String(item.title||"").match(/^\[([A-Z]+)\]/);
 return {project:project?project[1]:"AUTRE",type:"ticket",priority:"normale"};
}
function modifyBody(item,target){
 const original=String(item.body||""),data=meta(item);data.workflow=target;data.format=Math.max(3,+data.format||0);
 const newMeta="<!-- FORGE_META: "+JSON.stringify(data)+" -->";
 return /<!-- FORGE_META:\s*\{[^\n]+\}\s*-->/.test(original)
 ?original.replace(/<!-- FORGE_META:\s*\{[^\n]+\}\s*-->/,newMeta)
 :newMeta+"\n\n"+original;
}
async function action(req,env,kind){
 if(!checkMutation(req))return fail("Requête non autorisée",403);
 const {session,cookie}=await withSession(req,env);
 if(!session)return fail("Connexion GitHub nécessaire",401);
 let data;try{if(+(req.headers.get("content-length")||0)>40000)return fail("Ticket trop long",413);data=await req.json();}catch{return fail("JSON invalide");}
 let endpoint="",options={method:"POST",headers:{"content-type":"application/json"}},state;
 if(kind==="status"){
 const number=Number(data.number),target=data.target;
 if(!Number.isSafeInteger(number)||number<1||!STATES[target]||typeof data.updated_at!=="string")return fail("Changement d'état invalide");
 const recent=await github("/repos/"+REPO+"/issues/"+number,session.access);
 if(!recent.ok)return fail("Ticket introuvable ou autorisation GitHub manquante",recent.status===404?404:502);
 const item=await recent.json();
 if(item.updated_at!==data.updated_at)return fail("Ce ticket a changé entre-temps. Actualise la liste.",409);
 if(statusIssue(item)===target)return json({issue:item,changed:false},200,cookie?{"Set-Cookie":cookie}:{});
 const next=target==="done"?"closed":"open";
 endpoint="/repos/"+REPO+"/issues/"+number;options.method="PATCH";
 options.body=JSON.stringify({body:modifyBody(item,target),state:next,...(next!==item.state?{state_reason:next==="closed"?"completed":"reopened"}:{})});
 state=target;
 }else if(kind==="create"){
 const title=String(data.title||"").trim(),body=String(data.body||"").trim();
 if(title.length<4||title.length>200||body.length<20||body.length>25000||!/(NEXUS|GAMING|RITUEL|VESTIAIRE)/.test(title.slice(0,16))||!body.includes("FORGE_META"))return fail("Titre ou description invalide");
 endpoint="/repos/"+REPO+"/issues";options.body=JSON.stringify({title,body});
 }else return fail("Action inconnue",404);
 const result=await github(endpoint,session.access,options);
 if(!result.ok){
 const err=result.status===403?"L'app GitHub doit être installée sur forge-app avec l'accès Issues: Read and write.":result.status===401?"Connexion expirée, reconnecte-toi.":"GitHub a refusé la modification ("+result.status+").";
 return fail(err,result.status===401?401:result.status===403?403:502);
 }
 const issue=await result.json();
 if(state&&statusIssue(issue)!==state)return fail("GitHub n'a pas confirmé le nouvel état",502);
 return json({issue,changed:true},200,cookie?{"Set-Cookie":cookie}:{});
}
async function staticFile(req){
 const url=new URL(req.url);let path=url.pathname==="/"?"index.html":decodeURIComponent(url.pathname.slice(1));
 // No arbitrary paths, dotfiles or private files. HTML/JS/CSS belong to repo main.
 if(!/^(?:index\.html|app\.js|styles\.css|sw\.js|manifest\.webmanifest|icon\.svg|icon-180\.png|docs\/[A-Za-z0-9_-]+\.md)$/.test(path))return fail("Introuvable",404);
 const upstream=await fetch(ROOT+path,{cf:{cacheTtl:30,cacheEverything:true}});
 if(!upstream.ok)return fail("Source FORGE indisponible",502);
 const types={html:"text/html; charset=utf-8",js:"text/javascript; charset=utf-8",css:"text/css; charset=utf-8",svg:"image/svg+xml",png:"image/png",webmanifest:"application/manifest+json",md:"text/plain; charset=utf-8"};
 const ext=path.split(".").pop();
 return new Response(upstream.body,{status:200,headers:{"Content-Type":types[ext]||"application/octet-stream","Cache-Control":path==="sw.js"||path==="index.html"?"no-store":"public, max-age=30","X-Content-Type-Options":"nosniff","Referrer-Policy":"strict-origin-when-cross-origin","Permissions-Policy":"camera=(), microphone=(), geolocation=()","Strict-Transport-Security":"max-age=31536000; includeSubDomains"}});
}
export default {
 async fetch(req,env){
 try{
 const url=new URL(req.url),p=url.pathname;
 if(req.method==="GET"&&p==="/auth/login")return authStart(req,env);
 if(req.method==="GET"&&p==="/auth/callback")return authCallback(req,env);
 if(req.method==="GET"&&p==="/auth/status"){
  const {session,cookie}=await withSession(req,env);
  return json({configured:ready(env),authenticated:!!session,login:session?.login||null},200,cookie?{"Set-Cookie":cookie}:{});
 }
 if(req.method==="POST"&&p==="/auth/logout"){
  if(!checkMutation(req))return fail("Requête non autorisée",403);
  return json({ok:true},200,{"Set-Cookie":clearCookie(COOKIE)});
 }
 if(req.method==="POST"&&p==="/api/workflow")return action(req,env,"status");
 if(req.method==="POST"&&p==="/api/issues")return action(req,env,"create");
 if(req.method==="GET"&&p.startsWith("/auth/"))return fail("Introuvable",404);
 if(req.method==="GET")return staticFile(req);
 return fail("Méthode non autorisée",405);
 }catch{return fail("Erreur du service FORGE",500);}
 }
};
