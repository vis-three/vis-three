(function(e,t){typeof exports=="object"&&typeof module<"u"?t(exports,require("@vis-three/core"),require("@vis-three/utils"),require("@vis-three/plugin-css3d-renderer"),require("@vis-three/plugin-css2d-renderer")):typeof define=="function"&&define.amd?define(["exports","@vis-three/core","@vis-three/utils","@vis-three/plugin-css3d-renderer","@vis-three/plugin-css2d-renderer"],t):(e=typeof globalThis<"u"?globalThis:e||self,t((e["vis-three"]=e["vis-three"]||{},e["vis-three"]["strategy-multi-renderer"]={}),e.core,e.utils,e.pluginCss3dRenderer,e.pluginCss2dRenderer))})(this,function(e,t,m,v,R){"use strict";const d=m.transPkgName("@vis-three/strategy-multi-renderer"),N=function(){let E,u,n;return{name:d,condition:[v.CSS3D_RENDERER_PLUGIN,R.CSS2D_RENDERER_PLUGIN],exec(r){const s=r.css3DRenderer.domElement,i=r.css2DRenderer.domElement,o=Number(s.style.zIndex),c=Number(i.style.zIndex);E=o>c?s:i,u=o>c?i:s,n=l=>{E.appendChild(u)},r.addEventListener(t.ENGINE_EVENT.SETDOM,n)},rollback(r){r.removeEventListener(t.ENGINE_EVENT.SETDOM,n)}}};e.MULTI_RENDERER_EVENT=d,e.MultiRendererEventStrategy=N,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});