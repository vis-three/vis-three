import { defineRule as t, globalOption as n, DEFAULT_RULE as o, Compiler as u, uniqueSymbol as i, getBasicConfig as E, defineModule as c, SUPPORT_LIFE_CYCLE as d } from "@vis-three/tdcm";
const l = [], m = t([
  function(s) {
    return n.symbol.validator(s.symbol) || l.includes(s.symbol);
  },
  o.OPERATE_ADD,
  o.OPERATE_DELETE,
  o.OPERATE_COVER,
  o.OPERATE_COMPILE
]);
class C extends u {
  constructor(e) {
    super(e);
  }
  useModel(e, r) {
    return l.push(i(e.type)), super.useModel(e, r);
  }
  /**
   * @deprecated
   * @param processor
   * @param fun
   * @returns
   */
  reigstProcessor(e, r) {
    return this.useModel(e, r);
  }
}
const a = function() {
  return Object.assign(E(), {});
}, f = c({
  type: "controls",
  compiler: C,
  rule: m,
  models: [],
  lifeOrder: d.NINE
});
export {
  C as ControlsCompiler,
  f as default,
  a as getControlsConfig
};
