import"../modulepreload-polyfill.b7f2da20.js";import{W as n,C as i}from"../index.1d7ad8b9.js";import{G as r}from"../index.9a7b1aa5.js";import{d as p}from"../index.7d48aff8.js";import"../three.837c9bb0.js";const t=p({plugins:[n({antialias:!0,alpha:!0}),r(),i()]}).setDom(document.getElementById("app")).setSize();t.render();const e=document.getElementById("app");document.getElementById("operate").onclick=a=>{e.style.width=`${parseInt(e.style.width)+50}px`,e.style.height=`${parseInt(e.style.height)+50}px`,t.setSize().render()};