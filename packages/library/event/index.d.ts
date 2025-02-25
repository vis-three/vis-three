import * as addClass from "./basicEvent/addClass";
import * as changeCamera from "./basicEvent/changeCamera";
import * as changeScene from "./basicEvent/changeScene";
import * as openWindow from "./basicEvent/openWindow";
import * as switchAnimate from "./basicEvent/switchAnimate";
import * as visibleObject from "./basicEvent/visibleObject";
import * as setPosition from "./basicEvent/setPosition";
import * as setParent from "./basicEvent/setParent";
import * as changeCursor from "./basicEvent/changeCursor";
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
declare const _default: {
    addClass: typeof addClass;
    changeCamera: typeof changeCamera;
    changeScene: typeof changeScene;
    openWindow: typeof openWindow;
    switchAnimate: typeof switchAnimate;
    visibleObject: typeof visibleObject;
    colorChange: typeof colorChange;
    fadeObject: typeof fadeObject;
    focusObject: typeof focusObject;
    moveFromTo: typeof moveFromTo;
    moveSpacing: typeof moveSpacing;
    moveTo: typeof moveTo;
    moveToObject: typeof moveToObject;
    orbitTargetMove: typeof orbitTargetMove;
    rotationTo: typeof rotationTo;
    showToCamera: typeof showToCamera;
    upTo: typeof upTo;
    vector3To: typeof vector3To;
    setPosition: typeof setPosition;
    setParent: typeof setParent;
    changeCursor: typeof changeCursor;
};
export default _default;
