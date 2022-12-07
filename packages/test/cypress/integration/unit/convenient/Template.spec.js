import { generateConfig, JSONHandler, Template } from "../../../../dist/Vis.es";

describe("Template", () => {
  it("test Template clone", () => {
    cy.fixture("compressConfig.json").then((config) => {
      const newConfig = Template.clone(config);
      const jsonNewConfig = JSON.stringify(newConfig, JSONHandler.stringify);

      Object.keys(config)
        .filter((module) => module !== "assets")
        .forEach((module) => {
          expect(newConfig).to.have.property(module);
          Object.keys(config[module]).forEach((vid) => {
            expect(newConfig[module]).to.not.have.property(vid);
            expect(new RegExp(vid).test(jsonNewConfig)).to.equal(false);
          });

          expect(Object.keys(newConfig[module]).length).to.equal(
            Object.keys(config[module]).length
          );
        });
    });
  });

  it("test Template handler", () => {
    const config = {
      mesh: {
        "559aa946-aaca-444f-b6cd-d885352e91c3": {
          vid: "559aa946-aaca-444f-b6cd-d885352e91c3",
          type: "Mesh",
          position: { x: -10 },
          scale: { x: 20, y: 20, z: 20 },
          material: "3a2f661c-959a-4143-bb5a-017d7675b7b6",
          geometry: "422b0e9a-5d0d-483f-b18e-df0736127fed",
        },
      },
    };
    const newConfig = Template.handler(config, (config) =>
      generateConfig(config.type, config, false)
    );

    expect(newConfig).to.have.property("mesh");

    const mesh = newConfig.mesh["559aa946-aaca-444f-b6cd-d885352e91c3"];

    expect(mesh).to.have.property("rotation");
  });
});
