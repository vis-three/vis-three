import * as addClass from "./basicEvent/addClass";
import * as changeCamera from "./basicEvent/changeCamera";
import * as changeScene from "./basicEvent/changeScene";
import * as openWindow from "./basicEvent/openWindow";
import * as switchAnimate from "./basicEvent/switchAnimate";
import * as visibleObject from "./basicEvent/visibleObject";

import * as colorChange from "./RealTimeAnimate/colorChange";
import * as fadeObject from "./RealTimeAnimate/fadeObject";
import * as focusObject from "./RealTimeAnimate/focusObject";
import * as moveFromTo from "./RealTimeAnimate/moveFromTo";
import * as moveSpacing from "./RealTimeAnimate/moveSpacing";
import * as moveTo from "./RealTimeAnimate/moveTo";
import * as moveToObject from "./RealTimeAnimate/moveToObject";
import * as orbitTargetMove from "./RealTimeAnimate/orbitTargetMove";
import * as rotationTo from "./RealTimeAnimate/rotationTo";
import * as showToCamera from "./RealTimeAnimate/showToCamera";
import * as upTo from "./RealTimeAnimate/upTo";
import * as vector3To from "./RealTimeAnimate/vector3To";

export { timingFunction, TIMINGFUNCTION } from "./RealTimeAnimate/common";
export { Tween } from "@tweenjs/tween.js";

export default {
  addClass,
  changeCamera,
  changeScene,
  openWindow,
  switchAnimate,
  visibleObject,
  colorChange,
  fadeObject,
  focusObject,
  moveFromTo,
  moveSpacing,
  moveTo,
  moveToObject,
  orbitTargetMove,
  rotationTo,
  showToCamera,
  upTo,
  vector3To,
};
