import"../index.f2ecf0d4.js";/* empty css               */import{c as y,bx as F,bL as M,aD as E,bM as f,bN as b,Z as s,C as m,ad as g,bO as B,bP as h,bQ as w,bR as L,bS as V,R as j,bT as k,bU as G,bV as N,bW as C,bX as S,a2 as T,a0 as I,N as d,d as l,a9 as W,ab as A,aa as v,ac as D}from"../three.9c0f0dc6.js";import{M as H}from"../index.b26a84d4.js";import{g as t}from"../vis-three.middleware.es.03da49c0.js";import{g as z}from"../lil-gui.module.min.095a7f3d.js";import"../index.62b980cf.js";import"../index.134e4e63.js";import"../index.e11efb4f.js";import"../Pass.609ff57c.js";import"../index.8d7364ed.js";import"../CSS3DRenderer.f52dbe9c.js";import"../index.45f20074.js";import"../vis-three.plugin-path-drawing.es.11103792.js";import"../index.4918a762.js";import"../index.24c0872b.js";import"../Antdv.6be70e33.js";import"../index.1a70533e.js";import"../vis-three.plugin-pointer-manager.es.d581852e.js";import"../index.246dda8d.js";import"../index.e2d93a37.js";import"../vis-three.module-animation-action.es.aa5e1fca.js";import"../index.56f54492.js";import"../vis-three.convenient.es.421933a2.js";import"../index.ae9b04a1.js";import"../vis-three.library-parser.es.459bfd34.js";import"../vis-three.strategy-multi-renderer.es.73c1d64a.js";import"../G6.7004a6d1.js";const r=new H().setDom(document.getElementById("app")).setSize().setStats(!0).play();t.injectEngine=r;const c=t("Scene");r.setSceneBySymbol(c.vid);t.injectScene=!0;r.loaderManager.setPath("/examples/");r.loadResourcesAsync(["/texture/skyBox/snowVillage/nx.jpg","/texture/skyBox/snowVillage/ny.jpg","/texture/skyBox/snowVillage/nz.jpg","/texture/skyBox/snowVillage/px.jpg","/texture/skyBox/snowVillage/py.jpg","/texture/skyBox/snowVillage/pz.jpg"]).then(()=>{const e=t("ImageTexture",{url:"/texture/skyBox/snowVillage/nx.jpg"}),i=t("MeshBasicMaterial",{map:e.vid}),u=t("BoxGeometry",{width:20,height:20,depth:20}),x=t("SphereGeometry",{radius:10});t("Mesh",{geometry:u.vid,material:i.vid,position:{x:-25}}),t("Mesh",{geometry:x.vid,material:i.vid,position:{x:25}}),c.background=e.vid;const a=new z;a.add(e,"url",["/texture/skyBox/snowVillage/nx.jpg","/texture/skyBox/snowVillage/ny.jpg","/texture/skyBox/snowVillage/nz.jpg","/texture/skyBox/snowVillage/px.jpg","/texture/skyBox/snowVillage/py.jpg","/texture/skyBox/snowVillage/pz.jpg"]),a.add(e,"mapping",{UVMapping:y,CubeReflectionMapping:F,CubeRefractionMapping:M,EquirectangularReflectionMapping:E,EquirectangularRefractionMapping:f,CubeUVReflectionMapping:b}),a.add(e,"wrapS",{"THREE.RepeatWrapping":s,"THREE.ClampToEdgeWrapping":m,"THREE.MirroredRepeatWrapping":g}),a.add(e,"wrapT",{"THREE.RepeatWrapping":s,"THREE.ClampToEdgeWrapping":m,"THREE.MirroredRepeatWrapping":g}),a.add(e,"format",{AlphaFormat:B,RedFormat:h,RedIntegerFormat:w,RGFormat:L,RGIntegerFormat:V,RGBAFormat:j,RGBAIntegerFormat:k,LuminanceFormat:G,LuminanceAlphaFormat:N,DepthFormat:C,DepthStencilFormat:S}),a.add(e,"encoding",{LinearEncoding:T,sRGBEncoding:I}),a.add(e,"magFilter",{Nearest:d,Linear:l}),a.add(e,"minFilter",{Nearest:d,Linear:l,NearestMipmapNearest:W,NearestMipmapLinear:A,LinearMipmapNearest:v,LinearMipmapLinear:D}),a.add(e,"rotation",-Math.PI,Math.PI,.01),a.add({anisotropy:e.anisotropy},"anisotropy",1,5,1).onChange(R=>{e.anisotropy=2**R});const o=a.addFolder("repeat");o.add(e.repeat,"x",1,5,1),o.add(e.repeat,"y",1,5,1);const p=a.addFolder("offset");p.add(e.offset,"x",-1,1,.1),p.add(e.offset,"y",-1,1,.1);const n=a.addFolder("center");n.add(e.center,"x",-1,1,.1),n.add(e.center,"y",-1,1,.1)});