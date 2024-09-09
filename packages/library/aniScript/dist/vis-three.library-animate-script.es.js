const l = {
  name: "linearTime",
  multiply: 1
}, s = function(r, e, n, o) {
  return e[n] === void 0 ? (console.warn(`object not exist attribute: ${n}`, e), (t) => {
  }) : typeof e[n] != "number" ? (console.warn("object attribute is not typeof number.", e, n), (t) => {
  }) : (t) => {
    e[n] += t.delta * o.multiply;
  };
}, u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: l,
  generator: s
}, Symbol.toStringTag, { value: "Module" })), c = {
  name: "sinWave",
  wavelength: 1,
  offset: 0,
  amplitude: 1,
  speed: 1
}, f = function(r, e, n, o) {
  if (e[n] === void 0)
    return console.warn(`object not exist attribute: ${n}`, e), (i) => {
    };
  if (typeof e[n] != "number")
    return console.warn("object attribute is not typeof number.", e, n), (i) => {
    };
  const t = e[n];
  return (i) => {
    e[n] = t + o.amplitude * Math.sin(i.total * o.speed / o.wavelength) + o.offset;
  };
}, p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  config: c,
  generator: f
}, Symbol.toStringTag, { value: "Module" }));
export {
  u as linearTime,
  p as sinWare
};
