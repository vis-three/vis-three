import{_ as s,o as n,c as a,O as l}from"./chunks/framework.c4814614.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"start/widget.md","filePath":"start/widget.md"}'),p={name:"start/widget.md"},o=l(`<h2 id="组件化开发" tabindex="-1">组件化开发 <a class="header-anchor" href="#组件化开发" aria-label="Permalink to &quot;组件化开发&quot;">​</a></h2><p>组件化开发目前正处于<code>alpha</code>版本中。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> THREE </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;three&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { ModelingEngineSupport } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/modeling-engine-support&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { CanvasGenerator } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/convenient&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Widget } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;@vis-three/widget&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">engine</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">VIS</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">ModelingEngineSupport</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">setDom</span><span style="color:#E1E4E8;">(document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;app&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">setSize</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">setStats</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">play</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">engine</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">applyConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">VIS</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">generateConfig</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Scene&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#B392F0;">setScene</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">VIS</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">uniqueSymbol</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Scene&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">widget</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">VIS</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Widget</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  name: </span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  parent: </span><span style="color:#79B8FF;">VIS</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">uniqueSymbol</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Scene&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">  load: [</span><span style="color:#9ECBFF;">&quot;model/glb/MaterialsVariantsShoe/MaterialsVariantsShoe.gltf&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">resources</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      textCanvas: </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.textCanvas.</span><span style="color:#B392F0;">getDom</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">g</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">c</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">onComputed</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">onEvent</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">onResource</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">textTexture</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">g</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;CanvasTexture&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">      url: </span><span style="color:#9ECBFF;">&quot;textCanvas&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      minFilter: </span><span style="color:#79B8FF;">THREE</span><span style="color:#E1E4E8;">.LinearMipmapLinearFilter,</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">geometry</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">g</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;PlaneGeometry&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">      width: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      height: </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">textGeometry</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">g</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;PlaneGeometry&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">      width: </span><span style="color:#79B8FF;">50</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      height: </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">textMaterial</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">g</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;MeshBasicMaterial&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">      map: textTexture.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">      transparent: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      color: </span><span style="color:#B392F0;">onComputed</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.color),</span></span>
<span class="line"><span style="color:#E1E4E8;">      alphaTest: </span><span style="color:#79B8FF;">0.1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">shoe</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onResource</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&quot;model/glb/MaterialsVariantsShoe/MaterialsVariantsShoe.gltf&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    shoe.Scene.scale.x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    shoe.Scene.scale.y </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    shoe.Scene.scale.z </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      textTexture,</span></span>
<span class="line"><span style="color:#E1E4E8;">      geometry,</span></span>
<span class="line"><span style="color:#E1E4E8;">      textGeometry,</span></span>
<span class="line"><span style="color:#E1E4E8;">      textMaterial,</span></span>
<span class="line"><span style="color:#E1E4E8;">      ambient: </span><span style="color:#B392F0;">g</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;AmbientLight&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">      text: </span><span style="color:#B392F0;">g</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Mesh&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">        geometry: textGeometry.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">        material: textMaterial.vid,</span></span>
<span class="line"><span style="color:#E1E4E8;">        rotation: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          x: </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Math.</span><span style="color:#79B8FF;">PI</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        position: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          z: </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">      }),</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">shoe,</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ignore</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ignore.textCanvas </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      offset: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      color: </span><span style="color:#9ECBFF;">&quot;rgb(255, 255, 255)&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      textCanvas: </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CanvasGenerator</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        width: </span><span style="color:#79B8FF;">800</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        height: </span><span style="color:#79B8FF;">160</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      }),</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  computed: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">  watch: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;Shoe.scale.x&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">handler</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">object</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> engine.</span><span style="color:#B392F0;">getObjectBySymbol</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.Scene.vid);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">box</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">THREE</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">Box3</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">setFromObject</span><span style="color:#E1E4E8;">(object);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">width</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Number</span><span style="color:#E1E4E8;">((box.max.x </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> box.min.x).</span><span style="color:#B392F0;">toFixed</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">draw</span><span style="color:#E1E4E8;">(width);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.ruleLong.scale.x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> width;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      immediate: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">draw</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">number</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.textCanvas.</span><span style="color:#B392F0;">clear</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">draw</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">ctx</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.textBaseline </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;middle&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.textAlign </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;center&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.fillStyle </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;rgb(255, 255, 255)&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.font </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot; bold 32px 微软雅黑&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        ctx.</span><span style="color:#B392F0;">fillText</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`\${</span><span style="color:#E1E4E8;">number</span><span style="color:#9ECBFF;">} CM\`</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">400</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      });</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.textTexture.needsUpdate </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">created</span><span style="color:#E1E4E8;">() {},</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 使用</span></span>
<span class="line"><span style="color:#E1E4E8;">engine.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(widget);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> THREE </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;three&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { ModelingEngineSupport } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/modeling-engine-support&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { CanvasGenerator } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/convenient&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Widget } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;@vis-three/widget&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">engine</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">VIS</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">ModelingEngineSupport</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">setDom</span><span style="color:#24292E;">(document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;app&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">setSize</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">setStats</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">play</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">engine</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">applyConfig</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">VIS</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">generateConfig</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Scene&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#6F42C1;">setScene</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">VIS</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">uniqueSymbol</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Scene&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">widget</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">VIS</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">Widget</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  name: </span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  parent: </span><span style="color:#005CC5;">VIS</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">uniqueSymbol</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Scene&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">  load: [</span><span style="color:#032F62;">&quot;model/glb/MaterialsVariantsShoe/MaterialsVariantsShoe.gltf&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">resources</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      textCanvas: </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.textCanvas.</span><span style="color:#6F42C1;">getDom</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(</span><span style="color:#E36209;">g</span><span style="color:#24292E;">, </span><span style="color:#E36209;">c</span><span style="color:#24292E;">, </span><span style="color:#E36209;">onComputed</span><span style="color:#24292E;">, </span><span style="color:#E36209;">onEvent</span><span style="color:#24292E;">, </span><span style="color:#E36209;">onResource</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">textTexture</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">g</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;CanvasTexture&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">      url: </span><span style="color:#032F62;">&quot;textCanvas&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      minFilter: </span><span style="color:#005CC5;">THREE</span><span style="color:#24292E;">.LinearMipmapLinearFilter,</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">geometry</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">g</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;PlaneGeometry&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">      width: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      height: </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">textGeometry</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">g</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;PlaneGeometry&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">      width: </span><span style="color:#005CC5;">50</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      height: </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">textMaterial</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">g</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;MeshBasicMaterial&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">      map: textTexture.vid,</span></span>
<span class="line"><span style="color:#24292E;">      transparent: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      color: </span><span style="color:#6F42C1;">onComputed</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.color),</span></span>
<span class="line"><span style="color:#24292E;">      alphaTest: </span><span style="color:#005CC5;">0.1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">shoe</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onResource</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&quot;model/glb/MaterialsVariantsShoe/MaterialsVariantsShoe.gltf&quot;</span></span>
<span class="line"><span style="color:#24292E;">    );</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    shoe.Scene.scale.x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    shoe.Scene.scale.y </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    shoe.Scene.scale.z </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      textTexture,</span></span>
<span class="line"><span style="color:#24292E;">      geometry,</span></span>
<span class="line"><span style="color:#24292E;">      textGeometry,</span></span>
<span class="line"><span style="color:#24292E;">      textMaterial,</span></span>
<span class="line"><span style="color:#24292E;">      ambient: </span><span style="color:#6F42C1;">g</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;AmbientLight&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">      text: </span><span style="color:#6F42C1;">g</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Mesh&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">        geometry: textGeometry.vid,</span></span>
<span class="line"><span style="color:#24292E;">        material: textMaterial.vid,</span></span>
<span class="line"><span style="color:#24292E;">        rotation: {</span></span>
<span class="line"><span style="color:#24292E;">          x: </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Math.</span><span style="color:#005CC5;">PI</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        position: {</span></span>
<span class="line"><span style="color:#24292E;">          z: </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">      }),</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">shoe,</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">(</span><span style="color:#E36209;">ignore</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    ignore.textCanvas </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      offset: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      color: </span><span style="color:#032F62;">&quot;rgb(255, 255, 255)&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      textCanvas: </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CanvasGenerator</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        width: </span><span style="color:#005CC5;">800</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        height: </span><span style="color:#005CC5;">160</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      }),</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  computed: {},</span></span>
<span class="line"><span style="color:#24292E;">  watch: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;Shoe.scale.x&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">handler</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">object</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> engine.</span><span style="color:#6F42C1;">getObjectBySymbol</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.Scene.vid);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">box</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">THREE</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">Box3</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">setFromObject</span><span style="color:#24292E;">(object);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">width</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Number</span><span style="color:#24292E;">((box.max.x </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> box.min.x).</span><span style="color:#6F42C1;">toFixed</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">draw</span><span style="color:#24292E;">(width);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.ruleLong.scale.x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> width;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      immediate: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  methods: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">draw</span><span style="color:#24292E;">(</span><span style="color:#E36209;">number</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.textCanvas.</span><span style="color:#6F42C1;">clear</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">draw</span><span style="color:#24292E;">((</span><span style="color:#E36209;">ctx</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        ctx.textBaseline </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;middle&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        ctx.textAlign </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;center&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        ctx.fillStyle </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;rgb(255, 255, 255)&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        ctx.font </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot; bold 32px 微软雅黑&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        ctx.</span><span style="color:#6F42C1;">fillText</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`\${</span><span style="color:#24292E;">number</span><span style="color:#032F62;">} CM\`</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">400</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      });</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.textTexture.needsUpdate </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">created</span><span style="color:#24292E;">() {},</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 使用</span></span>
<span class="line"><span style="color:#24292E;">engine.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(widget);</span></span></code></pre></div>`,3),e=[o];function t(c,E,r,y,i,F){return n(),a("div",null,e)}const B=s(p,[["render",t]]);export{u as __pageData,B as default};
