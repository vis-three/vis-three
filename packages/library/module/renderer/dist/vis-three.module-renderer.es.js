import { defineRule as s, globalOption as t, DEFAULT_RULE as r, Compiler as u, uniqueSymbol as i, getBasicConfig as d, defineModule as E } from "@vis-three/tdcm";
const n = [], c = s([
  function(o) {
    return t.symbol.validator(o.symbol) || n.includes(o.symbol);
  },
  r.OPERATE_ADD,
  r.OPERATE_DELETE,
  r.OPERATE_COVER,
  r.OPERATE_COMPILE
]);
class m extends u {
  constructor(e) {
    super(e);
  }
  useModel(e, l) {
    return n.push(i(e.type)), super.useModel(e, l);
  }
}
const a = function() {
  return Object.assign(d(), { size: null });
}, p = E({
  type: "renderer",
  compiler: m,
  rule: c,
  models: []
});
export {
  m as RendererCompiler,
  p as default,
  a as getRendererConfig
};
