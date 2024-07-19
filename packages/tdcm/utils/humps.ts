// 小驼峰
export const camelize = function (str: string) {
  str = str.replace(/[\-_\s]+(.)?/g, function (match, chr) {
    return chr ? chr.toUpperCase() : "";
  });
  return str.slice(0, 1).toLowerCase() + str.slice(1);
};

// 大驼峰
export const pascalize = function (str: string) {
  const camelized = camelize(str);
  return camelized.slice(0, 1).toUpperCase() + camelized.slice(1);
};

// 全大写
export const emunCamelize = function (str: string) {
  return camelize(str).toUpperCase();
};

// 大写分解
export const emunDecamelize = function (str: string) {
  const split = /(?=[A-Z])/;

  return str
    .split(split)
    .map((s) => s.toUpperCase())
    .join("_");
};
