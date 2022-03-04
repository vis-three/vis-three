import { BufferGeometry, Group, Material } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler } from "../object/ObjectCompiler";
export class GroupCompiler extends ObjectCompiler {
    COMPILER_NAME = MODULETYPE.GROUP;
    replaceMaterial = new Material();
    replaceGeometry = new BufferGeometry();
    filterAttribute;
    constructor(parameters) {
        super(parameters);
        this.filterAttribute = {
            lookAt: true,
            children: true
        };
    }
    getReplaceMaterial() {
        console.warn(`GroupCompiler: can not use material in GroupCompiler.`);
        return this.replaceMaterial;
    }
    getReplaceGeometry() {
        console.warn(`GroupCompiler: can not use geometry in GroupCompiler.`);
        return this.replaceGeometry;
    }
    add(vid, config) {
        const group = new Group();
        Compiler.applyConfig(config, group, this.filterAttribute);
        this.map.set(vid, group);
        this.weakMap.set(group, vid);
        this.scene.add(group);
        for (let target of config.children) {
            this.addChildren(vid, target);
        }
        this.setLookAt(vid, config.lookAt);
        return this;
    }
    set(vid, path, key, value) {
        if (!this.map.has(vid)) {
            console.warn(`GroupCompiler: can not found this vid mapping object: '${vid}'`);
            return this;
        }
        if (key === 'lookAt') {
            this.setLookAt(vid, value);
            return this;
        }
        let object = this.map.get(vid);
        for (let key of path) {
            if (this.filterAttribute[key]) {
                return this;
            }
            object = object[key];
        }
        object[key] = value;
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
        this.replaceGeometry.dispose();
        this.replaceMaterial.dispose();
        return this;
    }
}
//# sourceMappingURL=GroupCompiler.js.map