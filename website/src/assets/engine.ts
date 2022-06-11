import {
  generateConfig,
  ModelingEngineSupport,
  CONFIGTYPE,
  AniScriptLibrary,
  DisplayEngineSupport,
} from "@vis-three";
import { ReinhardToneMapping } from "three";

const dev = false;

export let engine;

if (dev) {
  engine = new ModelingEngineSupport();
} else {
  engine = new DisplayEngineSupport();
}

engine.loaderManager.setPath(import.meta.env.BASE_URL);

(async () => {
  // 外部模型
  const loadeMessage = await engine.loadResourcesAsync([
    "/model/three.obj",
    "/model/vis.obj",
    "/texture/vis/colorMap.png",
    "/skyBox/lightblue/px.png",
    "/skyBox/lightblue/py.png",
    "/skyBox/lightblue/pz.png",
    "/skyBox/lightblue/nx.png",
    "/skyBox/lightblue/ny.png",
    "/skyBox/lightblue/nz.png",
  ]);

  console.log(loadeMessage);

  generateConfig.injectEngine = engine;

  // 引擎配置
  generateConfig(CONFIGTYPE.WEBGLRENDERER, {
    clearColor: "rgba(10, 2, 10, 1)",
    physicallyCorrectLights: true,
    toneMapping: ReinhardToneMapping,
    toneMappingExposure: 3,
  });

  // 控制器
  generateConfig(CONFIGTYPE.ORBITCONTROLS, {
    autoRotate: true,
    rotateSpeed: 0.01,
    enablePan: false,
    enableZoom: false,
    enableRotate: false,
  });

  // 场景

  // 环境贴图
  const envTexture = generateConfig(CONFIGTYPE.CUBETEXTURE, {
    cube: {
      px: "/skyBox/lightblue/px.png",
      py: "/skyBox/lightblue/py.png",
      pz: "/skyBox/lightblue/pz.png",
      nx: "/skyBox/lightblue/nx.png",
      ny: "/skyBox/lightblue/ny.png",
      nz: "/skyBox/lightblue/nz.png",
    },
  });

  const scene = generateConfig(CONFIGTYPE.SCENE, {
    environment: envTexture.vid,
    background: envTexture.vid,
  });

  generateConfig.injectScene = scene.vid;

  // 相机
  const camera = generateConfig(CONFIGTYPE.PERSPECTIVECAMERA, {
    far: 500,
    near: 0.01,
    position: {
      x: 90,
      y: -90,
      z: 100,
    },
  });

  // 光源
  generateConfig(CONFIGTYPE.AMBIENTLIGHT, {
    intensity: 1,
  });

  generateConfig(CONFIGTYPE.DIRECTIONALLIGHT, {
    color: "rgb(255, 255, 255)",
    position: {
      x: -10,
      y: 40,
      z: 20,
    },
    intensity: 800 * 4 * Math.PI,
  });

  generateConfig(CONFIGTYPE.DIRECTIONALLIGHT, {
    color: "rgb(255, 255, 255)",
    position: {
      x: 10,
      y: 40,
      z: -20,
    },
    intensity: 800 * 4 * Math.PI,
  });

  // 自定义装配
  const resourceConfig = loadeMessage.resourceConfig;

  // three logo
  const geometry = generateConfig(
    CONFIGTYPE.LOADGEOMETRY,
    Object.assign(
      Object.values(resourceConfig["/model/three.obj"].geometry!)[0],
      {
        rotation: {
          x: Math.PI / 2,
          y: -(Math.PI / 180) * 30,
        },
        position: {
          x: 0.13,
          y: -0.14,
        },
        scale: {
          x: 80,
          y: 80,
          z: 80,
        },
      }
    )
  );

  const material = generateConfig(CONFIGTYPE.MESHSTANDARDMATERIAL, {
    color: "white",
    metalness: 1,
    roughness: 0,
    envMapIntensity: 0.8,
  });

  const threeMesh = generateConfig(CONFIGTYPE.MESH, {
    geometry: geometry.vid,
    material: material.vid,
  });

  // vis logo
  const visGeometry = generateConfig(
    CONFIGTYPE.LOADGEOMETRY,
    Object.assign(
      Object.values(resourceConfig["/model/vis.obj"].geometry!)[0],
      {
        scale: {
          x: 6,
          y: 6,
          z: 6,
        },
      }
    )
  );

  const visColorTexture = generateConfig(CONFIGTYPE.IMAGETEXTURE, {
    url: "/texture/vis/colorMap.png",
  });

  const visMaterial = generateConfig(CONFIGTYPE.MESHSTANDARDMATERIAL, {
    map: visColorTexture.vid,
    metalness: 1,
    roughness: 0,
    transparent: true,
    opacity: 0.8,
  });

  const visMesh = generateConfig(CONFIGTYPE.MESH, {
    geometry: visGeometry.vid,
    material: visMaterial.vid,
  });

  // 动画
  generateConfig(CONFIGTYPE.SCRIPTANIMATION, {
    target: threeMesh.vid,
    attribute: ".rotation.z",
    script: AniScriptLibrary.generateConfig("linearTime", {
      multiply: 0.2,
    }),
  });

  generateConfig(CONFIGTYPE.SCRIPTANIMATION, {
    target: visMesh.vid,
    attribute: ".rotation.y",
    script: AniScriptLibrary.generateConfig("linearTime", {
      multiply: 0.7,
    }),
  });

  engine.setScene(scene.vid);
  engine.setCamera(camera.vid);
  console.log(engine);
})();
