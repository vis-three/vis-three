import"../modulepreload-polyfill.b7f2da20.js";import{E as r,g as t}from"../vis-three.middleware.es.2585b78e.js";import{C as m,a as c}from"../index.32011c09.js";import{d as p,e as l,p as d}from"../vis-three.module-animation-action.es.6d7baff5.js";import{a as g}from"../vis-three.library-parser.es.152102aa.js";import"../index.5fd0e639.js";import"../three.837c9bb0.js";import"../vis-three.plugin-loader-manager.es.dd5ac293.js";import"../vis-three.plugin-pointer-manager.es.9009bd78.js";import"../index.df02a99b.js";import"../index.813bc471.js";import"../G6.7a2bba98.js";import"../Antdv.a86c3c0d.js";import"../CSS3DRenderer.d266155a.js";import"../Pass.1ae4f2a0.js";import"../UnrealBloomPass.caa1ad7b.js";import"../index.4192aafc.js";import"../vis-three.convenient.es.9947652a.js";const e=new r().install(m()).exec(c()).registModule(p).registModule(l).registModule(d).setDom(document.getElementById("app"));e.resourceManager.addParser(new g);e.registerResources({"examples.css2DObject":document.getElementById("element1"),"examples.css2DObject2":document.getElementById("element2"),"examples.css2DObject3":document.getElementById("element3")});const s=t("CSS2DPlane",{element:"examples.css2DObject",width:200,height:150,position:{x:-20,y:10},rotation:{y:Math.PI/180*20},scale:{x:.1,y:.1,z:.1}}),i=t("CSS2DPlane",{element:"examples.css2DObject2",width:200,height:150,position:{x:20,y:10},rotation:{y:-(Math.PI/180)*20},scale:{x:.1,y:.1,z:.1}}),n=t("CSS2DPlane",{element:"examples.css2DObject3",width:200,height:150,position:{z:-30,y:10},scale:{x:.5,y:.5,z:.5}}),a=t("Scene",{children:[s.vid,i.vid,n.vid]});e.applyConfig(s,i,n,a);e.setSceneBySymbol(a.vid).play();e.camera.position.set(0,0,0);e.camera.lookAt(0,0,0);window.engine=e;setTimeout(()=>{e.setSize().play()},0);e.renderManager.addEventListener("render",o=>{e.camera.position.x=100*Math.sin(o.total),e.camera.position.z=100*Math.cos(o.total),e.camera.lookAt(0,0,0)});