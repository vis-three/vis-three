import { PerspectiveCamera, Scene } from "three";
export const ScenePlugin = function (params) {
    if (this.scene) {
        console.warn('this has installed scene plugin.');
        return false;
    }
    if (!this.webGLRenderer) {
        console.error('must install some renderer before this plugin.');
        return false;
    }
    // 重写一下scene的add方法，由于其内部add会调用remove方法，存在藕合性
    Scene.prototype.add = function (...object) {
        if (!arguments.length) {
            return this;
        }
        if (arguments.length > 1) {
            for (let i = 0; i < arguments.length; i++) {
                this.add(arguments[i]);
            }
            return this;
        }
        const currentObject = object[0];
        if (currentObject === this) {
            console.error('THREE.Object3D.add: object can\'t be added as a child of itself.', object);
            return this;
        }
        if (currentObject && currentObject.isObject3D) {
            if (currentObject.parent !== null) {
                const index = this.children.indexOf(currentObject);
                if (index !== -1) {
                    currentObject.parent = null;
                    this.children.splice(index, 1);
                    currentObject.dispatchEvent({ type: 'removed' });
                }
            }
            currentObject.parent = this;
            this.children.push(currentObject);
            currentObject.dispatchEvent({ type: 'added' });
        }
        else {
            console.error('THREE.Object3D.add: object not an instance of THREE.Object3D.', object);
        }
        return this;
    };
    this.scene = new Scene();
    // 场景add装饰
    const sceneAdd = this.scene.add.bind(this.scene);
    this.scene.add = function (...object) {
        sceneAdd(...object);
        this.dispatchEvent({
            type: 'afterAdd',
            objects: object
        });
        return this;
    };
    // 场景remove装饰
    const sceneRemove = this.scene.remove.bind(this.scene);
    this.scene.remove = function (...object) {
        sceneRemove(...object);
        this.dispatchEvent({
            type: 'afterRemove',
            objects: object
        });
        return this;
    };
    this.render = () => {
        this.webGLRenderer.render(this.scene, this.currentCamera);
        return this;
    };
    const defalutCamera = new PerspectiveCamera();
    defalutCamera.position.set(50, 50, 50);
    defalutCamera.lookAt(0, 0, 0);
    this.currentCamera = defalutCamera;
    this.addEventListener('setSize', event => {
        const width = event.width;
        const height = event.height;
        defalutCamera.aspect = width / height;
        defalutCamera.updateProjectionMatrix();
    });
    return true;
};
//# sourceMappingURL=ScenePlugin.js.map