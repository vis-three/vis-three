import { generateConfig } from "../../../../src/convenient/generateConfig";
import { CONFIGTYPE } from "../../../../src/middleware/constants/CONFIGTYPE";

describe("generateConfig", () => {
  it("test generateConfig have config type config", () => {
    const consoleError = cy.spy(window.console, "error");

    const meshConfig = generateConfig(CONFIGTYPE.MESH);
    expect(meshConfig).to.have.property("type", CONFIGTYPE.MESH);

    generateConfig("other");
    expect(consoleError).to.be.calledOnce;
  });

  it("test generateConfig params merge", () => {
    const meshConfig = generateConfig(CONFIGTYPE.MESH, {
      material: "test",
      position: {
        x: 5,
      },
    });

    expect(meshConfig).to.have.property("material", "test");
    expect(meshConfig).to.have.property("position");
    // expect(meshConfig.position).to.have.property("x", 5);
  });

  it("test generateConfig merge null attribute", () => {
    const rendererConfig = generateConfig(CONFIGTYPE.WEBGLRENDERER, {
      viewport: {
        enabled: true,
        autoUpdate: true,
        needsUpdate: true,
        type: 1,
      },
    });

    expect(rendererConfig).to.have.property("viewport");
    expect(rendererConfig.viewport).to.deep.equal({
      enabled: true,
      autoUpdate: true,
      needsUpdate: true,
      type: 1,
    });
  });

  it("test generateConfig params strict", () => {
    const meshConfig = generateConfig(CONFIGTYPE.MESH, {
      other: 1,
    });

    expect(meshConfig).to.not.have.property("other");
    const meshConfig2 = generateConfig(
      CONFIGTYPE.MESH,
      {
        other: 1,
      },
      false
    );
    expect(meshConfig2).to.have.property("other", 1);
  });

  it("test generateConfig params warn", () => {
    const warn = cy.spy(window.console, "warn");

    const meshConfig = generateConfig(CONFIGTYPE.MESH, {
      other: 1,
    });
    expect(meshConfig).to.not.have.property("other");

    expect(warn).to.be.called;

    const meshConfig2 = generateConfig(
      CONFIGTYPE.MESH,
      {
        other: 1,
      },
      false,
      false
    );
    expect(meshConfig2).to.have.property("other", 1);
    expect(warn).to.be.calledOnce;
  });
});
