import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { SpriteRule } from "./SpriteRule";
export class SpriteDataSupport extends SolidObjectDataSupport {
    MODULE = MODULETYPE.SPRITE;
    constructor(data, ignore) {
        !data && (data = {});
        super(SpriteRule, data, ignore);
    }
}
//# sourceMappingURL=SpriteDataSupport.js.map