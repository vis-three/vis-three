import {
  generateConfig,
  CONFIGTYPE,
  DisplayEngineSupport,
  MODULETYPE,
  CanvasGenerator,
} from "../../../../dist/Vis.es";

describe("dataSupport", () => {
  const engine = new DisplayEngineSupport();

  const canvas = new CanvasGenerator().getDom();

  engine.registerResources({
    examples: canvas,
  });

  generateConfig.injectEngine = engine;

  const texture = generateConfig(CONFIGTYPE.CANVASTEXTURE, {
    url: "examples",
  });

  const material = generateConfig(CONFIGTYPE.MESHSTANDARDMATERIAL, {
    metalness: 0.5,
    roughness: 0.5,
    color: "rgb(100, 200, 100)",
    transparent: true,
    opacity: 0.5,
    map: texture.vid,
  });

  const geometry = generateConfig(CONFIGTYPE.BOXGEOMETRY, {
    width: 10,
    groups: [
      { start: 0, count: Infinity, materialIndex: 0 },
      { start: 0, count: Infinity, materialIndex: 1 },
    ],
  });

  const mesh = generateConfig(CONFIGTYPE.MESH, {
    material: material.vid,
    geometry: geometry.vid,
    position: {
      x: 1,
    },
  });

  const config = engine.exportConfig();

  it("test export all module", () => {
    for (const key in MODULETYPE) {
      expect(config).to.have.property(MODULETYPE[key]);
    }
  });

  it("test export material and test number, string, boolean", () => {
    expect(config[MODULETYPE.MATERIAL]).to.have.property(material.vid);

    const materialConfig = config[MODULETYPE.MATERIAL][material.vid];

    expect(materialConfig).to.have.include({
      metalness: 0.5,
      roughness: 0.5,
      color: "rgb(100, 200, 100)",
      transparent: true,
      opacity: 0.5,
    });

    expect(materialConfig).to.not.include({ map: "", alphaTest: 0 });
  });

  it("test export geometry and test array includes value of Infinity", () => {
    expect(config[MODULETYPE.GEOMETRY]).to.have.property(geometry.vid);

    const geometryConfig = config[MODULETYPE.GEOMETRY][geometry.vid];

    expect(geometryConfig).to.have.property("width", 10);
    expect(geometryConfig)
      .to.have.property("groups")
      .to.be.an("array")
      .that.to.have.lengthOf(2);

    expect(geometryConfig.groups[0]).to.have.deep.includes(geometry.groups[0]);
    expect(geometryConfig.groups[1]).to.have.deep.includes(geometry.groups[1]);

    expect(geometryConfig).to.not.include({
      position: {},
      scale: {},
      rotation: {},
    });
  });

  it("test export mesh and test object", () => {
    expect(config[MODULETYPE.MESH]).to.have.property(mesh.vid);

    const meshConfig = config[MODULETYPE.MESH][mesh.vid];

    expect(meshConfig).to.have.property("geometry", geometry.vid);
    expect(meshConfig).to.have.property("material", material.vid);
    expect(meshConfig).to.have.deep.property("position", { x: 1 });
  });
});
