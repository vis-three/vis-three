import { generateConfig, CONFIGTYPE } from "../../../../dist/Vis.es";

describe("generateConfig", () => {
  it("test mesh config", () => {
    const meshConfig = generateConfig(CONFIGTYPE.MESH);
    expect(meshConfig).to.have.property("type", CONFIGTYPE.MESH);
  });
});
