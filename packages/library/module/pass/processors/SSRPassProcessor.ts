import { defineProcessor } from "@vis-three/middleware";
import { SSRPass } from "three/examples/jsm/postprocessing/SSRPass";
import { ComposerSupportEngine, PassCompiler } from "../PassCompiler";
import { SSRPassConfig, getSSRPassConfig } from "../PassConfig";
import { Camera, PlaneBufferGeometry, Scene, WebGLRenderer } from "three";
//@ts-ignore
import { ReflectorForSSRPass } from "three/examples/jsm/objects/ReflectorForSSRPass";

let defaultGroundGeometry = new PlaneBufferGeometry(
  window.innerWidth,
  window.innerHeight
);

const setDefaultGroundGeometry = function (config: SSRPassConfig) {
  const newGeometry = new PlaneBufferGeometry(
    config.width ? config.width : window.innerWidth,
    config.height ? config.height : window.innerHeight
  );

  defaultGroundGeometry.copy(newGeometry);
  newGeometry.dispose();

  return defaultGroundGeometry;
};

const generateGround = function (
  config: SSRPassConfig,
  engine: ComposerSupportEngine
) {
  const reflector = new ReflectorForSSRPass(
    engine.getObjectBySymbol(config.groudOption.geometry) ||
      setDefaultGroundGeometry(config),
    {
      color: config.groudOption.color,
      clipBias: config.groudOption.clipBias,
      textureHeight:
        config.groudOption.textureHeight ||
        engine.dom.offsetWidth * window.devicePixelRatio,
      textureWidth:
        config.groudOption.textureWidth ||
        engine.dom.offsetHeight * window.devicePixelRatio,
      multisample: config.groudOption.multisample,
      useDepthTexture: true,
    }
  );

  reflector.material.depthWrite = false;
  reflector.raycast = () => {};
  reflector.visible = false;

  if (reflector.geometry === defaultGroundGeometry) {
    reflector.rotation.x = -Math.PI / 2;
  }

  const scene = config.scene
    ? engine.getObjectBySymbol(config.scene)
    : engine.scene;

  scene.add(reflector);

  return reflector;
};

const disposeGround = function (reflector: ReflectorForSSRPass) {
  reflector.getRenderTarget().dispose();
  reflector.material.dispose();
};

export default defineProcessor<
  SSRPassConfig,
  SSRPass,
  ComposerSupportEngine,
  PassCompiler
>({
  type: "SSRPass",
  config: getSSRPassConfig,
  commands: {
    set: {
      ground({ target, config, value, engine }) {
        if (value && !target.groundReflector) {
          target.groundReflector = generateGround(config, engine);
          return;
        }

        if (!value && target.groundReflector) {
          disposeGround(target.groundReflector);
          target.groundReflector = null;
        }
      },
      groudOption: {
        geometry({ target, config, value, engine }) {
          if (config.ground) {
            if (value) {
              const geometry = engine.getObjectBySymbol(value);
              if (!geometry) {
                console.warn(
                  `SSR pass processor: can not found geometry with: ${value}`
                );
                return;
              }
              target.groundReflector!.geometry = geometry;
            } else {
              target.groundReflector!.geometry =
                setDefaultGroundGeometry(config);
            }
          }
        },
      },
      opacity({ target, value }) {
        if (target.groundReflector) {
          target.groundReflector.opacity = value;
          target.opacity = value;
        } else {
          target.opacity = value;
        }
      },
      maxDistance({ target, value }) {
        if (target.groundReflector) {
          target.groundReflector.maxDistance = value;
          target.maxDistance = value;
        } else {
          target.maxDistance = value;
        }
      },
    },
  },
  create(config, engine) {
    const pixelRatio = window.devicePixelRatio;

    const pass = new SSRPass({
      renderer: config.renderer
        ? (engine.getObjectBySymbol(config.renderer) as WebGLRenderer)
        : engine.webGLRenderer,
      scene: config.scene
        ? (engine.getObjectBySymbol(config.scene) as Scene)
        : engine.scene,
      camera: config.camera
        ? (engine.getObjectBySymbol(config.camera) as Camera)
        : engine.camera,
      width: config.width ? config.width : engine.dom.offsetWidth * pixelRatio,
      height: config.height
        ? config.height
        : engine.dom.offsetHeight * pixelRatio,
      groundReflector: config.ground
        ? generateGround(config, engine)
        : undefined,
      selects: config.selects.map((vid) => engine.getObjectBySymbol(vid)),
      //@ts-ignore
      bouncing: config.bouncing,
    });

    // @ts-ignore
    pass.infiniteThick = config.infiniteThick;
    pass.opacity = config.opacity;
    pass.output = config.output;
    pass.maxDistance = config.maxDistance;
    pass.thickness = config.thickness;

    if (pass.groundReflector) {
      const reflector = pass.groundReflector;
      reflector.opacity = pass.opacity;
      reflector.maxDistance = pass.maxDistance;
    }

    return pass;
  },
  dispose(target) {
    disposeGround(target.groundReflector);
    target.groundReflector = null;
    target.dispose();
    defaultGroundGeometry.dispose();
    //@ts-ignore
    defaultGroundGeometry = undefined;
  },
});
