import{_ as s,o as n,c as a,O as l}from"./chunks/framework.a8fb2c59.js";const i=JSON.parse('{"title":"配置化开发","description":"","frontmatter":{},"headers":[],"relativePath":"start/middleware.md","filePath":"start/middleware.md"}'),p={name:"start/middleware.md"},o=l(`<h1 id="配置化开发" tabindex="-1">配置化开发 <a class="header-anchor" href="#配置化开发" aria-label="Permalink to &quot;配置化开发&quot;">​</a></h1><p>配置化开发根据配置化去形成场景结构与可视化面，还能够在运行期通过对配置的更改去影响 3D 场景，如何进行配置化开发，下面进行介绍。</p><h2 id="生成配置" tabindex="-1">生成配置 <a class="header-anchor" href="#生成配置" aria-label="Permalink to &quot;生成配置&quot;">​</a></h2><p>配置化开发的首要部分就是各种配置单的生成和配置单对应的对象功能，配置生成需要用到<code>@vis-three/middleware</code>中的<code>generateConfig</code>方法来生成配置。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">DisplayEngineSupport</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@vis-three/engine-display-support</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">generateConfig</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">CONFIGTYPE</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@vis-three/middleware</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> engine </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">DisplayEngineSupport</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setDom</span><span style="color:#A6ACCD;">(document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getElementById</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">app</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">))</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setSize</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">play</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> material </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">generateConfig</span><span style="color:#A6ACCD;">(CONFIGTYPE</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">MESHSTANDARDMATERIAL</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">rgb(255, 0, 0)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> geometry </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">generateConfig</span><span style="color:#A6ACCD;">(CONFIGTYPE</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">BOXGEOMETRY</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">40</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">depth</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">60</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> mesh </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">generateConfig</span><span style="color:#A6ACCD;">(CONFIGTYPE</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">MESH</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">geometry</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> geometry</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">vid</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">material</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> material</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">vid</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> scene </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">generateConfig</span><span style="color:#A6ACCD;">(CONFIGTYPE</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">SCENE</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">children</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [mesh</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">vid]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><ul><li>配置化开发需要使用支持配置化的引擎，也就是继承<code>EngineSupport</code>的引擎。</li><li><code>generateConfig</code>是生成配置的统一 api。</li><li><code>CONFIGTYPE</code>中枚举了当下支持的所有物体配置单。</li><li><code>generateConfig</code>详情请参考 API 文档</li></ul></div><h2 id="应用配置" tabindex="-1">应用配置 <a class="header-anchor" href="#应用配置" aria-label="Permalink to &quot;应用配置&quot;">​</a></h2><p>生成配置以后，就是如何应用配置，应用配置我们可以手动应用。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">engine</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">applyConfig</span><span style="color:#A6ACCD;">(material</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> geometry</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> mesh</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> scene)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>手动应用配置注意应用配置的先后顺序，比如<code>mesh</code>需要依赖<code>material</code>, <code>geometry</code>这两个配置，那么<code>mesh</code>的应用要在<code>material</code>和<code>geometry</code>之后。</p></div><p>手动应用配置对应与复杂的项目场景是有必要的，能够让我们更好的跟踪配置的加入移除，那么对于简单一点的项目或者 demo 来说，我们可以使用自动应用配置。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">DisplayEngineSupport</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@vis-three/engine-display-support</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">generateConfig</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">CONFIGTYPE</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@vis-three/middleware</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> engine </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">DisplayEngineSupport</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setDom</span><span style="color:#A6ACCD;">(document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getElementById</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">app</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">))</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setSize</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">play</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">generateConfig</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">injectEngine </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> engine</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">generateConfig</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">autoInject </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> material </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">generateConfig</span><span style="color:#A6ACCD;">(CONFIGTYPE</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">MESHSTANDARDMATERIAL</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">color</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">rgb(255, 0, 0)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> geometry </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">generateConfig</span><span style="color:#A6ACCD;">(CONFIGTYPE</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">BOXGEOMETRY</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">40</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">depth</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">60</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> mesh </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">generateConfig</span><span style="color:#A6ACCD;">(CONFIGTYPE</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">MESH</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">geometry</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> geometry</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">vid</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">material</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> material</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">vid</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> scene </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">generateConfig</span><span style="color:#A6ACCD;">(CONFIGTYPE</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">SCENE</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">children</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [mesh</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">vid]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="编辑配置" tabindex="-1">编辑配置 <a class="header-anchor" href="#编辑配置" aria-label="Permalink to &quot;编辑配置&quot;">​</a></h2><p>通过<code>generateConfig</code>生成的配置，其实就是一个很简单的对象，我们只用操作这个对象的相关属性，就能够影响 3D 场景中对象做出相关的变化。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">mesh</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">position</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">x </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">mesh</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">rotation</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">y </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> Math</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">PI </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">scene</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">children</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">pop</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>这里要注意，对于<code>generateConfig</code>生成的配置不要直接替换整个配置对象里面的引用对象，比如：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight has-highlighted-lines"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> mesh </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">generateConfig</span><span style="color:#A6ACCD;">(CONFIGTYPE</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">MESH)</span><span style="color:#89DDFF;">;</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">mesh</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">position </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">x</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">y</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">z</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">};</span></span></code></pre></div><p>主要是因为：</p><ol><li><p>直接替换掉整个引用，会造成额外性能开销。</p></li><li><p>直接替换引用，在相应模块内可能会丢失对象的跟踪处理。</p></li><li><p>在配置对象版本更新的时候，会缺失新版本的配置属性。</p></li></ol></div><h2 id="保存配置" tabindex="-1">保存配置 <a class="header-anchor" href="#保存配置" aria-label="Permalink to &quot;保存配置&quot;">​</a></h2><p>配置化开发的一大特点就是，只要有相关的配置的，在哪里都能够复现当前的场景，那么首要的部分就是配置单的保存。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> json </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> engine</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toJSON</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 直接导出json配置单</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> jsObject </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> engine</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">exportConfig</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 导出干净的js对象</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>有很多的需求是在保存之前需要对配置单进行统一的操作，可以直接操作<code>jsObject</code>对象，<code>exportConfig</code>导出的 js 对象是深拷贝对象，不会影响运行期的配置。</p></div><h2 id="导入配置" tabindex="-1">导入配置 <a class="header-anchor" href="#导入配置" aria-label="Permalink to &quot;导入配置&quot;">​</a></h2><p>如何通过配置单还原整个场景？我们只用调用几个<code>api</code>就能搞定！</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> jsonConfig </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">jsonConfig.json</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">generateConfig</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Template</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">JSONHanlder</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@vis-three/middleware</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> config </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> Template</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">handler</span><span style="color:#A6ACCD;">(JSONHanlder</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">clone</span><span style="color:#A6ACCD;">(jsonConfig)</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">c</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">generateConfig</span><span style="color:#A6ACCD;">(c</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">type</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> c)</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">engine</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">loadConfig</span><span style="color:#A6ACCD;">(config</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">res</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// do something</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">engine</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">loadConfigAsync</span><span style="color:#A6ACCD;">(config)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">res</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// do something</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><ol><li><p>在应用配置单之前，我们需要通过<code>JSONHanlder</code>处理一次，因为比如<code>Infinity</code>, <code>-Infinity</code>等的数字对象在普通的<code>json</code>化过程中会丢失，所以需要特殊处理。</p></li><li><p>有很多的需求是在导入配置完成之后，还会对配置进行相关处理，所以目前的加载函数不会对配置进行自动的响应式转译，需要手动进行，这里可以使用<code>Template</code>模板处理方法进行。</p></li></ol></div>`,24),e=[o];function t(c,r,D,y,F,C){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{i as __pageData,d as default};