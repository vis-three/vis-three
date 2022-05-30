import { RenderManager } from "../../../dist/Vis.es";

const getFPSList = (fps, err) => {
  fps = Math.floor(fps);
  const list = [];
  for (let i = 0; i < err; i += 1) {
    list.push(fps - i);
  }
  return list;
};

describe("test RenderManager", () => {
  it("test fps change", () => {
    const manager = new RenderManager();

    let fps = 1000 / 30;

    manager.setFPS(fps);

    let num = 0;

    manager.addEventListener("render", () => {
      num += 1;
    });

    let times = 10;

    const numList = [];
    while (times > 0) {
      times -= 1;
      manager.play();
      cy.log(num);
      setTimeout(() => {
        manager.stop();
        numList.push(num);
        num = 0;
      }, 1000);
    }
    cy.log(numList);
    cy.log(getFPSList(fps));
    expect(numList).to.include.members(getFPSList(fps));
  });
});
