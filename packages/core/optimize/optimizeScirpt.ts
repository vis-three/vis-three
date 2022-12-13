import {
  AmbientLight,
  HemisphereLight,
  OrthographicCamera,
  RectAreaLight,
} from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

import { LightShadow } from "three/src/lights/LightShadow";

import { version } from "../../plugins/StatsPlugin/package.json";
declare global {
  interface Window {
    __THREE__: string;
    __VIS__: string;
  }
}

if (!window.__THREE__) {
  console.error(
    `vis-three dependent on three.js module, pleace run 'npm i three' first.`
  );
}

if (window.__VIS__) {
  console.warn(`Duplicate vis-three frames are introduced`);
} else {
  window.__VIS__ = version;
}

// 增加无用shadow，不然WebGLShadowMap会一直warning

const lightShadow = new LightShadow(
  new OrthographicCamera(-256, 256, 256, -256)
);
lightShadow.autoUpdate = false;
lightShadow.needsUpdate = false;

AmbientLight.prototype.shadow = lightShadow;
RectAreaLight.prototype.shadow = lightShadow;
HemisphereLight.prototype.shadow = lightShadow;

RectAreaLightUniformsLib.init();
