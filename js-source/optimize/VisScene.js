import { Scene } from "three";
// 重写一下scene的add方法，由于其内部add会调用remove方法，存在藕合性
Scene.prototype.add = function (...object) {
    if (!arguments.length) {
        return this;
    }
    if (arguments.length > 1) {
        for (let i = 0; i < arguments.length; i++) {
            // eslint-disable-next-line
            this.add(arguments[i]);
        }
        return this;
    }
    const currentObject = object[0];
    if (currentObject === this) {
        console.error("THREE.Object3D.add: object can't be added as a child of itself.", object);
        return this;
    }
    if (currentObject && currentObject.isObject3D) {
        if (currentObject.parent !== null) {
            const index = this.children.indexOf(currentObject);
            if (index !== -1) {
                currentObject.parent = null;
                this.children.splice(index, 1);
                currentObject.dispatchEvent({ type: "removed" });
            }
        }
        currentObject.parent = this;
        this.children.push(currentObject);
        currentObject.dispatchEvent({ type: "added" });
    }
    else {
        console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", object);
    }
    return this;
};
export class VisScene extends Scene {
    add(...object) {
        super.add(...object);
        this.dispatchEvent({
            type: "afterAdd",
            objects: object,
        });
        return this;
    }
    remove(...object) {
        super.remove(...object);
        this.dispatchEvent({
            type: "afterRemove",
            objects: object,
        });
        return this;
    }
}
//# sourceMappingURL=VisScene.js.map