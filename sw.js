function Origin(t){const o=t.protocol,n=t.host;if(!o||!n)throw new Error("class WhiteListedCacheDomains cannot be constructed with protocol: "+o+" , host: "+n);this.protocol=o,this.host=n,this.matchOriginOf=function(t){return t.startsWith(this.protocol+"//"+this.host)}}function isCacheable(t){return whitelistedCacheOrigins.some(function(o){return o.matchOriginOf(t)})}importScripts("/pwa/polyfills/serviceworker-cache.js");const VERSION="0.0.6",CACHE_NAME="CACHE_CATS_"+VERSION,CACHE_ROUTES=["/","/talks/","/articles/"];console.log("Cache at",CACHE_NAME);const whitelistedCacheOrigins=[new Origin({protocol:"https:",host:"fonts.googleapis.com"}),new Origin({protocol:"https:",host:"fonts.gstatic.com"}),new Origin({protocol:self.location.protocol,host:self.location.host})];self.addEventListener("install",function(t){t.waitUntil(caches.open(CACHE_NAME).then(function(t){return t.addAll(CACHE_ROUTES)}))}),self.addEventListener("fetch",function(t){t.respondWith(caches.open(CACHE_NAME).then(function(o){return o.match(t.request).then(function(n){return n||fetch(t.request).then(function(n){if(!n||n.status>=300)return n;if(isCacheable(t.request.url)){const e=n.clone();return o.put(t.request,e),n}return n})})}))});