import {
  generateConfig,
  CONFIGTYPE,
  DisplayEngineSupport,
  CanvasGenerator,
} from "../../../../dist/Vis.es";

describe("material support", () => {
  const engine = new DisplayEngineSupport();

  const canvas = new CanvasGenerator().getDom();
  engine.registerResources({
    "example-canvas": canvas,
  });

  generateConfig.injectEngine = engine;

  const canvasTexture = generateConfig(CONFIGTYPE.CANVASTEXTURE, {
    url: "example-canvas",
  });

  const canvasTexture2 = generateConfig(CONFIGTYPE.CANVASTEXTURE, {
    url: "example-canvas",
  });

  const meshStandardMaterial = generateConfig(CONFIGTYPE.MESHSTANDARDMATERIAL, {
    color: "rgb(10, 20, 30)",
    opacity: 0.5,
    metalness: 1,
    map: canvasTexture.vid,
    alphaMap: canvasTexture.vid,
  });

  it("test canvas texture source", () => {
    const canvasTextureObject = engine.getObjectBySymbol(canvasTexture.vid);

    expect(canvasTextureObject).to.not.equal(null);
    expect(canvasTextureObject.image).to.equal(canvas);

    const canvasTextureObject2 = engine.getObjectBySymbol(canvasTexture2.vid);
    expect(canvasTextureObject2).to.not.equal(null);
    expect(canvasTextureObject2.image).to.equal(canvas);
  });

  it("test create meshStandardMaterial basic attribute", () => {
    const meshStandardMaterialObject = engine.getObjectBySymbol(
      meshStandardMaterial.vid
    );

    expect(meshStandardMaterialObject).to.not.equal(null);
    expect(meshStandardMaterialObject).to.have.property("opacity", 0.5);
    expect(meshStandardMaterialObject).to.have.property("metalness", 1);
  });

  it("test create meshStandardMaterial color attribute", () => {
    const meshStandardMaterialObject = engine.getObjectBySymbol(
      meshStandardMaterial.vid
    );

    expect(meshStandardMaterialObject).to.not.equal(null);
    expect(meshStandardMaterialObject).to.have.property("color");

    const color = meshStandardMaterialObject.color;

    expect(color).to.have.property("r", 10 / 255);
    expect(color).to.have.property("g", 20 / 255);
    expect(color).to.have.property("b", 30 / 255);
  });

  it("test create meshStandardMaterial map attribute", () => {
    const meshStandardMaterialObject = engine.getObjectBySymbol(
      meshStandardMaterial.vid
    );

    const canvasTextureObject = engine.getObjectBySymbol(canvasTexture.vid);

    expect(meshStandardMaterialObject).to.not.equal(null);
    expect(canvasTextureObject).to.not.equal(null);

    expect(meshStandardMaterialObject).to.have.property(
      "map",
      canvasTextureObject
    );
    expect(meshStandardMaterialObject).to.have.property(
      "alphaMap",
      canvasTextureObject
    );
  });

  it("test set meshStandardMaterial basic attribute", () => {
    const meshStandardMaterialObject = engine.getObjectBySymbol(
      meshStandardMaterial.vid
    );

    expect(meshStandardMaterialObject).to.not.equal(null);

    meshStandardMaterial.opacity = 0.8;

    expect(meshStandardMaterialObject).to.have.property("opacity", 0.8);

    meshStandardMaterial.metalness = 0.5;

    expect(meshStandardMaterialObject).to.have.property("metalness", 0.5);
  });

  it("test set meshStandardMaterial color attribute", () => {
    const meshStandardMaterialObject = engine.getObjectBySymbol(
      meshStandardMaterial.vid
    );

    expect(meshStandardMaterialObject).to.not.equal(null);

    meshStandardMaterial.color = "rgb(30, 20, 10)";

    expect(meshStandardMaterialObject).to.have.property("color");

    const color = meshStandardMaterialObject.color;

    expect(color).to.have.property("r", 30 / 255);
    expect(color).to.have.property("g", 20 / 255);
    expect(color).to.have.property("b", 10 / 255);
  });

  it("test set meshStandardMaterial map attribute", () => {
    const meshStandardMaterialObject = engine.getObjectBySymbol(
      meshStandardMaterial.vid
    );
    const canvasTextureObject = engine.getObjectBySymbol(canvasTexture2.vid);

    expect(meshStandardMaterialObject).to.not.equal(null);
    expect(canvasTextureObject).to.not.equal(null);

    meshStandardMaterial.map = canvasTexture2.vid;

    expect(meshStandardMaterialObject).to.have.property(
      "map",
      canvasTextureObject
    );
  });
});
