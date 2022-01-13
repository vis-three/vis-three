import { DataSupport } from "../../middleware/DataSupport";
import { TextureRule } from "./TextureRule";
export class TextureDataSupport extends DataSupport {
    constructor(data) {
        !data && (data = {});
        super(TextureRule, data);
    }
}
//# sourceMappingURL=TextureDataSupport.js.map