export default {
  router: "helper",
  children: [
    "/PointLightHelper.html",
    "/SpotLightHelper.html",
    "/directionalLight.html",
    "/CameraHelper.html",
    "/GroupHelper.html",
  ],
  position: {
    x: 20,
    z: 15,
  },
  rotation: {
    y: (Math.PI / 180) * -25,
  },
};
