import { CONFIGTYPE } from "./configType";

export const UNIQUESYMBOL = {
  [CONFIGTYPE.WEBGLRENDERER]: true,
  [CONFIGTYPE.CSS3DRENDERER]: true,
  [CONFIGTYPE.SCENE]: true,
};

export const uniqueSymbol = function (type: CONFIGTYPE) {
  return `DEFUALT-${type}`;
};
