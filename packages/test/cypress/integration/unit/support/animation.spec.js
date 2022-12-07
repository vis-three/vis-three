import {
  generateConfig,
  CONFIGTYPE,
  DisplayEngineSupport,
  AniScriptLibrary,
} from "../../../../dist/Vis.es";

describe("animation support", () => {
  const engine = new DisplayEngineSupport();

  generateConfig.injectEngine = engine;

  const object3D = generateConfig(CONFIGTYPE.OBJECT3D);

  let animation;

  it("test script animation add", () => {
    animation = generateConfig("ScriptAnimation", {
      attribute: ".rotation.y",
      script: AniScriptLibrary.generateConfig("linearTime", {
        multiply: 7,
      }),
    });

    const animationFunction = engine.getObjectBySymbol(animation.vid);

    expect(animationFunction).to.have.instanceof(Function);
  });

  it("test script animation set", () => {
    const oldFunction = engine.getObjectBySymbol(animation.vid);

    expect(oldFunction).to.have.instanceof(Function);

    animation.target = object3D.vid;

    const newFunction = engine.getObjectBySymbol(animation.vid);

    expect(newFunction).to.have.instanceof(Function);

    expect(newFunction).to.not.equal(oldFunction);
  });

  it("test script animation remove", () => {
    let animationFunction = engine.getObjectBySymbol(animation.vid);

    expect(animationFunction).to.have.instanceof(Function);

    engine.removeConfigBySymbol(animation.vid);

    animationFunction = engine.getObjectBySymbol(animation.vid);

    expect(animationFunction).to.equal(null);
  });

  it("test script animation restore property before set", () => {
    animation = generateConfig("ScriptAnimation", {
      target: object3D.vid,
      attribute: ".rotation.y",
      script: AniScriptLibrary.generateConfig("linearTime", {
        multiply: 7,
      }),
    });

    const oldFunction = engine.getObjectBySymbol(animation.vid);

    expect(oldFunction).to.have.instanceof(Function);

    const objectTarget = engine.getObjectBySymbol(animation.target);

    expect(objectTarget.isObject3D).to.equal(true);

    cy.wait(500).then(() => {
      engine.stop();

      animation.script.multiply = 8;

      expect(objectTarget.rotation.y).to.equal(0);

      engine.play();

      const newFunction = engine.getObjectBySymbol(animation.vid);

      expect(newFunction).to.have.instanceof(Function);

      expect(newFunction).to.not.equal(oldFunction);
    });
  });

  it("test script animation restore property before remove ", () => {
    animation = generateConfig("ScriptAnimation", {
      target: object3D.vid,
      attribute: ".rotation.y",
      script: AniScriptLibrary.generateConfig("linearTime", {
        multiply: 7,
      }),
    });

    cy.wait(500).then(() => {
      let animationFunction = engine.getObjectBySymbol(animation.vid);

      expect(animationFunction).to.have.instanceof(Function);

      engine.removeConfigBySymbol(animation.vid);

      animationFunction = engine.getObjectBySymbol(animation.vid);

      expect(animationFunction).to.equal(null);

      const objectTarget = engine.getObjectBySymbol(animation.target);

      expect(objectTarget.isObject3D).to.equal(true);
      expect(objectTarget.rotation.y).to.equal(0);
    });
  });
});
