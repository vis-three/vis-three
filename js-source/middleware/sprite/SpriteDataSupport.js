import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { SpriteRule } from "./SpriteRule";
export class SpriteDataSupport extends ObjectDataSupport {
    constructor(data) {
        !data && (data = {});
        super(SpriteRule, data);
    }
}
//# sourceMappingURL=SpriteDataSupport.js.map