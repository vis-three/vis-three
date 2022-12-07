import {
  generateConfig,
  CONFIGTYPE,
  DisplayEngineSupport,
  EventLibrary,
} from "../../../../dist/Vis.es";

describe("object support", () => {
  const engine = new DisplayEngineSupport();

  generateConfig.injectEngine = engine;

  const mesh = generateConfig(CONFIGTYPE.MESH);

  mesh.pointerup.push(
    EventLibrary.generateConfig("moveTo", {
      params: {
        target: mesh.vid,
        position: {
          x: 20,
          y: -10,
          z: 10,
        },
      },
    })
  );

  it("test event add", () => {
    expect(mesh.pointerup[0]).to.have.property(Symbol.for("vis.event"));

    const fun = mesh.pointerup[0][Symbol.for("vis.event")];

    const meshObject = engine.getObjectBySymbol(mesh.vid);

    expect(meshObject).is.not.equal(null);

    const flag = meshObject.hasEventListener("pointerup", fun);

    expect(flag).to.have.equal(true);
  });

  it("test event set", () => {
    const meshObject = engine.getObjectBySymbol(mesh.vid);

    expect(meshObject).is.not.equal(null);

    const fun = mesh.pointerup[0][Symbol.for("vis.event")];

    mesh.pointerup[0].params.position.x = 10;
    console.log(mesh.pointerup[0]);

    const newFun = mesh.pointerup[0][Symbol.for("vis.event")];

    expect(newFun).to.not.have.equal(fun);

    const flag = meshObject.hasEventListener("pointerup", newFun);

    expect(flag).to.have.equal(true);
  });

  it("test event delete", () => {
    const meshObject = engine.getObjectBySymbol(mesh.vid);

    expect(meshObject).is.not.equal(null);

    const fun = mesh.pointerup[0][Symbol.for("vis.event")];

    mesh.pointerup.pop();

    const flag = meshObject.hasEventListener("pointerup", fun);

    expect(flag).to.have.equal(false);
  });
});
