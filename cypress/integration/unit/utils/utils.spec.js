import { Utils } from "../../../../dist/Vis.es";
describe("utils", () => {
  context("test syncObject", () => {
    const getConfig = () => {
      return {
        string: "a",
        number: 1,
        boolean: true,
        object: {
          a: 1,
        },
        array: [1, 2, 3],
      };
    };

    const getTarget = () => {
      return {
        string: "b",
        number: 2,
        boolean: false,
        object: {
          a: 2,
        },
        array: [2, 2, 2],
      };
    };

    it("test merge", () => {
      const config = getConfig();
      const target = getTarget();

      Utils.syncObject(config, target);

      expect(target).to.have.property("string", "a");
      expect(target).to.have.property("number", 1);
      expect(target).to.have.property("boolean", true);
      expect(target.object).to.have.property("a", 1);
      expect(target).to.have.deep.property("array", [1, 2, 3]);
    });

    it("test filter", () => {
      const config = getConfig();
      const target = getTarget();
      const originTarget = getTarget();

      const filter = {
        string: true,
        object: {
          a: true,
        },
      };

      Utils.syncObject(config, target, filter);

      expect(target).to.have.property("string", originTarget.string);
      expect(target).to.have.property("number", 1);
      expect(target).to.have.property("boolean", true);
      expect(target.object).to.have.property("a", originTarget.object.a);
      expect(target).to.have.deep.property("array", [1, 2, 3]);
    });

    it("test config key but target not have", () => {
      const config = getConfig();
      const target = getTarget();

      config.other = 1;
      config.object.b = 1;

      Utils.syncObject(config, target);

      expect(target).to.not.have.property("other");
      expect(target.object).to.not.have.property("b");
    });

    it("test target key but config not have ", () => {
      const config = getConfig();
      const target = getTarget();

      target.other = 1;

      Utils.syncObject(config, target);

      expect(target).to.have.property("other", 1);
    });
  });
});
