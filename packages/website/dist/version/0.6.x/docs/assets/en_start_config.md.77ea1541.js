import{_ as s,o as n,c as a,O as l}from"./chunks/framework.b643d968.js";const u=JSON.parse('{"title":"Configuration-Driven Development","description":"","frontmatter":{},"headers":[],"relativePath":"en/start/config.md","filePath":"en/start/config.md"}'),p={name:"en/start/config.md"},o=l(`<h1 id="configuration-driven-development" tabindex="-1">Configuration-Driven Development <a class="header-anchor" href="#configuration-driven-development" aria-label="Permalink to &quot;Configuration-Driven Development&quot;">​</a></h1><p>Compared to the native three.js engine, the configurable engine not only inherits the <strong>full capabilities</strong> of the native engine but also adds the ability to control the entire process through configuration. Configurable development allows you to form the scene structure and visualization based on configurations, and influence the 3D scene at runtime by modifying these configurations. This ensures robust support for complex application development.</p><blockquote><p>For code examples,</p></blockquote><p>visit: <a href="https://vis-three.github.io/examples.html?example=engine/EngineSupport.html" target="_blank" rel="noreferrer">https://vis-three.github.io/examples.html?example=engine/EngineSupport.html</a></p><h2 id="engine-preparation" tabindex="-1">Engine Preparation <a class="header-anchor" href="#engine-preparation" aria-label="Permalink to &quot;Engine Preparation&quot;">​</a></h2><p>The configurable engine, like the native engine, requires us to first install the following dependencies:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">npm i three</span></span>
<span class="line"><span style="color:#e1e4e8;">npm i @types/three</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// Configurable core of vis-three</span></span>
<span class="line"><span style="color:#e1e4e8;">npm i @vis-three/middleware</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// WebGLRenderer-related plugin for three.js</span></span>
<span class="line"><span style="color:#e1e4e8;">npm i @vis-three/plugin-webgl-renderer</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// Grid helper plugin for visual assistance during early scene setup</span></span>
<span class="line"><span style="color:#e1e4e8;">npm i @vis-three/plugin-grid-helper</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// Camera adaptive plugin for automatic adjustment to different rendering window sizes</span></span>
<span class="line"><span style="color:#e1e4e8;">npm i @vis-three/plugin-camera-adaptive</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// WebGLRenderer rendering strategy</span></span>
<span class="line"><span style="color:#e1e4e8;">npm i @vis-three/strategy-webgl-render</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#24292e;">npm i three</span></span>
<span class="line"><span style="color:#24292e;">npm i @types/three</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// Configurable core of vis-three</span></span>
<span class="line"><span style="color:#24292e;">npm i @vis-three/middleware</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// WebGLRenderer-related plugin for three.js</span></span>
<span class="line"><span style="color:#24292e;">npm i @vis-three/plugin-webgl-renderer</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// Grid helper plugin for visual assistance during early scene setup</span></span>
<span class="line"><span style="color:#24292e;">npm i @vis-three/plugin-grid-helper</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// Camera adaptive plugin for automatic adjustment to different rendering window sizes</span></span>
<span class="line"><span style="color:#24292e;">npm i @vis-three/plugin-camera-adaptive</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// WebGLRenderer rendering strategy</span></span>
<span class="line"><span style="color:#24292e;">npm i @vis-three/strategy-webgl-render</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>The configurable engine already includes a set of basic plugins and strategies. You only need to install additional plugins and strategies as needed. For details on the built-in plugins and strategies of the configurable engine core, please refer to the plugin documentation.</p></div><p>After installation, you can build the engine. The construction method for the configurable engine is the same as for the native engine and also provides two construction modes:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {EngineSupport, defineEngineSupport} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/middleware&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {WebGLRendererPlugin} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/plugin-webgl-renderer&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {GridHelperPlugin} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/plugin-grid-helper&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {CameraAdaptivePlugin} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/plugin-camera-adaptive&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {WebGLRenderStrategy} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/strategy-webgl-render&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Class Instantiation</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">engine</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">EngineSupport</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">install</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">WebGLRendererPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">            antialias: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            alpha: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">install</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">CameraAdaptivePlugin</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">install</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">GridHelperPlugin</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">exec</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">WebGLRenderStrategy</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Functional</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">engine</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineEngineSupport</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">WebGLRendererPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">            antialias: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            alpha: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        }),</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">CameraAdaptivePlugin</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">GridHelperPlugin</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    strategy: [</span><span style="color:#B392F0;">WebGLRenderStrategy</span><span style="color:#E1E4E8;">()],</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {EngineSupport, defineEngineSupport} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/middleware&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {WebGLRendererPlugin} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/plugin-webgl-renderer&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {GridHelperPlugin} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/plugin-grid-helper&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {CameraAdaptivePlugin} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/plugin-camera-adaptive&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {WebGLRenderStrategy} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/strategy-webgl-render&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Class Instantiation</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">engine</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">EngineSupport</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">install</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">WebGLRendererPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">            antialias: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            alpha: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">install</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">CameraAdaptivePlugin</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">install</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">GridHelperPlugin</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">exec</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">WebGLRenderStrategy</span><span style="color:#24292E;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Functional</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">engine</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineEngineSupport</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    plugins: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">WebGLRendererPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">            antialias: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            alpha: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        }),</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">CameraAdaptivePlugin</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">GridHelperPlugin</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    strategy: [</span><span style="color:#6F42C1;">WebGLRenderStrategy</span><span style="color:#24292E;">()],</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>If you proceed with development, it will support native development similar to the native engine construction. However, since we are using a configurable engine, you also need to install the configurable dependencies.</p><p>Configurable dependencies vary based on different business scenarios. First, let&#39;s install the following dependencies:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">npm i @vis-three/module-light</span></span>
<span class="line"><span style="color:#e1e4e8;">npm i @vis-three/module-geometry</span></span>
<span class="line"><span style="color:#e1e4e8;">npm i @vis-three/module-material</span></span>
<span class="line"><span style="color:#e1e4e8;">npm i @vis-three/module-line</span></span>
<span class="line"><span style="color:#e1e4e8;">npm i @vis-three/module-points</span></span>
<span class="line"><span style="color:#e1e4e8;">npm i @vis-three/module-mesh</span></span>
<span class="line"><span style="color:#e1e4e8;">npm i @vis-three/module-scene</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">npm i @vis-three/module-light</span></span>
<span class="line"><span style="color:#24292e;">npm i @vis-three/module-geometry</span></span>
<span class="line"><span style="color:#24292e;">npm i @vis-three/module-material</span></span>
<span class="line"><span style="color:#24292e;">npm i @vis-three/module-line</span></span>
<span class="line"><span style="color:#24292e;">npm i @vis-three/module-points</span></span>
<span class="line"><span style="color:#24292e;">npm i @vis-three/module-mesh</span></span>
<span class="line"><span style="color:#24292e;">npm i @vis-three/module-scene</span></span></code></pre></div><p>Alternatively, since there are many modules above, you can install the module library directly and then select the ones you need:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">npm i @vis-three/library-module</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">npm i @vis-three/library-module</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// import ...</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    light,</span></span>
<span class="line"><span style="color:#E1E4E8;">    geometry,</span></span>
<span class="line"><span style="color:#E1E4E8;">    material,</span></span>
<span class="line"><span style="color:#E1E4E8;">    line,</span></span>
<span class="line"><span style="color:#E1E4E8;">    points,</span></span>
<span class="line"><span style="color:#E1E4E8;">    mesh,</span></span>
<span class="line"><span style="color:#E1E4E8;">    scene,</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/library-module&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Class Instantiation</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">engine</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">EngineSupport</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">registModule</span><span style="color:#E1E4E8;">(light)</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">registModule</span><span style="color:#E1E4E8;">(geometry)</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">registModule</span><span style="color:#E1E4E8;">(material)</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">registModule</span><span style="color:#E1E4E8;">(line)</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">registModule</span><span style="color:#E1E4E8;">(points)</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">registModule</span><span style="color:#E1E4E8;">(mesh)</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">registModule</span><span style="color:#E1E4E8;">(scene)</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">install</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">WebGLRendererPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">            antialias: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            alpha: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">install</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">CameraAdaptivePlugin</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">install</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">GridHelperPlugin</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">exec</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">WebGLRenderStrategy</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Functional</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">engine</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineEngineSupport</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">WebGLRendererPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">            antialias: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            alpha: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        }),</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">CameraAdaptivePlugin</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">GridHelperPlugin</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    strategy: [</span><span style="color:#B392F0;">WebGLRenderStrategy</span><span style="color:#E1E4E8;">()],</span></span>
<span class="line"><span style="color:#E1E4E8;">    modules: [light, geometry, material, line, points, mesh, scene],</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// import ...</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    light,</span></span>
<span class="line"><span style="color:#24292E;">    geometry,</span></span>
<span class="line"><span style="color:#24292E;">    material,</span></span>
<span class="line"><span style="color:#24292E;">    line,</span></span>
<span class="line"><span style="color:#24292E;">    points,</span></span>
<span class="line"><span style="color:#24292E;">    mesh,</span></span>
<span class="line"><span style="color:#24292E;">    scene,</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/library-module&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Class Instantiation</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">engine</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">EngineSupport</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">registModule</span><span style="color:#24292E;">(light)</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">registModule</span><span style="color:#24292E;">(geometry)</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">registModule</span><span style="color:#24292E;">(material)</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">registModule</span><span style="color:#24292E;">(line)</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">registModule</span><span style="color:#24292E;">(points)</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">registModule</span><span style="color:#24292E;">(mesh)</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">registModule</span><span style="color:#24292E;">(scene)</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">install</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">WebGLRendererPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">            antialias: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            alpha: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">install</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">CameraAdaptivePlugin</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">install</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">GridHelperPlugin</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">exec</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">WebGLRenderStrategy</span><span style="color:#24292E;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Functional</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">engine</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineEngineSupport</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    plugins: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">WebGLRendererPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">            antialias: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            alpha: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        }),</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">CameraAdaptivePlugin</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">GridHelperPlugin</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    strategy: [</span><span style="color:#6F42C1;">WebGLRenderStrategy</span><span style="color:#24292E;">()],</span></span>
<span class="line"><span style="color:#24292E;">    modules: [light, geometry, material, line, points, mesh, scene],</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>If you use the class-based assembly mode, it&#39;s best to assemble the engine in the order of <code>modules</code> -&gt; <code>plugins</code> -&gt; <code>strategies</code>.</p></div><h2 id="page-mounting" tabindex="-1">Page Mounting <a class="header-anchor" href="#page-mounting" aria-label="Permalink to &quot;Page Mounting&quot;">​</a></h2><p>The method for mounting the page is the same as for the <a href="./native.html">native engine</a> construction.</p><h2 id="adding-objects" tabindex="-1">Adding Objects <a class="header-anchor" href="#adding-objects" aria-label="Permalink to &quot;Adding Objects&quot;">​</a></h2><p>The process of adding objects and performing similar operations in the configurable engine differs significantly from the native engine. You no longer need to worry about <code>three.js</code> types and parameter APIs; you only need to generate the relevant configurations.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// import ...</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    defineEngineSupport,</span></span>
<span class="line"><span style="color:#E1E4E8;">    generateConfig,</span></span>
<span class="line"><span style="color:#E1E4E8;">    CONFIGTYPE,</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/middleware&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// engine code ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// We need to generate a configurable scene object using generateConfig</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">defaultScene</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">SCENE</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// By calling applyConfig, we can apply the generated configuration</span></span>
<span class="line"><span style="color:#6A737D;">// setSceneBySymbol allows us to find objects by the unique configuration identifier vid</span></span>
<span class="line"><span style="color:#E1E4E8;">engine.</span><span style="color:#B392F0;">applyConfig</span><span style="color:#E1E4E8;">(defaultScene).</span><span style="color:#B392F0;">setSceneBySymbol</span><span style="color:#E1E4E8;">(defaultScene.vid);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pointLight</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">POINTLIGHT</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    color: </span><span style="color:#9ECBFF;">&quot;rgb(255, 255, 255)&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        y: </span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">commonGeometry</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">BOXGEOMETRY</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    width: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    height: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    depth: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boxMaterial</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">MESHSTANDARDMATERIAL</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    color: </span><span style="color:#9ECBFF;">&quot;rgb(255, 105, 100)&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">box</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">MESH</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">    material: boxMaterial.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        x: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">lineBox</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">LINE</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pointsMaterial</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">POINTSMATERIAL</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    color: </span><span style="color:#9ECBFF;">&quot;rgb(255, 255, 255)&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pointsBox</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">POINTS</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">    material: pointsMaterial.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        x: </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">engine.</span><span style="color:#B392F0;">applyConfig</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    pointLight,</span></span>
<span class="line"><span style="color:#E1E4E8;">    commonGeometry,</span></span>
<span class="line"><span style="color:#E1E4E8;">    boxMaterial,</span></span>
<span class="line"><span style="color:#E1E4E8;">    box,</span></span>
<span class="line"><span style="color:#E1E4E8;">    lineBox,</span></span>
<span class="line"><span style="color:#E1E4E8;">    pointsMaterial,</span></span>
<span class="line"><span style="color:#E1E4E8;">    pointsBox</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">defaultScene.children.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(pointLight.vid, box.vid, lineBox.vid, pointsBox.vid);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// import ...</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    defineEngineSupport,</span></span>
<span class="line"><span style="color:#24292E;">    generateConfig,</span></span>
<span class="line"><span style="color:#24292E;">    CONFIGTYPE,</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/middleware&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// engine code ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// We need to generate a configurable scene object using generateConfig</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">defaultScene</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">SCENE</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// By calling applyConfig, we can apply the generated configuration</span></span>
<span class="line"><span style="color:#6A737D;">// setSceneBySymbol allows us to find objects by the unique configuration identifier vid</span></span>
<span class="line"><span style="color:#24292E;">engine.</span><span style="color:#6F42C1;">applyConfig</span><span style="color:#24292E;">(defaultScene).</span><span style="color:#6F42C1;">setSceneBySymbol</span><span style="color:#24292E;">(defaultScene.vid);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pointLight</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">POINTLIGHT</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    color: </span><span style="color:#032F62;">&quot;rgb(255, 255, 255)&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    position: {</span></span>
<span class="line"><span style="color:#24292E;">        y: </span><span style="color:#005CC5;">30</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">commonGeometry</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">BOXGEOMETRY</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    width: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    height: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    depth: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boxMaterial</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">MESHSTANDARDMATERIAL</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    color: </span><span style="color:#032F62;">&quot;rgb(255, 105, 100)&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">box</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">MESH</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#24292E;">    material: boxMaterial.vid,</span></span>
<span class="line"><span style="color:#24292E;">    position: {</span></span>
<span class="line"><span style="color:#24292E;">        x: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">lineBox</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">LINE</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pointsMaterial</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">POINTSMATERIAL</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    color: </span><span style="color:#032F62;">&quot;rgb(255, 255, 255)&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pointsBox</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">POINTS</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#24292E;">    material: pointsMaterial.vid,</span></span>
<span class="line"><span style="color:#24292E;">    position: {</span></span>
<span class="line"><span style="color:#24292E;">        x: </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">engine.</span><span style="color:#6F42C1;">applyConfig</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    pointLight,</span></span>
<span class="line"><span style="color:#24292E;">    commonGeometry,</span></span>
<span class="line"><span style="color:#24292E;">    boxMaterial,</span></span>
<span class="line"><span style="color:#24292E;">    box,</span></span>
<span class="line"><span style="color:#24292E;">    lineBox,</span></span>
<span class="line"><span style="color:#24292E;">    pointsMaterial,</span></span>
<span class="line"><span style="color:#24292E;">    pointsBox</span></span>
<span class="line"><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">defaultScene.children.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(pointLight.vid, box.vid, lineBox.vid, pointsBox.vid);</span></span></code></pre></div><p>From the code above, we can see:</p><ol><li><p>You no longer need to use <code>import * as THREE from &#39;three&#39;</code> and <code>new</code> related objects to complete the scene construction directly.</p></li><li><p>The configurable format allows you to initialize all properties when generating the configuration.</p></li><li><p>Each configuration has a unique <code>vid</code> identifier, which can be used to manage the entire object.</p></li><li><p>The basic development approach for configuration is: generate configuration with <code>generateConfig</code> -&gt; apply configuration with <code>engine.applyConfig</code>.</p></li></ol><div class="tip custom-block"><p class="custom-block-title">TIP</p><ul><li><code>generateConfig</code> is the unified API for generating configurations.</li><li><code>CONFIGTYPE</code> enumerates all currently supported object configurations.</li><li>When manually applying configurations, be mindful of the order of application. For example, if <code>box</code> depends on <code>commonGeometry</code> and <code>boxMaterial</code>, then <code>box</code> should be applied after <code>commonGeometry</code> and <code>boxMaterial</code>.</li></ul></div><h2 id="automatic-injection" tabindex="-1">Automatic Injection <a class="header-anchor" href="#automatic-injection" aria-label="Permalink to &quot;Automatic Injection&quot;">​</a></h2><p>For simple scene development, manually generating and applying configurations and managing the application order can be cumbersome. We can use automatic injection features to simplify these operations.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// other code...</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">defaultScene</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">SCENE</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">engine.</span><span style="color:#B392F0;">applyConfig</span><span style="color:#E1E4E8;">(defaultScene).</span><span style="color:#B392F0;">setSceneBySymbol</span><span style="color:#E1E4E8;">(defaultScene.vid);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Set up the injection engine</span></span>
<span class="line"><span style="color:#E1E4E8;">generateConfig.injectEngine </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> engine;</span></span>
<span class="line"><span style="color:#6A737D;">// Enable scene injection</span></span>
<span class="line"><span style="color:#E1E4E8;">generateConfig.injectScene </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">// Enable automatic injection</span></span>
<span class="line"><span style="color:#E1E4E8;">generateConfig.autoInject </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">POINTLIGHT</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    color: </span><span style="color:#9ECBFF;">&quot;rgb(255, 255, 255)&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        y: </span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">commonGeometry</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">BOXGEOMETRY</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    width: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    height: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    depth: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boxMaterial</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">MESHSTANDARDMATERIAL</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    color: </span><span style="color:#9ECBFF;">&quot;rgb(255, 105, 100)&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">MESH</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">    material: boxMaterial.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        x: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">LINE</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">pointsMaterial</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">POINTSMATERIAL</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    color: </span><span style="color:#9ECBFF;">&quot;rgb(255, 255, 255)&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">POINTS</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">    material: pointsMaterial.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        x: </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// other code...</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">defaultScene</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">SCENE</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">engine.</span><span style="color:#6F42C1;">applyConfig</span><span style="color:#24292E;">(defaultScene).</span><span style="color:#6F42C1;">setSceneBySymbol</span><span style="color:#24292E;">(defaultScene.vid);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Set up the injection engine</span></span>
<span class="line"><span style="color:#24292E;">generateConfig.injectEngine </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> engine;</span></span>
<span class="line"><span style="color:#6A737D;">// Enable scene injection</span></span>
<span class="line"><span style="color:#24292E;">generateConfig.injectScene </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">// Enable automatic injection</span></span>
<span class="line"><span style="color:#24292E;">generateConfig.autoInject </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">POINTLIGHT</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    color: </span><span style="color:#032F62;">&quot;rgb(255, 255, 255)&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    position: {</span></span>
<span class="line"><span style="color:#24292E;">        y: </span><span style="color:#005CC5;">30</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">commonGeometry</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">BOXGEOMETRY</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    width: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    height: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    depth: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boxMaterial</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">MESHSTANDARDMATERIAL</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    color: </span><span style="color:#032F62;">&quot;rgb(255, 105, 100)&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">MESH</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#24292E;">    material: boxMaterial.vid,</span></span>
<span class="line"><span style="color:#24292E;">    position: {</span></span>
<span class="line"><span style="color:#24292E;">        x: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">LINE</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">pointsMaterial</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">POINTSMATERIAL</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    color: </span><span style="color:#032F62;">&quot;rgb(255, 255, 255)&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">POINTS</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#24292E;">    material: pointsMaterial.vid,</span></span>
<span class="line"><span style="color:#24292E;">    position: {</span></span>
<span class="line"><span style="color:#24292E;">        x: </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Automatic injection is highly efficient for simple scene construction. However, for more complex business scenarios, it is recommended to use manual configuration application.</p></div><h2 id="editing-configuration" tabindex="-1">Editing Configuration <a class="header-anchor" href="#editing-configuration" aria-label="Permalink to &quot;Editing Configuration&quot;">​</a></h2><p>For most business cases, runtime property changes are necessary. With native three.js, we can call relevant type object APIs to make changes. In contrast, with configuration-based development, the configurations generated by <code>generateConfig</code> are simple configuration objects. By modifying the properties of these objects, we can affect the 3D scene and make changes to the objects. Simply update the generated configuration to reflect the changes.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// other code</span></span>
<span class="line"><span style="color:#E1E4E8;">box.position.x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">40</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">mesh.rotation.y </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Math.</span><span style="color:#79B8FF;">PI</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">boxMaterial.color </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;rgb(0, 0, 255)&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">scene.children.</span><span style="color:#B392F0;">pop</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// other code</span></span>
<span class="line"><span style="color:#24292E;">box.position.x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">40</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">mesh.rotation.y </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Math.</span><span style="color:#005CC5;">PI</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">boxMaterial.color </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;rgb(0, 0, 255)&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">scene.children.</span><span style="color:#6F42C1;">pop</span><span style="color:#24292E;">();</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Note that you should avoid directly replacing the reference objects within the configuration object generated by <code>generateConfig</code>. For example:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark has-highlighted-lines vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">mesh</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">MESH</span><span style="color:#E1E4E8;">);</span></span>
<span class="line highlighted"><span style="color:#E1E4E8;">mesh.position </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { x: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">, y: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">, z: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;"> };</span></span></code></pre><pre class="shiki github-light has-highlighted-lines vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">mesh</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">MESH</span><span style="color:#24292E;">);</span></span>
<span class="line highlighted"><span style="color:#24292E;">mesh.position </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { x: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">, y: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">, z: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;"> };</span></span></code></pre></div><p>The main reasons are:</p><ol><li><p>Replacing the entire reference directly can incur additional performance overhead (due to the creation of duplicate objects).</p></li><li><p>Directly replacing the reference may result in the loss of object tracking within the relevant module (loss of reference type pointers).</p></li><li><p>When updating the configuration object version, new configuration properties may be missing (the new version has added a property <code>w</code> in <code>position</code>).</p></li></ol><p>Correct handling:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">mesh</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">MESH</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">mesh.position.x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">mesh.position.y </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">mesh.position.z </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">mesh</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">MESH</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">mesh.position.x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">mesh.position.y </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">mesh.position.z </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">;</span></span></code></pre></div></div><h2 id="plugin-configuration" tabindex="-1">Plugin Configuration <a class="header-anchor" href="#plugin-configuration" aria-label="Permalink to &quot;Plugin Configuration&quot;">​</a></h2><p>Some configurations are not part of the <code>module</code> package, such as the configuration for <code>WebGLRenderer</code>. Since these configurations require corresponding plugins, the ability to configure them is handled through related plugin strategies. Most of these plugin strategies are provided by <code>@vis-three/xxxx-support</code>. Let&#39;s configure <code>WebGLRenderer</code> now.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">npm i @vis-three/strategy-webgl-renderer-support</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">npm i @vis-three/strategy-webgl-renderer-support</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// import code...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//...,</span></span>
<span class="line"><span style="color:#E1E4E8;">    renderer,</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/library-module&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {WebGLRendererSupportStrategy} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/strategy-webgl-renderer-support&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">engine</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineEngineSupport</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    plugins: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">WebGLRendererPlugin</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">            antialias: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            alpha: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        }),</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    strategy: [</span><span style="color:#B392F0;">WebGLRenderStrategy</span><span style="color:#E1E4E8;">(), </span><span style="color:#B392F0;">WebGLRendererSupportStrategy</span><span style="color:#E1E4E8;">()],</span></span>
<span class="line"><span style="color:#E1E4E8;">    modules: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#E1E4E8;">        renderer,</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">engine.</span><span style="color:#B392F0;">applyConfig</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">WEBGLRENDERER</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">        clearColor: </span><span style="color:#9ECBFF;">&quot;rgba(255 ,255 ,255 , 1)&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        shadowMap: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            enabled: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// import code...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//...,</span></span>
<span class="line"><span style="color:#24292E;">    renderer,</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/library-module&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {WebGLRendererSupportStrategy} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/strategy-webgl-renderer-support&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">engine</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineEngineSupport</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    plugins: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">WebGLRendererPlugin</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">            antialias: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            alpha: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        }),</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    strategy: [</span><span style="color:#6F42C1;">WebGLRenderStrategy</span><span style="color:#24292E;">(), </span><span style="color:#6F42C1;">WebGLRendererSupportStrategy</span><span style="color:#24292E;">()],</span></span>
<span class="line"><span style="color:#24292E;">    modules: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#24292E;">        renderer,</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">engine.</span><span style="color:#6F42C1;">applyConfig</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">WEBGLRENDERER</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">        clearColor: </span><span style="color:#032F62;">&quot;rgba(255 ,255 ,255 , 1)&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        shadowMap: {</span></span>
<span class="line"><span style="color:#24292E;">            enabled: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">);</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Even for plugin configurations, a corresponding configuration module is required as a foundation. For example, as shown above: <code>import { renderer } from &quot;@vis-three/library-module&quot;;</code></p></div><h2 id="object-animation" tabindex="-1">Object Animation <a class="header-anchor" href="#object-animation" aria-label="Permalink to &quot;Object Animation&quot;">​</a></h2><p>Object animations can be implemented using the native approach, but we prefer to leverage the advantages of configuration-based methods. This way, when saving and restoring scenes, we can take advantage of the configuration features for direct recovery.</p><p>In the animations provided by <code>vis-three</code>, there are currently two types of animations: <code>ScriptAnimation</code> and <code>MixerAnimation</code>.</p><p>For simple animations or those with clear business characteristics, <code>ScriptAnimation</code> is generally very convenient and efficient. However, <code>ScriptAnimation</code> requires specific animation libraries and methods to be supported. We need to first register the required animations before invoking them.</p><p>Let&#39;s start by installing the script animation library provided by the official documentation.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">npm i @vis-three/library-animate-script</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">npm i @vis-three/library-animate-script</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// import ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#E1E4E8;">    animation,</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/library-module&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {AniScriptGeneratorManager} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/middleware&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {linearTime} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/library-animate-script&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">AniScriptGeneratorManager.</span><span style="color:#B392F0;">register</span><span style="color:#E1E4E8;">(linearTime);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">engine</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineEngineSupport</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#E1E4E8;">    modules: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// ...,</span></span>
<span class="line"><span style="color:#E1E4E8;">        animation,</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">box</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">MESH</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">    material: boxMaterial.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        x: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">SCRIPTANIMATION</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        target: box.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">        attribute: </span><span style="color:#9ECBFF;">&quot;.rotation.y&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        script: AniScriptGeneratorManager.</span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;linearTime&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">            multiply: </span><span style="color:#79B8FF;">1.5</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        }),</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        strict: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// import ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#24292E;">    animation,</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/library-module&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {AniScriptGeneratorManager} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/middleware&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {linearTime} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/library-animate-script&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">AniScriptGeneratorManager.</span><span style="color:#6F42C1;">register</span><span style="color:#24292E;">(linearTime);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">engine</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineEngineSupport</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#24292E;">    modules: [</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// ...,</span></span>
<span class="line"><span style="color:#24292E;">        animation,</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">box</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">MESH</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#24292E;">    material: boxMaterial.vid,</span></span>
<span class="line"><span style="color:#24292E;">    position: {</span></span>
<span class="line"><span style="color:#24292E;">        x: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">SCRIPTANIMATION</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        target: box.vid,</span></span>
<span class="line"><span style="color:#24292E;">        attribute: </span><span style="color:#032F62;">&quot;.rotation.y&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        script: AniScriptGeneratorManager.</span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;linearTime&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">            multiply: </span><span style="color:#005CC5;">1.5</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        }),</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        strict: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">);</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Note that for unknown configuration environments, you need to disable the strict mode of <code>generateConfig</code>, otherwise, configuration merging will not be possible.</p><p>Unknown configuration environments refer to those where the full configuration cannot be known in advance or predefined.</p></div><h2 id="object-events" tabindex="-1">Object Events <a class="header-anchor" href="#object-events" aria-label="Permalink to &quot;Object Events&quot;">​</a></h2><p>For object events, the configuration process is similar to that of object animations. We need to register the relevant event methods beforehand.</p><p>Below is an example where clicking on the wireframe will cause the cube to move along the x-axis in real-time.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">npm i @vis-three/library-event</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">npm i @vis-three/library-event</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// import ...</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {EventGeneratorManager} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/middleware&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> EventLibrary </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/library-event&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">EventGeneratorManager.</span><span style="color:#B392F0;">register</span><span style="color:#E1E4E8;">(EventLibrary.moveSpacing);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">engine</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineEngineSupport</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">box</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">MESH</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">    material: boxMaterial.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        x: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boxMoveEvent</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> EventGeneratorManager.</span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;moveSpacing&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    params: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        target: box.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">        spacing: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            x: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            y: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            z: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">LINE</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">        click: [boxMoveEvent],</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        strict: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// import ...</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {EventGeneratorManager} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/middleware&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> EventLibrary </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/library-event&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">EventGeneratorManager.</span><span style="color:#6F42C1;">register</span><span style="color:#24292E;">(EventLibrary.moveSpacing);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">engine</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineEngineSupport</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">box</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">MESH</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#24292E;">    material: boxMaterial.vid,</span></span>
<span class="line"><span style="color:#24292E;">    position: {</span></span>
<span class="line"><span style="color:#24292E;">        x: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boxMoveEvent</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> EventGeneratorManager.</span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;moveSpacing&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    params: {</span></span>
<span class="line"><span style="color:#24292E;">        target: box.vid,</span></span>
<span class="line"><span style="color:#24292E;">        spacing: {</span></span>
<span class="line"><span style="color:#24292E;">            x: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            y: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            z: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">LINE</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#24292E;">        click: [boxMoveEvent],</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        strict: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span></code></pre></div><h2 id="model-import" tabindex="-1">Model Import <a class="header-anchor" href="#model-import" aria-label="Permalink to &quot;Model Import&quot;">​</a></h2><p>For model import, we need to install resource parsers in advance. Why use parsers?</p><p>In configuration-based development, all object entities are introduced into the engine in a configuration form. For different business scenarios, we might prepare different configuration modules while using the same batch of external resources like models. Thus, we can use different parsers to meet specific business needs.</p><p>In other words, the process for applying external resources in a configuration-based approach involves:</p><p><code>External resource (models, etc.) loading</code> -&gt; <code>Parser parses into corresponding configuration sheet</code> -&gt;</p><p><code>Configuration sheet preprocessing</code> -&gt; <code>Configuration sheet application</code></p><p>For general model resource application, the official documentation provides corresponding parser libraries for use:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">npm i @vis-three/library-parser</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">npm i @vis-three/library-parser</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// import ...</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    Template,</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/middleware&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> ModuleLibrary </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/library-module&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">engine</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineEngineSupport</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#E1E4E8;">    modules: Object.</span><span style="color:#B392F0;">values</span><span style="color:#E1E4E8;">(ModuleLibrary),</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">engine.loaderManager.</span><span style="color:#B392F0;">setPath</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">meta</span><span style="color:#E1E4E8;">.env.</span><span style="color:#79B8FF;">BASE_URL</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">engine.resourceManager.</span><span style="color:#B392F0;">addParser</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">GLTFResourceParser</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">shoe</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;model/glb/MaterialsVariantsShoe/MaterialsVariantsShoe.gltf&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">engine.</span><span style="color:#B392F0;">loadResourcesAsync</span><span style="color:#E1E4E8;">([shoe]).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    engine.</span><span style="color:#B392F0;">loadConfig</span><span style="color:#E1E4E8;">(Template.</span><span style="color:#B392F0;">observable</span><span style="color:#E1E4E8;">(res.resourceConfig[shoe]));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">rootTemplate</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> res.configMap.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(shoe </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;.scene&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> engine.</span><span style="color:#B392F0;">getConfigBySymbol</span><span style="color:#E1E4E8;">(rootTemplate.vid);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    root.scale.x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">50</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    root.scale.y </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">50</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    root.scale.z </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">50</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// import ...</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    Template,</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/middleware&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> ModuleLibrary </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/library-module&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">engine</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineEngineSupport</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#24292E;">    modules: Object.</span><span style="color:#6F42C1;">values</span><span style="color:#24292E;">(ModuleLibrary),</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">engine.loaderManager.</span><span style="color:#6F42C1;">setPath</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">import</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">meta</span><span style="color:#24292E;">.env.</span><span style="color:#005CC5;">BASE_URL</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">engine.resourceManager.</span><span style="color:#6F42C1;">addParser</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">GLTFResourceParser</span><span style="color:#24292E;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">shoe</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;model/glb/MaterialsVariantsShoe/MaterialsVariantsShoe.gltf&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">engine.</span><span style="color:#6F42C1;">loadResourcesAsync</span><span style="color:#24292E;">([shoe]).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">((</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    engine.</span><span style="color:#6F42C1;">loadConfig</span><span style="color:#24292E;">(Template.</span><span style="color:#6F42C1;">observable</span><span style="color:#24292E;">(res.resourceConfig[shoe]));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">rootTemplate</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> res.configMap.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(shoe </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;.scene&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">root</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> engine.</span><span style="color:#6F42C1;">getConfigBySymbol</span><span style="color:#24292E;">(rootTemplate.vid);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    root.scale.x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">50</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    root.scale.y </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">50</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    root.scale.z </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">50</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><ul><li><p>For parsers, we need to register them with <code>engine.resourceManager</code>, which is the <strong>resource manager</strong> of the configuration engine.</p></li><li><p>For objects loaded after completion, you need to locate their relevant configurations via URL, as many resources may be loaded simultaneously.</p></li><li><p>For the obtained configuration sheets, we need to process them into reactive objects that are usable by the <code>engine</code>. You can directly use methods from the provided <code>Template</code> object.</p></li><li><p>Other approaches are similar to those in configuration-based development. You just need to find the relevant configurations to operate on them.</p></li></ul></div><h2 id="generated-resources" tabindex="-1">Generated Resources <a class="header-anchor" href="#generated-resources" aria-label="Permalink to &quot;Generated Resources&quot;">​</a></h2><p>What are generated resources? These are resources that are not persistent but are generated at runtime, such as <code>CanvasTexture</code>.</p><p>A key issue with generated resources is that they cannot be accessed through a <code>Loader</code>. <code>vis-three</code> classifies external resources into two types: loadable resources and non-loadable resources.</p><ul><li><p><strong>Loadable Resources</strong>: These need to be loaded through a <code>loader</code>. To use them, you must provide the appropriate <code>loader</code> and inject it into the <code>loaderManager</code>.</p></li><li><p><strong>Non-Loadable Resources</strong>: For example, <code>canvas</code> and <code>dom</code> elements, generally do not have related <code>loaders</code>. These can be directly registered through <code>resourceManager</code>.</p></li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#E1E4E8;">    HTMLCanvasElementParser,</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/library-parser&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {CanvasGenerator} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/convenient&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">engine</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineEngineSupport</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">engine.resourceManager.</span><span style="color:#B392F0;">addParser</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HTMLCanvasElementParser</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">textCanvas</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CanvasGenerator</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">draw</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">ctx</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.fillStyle </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;white&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.</span><span style="color:#B392F0;">fillRect</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">512</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">512</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.</span><span style="color:#B392F0;">translate</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">256</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">256</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.textBaseline </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;middle&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.textAlign </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;center&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.fillStyle </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;black&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.font </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot; bold 52px 微软雅黑&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.</span><span style="color:#B392F0;">fillText</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Hello vis-three&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">preview</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">getDom</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">engine.</span><span style="color:#B392F0;">registerResources</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    textCanvas,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">canvasTexture</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">CANVASTEXTURE</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    url: </span><span style="color:#9ECBFF;">&quot;textCanvas&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boxMaterial</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">MESHSTANDARDMATERIAL</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// color: &quot;rgb(255, 105, 100)&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">    map: canvasTexture.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">box</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">MESH</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">    material: boxMaterial.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">    position: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        x: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#24292E;">    HTMLCanvasElementParser,</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/library-parser&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {CanvasGenerator} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/convenient&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">engine</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineEngineSupport</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">engine.resourceManager.</span><span style="color:#6F42C1;">addParser</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HTMLCanvasElementParser</span><span style="color:#24292E;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">textCanvas</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CanvasGenerator</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">draw</span><span style="color:#24292E;">((</span><span style="color:#E36209;">ctx</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        ctx.fillStyle </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;white&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        ctx.</span><span style="color:#6F42C1;">fillRect</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">512</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">512</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        ctx.</span><span style="color:#6F42C1;">translate</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">256</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">256</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        ctx.textBaseline </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;middle&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        ctx.textAlign </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;center&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        ctx.fillStyle </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;black&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        ctx.font </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot; bold 52px 微软雅黑&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        ctx.</span><span style="color:#6F42C1;">fillText</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Hello vis-three&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">preview</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">getDom</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">engine.</span><span style="color:#6F42C1;">registerResources</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    textCanvas,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">canvasTexture</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">CANVASTEXTURE</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    url: </span><span style="color:#032F62;">&quot;textCanvas&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boxMaterial</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">MESHSTANDARDMATERIAL</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// color: &quot;rgb(255, 105, 100)&quot;,</span></span>
<span class="line"><span style="color:#24292E;">    map: canvasTexture.vid,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">box</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">MESH</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">    geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#24292E;">    material: boxMaterial.vid,</span></span>
<span class="line"><span style="color:#24292E;">    position: {</span></span>
<span class="line"><span style="color:#24292E;">        x: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// ...</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><ul><li>For resources like <code>canvas</code>, the official documentation provides convenient tools integrated through <code>@vis-three/convenient</code>.</li><li>Remember to register generated resources using <code>engine.registerResources</code>. Their <code>key</code> is the identifier used during the configuration process.</li></ul></div><h2 id="configuration-saving" tabindex="-1">Configuration Saving <a class="header-anchor" href="#configuration-saving" aria-label="Permalink to &quot;Configuration Saving&quot;">​</a></h2><p>A key feature of configuration-based development is that as long as the relevant configurations are available, the current scene can be replicated anywhere. Therefore, the primary task is to save the configuration sheets.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// other code ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">json</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> engine.</span><span style="color:#B392F0;">toJSON</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// Export the JSON configuration directly</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">jsObject</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> engine.</span><span style="color:#B392F0;">exportConfig</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// Export a clean JavaScript object</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// other code ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">json</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> engine.</span><span style="color:#6F42C1;">toJSON</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// Export the JSON configuration directly</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">jsObject</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> engine.</span><span style="color:#6F42C1;">exportConfig</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// Export a clean JavaScript object</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Many requirements involve performing unified operations on the configuration sheets before saving. You can directly operate on the <code>jsObject</code> object. The <code>jsObject</code> exported by <code>exportConfig</code> is a deep copy and will not affect the runtime configuration.</p></div><h2 id="scene-restoration" tabindex="-1">Scene Restoration <a class="header-anchor" href="#scene-restoration" aria-label="Permalink to &quot;Scene Restoration&quot;">​</a></h2><p>How can we restore an entire scene from a configuration sheet? We can achieve this with just a few <code>API</code> calls!</p><p>Of course, if you are using a custom <code>engine</code>, don’t forget to prepare the related <code>events</code>, <code>animations</code>, <code>parsers</code>, <code>generated resources</code>, and so on, before importing.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> jsonConfig </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;jsonConfig.json&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {generateConfig, Template, JSONHanlder} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/middleware&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// import</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Template.</span><span style="color:#B392F0;">observable</span><span style="color:#E1E4E8;">(JSONHanlder.</span><span style="color:#B392F0;">clone</span><span style="color:#E1E4E8;">(jsonConfig));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Interface Fetching</span></span>
<span class="line"><span style="color:#E1E4E8;">axios.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;url&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Template.</span><span style="color:#B392F0;">observable</span><span style="color:#E1E4E8;">(JSONHanlder.</span><span style="color:#B392F0;">clone</span><span style="color:#E1E4E8;">(jsonConfig));</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">engine.</span><span style="color:#B392F0;">loadConfig</span><span style="color:#E1E4E8;">(config, (</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// do something</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">engine.</span><span style="color:#B392F0;">loadConfigAsync</span><span style="color:#E1E4E8;">(config).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// do something</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> jsonConfig </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;jsonConfig.json&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {generateConfig, Template, JSONHanlder} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/middleware&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// import</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">config</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Template.</span><span style="color:#6F42C1;">observable</span><span style="color:#24292E;">(JSONHanlder.</span><span style="color:#6F42C1;">clone</span><span style="color:#24292E;">(jsonConfig));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Interface Fetching</span></span>
<span class="line"><span style="color:#24292E;">axios.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;url&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">((</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">config</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Template.</span><span style="color:#6F42C1;">observable</span><span style="color:#24292E;">(JSONHanlder.</span><span style="color:#6F42C1;">clone</span><span style="color:#24292E;">(jsonConfig));</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">engine.</span><span style="color:#6F42C1;">loadConfig</span><span style="color:#24292E;">(config, (</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// do something</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">engine.</span><span style="color:#6F42C1;">loadConfigAsync</span><span style="color:#24292E;">(config).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">((</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// do something</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><ol><li><p>Before applying the configuration, we need to process it using <code>JSONHandler</code> because certain numeric objects like <code>Infinity</code> and <code>-Infinity</code> may be lost during the standard <code>JSON</code> serialization process and require special handling.</p></li><li></li></ol><p>Many use cases involve additional processing of the configuration after it has been imported. Therefore, the current loading function does not automatically convert the configuration to a reactive format. This needs to be done manually using the <code>Template</code> methods.</p></div><h2 id="custom-configuration" tabindex="-1">Custom Configuration <a class="header-anchor" href="#custom-configuration" aria-label="Permalink to &quot;Custom Configuration&quot;">​</a></h2><p>Sometimes, we want to include custom data or configuration options in the generated configuration that can be used by the UI or other methods for adjustments. However, we may not want these custom options to be captured by the configuration mechanism and trigger default reactive methods. In <code>vis-three</code>, there is a default property called <code>meta</code> in the generated configuration that is unaffected by the configuration mechanism. We can add relevant properties and methods to this <code>meta</code> property.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// code...</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">box</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">MESH</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">        material: boxMaterial.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">        position: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            x: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        meta: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            userId: </span><span style="color:#79B8FF;">123456</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            status: </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            data: {</span></span>
<span class="line"><span style="color:#E1E4E8;">                title: </span><span style="color:#9ECBFF;">&quot;节点1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            },</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        strict: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(box);</span></span>
<span class="line"><span style="color:#6A737D;">// code...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// code...</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">box</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">MESH</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        geometry: commonGeometry.vid,</span></span>
<span class="line"><span style="color:#24292E;">        material: boxMaterial.vid,</span></span>
<span class="line"><span style="color:#24292E;">        position: {</span></span>
<span class="line"><span style="color:#24292E;">            x: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        meta: {</span></span>
<span class="line"><span style="color:#24292E;">            userId: </span><span style="color:#005CC5;">123456</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            status: </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            data: {</span></span>
<span class="line"><span style="color:#24292E;">                title: </span><span style="color:#032F62;">&quot;节点1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            },</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        strict: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(box);</span></span>
<span class="line"><span style="color:#6A737D;">// code...</span></span></code></pre></div><p>We can see from the <code>console.log</code> output that the data under <code>box.meta</code> is not proxied.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Make sure to disable strict mode.</p></div><h2 id="business-modules" tabindex="-1">Business Modules <a class="header-anchor" href="#business-modules" aria-label="Permalink to &quot;Business Modules&quot;">​</a></h2><p>The official configuration modules may not cover all business needs or might not be convenient for all scenarios. You can create custom configuration modules tailored to your specific business requirements.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// ./MyModule.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">boardProcessor</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineProcessor</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: </span><span style="color:#9ECBFF;">&quot;Board&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: </span><span style="color:#9ECBFF;">&quot;board&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    object: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#E1E4E8;">    processor: [boardProcessor],</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// ./MyModule.js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boardProcessor</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineProcessor</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    type: </span><span style="color:#032F62;">&quot;Board&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    type: </span><span style="color:#032F62;">&quot;board&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    object: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#24292E;">    processor: [boardProcessor],</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> MyModule </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./MyModule.js&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">engine</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">defineEngineSupport</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#E1E4E8;">    modules: [MyModule],</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">board</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CONFIGTYPE</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">BOARD</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> MyModule </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./MyModule.js&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">engine</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">defineEngineSupport</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#24292E;">    modules: [MyModule],</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">board</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CONFIGTYPE</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">BOARD</span><span style="color:#24292E;">);</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>For detailed instructions on developing custom modules, please refer to the documentation: <a href="./module.html">Custom Configuration Modules</a></p></div>`,86),e=[o];function t(c,r,E,i,y,d){return n(),a("div",null,e)}const F=s(p,[["render",t]]);export{u as __pageData,F as default};
