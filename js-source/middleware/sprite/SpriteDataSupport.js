import { DataSupport } from "../../core/DataSupport";
import { SpriteRule } from "./SpriteRule";
export class SpriteDataSupport extends DataSupport {
    constructor(data) {
        !data && (data = {});
        super(SpriteRule, data);
    }
}
//# sourceMappingURL=SpriteDataSupport.js.map