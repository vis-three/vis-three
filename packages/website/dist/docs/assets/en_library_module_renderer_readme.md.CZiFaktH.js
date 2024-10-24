import{_ as e,c as i,o as s,a2 as a}from"./chunks/framework.BjUghlZR.js";const m=JSON.parse('{"title":"@vis-three/module-renderer","description":"","frontmatter":{},"headers":[],"relativePath":"en/library/module/renderer/readme.md","filePath":"en/library/module/renderer/readme.md"}'),r={name:"en/library/module/renderer/readme.md"},n=a(`<h1 id="vis-three-module-renderer" tabindex="-1">@vis-three/module-renderer <a class="header-anchor" href="#vis-three-module-renderer" aria-label="Permalink to &quot;@vis-three/module-renderer&quot;">​</a></h1><h2 id="latest-version" tabindex="-1">Latest Version <a class="header-anchor" href="#latest-version" aria-label="Permalink to &quot;Latest Version&quot;">​</a></h2><img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-renderer"><h2 id="license" tabindex="-1">License <a class="header-anchor" href="#license" aria-label="Permalink to &quot;License&quot;">​</a></h2><img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-renderer?color=blue"><h2 id="module-information" tabindex="-1">Module Information <a class="header-anchor" href="#module-information" aria-label="Permalink to &quot;Module Information&quot;">​</a></h2><h3 id="module-type" tabindex="-1">module.type <a class="header-anchor" href="#module-type" aria-label="Permalink to &quot;module.type&quot;">​</a></h3><ul><li><strong>Value</strong>: <code>renderer</code></li></ul><h3 id="module-lifeorder" tabindex="-1">module.lifeOrder <a class="header-anchor" href="#module-lifeorder" aria-label="Permalink to &quot;module.lifeOrder&quot;">​</a></h3><ul><li><strong>Value</strong>: 0</li></ul><h2 id="provided-configuration" tabindex="-1">Provided Configuration <a class="header-anchor" href="#provided-configuration" aria-label="Permalink to &quot;Provided Configuration&quot;">​</a></h2><h3 id="renderer-renderer" tabindex="-1">Renderer - Renderer <a class="header-anchor" href="#renderer-renderer" aria-label="Permalink to &quot;Renderer - Renderer&quot;">​</a></h3><ul><li><strong>Type</strong>: <code>Renderer</code></li><li><strong>Configuration Type</strong>:</li></ul><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-dark github-light vp-code"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;"> interface</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;"> RendererConfig</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;"> extends</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;"> SymbolConfig</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;"> {</span></span>
<span class="line"><span style="--shiki-dark:#FFAB70;--shiki-light:#E36209;">  size</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;">:</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;"> Vector2Config</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49;"> |</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5;"> null</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">; </span><span style="--shiki-dark:#6A737D;--shiki-light:#6A737D;">// If null, follows the default canvas</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">}</span></span></code></pre></div><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-dark github-light vp-code"><code><span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">{</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1;">   size</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5;">null</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E;">}</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><ul><li>This module provides the common configuration <code>RendererConfig</code>.</li><li>Since different projects may use different renderer plugins, please refer to the relevant controller plugins or strategy documentation for specific renderer configurations in this module.</li></ul></div>`,16),t=[n];function l(o,d,h,p,c,u){return s(),i("div",null,t)}const g=e(r,[["render",l]]);export{m as __pageData,g as default};