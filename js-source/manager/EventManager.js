import { Raycaster } from "three";
import { EventDispatcher } from "../core/EventDispatcher";
export class EventManager extends EventDispatcher {
    raycaster;
    scene;
    camera;
    recursive = false;
    penetrate = false;
    constructor(parameters) {
        super();
        this.raycaster = new Raycaster();
        this.camera = parameters.camera;
        this.scene = parameters.scene;
        parameters.recursive && (this.recursive = parameters.recursive);
        parameters.penetrate && (this.penetrate = parameters.penetrate);
    }
    setCamera(camera) {
        this.camera = camera;
        return this;
    }
    intersectObject(mouse) {
        this.raycaster.setFromCamera(mouse, this.camera);
        return this.raycaster.intersectObjects(this.scene.children, this.recursive);
    }
    use(pointerManager) {
        const mergeEvent = function (event, object) {
            return Object.assign({}, event, object);
        };
        pointerManager.addEventListener('pointerdown', (event) => {
            const intersections = this.intersectObject(event.mouse);
            // 全局事件代理
            this.dispatchEvent(mergeEvent(event, {
                type: 'pointerdown',
                intersections
            }));
            this.dispatchEvent(mergeEvent(event, {
                type: 'mousedown',
                intersections
            }));
            if (intersections.length) {
                // 穿透事件
                if (this.penetrate) {
                    for (let intersection of intersections) {
                        intersection.object.dispatchEvent(mergeEvent(event, {
                            type: 'pointerdown',
                            intersection
                        }));
                        intersection.object.dispatchEvent(mergeEvent(event, {
                            type: 'mousedown',
                            intersection
                        }));
                    }
                    // 单层事件 
                }
                else {
                    const intersection = intersections[0];
                    intersection.object.dispatchEvent(mergeEvent(event, {
                        type: 'pointerdown',
                        intersection
                    }));
                    intersection.object.dispatchEvent(mergeEvent(event, {
                        type: 'mousedown',
                        intersection
                    }));
                }
            }
        });
        const cacheObjectMap = new Map();
        pointerManager.addEventListener('pointermove', (event) => {
            const intersections = this.intersectObject(event.mouse);
            this.dispatchEvent(mergeEvent(event, {
                type: 'pointermove',
                intersections
            }));
            this.dispatchEvent(mergeEvent(event, {
                type: 'mousemove',
                intersections
            }));
            if (intersections.length) {
                if (this.penetrate) {
                    for (let intersection of intersections) {
                        if (cacheObjectMap.has(intersection.object)) {
                            intersection.object.dispatchEvent(mergeEvent(event, {
                                type: 'pointermove',
                                intersection
                            }));
                            intersection.object.dispatchEvent(mergeEvent(event, {
                                type: 'mousemove',
                                intersection
                            }));
                        }
                        else {
                            intersection.object.dispatchEvent(mergeEvent(event, {
                                type: 'pointerenter',
                                intersection
                            }));
                            intersection.object.dispatchEvent(mergeEvent(event, {
                                type: 'mouseenter',
                                intersection
                            }));
                        }
                    }
                }
                else {
                    const intersection = intersections[0];
                    if (cacheObjectMap.has(intersection.object)) {
                        intersection.object.dispatchEvent(mergeEvent(event, {
                            type: 'pointermove',
                            intersection
                        }));
                        intersection.object.dispatchEvent(mergeEvent(event, {
                            type: 'mousemove',
                            intersection
                        }));
                    }
                    else {
                        intersection.object.dispatchEvent(mergeEvent(event, {
                            type: 'pointerenter',
                            intersection
                        }));
                        intersection.object.dispatchEvent(mergeEvent(event, {
                            type: 'mouseenter',
                            intersection
                        }));
                    }
                }
                for (let intersection of intersections) {
                    cacheObjectMap.set(intersection.object, intersection);
                }
            }
            else {
                cacheObjectMap.forEach(intersection => {
                    intersection.object.dispatchEvent(mergeEvent(event, {
                        type: 'pointerleave',
                        intersection
                    }));
                    intersection.object.dispatchEvent(mergeEvent(event, {
                        type: 'mouseleave',
                        intersection
                    }));
                });
                cacheObjectMap.clear();
            }
        });
        pointerManager.addEventListener('pointerup', (event) => {
            const intersections = this.intersectObject(event.mouse);
            // 全局事件代理
            this.dispatchEvent(mergeEvent(event, {
                type: 'pointerup',
                intersections
            }));
            this.dispatchEvent(mergeEvent(event, {
                type: 'mouseup',
                intersections
            }));
            this.dispatchEvent(mergeEvent(event, {
                type: 'click',
                intersections
            }));
            if (intersections.length) {
                // 穿透事件
                if (this.penetrate) {
                    for (let intersection of intersections) {
                        intersection.object.dispatchEvent(mergeEvent(event, {
                            type: 'pointerup',
                            intersection
                        }));
                        intersection.object.dispatchEvent(mergeEvent(event, {
                            type: 'mouseup',
                            intersection
                        }));
                        intersection.object.dispatchEvent(mergeEvent(event, {
                            type: 'click',
                            intersection
                        }));
                    }
                    // 单层事件 
                }
                else {
                    const intersection = intersections[0];
                    intersection.object.dispatchEvent(mergeEvent(event, {
                        type: 'pointerup',
                        intersection
                    }));
                    intersection.object.dispatchEvent(mergeEvent(event, {
                        type: 'mouseup',
                        intersection
                    }));
                    intersection.object.dispatchEvent(mergeEvent(event, {
                        type: 'click',
                        intersection
                    }));
                }
            }
        });
        return this;
    }
}
//# sourceMappingURL=EventManager.js.map