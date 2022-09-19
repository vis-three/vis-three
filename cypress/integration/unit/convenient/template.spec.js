import { JSONHandler, Template } from "../../../../dist/Vis.es";

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
});
