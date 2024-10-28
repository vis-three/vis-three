/**
 * 解析颜色
 * @param str 颜色rgb或rgba
 * @param percent 是否已百分比解析
 * @returns {r, g, b, a?}
 */
export const parseColor = function (str: string, percent: boolean = false) {
  if (str.startsWith("rgba")) {
    const [r, g, b, a] = str
      .slice(5, -1)
      .split(",")
      .map((num) => Number(num));

    if (percent) {
      return {
        r: r / 255,
        g: g / 255,
        b: b / 255,
        a,
      };
    } else {
      return {
        r,
        g,
        b,
        a,
      };
    }
  }

  if (str.startsWith("rgb")) {
    const [r, g, b] = str
      .slice(4, -1)
      .split(",")
      .map((num) => Number(num));

    if (percent) {
      return {
        r: r / 255,
        g: g / 255,
        b: b / 255,
        a: null,
      };
    } else {
      return {
        r,
        g,
        b,
        a: null,
      };
    }
  }

  console.warn(`color str is illegal: ${str}`);

  return {
    r: 0,
    g: 0,
    b: 0,
    a: null,
  };
};
