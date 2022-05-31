import { Group } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler } from "../object/ObjectCompiler";
export class GroupCompiler extends ObjectCompiler {
    MODULE = MODULETYPE.GROUP;
    constructor() {
        super();
    }
    add(vid, config) {
        const group = new Group();
        this.map.set(vid, group);
        this.weakMap.set(group, vid);
        super.add(vid, config);
        return this;
    }
    dispose() {
        super.dispose();
        return this;
    }
}
//# sourceMappingURL=GroupCompiler.js.map