import { Group } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler } from "../object/ObjectCompiler";
export class GroupCompiler extends ObjectCompiler {
    COMPILER_NAME = MODULETYPE.GROUP;
    constructor() {
        super();
    }
    add(vid, config) {
        const group = new Group();
        this.map.set(vid, group);
        this.weakMap.set(group, vid);
        for (const target of config.children) {
            this.addChildren(vid, target);
        }
        super.add(vid, config);
        return this;
    }
    addChildren(vid, target) {
        if (!this.map.has(vid)) {
            console.warn(`GroupCompiler: can not found this vid in compiler: ${vid}.`);
            return this;
        }
        const group = this.map.get(vid);
        const targetObject = this.getObject(target);
        if (!targetObject) {
            console.warn(`GroupCompiler: can not found this vid in compiler: ${target}.`);
            return this;
        }
        group.attach(targetObject);
        return this;
    }
    removeChildren(vid, target) {
        if (!this.map.has(vid)) {
            console.warn(`GroupCompiler: can not found this vid in compiler: ${vid}.`);
            return this;
        }
        const group = this.map.get(vid);
        const targetObject = this.getObject(target);
        if (!targetObject) {
            console.warn(`GroupCompiler: can not found this vid in compiler: ${target}.`);
            return this;
        }
        group.remove(targetObject);
        return this;
    }
    dispose() {
        super.dispose();
        return this;
    }
}
//# sourceMappingURL=GroupCompiler.js.map