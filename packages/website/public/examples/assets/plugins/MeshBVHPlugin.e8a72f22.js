import"../modulepreload-polyfill.b7f2da20.js";import{l as p}from"../loadingTips.e8714600.js";import{aK as c,a3 as u,M as f,a as h,al as w}from"../three.3f33d046.js";import{m as M,Z as S}from"../vis-three.plugin-loader-manager.es.3fc670d5.js";import{W as x,C as y}from"../index.c0df7946.js";import{R as v}from"../index.0a430562.js";import{E as _}from"../index.0317c091.js";import{x as E}from"../vis-three.plugin-orbit-controls.es.1508a7f8.js";import{E as b}from"../index.cee1ad1a.js";import{O as C}from"../index.e2e75f8b.js";import{E as G}from"../curve.0ba3d968.js";import{M as R}from"../index.1849a9ca.js";/* empty css               */import"../Antdv.7b6104cc.js";import"../ShaderPass.025732a5.js";const r=G({plugins:[v(),x({antialias:!0,alpha:!0}),_({MSAA:!0}),y(),S({path:"/examples/"}),E(),R({visualizer:!0})],strategy:[b(),C()]}).setDom(document.getElementById("app")).setSize().play();p(r);r.loadResourcesAsync(["/model/glb/dungeon_low_poly_game_level_challenge/scene.gltf"]).then(d=>{const o=d.resourceMap.get("/model/glb/dungeon_low_poly_game_level_challenge/scene.gltf").scene;o.scale.setScalar(.1);const m=new c;m.setFromObject(o),m.getCenter(o.position).negate(),o.updateMatrixWorld(!0);const s={};o.traverse(e=>{if(!(/Boss/.test(e.name)||/Enemie/.test(e.name)||/Shield/.test(e.name)||/Sword/.test(e.name)||/Character/.test(e.name)||/Gate/.test(e.name)||/Cube/.test(e.name)||e.material&&e.material.color.r===1)&&e.isMesh){const i=e.material.color.getHex();s[i]=s[i]||[],s[i].push(e)}});const n=new u;for(const e in s){const i=s[e],l=[];if(i.forEach(a=>{if(a.material.emissive.r!==0)n.attach(a);else{const t=a.geometry.clone();t.applyMatrix4(a.matrixWorld),l.push(t)}}),l.length){const a=M(l),t=new f(a,new h({color:parseInt(e),shadowSide:2}));t.castShadow=!0,t.receiveShadow=!0,t.material.shadowSide=2,n.add(t)}}n.updateMatrixWorld(!0),n.traverse(e=>{e.geometry&&r.addBVH(e)}),r.scene.add(n)});const g=new w("white",7);g.position.set(-5,5,10);r.scene.add(g);window.engine=r;