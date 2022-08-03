import { EventDispatcher } from "../../../../dist/Vis.es";

describe("test EventDispatcher", () => {
  it("test addEventListener", () => {
    const dispatcher = new EventDispatcher();
    dispatcher.addEventListener("test", () => {});

    const listeners = dispatcher.listeners;
    const listenersSet = listeners.get("test");

    expect(listenersSet).to.not.equal(undefined);
    expect(listenersSet).to.have.property("size", 1);
  });

  it("test dispatchEvent", () => {
    const dispatcher = new EventDispatcher();
    const testFun = () => {};

    const cyTestFun = cy.spy(testFun);

    dispatcher.addEventListener("test", cyTestFun);

    dispatcher.dispatchEvent({
      type: "test",
    });

    expect(cyTestFun).to.be.calledOnce;
  });

  it("test dispatchEvent other param", () => {
    const dispatcher = new EventDispatcher();
    dispatcher.addEventListener("test", (event) => {
      expect(event.test).to.be.equal(5);
    });

    dispatcher.dispatchEvent({
      type: "test",
      test: 5,
    });
  });

  it("test removeEventListener", () => {
    const dispatcher = new EventDispatcher();
    const testFun = () => {
      console.log(1);
    };

    const cyTestFun = cy.spy(testFun);

    dispatcher.addEventListener("test", cyTestFun);

    dispatcher.dispatchEvent({
      type: "test",
    });

    expect(cyTestFun).to.be.calledOnce;

    dispatcher.removeEventListener("test", cyTestFun);

    dispatcher.dispatchEvent({
      type: "test",
    });

    expect(cyTestFun).to.be.calledOnce;
  });

  it("test once", () => {
    const dispatcher = new EventDispatcher();
    const testFun = () => {
      console.log("once");
    };

    const cyTestFun = cy.spy(testFun);

    dispatcher.once("test", cyTestFun);

    dispatcher.dispatchEvent({
      type: "test",
    });

    dispatcher.dispatchEvent({
      type: "test",
    });

    expect(cyTestFun).to.be.calledOnce;

    const listeners = dispatcher.listeners;
    const listenersSet = listeners.get("test");

    expect(listenersSet).to.not.equal(undefined);
    expect(listenersSet).to.have.property("size", 0);
  });
});
