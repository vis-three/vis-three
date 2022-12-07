export default {
  router: "engine",
  children: [
    "/Engine.html",
    "/ModelingEngine.html",
    "/DisplayEngine.html",
    "/ModelingEngineSupport.html",
    "/DisplayEngineSupport.html",
  ],
  position: {
    x: -70,
    y: 20,
    z: -30,
  },
  rotation: {
    y: (Math.PI / 180) * 35,
  },
};
