import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import {
  generateConfig,
  CONFIGTYPE,
  DisplayEngineSupport,
  ENGINEPLUGIN,
  CSS3DPlane,
} from "../../../../dist/Vis.es";

describe("css3D support", () => {
  it("test css3DRenderer plugin", () => {
    const engine = new DisplayEngineSupport().install(
      ENGINEPLUGIN.CSS3DRENDERER
    );

    expect(engine).to.have.property("css3DRenderer");
    expect(engine.css3DRenderer).instanceOf(CSS3DRenderer);
  });

  it("test CSS3DPlane support generate", () => {
    const exampleDom = document.createElement("div");
    exampleDom.className = "test";

    const engine = new DisplayEngineSupport().install(
      ENGINEPLUGIN.CSS3DRENDERER
    );

    engine.registerResources({
      examples: exampleDom,
    });

    const config = generateConfig(CONFIGTYPE.CSS3DPLANE, {
      element: "examples",
    });

    engine.applyConfig(config);

    const object = engine.getObjectBySymbol(config.vid);

    expect(object).to.not.equal(null);
    expect(object).instanceOf(CSS3DPlane);

    const element = object.element.children[0];

    expect(element).to.have.equal(exampleDom);
    expect(element.className).to.have.equal("test");
  });

  it("test CSS3DPlane support element change", () => {
    const exampleDom1 = document.createElement("div");
    exampleDom1.className = "test1";

    const exampleDom2 = document.createElement("div");
    exampleDom2.className = "test2";

    const engine = new DisplayEngineSupport().install(
      ENGINEPLUGIN.CSS3DRENDERER
    );

    engine.registerResources({
      examples1: exampleDom1,
      examples2: exampleDom2,
    });

    const config = engine.reactiveConfig(
      generateConfig(CONFIGTYPE.CSS3DPLANE, {
        element: "examples1",
      })
    );

    const object = engine.getObjectBySymbol(config.vid);

    expect(object).to.not.equal(null);
    expect(object.element.children[0]).to.have.equal(exampleDom1);

    config.element = "examples2";
    expect(object.element.children[0]).to.have.equal(exampleDom2);
  });

  it("test CSS3DObject support width and height change", () => {
    const engine = new DisplayEngineSupport().install(
      ENGINEPLUGIN.CSS3DRENDERER
    );

    const config = engine.reactiveConfig(generateConfig(CONFIGTYPE.CSS3DPLANE));
    const object = engine.getObjectBySymbol(config.vid);

    expect(object).to.not.equal(null);

    config.width = 100;

    expect(object.element.style).to.have.property("width", "100px");

    config.height = 100;

    expect(object.element.style).to.have.property("height", "100px");
  });
});
