export default {
  router: "plugin",
  children: [
    "/WebGLRendererPlugin.html",
    "/CSS3DRendererPlugin.html",
    "/AxesHelperPlugin.html",
    "/GridHelperPlugin.html",
    "/ObjectHelperPlugin.html",
    "/ViewpointPlugin.html",
    "/DisplayModePlugin.html",
    "/SelectionPlugin.html",
    "/StatsPlugin.html",
    "/TransformControlsPlugin.html",
  ],
  position: {
    x: -60,
    y: -20,
    z: -20,
  },
  rotation: {
    y: (Math.PI / 180) * 25,
  },
};
