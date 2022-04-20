import { TRANSFORMEVENT, VisTransformControls, } from "../optimize/VisTransformControls";
export const TransformControlsPlugin = function (params) {
    if (this.transformControls) {
        console.warn("this has installed transformControls plugin.");
        return false;
    }
    if (!this.webGLRenderer) {
        console.warn("this must install renderer before install transformControls plugin.");
        return false;
    }
    if (!this.pointerManager) {
        console.warn("this must install pointerManager before install transformControls plugin.");
        return false;
    }
    if (!this.eventManager) {
        console.warn("this must install eventManager before install transformControls plugin.");
        return false;
    }
    const transformControls = new VisTransformControls(this.currentCamera, this.dom);
    transformControls.detach();
    this.transformControls = transformControls;
    this.transing = false;
    transformControls.addEventListener("mouseDown", () => {
        this.transing = true;
    });
    this.scene.add(this.transformControls);
    this.scene.add(this.transformControls.target);
    this.setTransformControls = function (show) {
        if (show) {
            this.scene.add(this.transformControls);
        }
        else {
            this.scene.remove(this.transformControls);
        }
        return this;
    };
    this.addEventListener("setCamera", (event) => {
        transformControls.setCamera(event.camera);
    });
    // 与selection联调
    if (this.selectionBox) {
        this.addEventListener("selected", (event) => {
            transformControls.setAttach(...event.objects);
        });
    }
    else {
        this.eventManager.addEventListener("pointerup", (event) => {
            if (this.transing) {
                this.transing = false;
                return;
            }
            if (event.button === 0) {
                const objectList = event.intersections.map((elem) => elem.object);
                const object = objectList[0] || null;
                if (object) {
                    transformControls.setAttach(object);
                }
                else {
                    transformControls.detach();
                }
            }
        });
    }
    // 与eventManager作用
    this.eventManager.addFilterObject(transformControls);
    this.completeSet.add(() => {
        if (this.IS_ENGINESUPPORT) {
            const objectToConfig = (object) => {
                const symbol = this.compilerManager.getObjectSymbol(object);
                if (!symbol) {
                    return null;
                }
                return this.dataSupportManager.getConfigBySymbol(symbol);
            };
            let config = null;
            let mode;
            transformControls.addEventListener(TRANSFORMEVENT.OBJECTCHANGED, (event) => {
                const e = event;
                //TODO: update config.children
                e.transObjectSet.forEach((object) => {
                    config = objectToConfig(object);
                    mode = e.mode;
                    if (config) {
                        config[mode].x = object[mode].x;
                        config[mode].y = object[mode].y;
                        config[mode].z = object[mode].z;
                    }
                });
            });
        }
    });
    return true;
};
//# sourceMappingURL=TransformControlsPlugin.js.map