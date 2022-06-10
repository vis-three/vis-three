import {
  generateConfig,
  ModelingEngineSupport,
  RendererDataSupport,
  CONFIGTYPE,
  JSONHandler,
} from "@vis-three";

export const engine = new ModelingEngineSupport();

generateConfig.injectEngine = engine;

generateConfig(CONFIGTYPE.WEBGLRENDERER, {
  clearColor: "rgba(28, 9, 29, 1)",
  physicallyCorrectLights: true,
});

generateConfig(CONFIGTYPE.ORBITCONTROLS, {
  target: {
    x: 0,
    y: 0,
    z: 0,
  },
});

const scene = generateConfig(CONFIGTYPE.SCENE);

generateConfig.injectScene = scene.vid;

engine.setScene(scene.vid);

console.log(engine);

generateConfig(CONFIGTYPE.AMBIENTLIGHT, {
  intensity: 1,
});

const camera = generateConfig(CONFIGTYPE.PERSPECTIVECAMERA, {
  far: 500,
  near: 0.01,
  position: {
    x: 0,
    y: 60,
    z: 190,
  },
});

// engine.setCamera(camera.vid);

engine.loadResourcesAsync(["/model/three.obj"]).then((res) => {
  console.log(res);
  const resourceConfig = res.resourceConfig;

  const threeGeometry = JSONHandler.clone(
    Object.values(resourceConfig["/model/three.obj"].geometry!)[0]
  );

  const geometry = generateConfig(
    CONFIGTYPE.LOADGEOMETRY,
    Object.assign(threeGeometry, {
      position: {
        y: 1,
      },
      rotation: {
        x: Math.PI / 2,
        y: -(Math.PI / 180) * 30,
      },
      scale: {
        x: 80,
        y: 80,
        z: 80,
      },
    })
  );

  const material = generateConfig(CONFIGTYPE.MESHSTANDARDMATERIAL);

  const mesh = generateConfig(CONFIGTYPE.MESH, {
    geometry: geometry.vid,
    material: material.vid,
  });

  // generateConfig(CONFIGTYPE.ORBITCONTROLS, {
  //   target: mesh.vid,
  // });
});
