import { ReinhardToneMapping } from "three";
import np from "nprogress";
import { ref } from "vue";
import message, { MessageType } from "ant-design-vue/lib/message";
import { DisplayEngineSupport } from "@vis-three/engine-display-support";
import { AniScriptGeneratorManager } from "@vis-three/library-module";
import {
  BeforeLoadEvent,
  CONFIG_TYPE,
  LoadedEvent,
  LoadingEvent,
  generateConfig,
} from "@vis-three/tdcm";
import { linearTime } from "@vis-three/library-animate-script";

import { WebGLRendererConfig } from "@vis-three/strategy-webgl-renderer-support";
import { OrbitControlsConfig } from "@vis-three/strategy-orbit-controls-support";
import { SceneConfig } from "@vis-three/module-scene";
import { PerspectiveCameraConfig } from "@vis-three/module-camera";
import {
  CubeTextureConfig,
  ImageTextureConfig,
} from "@vis-three/module-texture";
import {
  AmbientLightConfig,
  DirectionalLightConfig,
} from "@vis-three/module-light";
import { GeometryConfig, LoadGeometryConfig } from "@vis-three/module-geometry";
import { MeshStandardMaterialConfig } from "@vis-three/module-material";
import { MeshConfig } from "@vis-three/module-mesh";
import { ScriptAnimationConfig } from "@vis-three/module-animation";

export const engine = new DisplayEngineSupport();

console.log(engine);

AniScriptGeneratorManager.register(linearTime);

// engine.loaderManager.setPath(import.meta.env.BASE_URL);

const content = ref<string>(`正在加载3D资源：0%`);
let openMessage: MessageType;
engine.loaderManager.addEventListener<BeforeLoadEvent>("beforeLoad", () => {
  content.value = `正在加载3D资源：0%`;
  openMessage = message.loading({
    content: () => content.value,
    duration: 0,
  });
});

engine.loaderManager.addEventListener<LoadingEvent>("loading", (event) => {
  content.value = `正在加载3D资源：${parseInt(
    ((event.loadSuccess / event.loadTotal) * 100).toString()
  )}
    %`;
});

engine.loaderManager.addEventListener<LoadedEvent>("loaded", (event) => {
  openMessage && openMessage();
  content.value = `正在加载3D资源：0%`;
});

(async () => {
  generateConfig.injectEngine = engine;
  generateConfig.injectScene = true;

  // 引擎配置
  generateConfig<WebGLRendererConfig>(CONFIG_TYPE.WEBGLRENDERER, {
    clearColor: "rgba(10, 2, 10, 1)",
    physicallyCorrectLights: true,
    toneMapping: ReinhardToneMapping,
    toneMappingExposure: 1,
  });

  // 控制器
  generateConfig<OrbitControlsConfig>(CONFIG_TYPE.ORBITCONTROLS, {
    autoRotate: true,
    autoRotateSpeed: 0.5,
    enableDamping: true,
    maxDistance: 200,
    minDistance: 100,
    enablePan: false,
    // enableZoom: false,
    // enableRotate: false,
  });

  // 场景
  const scene = generateConfig<SceneConfig>(CONFIG_TYPE.SCENE);

  engine.setSceneBySymbol(scene.vid);

  // 相机
  const camera = generateConfig<PerspectiveCameraConfig>(
    CONFIG_TYPE.PERSPECTIVECAMERA,
    {
      far: 10000,
      near: 0.01,
      position: {
        x: 90,
        y: -90,
        z: 100,
      },
    }
  );

  engine.setCameraBySymbol(camera.vid).setSize();

  // 外部资源
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

  // 环境贴图
  const envTexture = generateConfig<CubeTextureConfig>(
    CONFIG_TYPE.CUBETEXTURE,
    {
      cube: {
        px: "/skyBox/lightblue/px.png",
        py: "/skyBox/lightblue/py.png",
        pz: "/skyBox/lightblue/pz.png",
        nx: "/skyBox/lightblue/nx.png",
        ny: "/skyBox/lightblue/ny.png",
        nz: "/skyBox/lightblue/nz.png",
      },
    }
  );

  scene.background = envTexture.vid;
  scene.environment = envTexture.vid;

  // 光源
  generateConfig<AmbientLightConfig>(CONFIG_TYPE.AMBIENTLIGHT, {
    intensity: 1,
  });

  generateConfig<DirectionalLightConfig>(CONFIG_TYPE.DIRECTIONALLIGHT, {
    color: "rgb(255, 255, 255)",
    position: {
      x: -10,
      y: 40,
      z: 20,
    },
    intensity: 1000 * 4 * Math.PI,
  });

  generateConfig<DirectionalLightConfig>(CONFIG_TYPE.DIRECTIONALLIGHT, {
    color: "rgb(255, 255, 255)",
    position: {
      x: 10,
      y: 40,
      z: -20,
    },
    intensity: 1000 * 4 * Math.PI,
  });

  // 自定义装配
  const resourceConfig = loadeMessage.resourceConfig;

  // three logo
  const geometry = generateConfig<LoadGeometryConfig>(
    CONFIG_TYPE.LOADGEOMETRY,
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

  const material = generateConfig<MeshStandardMaterialConfig>(
    CONFIG_TYPE.MESHSTANDARDMATERIAL,
    {
      color: "white",
      metalness: 1,
      roughness: 0,
      envMapIntensity: 0.8,
    }
  );

  const threeMesh = generateConfig<MeshConfig>(CONFIG_TYPE.MESH, {
    geometry: geometry.vid,
    material: material.vid,
  });

  // vis logo
  const visGeometry = generateConfig<LoadGeometryConfig>(
    CONFIG_TYPE.LOADGEOMETRY,
    Object.assign(
      Object.values(
        resourceConfig["/model/vis.obj"].geometry!
      )[0] as GeometryConfig,
      {
        scale: {
          x: 6,
          y: 6,
          z: 6,
        },
      }
    )
  );

  const visColorTexture = generateConfig<ImageTextureConfig>(
    CONFIG_TYPE.IMAGETEXTURE,
    {
      url: "/texture/vis/colorMap.png",
    }
  );

  const visMaterial = generateConfig<MeshStandardMaterialConfig>(
    CONFIG_TYPE.MESHSTANDARDMATERIAL,
    {
      map: visColorTexture.vid,
      metalness: 1,
      roughness: 0,
      transparent: true,
      opacity: 0.8,
    }
  );

  const visMesh = generateConfig<MeshConfig>(CONFIG_TYPE.MESH, {
    geometry: visGeometry.vid,
    material: visMaterial.vid,
  });

  // 动画
  generateConfig<ScriptAnimationConfig>(
    CONFIG_TYPE.SCRIPTANIMATION,
    {
      target: threeMesh.vid,
      attribute: ".rotation.z",
      script: AniScriptGeneratorManager.generateConfig("linearTime", {
        multiply: 0.2,
      }),
    },
    {
      strict: false,
    }
  );

  generateConfig<ScriptAnimationConfig>(
    CONFIG_TYPE.SCRIPTANIMATION,
    {
      target: visMesh.vid,
      attribute: ".rotation.y",
      script: AniScriptGeneratorManager.generateConfig("linearTime", {
        multiply: 0.7,
      }),
    },
    {
      strict: false,
    }
  );

  np.done();
})();
