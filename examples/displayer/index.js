export default {
  router: "displayer",
  children: ["/TextureDisplayer.html", "/MaterialDisplayer.html"],
  position: {
    x: -70,
    y: -30,
    z: 10,
  },
  rotation: {
    y: (Math.PI / 180) * 35,
  },
};
