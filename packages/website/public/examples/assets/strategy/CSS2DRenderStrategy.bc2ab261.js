import"../modulepreload-polyfill.b7f2da20.js";import{E as r,g as t}from"../vis-three.middleware.es.7f273029.js";import{C as m,a as c}from"../index.edc751ad.js";import{d as l,e as p,q as d}from"../vis-three.module-particle.es.8e43cbb8.js";import{a as g}from"../vis-three.library-parser.es.5c9e4dac.js";import"../index.202ebdec.js";import"../three.237d835c.js";import"../vis-three.plugin-loader-manager.es.c1771985.js";import"../vis-three.plugin-pointer-manager.es.640cfa1a.js";import"../index.c35e5a3e.js";import"../index.e6be8a02.js";import"../G6.d44f13fb.js";import"../Antdv.414c4eb5.js";import"../CSS3DRenderer.ba0f6fa5.js";import"../ShaderPass.02f07bc0.js";import"../UnrealBloomPass.2cdbe9ee.js";import"../index.ee52b7bf.js";import"../vis-three.convenient.es.7b860830.js";const e=new r().install(m()).exec(c()).registModule(l).registModule(p).registModule(d).setDom(document.getElementById("app"));e.resourceManager.addParser(new g);e.registerResources({"examples.css2DObject":document.getElementById("element1"),"examples.css2DObject2":document.getElementById("element2"),"examples.css2DObject3":document.getElementById("element3")});const s=t("CSS2DPlane",{element:"examples.css2DObject",width:200,height:150,position:{x:-20,y:10},rotation:{y:Math.PI/180*20},scale:{x:.1,y:.1,z:.1}}),i=t("CSS2DPlane",{element:"examples.css2DObject2",width:200,height:150,position:{x:20,y:10},rotation:{y:-(Math.PI/180)*20},scale:{x:.1,y:.1,z:.1}}),n=t("CSS2DPlane",{element:"examples.css2DObject3",width:200,height:150,position:{z:-30,y:10},scale:{x:.5,y:.5,z:.5}}),a=t("Scene",{children:[s.vid,i.vid,n.vid]});e.applyConfig(s,i,n,a);e.setSceneBySymbol(a.vid).play();e.camera.position.set(0,0,0);e.camera.lookAt(0,0,0);window.engine=e;setTimeout(()=>{e.setSize().play()},0);e.renderManager.addEventListener("render",o=>{e.camera.position.x=100*Math.sin(o.total),e.camera.position.z=100*Math.cos(o.total),e.camera.lookAt(0,0,0)});