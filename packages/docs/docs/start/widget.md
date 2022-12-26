## 组件化开发

组件化开发目前正处于`alpha`版本中。

```js
import * as THREE from "three";
import { ModelingEngineSupport } from "@vis-three/modeling-engine-support";
import { CanvasGenerator } from "@vis-three/convenient";
import { Widget } from "@vis-three/widget";

const engine = new VIS.ModelingEngineSupport()
  .setDom(document.getElementById("app"))
  .setSize()
  .setStats(true)
  .play();

engine
  .applyConfig(VIS.generateConfig("Scene"))
  .setScene(VIS.uniqueSymbol("Scene"));

const widget = new VIS.Widget({
  name: "test",
  parent: VIS.uniqueSymbol("Scene"),
  load: ["model/glb/MaterialsVariantsShoe/MaterialsVariantsShoe.gltf"],
  resources() {
    return {
      textCanvas: this.textCanvas.getDom(),
    };
  },
  render(g, c, onComputed, onEvent, onResource) {
    const textTexture = g("CanvasTexture", {
      url: "textCanvas",
      minFilter: THREE.LinearMipmapLinearFilter,
    });
    const geometry = g("PlaneGeometry", {
      width: 1,
      height: 20,
    });
    const textGeometry = g("PlaneGeometry", {
      width: 50,
      height: 20,
    });
    const textMaterial = g("MeshBasicMaterial", {
      map: textTexture.vid,
      transparent: true,
      color: onComputed(() => this.color),
      alphaTest: 0.1,
    });

    const shoe = onResource(
      "model/glb/MaterialsVariantsShoe/MaterialsVariantsShoe.gltf"
    );

    shoe.Scene.scale.x = 100;
    shoe.Scene.scale.y = 100;
    shoe.Scene.scale.z = 100;

    return {
      textTexture,
      geometry,
      textGeometry,
      textMaterial,
      ambient: g("AmbientLight"),
      text: g("Mesh", {
        geometry: textGeometry.vid,
        material: textMaterial.vid,
        rotation: {
          x: -Math.PI / 2,
        },
        position: {
          z: 20,
        },
      }),
      ...shoe,
    };
  },
  data(ignore) {
    ignore.textCanvas = true;

    return {
      offset: 1,
      color: "rgb(255, 255, 255)",
      textCanvas: new CanvasGenerator({
        width: 800,
        height: 160,
      }),
    };
  },
  computed: {},
  watch: {
    "Shoe.scale.x": {
      handler() {
        const object = engine.getObjectBySymbol(this.Scene.vid);
        const box = new THREE.Box3().setFromObject(object);
        const width = Number((box.max.x - box.min.x).toFixed(2));
        this.draw(width);
        this.ruleLong.scale.x = width;
      },
      immediate: true,
    },
  },
  methods: {
    draw(number = 0) {
      this.textCanvas.clear().draw((ctx) => {
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "rgb(255, 255, 255)";

        ctx.font = " bold 32px 微软雅黑";
        ctx.fillText(`${number} CM`, 400, 80);
      });
      this.textTexture.needsUpdate = true;
    },
  },
  created() {},
});

// 使用
engine.use(widget);
```
