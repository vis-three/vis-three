import{C as n,D as c}from"./vis-three.middleware.es.7f273029.js";import{a as i,b as r}from"./index.4ec3bfd2.js";import{t as a}from"./index.202ebdec.js";const l="@vis-three/plugin-selection-support",S=a(l),P=function(){return{name:S,deps:[i,n,c],install(o){o.setSelectionBoxBySymbol=function(t){this.selectionBox.clear();for(const e of t){const s=o.getObjectBySymbol(e);s?this.selectionBox.add(s):console.warn(`can not found object by: ${e}`)}return o.dispatchEvent({type:r,objects:Array.from(this.selectionBox),objectSymbols:t}),this}},dispose(o){delete o.setSelectionBoxBySymbol}}};export{P as S,S as a};