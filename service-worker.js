'use strict';
// Cambiare VERSION a ogni pubblicazione; percorsi relativi per GitHub Pages.
const VERSION='1.0.11';
const PREFIX='trigonometria-'+self.registration.scope;
const CACHE=PREFIX+VERSION;
const ROOT=new URL('./',self.location.href).href;
const ASSETS=['./','./index.html','./css/style.css','./js/math.js','./js/app.js','./manifest.webmanifest','./icons/favicon.svg','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png'].map(path=>new URL(path,ROOT).href);
self.addEventListener('install',event=>{
  const freshAssets=ASSETS.map(url=>new Request(url,{cache:'reload'}));
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(freshAssets)));
});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const name of await caches.keys()){if(name.startsWith(PREFIX)&&name!==CACHE)await caches.delete(name);}await self.clients.claim();})());});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);if(url.origin!==self.location.origin||!url.href.startsWith(ROOT))return;
  event.respondWith((async()=>{const cache=await caches.open(CACHE);
    // Una versione coerente rimane in cache fino al prossimo aggiornamento.
    const cached=await cache.match(event.request,{ignoreSearch:true});if(cached)return cached;
    try{return await fetch(event.request);}catch(error){if(event.request.mode==='navigate')return await cache.match(new URL('./index.html',ROOT).href);throw error;}
  })());
});
