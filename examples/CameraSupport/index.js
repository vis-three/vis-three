export default {
  router: "CameraSupport",
  children: [
    "/PerspectiveCameraSupport.html",
    "/OrthographicCameraSupport.html",
  ],
  position: {
    x: 15,
    y: -25,
    z: -15,
  },
  rotation: {
    y: (Math.PI / 180) * -15,
  },
};
