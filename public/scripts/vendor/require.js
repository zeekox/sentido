var requirejs,require,define;(function(global){function isFunction(t){return"[object Function]"===ostring.call(t)}function isArray(t){return"[object Array]"===ostring.call(t)}function each(t,e){if(t){var n;for(n=0;t.length>n&&(!t[n]||!e(t[n],n,t));n+=1);}}function eachReverse(t,e){if(t){var n;for(n=t.length-1;n>-1&&(!t[n]||!e(t[n],n,t));n-=1);}}function hasProp(t,e){return hasOwn.call(t,e)}function getOwn(t,e){return hasProp(t,e)&&t[e]}function eachProp(t,e){var n;for(n in t)if(hasProp(t,n)&&e(t[n],n))break}function mixin(t,e,n,i){return e&&eachProp(e,function(e,r){(n||!hasProp(t,r))&&(i&&"string"!=typeof e?(t[r]||(t[r]={}),mixin(t[r],e,n,i)):t[r]=e)}),t}function bind(t,e){return function(){return e.apply(t,arguments)}}function scripts(){return document.getElementsByTagName("script")}function getGlobal(t){if(!t)return t;var e=global;return each(t.split("."),function(t){e=e[t]}),e}function makeError(t,e,n,i){var r=Error(e+"\nhttp://requirejs.org/docs/errors.html#"+t);return r.requireType=t,r.requireModules=i,n&&(r.originalError=n),r}function newContext(t){function e(t){var e,n;for(e=0;t[e];e+=1)if(n=t[e],"."===n)t.splice(e,1),e-=1;else if(".."===n){if(1===e&&(".."===t[2]||".."===t[0]))break;e>0&&(t.splice(e-1,2),e-=2)}}function n(t,n,i){var r,o,s,a,u,l,c,h,f,p,d,m=n&&n.split("/"),g=m,v=$.map,y=v&&v["*"];if(t&&"."===t.charAt(0)&&(n?(g=getOwn($.pkgs,n)?m=[n]:m.slice(0,m.length-1),t=g.concat(t.split("/")),e(t),o=getOwn($.pkgs,r=t[0]),t=t.join("/"),o&&t===r+"/"+o.main&&(t=r)):0===t.indexOf("./")&&(t=t.substring(2))),i&&(m||y)&&v){for(a=t.split("/"),u=a.length;u>0;u-=1){if(c=a.slice(0,u).join("/"),m)for(l=m.length;l>0;l-=1)if(s=getOwn(v,m.slice(0,l).join("/")),s&&(s=getOwn(s,c))){h=s,f=u;break}if(h)break;!p&&y&&getOwn(y,c)&&(p=getOwn(y,c),d=u)}!h&&p&&(h=p,f=d),h&&(a.splice(0,f,h),t=a.join("/"))}return t}function i(t){isBrowser&&each(scripts(),function(e){return e.getAttribute("data-requiremodule")===t&&e.getAttribute("data-requirecontext")===b.contextName?(e.parentNode.removeChild(e),!0):void 0})}function r(t){var e=getOwn($.paths,t);return e&&isArray(e)&&e.length>1?(i(t),e.shift(),b.require.undef(t),b.require([t]),!0):void 0}function o(t){var e,n=t?t.indexOf("!"):-1;return n>-1&&(e=t.substring(0,n),t=t.substring(n+1,t.length)),[e,t]}function s(t,e,i,r){var s,a,u,l,c=null,h=e?e.name:null,f=t,p=!0,d="";return t||(p=!1,t="_@r"+(S+=1)),l=o(t),c=l[0],t=l[1],c&&(c=n(c,h,r),a=getOwn(E,c)),t&&(c?d=a&&a.normalize?a.normalize(t,function(t){return n(t,h,r)}):n(t,h,r):(d=n(t,h,r),l=o(d),c=l[0],d=l[1],i=!0,s=b.nameToUrl(d))),u=!c||a||i?"":"_unnormalized"+(M+=1),{prefix:c,name:d,parentMap:e,unnormalized:!!u,url:s,originalName:f,isDefine:p,id:(c?c+"!"+d:d)+u}}function a(t){var e=t.id,n=getOwn(T,e);return n||(n=T[e]=new b.Module(t)),n}function u(t,e,n){var i=t.id,r=getOwn(T,i);!hasProp(E,i)||r&&!r.defineEmitComplete?a(t).on(e,n):"defined"===e&&n(E[i])}function l(t,e){var n=t.requireModules,i=!1;e?e(t):(each(n,function(e){var n=getOwn(T,e);n&&(n.error=t,n.events.error&&(i=!0,n.emit("error",t)))}),i||req.onError(t))}function c(){globalDefQueue.length&&(apsp.apply(L,[L.length-1,0].concat(globalDefQueue)),globalDefQueue=[])}function h(t){delete T[t]}function f(t,e,n){var i=t.map.id;t.error?t.emit("error",t.error):(e[i]=!0,each(t.depMaps,function(i,r){var o=i.id,s=getOwn(T,o);!s||t.depMatched[r]||n[o]||(getOwn(e,o)?(t.defineDep(r,E[o]),t.check()):f(s,e,n))}),n[i]=!0)}function p(){var t,e,n,o,s=1e3*$.waitSeconds,a=s&&b.startTime+s<(new Date).getTime(),u=[],c=[],h=!1,d=!0;if(!y){if(y=!0,eachProp(T,function(n){if(t=n.map,e=t.id,n.enabled&&(t.isDefine||c.push(n),!n.error))if(!n.inited&&a)r(e)?(o=!0,h=!0):(u.push(e),i(e));else if(!n.inited&&n.fetched&&t.isDefine&&(h=!0,!t.prefix))return d=!1}),a&&u.length)return n=makeError("timeout","Load timeout for modules: "+u,null,u),n.contextName=b.contextName,l(n);d&&each(c,function(t){f(t,{},{})}),a&&!o||!h||!isBrowser&&!isWebWorker||w||(w=setTimeout(function(){w=0,p()},50)),y=!1}}function d(t){hasProp(E,t[0])||a(s(t[0],null,!0)).init(t[1],t[2])}function m(t,e,n,i){t.detachEvent&&!isOpera?i&&t.detachEvent(i,e):t.removeEventListener(n,e,!1)}function g(t){var e=t.currentTarget||t.srcElement;return m(e,b.onScriptLoad,"load","onreadystatechange"),m(e,b.onScriptError,"error"),{node:e,id:e&&e.getAttribute("data-requiremodule")}}function v(){var t;for(c();L.length;){if(t=L.shift(),null===t[0])return l(makeError("mismatch","Mismatched anonymous define() module: "+t[t.length-1]));d(t)}}var y,_,b,x,w,$={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},map:{},config:{}},T={},P={},L=[],E={},C={},S=1,M=1;return x={require:function(t){return t.require?t.require:t.require=b.makeRequire(t.map)},exports:function(t){return t.usingExports=!0,t.map.isDefine?t.exports?t.exports:t.exports=E[t.map.id]={}:void 0},module:function(t){return t.module?t.module:t.module={id:t.map.id,uri:t.map.url,config:function(){return $.config&&getOwn($.config,t.map.id)||{}},exports:E[t.map.id]}}},_=function(t){this.events=getOwn(P,t.id)||{},this.map=t,this.shim=getOwn($.shim,t.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},_.prototype={init:function(t,e,n,i){i=i||{},this.inited||(this.factory=e,n?this.on("error",n):this.events.error&&(n=bind(this,function(t){this.emit("error",t)})),this.depMaps=t&&t.slice(0),this.errback=n,this.inited=!0,this.ignore=i.ignore,i.enabled||this.enabled?this.enable():this.check())},defineDep:function(t,e){this.depMatched[t]||(this.depMatched[t]=!0,this.depCount-=1,this.depExports[t]=e)},fetch:function(){if(!this.fetched){this.fetched=!0,b.startTime=(new Date).getTime();var t=this.map;return this.shim?(b.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return t.prefix?this.callPlugin():this.load()})),void 0):t.prefix?this.callPlugin():this.load()}},load:function(){var t=this.map.url;C[t]||(C[t]=!0,b.load(this.map.id,t))},check:function(){if(this.enabled&&!this.enabling){var t,e,n=this.map.id,i=this.depExports,r=this.exports,o=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,1>this.depCount&&!this.defined){if(isFunction(o)){if(this.events.error)try{r=b.execCb(n,o,i,r)}catch(s){t=s}else r=b.execCb(n,o,i,r);if(this.map.isDefine&&(e=this.module,e&&void 0!==e.exports&&e.exports!==this.exports?r=e.exports:void 0===r&&this.usingExports&&(r=this.exports)),t)return t.requireMap=this.map,t.requireModules=[this.map.id],t.requireType="define",l(this.error=t)}else r=o;this.exports=r,this.map.isDefine&&!this.ignore&&(E[n]=r,req.onResourceLoad&&req.onResourceLoad(b,this.map,this.depMaps)),delete T[n],this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else this.fetch()}},callPlugin:function(){var t=this.map,e=t.id,i=s(t.prefix);this.depMaps.push(i),u(i,"defined",bind(this,function(i){var r,o,c,f=this.map.name,p=this.map.parentMap?this.map.parentMap.name:null,d=b.makeRequire(t.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(i.normalize&&(f=i.normalize(f,function(t){return n(t,p,!0)})||""),o=s(t.prefix+"!"+f,this.map.parentMap),u(o,"defined",bind(this,function(t){this.init([],function(){return t},null,{enabled:!0,ignore:!0})})),c=getOwn(T,o.id),c&&(this.depMaps.push(o),this.events.error&&c.on("error",bind(this,function(t){this.emit("error",t)})),c.enable()),void 0):(r=bind(this,function(t){this.init([],function(){return t},null,{enabled:!0})}),r.error=bind(this,function(t){this.inited=!0,this.error=t,t.requireModules=[e],eachProp(T,function(t){0===t.map.id.indexOf(e+"_unnormalized")&&h(t.map.id)}),l(t)}),r.fromText=bind(this,function(n,i){var o=t.name,u=s(o),c=useInteractive;i&&(n=i),c&&(useInteractive=!1),a(u),hasProp($.config,e)&&($.config[o]=$.config[e]);try{req.exec(n)}catch(h){return l(makeError("fromtexteval","fromText eval for "+e+" failed: "+h,h,[e]))}c&&(useInteractive=!0),this.depMaps.push(u),b.completeLoad(o),d([o],r)}),i.load(t.name,d,r,$),void 0)})),b.enable(i,this),this.pluginMaps[i.id]=i},enable:function(){this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(t,e){var n,i,r;if("string"==typeof t){if(t=s(t,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[e]=t,r=getOwn(x,t.id))return this.depExports[e]=r(this),void 0;this.depCount+=1,u(t,"defined",bind(this,function(t){this.defineDep(e,t),this.check()})),this.errback&&u(t,"error",this.errback)}n=t.id,i=T[n],hasProp(x,n)||!i||i.enabled||b.enable(t,this)})),eachProp(this.pluginMaps,bind(this,function(t){var e=getOwn(T,t.id);e&&!e.enabled&&b.enable(t,this)})),this.enabling=!1,this.check()},on:function(t,e){var n=this.events[t];n||(n=this.events[t]=[]),n.push(e)},emit:function(t,e){each(this.events[t],function(t){t(e)}),"error"===t&&delete this.events[t]}},b={config:$,contextName:t,registry:T,defined:E,urlFetched:C,defQueue:L,Module:_,makeModuleMap:s,nextTick:req.nextTick,configure:function(t){t.baseUrl&&"/"!==t.baseUrl.charAt(t.baseUrl.length-1)&&(t.baseUrl+="/");var e=$.pkgs,n=$.shim,i={paths:!0,config:!0,map:!0};eachProp(t,function(t,e){i[e]?"map"===e?mixin($[e],t,!0,!0):mixin($[e],t,!0):$[e]=t}),t.shim&&(eachProp(t.shim,function(t,e){isArray(t)&&(t={deps:t}),!t.exports&&!t.init||t.exportsFn||(t.exportsFn=b.makeShimExports(t)),n[e]=t}),$.shim=n),t.packages&&(each(t.packages,function(t){var n;t="string"==typeof t?{name:t}:t,n=t.location,e[t.name]={name:t.name,location:n||t.name,main:(t.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}}),$.pkgs=e),eachProp(T,function(t,e){t.inited||t.map.unnormalized||(t.map=s(e))}),(t.deps||t.callback)&&b.require(t.deps||[],t.callback)},makeShimExports:function(t){function e(){var e;return t.init&&(e=t.init.apply(global,arguments)),e||t.exports&&getGlobal(t.exports)}return e},makeRequire:function(e,i){function r(n,o,u){var c,h,f;return i.enableBuildCallback&&o&&isFunction(o)&&(o.__requireJsBuild=!0),"string"==typeof n?isFunction(o)?l(makeError("requireargs","Invalid require call"),u):e&&hasProp(x,n)?x[n](T[e.id]):req.get?req.get(b,n,e):(h=s(n,e,!1,!0),c=h.id,hasProp(E,c)?E[c]:l(makeError("notloaded",'Module name "'+c+'" has not been loaded yet for context: '+t+(e?"":". Use require([])")))):(v(),b.nextTick(function(){v(),f=a(s(null,e)),f.skipMap=i.skipMap,f.init(n,o,u,{enabled:!0}),p()}),r)}return i=i||{},mixin(r,{isBrowser:isBrowser,toUrl:function(t){var i,r,o=t.lastIndexOf("."),s=t.split("/")[0],a="."===s||".."===s;return-1!==o&&(!a||o>1)&&(i=t.substring(o,t.length),t=t.substring(0,o)),r=b.nameToUrl(n(t,e&&e.id,!0),i||".fake"),i?r:r.substring(0,r.length-5)},defined:function(t){return hasProp(E,s(t,e,!1,!0).id)},specified:function(t){return t=s(t,e,!1,!0).id,hasProp(E,t)||hasProp(T,t)}}),e||(r.undef=function(t){c();var n=s(t,e,!0),i=getOwn(T,t);delete E[t],delete C[n.url],delete P[t],i&&(i.events.defined&&(P[t]=i.events),h(t))}),r},enable:function(t){var e=getOwn(T,t.id);e&&a(t).enable()},completeLoad:function(t){var e,n,i,o=getOwn($.shim,t)||{},s=o.exports;for(c();L.length;){if(n=L.shift(),null===n[0]){if(n[0]=t,e)break;e=!0}else n[0]===t&&(e=!0);d(n)}if(i=getOwn(T,t),!e&&!hasProp(E,t)&&i&&!i.inited){if(!(!$.enforceDefine||s&&getGlobal(s)))return r(t)?void 0:l(makeError("nodefine","No define call for "+t,null,[t]));d([t,o.deps||[],o.exportsFn])}p()},nameToUrl:function(t,e){var n,i,r,o,s,a,u,l,c;if(req.jsExtRegExp.test(t))l=t+(e||"");else{for(n=$.paths,i=$.pkgs,s=t.split("/"),a=s.length;a>0;a-=1){if(u=s.slice(0,a).join("/"),r=getOwn(i,u),c=getOwn(n,u)){isArray(c)&&(c=c[0]),s.splice(0,a,c);break}if(r){o=t===r.name?r.location+"/"+r.main:r.location,s.splice(0,a,o);break}}l=s.join("/"),l+=e||(/\?/.test(l)?"":".js"),l=("/"===l.charAt(0)||l.match(/^[\w\+\.\-]+:/)?"":$.baseUrl)+l}return $.urlArgs?l+((-1===l.indexOf("?")?"?":"&")+$.urlArgs):l},load:function(t,e){req.load(b,t,e)},execCb:function(t,e,n,i){return e.apply(i,n)},onScriptLoad:function(t){if("load"===t.type||readyRegExp.test((t.currentTarget||t.srcElement).readyState)){interactiveScript=null;var e=g(t);b.completeLoad(e.id)}},onScriptError:function(t){var e=g(t);return r(e.id)?void 0:l(makeError("scripterror","Script error",t,[e.id]))}},b.require=b.makeRequire(),b}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(eachReverse(scripts(),function(t){return"interactive"===t.readyState?interactiveScript=t:void 0}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.1.4",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,apsp=ap.splice,isBrowser=!("undefined"==typeof window||!navigator||!document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"==""+opera,contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if(void 0===define){if(requirejs!==void 0){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}void 0===require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(t,e,n,i){var r,o,s=defContextName;return isArray(t)||"string"==typeof t||(o=t,isArray(e)?(t=e,e=n,n=i):t=[]),o&&o.context&&(s=o.context),r=getOwn(contexts,s),r||(r=contexts[s]=req.s.newContext(s)),o&&r.configure(o),r.require(t,e,n)},req.config=function(t){return req(t)},req.nextTick="undefined"!=typeof setTimeout?function(t){setTimeout(t,4)}:function(t){t()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(t){req[t]=function(){var e=contexts[defContextName];return e.require[t].apply(e,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=function(t){throw t},req.load=function(t,e,n){var i,r=t&&t.config||{};return isBrowser?(i=r.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script"),i.type=r.scriptType||"text/javascript",i.charset="utf-8",i.async=!0,i.setAttribute("data-requirecontext",t.contextName),i.setAttribute("data-requiremodule",e),!i.attachEvent||i.attachEvent.toString&&0>(""+i.attachEvent).indexOf("[native code")||isOpera?(i.addEventListener("load",t.onScriptLoad,!1),i.addEventListener("error",t.onScriptError,!1)):(useInteractive=!0,i.attachEvent("onreadystatechange",t.onScriptLoad)),i.src=n,currentlyAddingScript=i,baseElement?head.insertBefore(i,baseElement):head.appendChild(i),currentlyAddingScript=null,i):(isWebWorker&&(importScripts(n),t.completeLoad(e)),void 0)},isBrowser&&eachReverse(scripts(),function(t){return head||(head=t.parentNode),dataMain=t.getAttribute("data-main"),dataMain?(cfg.baseUrl||(src=dataMain.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath,dataMain=mainScript),dataMain=dataMain.replace(jsSuffixRegExp,""),cfg.deps=cfg.deps?cfg.deps.concat(dataMain):[dataMain],!0):void 0}),define=function(t,e,n){var i,r;"string"!=typeof t&&(n=e,e=t,t=null),isArray(e)||(n=e,e=[]),!e.length&&isFunction(n)&&n.length&&((""+n).replace(commentRegExp,"").replace(cjsRequireRegExp,function(t,n){e.push(n)}),e=(1===n.length?["require"]:["require","exports","module"]).concat(e)),useInteractive&&(i=currentlyAddingScript||getInteractiveScript(),i&&(t||(t=i.getAttribute("data-requiremodule")),r=contexts[i.getAttribute("data-requirecontext")])),(r?r.defQueue:globalDefQueue).push([t,e,n])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}})(this);