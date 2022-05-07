import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { AnimationRule } from "./AnimationRule";
export class AnimationDataSupport extends DataSupport {
    MODULE = MODULETYPE.ANIMATION;
    constructor(data, ignore) {
        !data && (data = {});
        super(AnimationRule, data, ignore);
    }
}
//# sourceMappingURL=AnimationDataSupport.js.map