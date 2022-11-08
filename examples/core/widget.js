import * as THREE from "three";
import * as VIS from "vis-three";

const engine = new VIS.ModelingEngineSupport()
  .setDom(document.getElementById("app"))
  .setSize()
  .setStats(true)
  .play();

engine.loaderManager.setPath(import.meta.env.BASE_URL);

engine.eventManager.recursive = true;

engine.applyConfig(VIS.generateConfig("Scene")).setScene("Scene");

// const point = VIS.Widget.component({
//   name: "point",
//   input: {
//     color: "rgb(255, 0, 0)",
//   },
//   render(g) {
//     const geometry = g("BoxBufferGeometry", {
//       width: 10,
//       height: 10,
//       depth: 10,
//     });

//     const material = g("MeshStandardMaterial", {
//       color: this.color,
//     });

//     return {
//       geometry,
//       material,
//       point: g("Mesh", {
//         geometry: geometry.vid,
//         material: material.vid,
//         position: this.offset + 20,
//       }),
//     };
//   },
//   data() {
//     return {
//       offset: 10,
//     };
//   },
// });

const widget = new VIS.Widget({
  name: "test",
  parent: "Scene",
  load: ["model/glb/MaterialsVariantsShoe/MaterialsVariantsShoe.gltf"],
  resources() {
    return {
      longCanvas: this.longCanvas.getDom(),
      textCanvas: this.textCanvas.getDom(),
    };
  },
  render(g, c, onComputed, onEvent, onResource) {
    console.log(THREE.NearestFilter);
    const longTexture = g("CanvasTexture", {
      url: "longCanvas",
      minFilter: THREE.NearestFilter,
    });
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
    const longMaterial = g("MeshBasicMaterial", {
      map: longTexture.vid,
      transparent: true,
      color: onComputed(() => this.color),
      alphaTest: 0.1,
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
      longTexture,
      textTexture,
      geometry,
      textGeometry,
      longMaterial,
      textMaterial,
      ambient: g("AmbientLight"),
      ruleLong: g("Mesh", {
        geometry: geometry.vid,
        material: longMaterial.vid,
        rotation: {
          x: -Math.PI / 2,
        },
        position: {
          z: 20,
        },
      }),
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
    ignore.longCanvas = true;
    ignore.textCanvas = true;

    const size = {
      width: 800,
      height: 160,
    };

    return {
      offset: 1,
      color: "rgb(255, 255, 255)",
      longCanvas: new VIS.CanvasGenerator(size).draw((ctx) => {
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillRect(0, 75, 800, 5);

        ctx.clearRect(300, 75, 200, 5);
      }),
      textCanvas: new VIS.CanvasGenerator(size).preview({
        top: "5%",
        left: "5%",
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

window.engine = engine;
window.widget = widget;
