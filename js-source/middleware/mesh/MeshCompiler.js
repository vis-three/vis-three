import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler } from "../object/ObjectCompiler";
export class MeshCompiler extends ObjectCompiler {
    COMPILER_NAME = MODULETYPE.MESH;
    replaceMaterial = new MeshBasicMaterial({ color: 'rgb(150, 150, 150)' });
    replaceGeometry = new BoxBufferGeometry(10, 10, 10);
    constructor(parameters) {
        super(parameters);
    }
    getReplaceMaterial() {
        return this.replaceMaterial;
    }
    getReplaceGeometry() {
        return this.replaceGeometry;
    }
    add(vid, config) {
        const object = new Mesh(this.getGeometry(config.geometry), this.getMaterial(config.material));
        Compiler.applyConfig(config, object, {
            geometry: true,
            material: true,
            lookAt: true
        });
        this.map.set(vid, object);
        this.weakMap.set(object, vid);
        this.setLookAt(vid, config.lookAt);
        this.scene.add(object);
        return this;
    }
    set(vid, path, key, value) {
        if (!this.map.has(vid)) {
            console.warn(`model compiler can not found this vid mapping object: '${vid}'`);
            return this;
        }
        let mesh = this.map.get(vid);
        if (key === 'lookAt') {
            return this.setLookAt(vid, value);
        }
        if (key === 'material') {
            mesh.material = this.getMaterial(value);
            return this;
        }
        for (let key of path) {
            mesh = mesh[key];
        }
        mesh[key] = value;
        return this;
    }
    dispose() {
        super.dispose();
        this.replaceGeometry.dispose();
        this.replaceMaterial.dispose();
        return this;
    }
}
//# sourceMappingURL=MeshCompiler.js.map