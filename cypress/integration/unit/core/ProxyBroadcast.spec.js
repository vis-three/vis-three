import { ProxyBroadcast } from "../../../../dist/Vis.es";

describe("test ProxyBroadcast", () => {
  const proxyBroadcast = new ProxyBroadcast();

  const object = {
    string: "string",
    number: 1,
    boolean: true,
    object: {
      attr1: "adv",
      object: {
        string: "abc",
      },
      array: [1, { a: 2 }, [1, 3, 5, 7]],
    },
    array: [1, { a: 3 }, [1, 3, 5, 7], 4, 5],
  };

  const reactive = proxyBroadcast.proxyExtends(object);

  let notice = "";

  proxyBroadcast.addEventListener("broadcast", (event) => {
    notice = event.notice;
  });

  console.log(object);
  it("test set string", () => {
    reactive.string = "abc";

    expect(object).to.have.property("string", "abc");

    expect(notice).to.have.property("operate", "set");
    expect(notice).to.have.property("path").that.to.be.lengthOf(0);
    expect(notice).to.have.property("key", "string");
    expect(notice).to.have.property("value", "abc");
  });

  it("test set number", () => {
    reactive.number = 2;

    expect(object).to.have.property("number", 2);

    expect(notice).to.have.property("operate", "set");
    expect(notice).to.have.property("path").that.to.be.lengthOf(0);
    expect(notice).to.have.property("key", "number");
    expect(notice).to.have.property("value", 2);
  });

  it("test set boolean", () => {
    reactive.boolean = false;

    expect(object).to.have.property("boolean", false);

    expect(notice).to.have.property("operate", "set");
    expect(notice).to.have.property("path").that.to.be.lengthOf(0);
    expect(notice).to.have.property("key", "boolean");
    expect(notice).to.have.property("value", false);
  });

  it("test set object key", () => {
    reactive.object.attr1 = "abc";

    expect(object.object).to.have.property("attr1", "abc");

    expect(notice).to.have.property("operate", "set");
    expect(notice).to.have.property("path").that.to.be.lengthOf(1);
    expect(notice.path[0]).to.equal("object");
    expect(notice).to.have.property("key", "attr1");
    expect(notice).to.have.property("value", "abc");
  });

  it("test set object not key", () => {
    reactive.object.attr2 = "attr2";

    expect(object.object).to.have.property("attr2", "attr2");

    expect(notice).to.have.property("operate", "add");
    expect(notice).to.have.property("path").that.to.be.lengthOf(1);
    expect(notice.path[0]).to.equal("object");
    expect(notice).to.have.property("key", "attr2");
    expect(notice).to.have.property("value", "attr2");
  });

  it("test set array key", () => {
    reactive.array[0] = 2;

    expect(object.array[0]).to.equal(2);

    expect(notice).to.have.property("operate", "set");
    expect(notice).to.have.property("path").that.to.be.lengthOf(1);
    expect(notice.path[0]).to.equal("array");
    expect(notice).to.have.property("key", "0");
    expect(notice).to.have.property("value", 2);
  });

  it("test set array not key", () => {
    const index = reactive.array.length;
    reactive.array[index] = 2;

    expect(object.array[index]).to.equal(2);

    expect(notice).to.have.property("operate", "add");
    expect(notice).to.have.property("path").that.to.be.lengthOf(1);
    expect(notice.path[0]).to.equal("array");
    expect(notice).to.have.property("key", index.toString());
    expect(notice).to.have.property("value", 2);
  });

  it("test add basic key", () => {
    reactive.basicKey = "basic";
    expect(object).to.have.property("basicKey", "basic");

    expect(notice).to.have.property("operate", "add");
    expect(notice).to.have.property("path").that.to.be.lengthOf(0);
    expect(notice).to.have.property("key", "basicKey");
    expect(notice).to.have.property("value", "basic");
  });

  it("test add object key", () => {
    reactive.object.attrAdd = "attrAdd";

    expect(object.object).to.have.property("attrAdd", "attrAdd");

    expect(notice).to.have.property("operate", "add");
    expect(notice).to.have.property("path").that.to.be.lengthOf(1);
    expect(notice.path[0]).to.equal("object");
    expect(notice).to.have.property("key", "attrAdd");
    expect(notice).to.have.property("value", "attrAdd");
  });

  it("test add array key", () => {
    reactive.array.push("addKey");

    expect(object.array[object.array.length - 1]).to.equal("addKey");

    expect(notice).to.have.property("operate", "add");
    expect(notice).to.have.property("path").that.to.be.lengthOf(1);
    expect(notice.path[0]).to.equal("array");
    expect(notice).to.have.property(
      "key",
      (object.array.length - 1).toString()
    );
    expect(notice).to.have.property("value", "addKey");
  });

  it("test delete basic key", () => {
    delete reactive.basicKey;

    expect(object).to.not.have.property("basicKey");

    expect(notice).to.have.property("operate", "delete");
    expect(notice).to.have.property("path").that.to.be.lengthOf(0);
    expect(notice).to.have.property("key", "basicKey");
    expect(notice).to.have.property("value", "basic");
  });

  it("test delete object key", () => {
    delete reactive.object.attrAdd;

    expect(object.object).to.not.have.property("attrAdd");

    expect(notice).to.have.property("operate", "delete");
    expect(notice).to.have.property("path").that.to.be.lengthOf(1);
    expect(notice.path[0]).to.equal("object");
    expect(notice).to.have.property("key", "attrAdd");
    expect(notice).to.have.property("value", "attrAdd");
  });

  it("test delete array key", () => {
    const length = object.array.length;
    reactive.array.splice(object.array.length - 1, 1);

    expect(object.array).to.not.include("addKey");

    expect(notice).to.have.property("operate", "delete");
    expect(notice).to.have.property("path").that.to.be.lengthOf(1);
    expect(notice.path[0]).to.equal("array");
    expect(notice).to.have.property("key", (length - 1).toString());
    expect(notice).to.have.property("value", "addKey");
  });

  it("test basic key to array", () => {
    reactive.string = [1, 2, 3];

    expect(object.string).to.have.include.members([1, 2, 3]);
    expect(object.string).to.have.property(Symbol.for("vis.array"));

    expect(notice).to.have.property("operate", "set");
    expect(notice).to.have.property("path").that.to.be.lengthOf(0);
    expect(notice).to.have.property("key", "string");
    expect(notice).to.have.property("value").to.have.include.members([1, 2, 3]);
  });

  it("test array key to string", () => {
    reactive.array = "string";
    console.log(object);
    expect(object).to.have.property("array", "string");
  });
});
