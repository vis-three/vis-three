export default {
  router: "manager",
  children: [
    "/EventManager.html",
    "/LoaderManager.html",
    "/ResourceManager.html",
  ],
  position: {
    x: 45,
    z: 5,
    y: -30,
  },
  rotation: {
    y: (Math.PI / 180) * -15,
  },
};
