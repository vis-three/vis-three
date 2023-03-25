import { defineProcessor } from "@vis-three/middleware";
import { objectCommands, objectCreate, objectDispose } from "@vis-three/module-object";
import { Color, Fog, FogExp2, Scene } from "three";
import { validate } from "uuid";
import { getSceneConfig } from "./SceneConfig";
const setBackground = function (scene, value, engine) {
    if (!value) {
        scene.background = null;
        return;
    }
    if (validate(value)) {
        const texture = engine.compilerManager.getTexture(value);
        if (texture) {
            scene.background = texture;
        }
        else {
            console.warn(`engine can not found this vid texture : '${value}'`);
        }
    }
    else {
        scene.background = new Color(value);
    }
};
const setEnvironment = function (scene, value, engine) {
    if (!value) {
        scene.environment = null;
        return;
    }
    if (validate(value)) {
        const texture = engine.compilerManager.getTexture(value);
        if (texture) {
            scene.environment = texture;
        }
        else {
            console.warn(`engine can not found this vid texture : '${value}'`);
        }
    }
    else {
        console.warn(`scene environment is illeage: ${value}`);
    }
};
export default defineProcessor({
    type: "Scene",
    config: getSceneConfig,
    commands: {
        add: objectCommands.add,
        set: {
            ...objectCommands.set,
            lookAt() { },
            fog({ target, config, key, value }) {
                const fog = config.fog;
                if (!fog.type) {
                    target.fog = null;
                }
                else if (fog.type === "Fog") {
                    if (!target.fog || !(target.fog instanceof Fog)) {
                        target.fog = new Fog(fog.color, fog.near, fog.far);
                    }
                    else {
                        if (key === "color") {
                            target.fog.color.copy(new Color(fog.color));
                        }
                        else {
                            target.fog[key] && (target.fog[key] = value);
                        }
                    }
                }
                else if (fog.type === "FogExp2") {
                    if (!target.fog || !(target.fog instanceof FogExp2)) {
                        target.fog = new FogExp2(fog.color, fog.density);
                    }
                    else {
                        if (key === "color") {
                            target.fog.color.copy(new Color(fog.color));
                        }
                        else {
                            target.fog[key] && (target.fog[key] = value);
                        }
                    }
                }
            },
            background({ target, value, engine }) {
                setBackground(target, value, engine);
            },
            environment({ target, value, engine }) {
                setEnvironment(target, value, engine);
            },
        },
        delete: objectCommands
            .delete,
    },
    create(config, engine) {
        const scene = new Scene();
        setBackground(scene, config.background, engine);
        setEnvironment(scene, config.environment, engine);
        if (config.fog.type) {
            const fog = config.fog;
            if (fog.type === "Fog") {
                scene.fog = new Fog(fog.color, fog.near, fog.far);
            }
            else if (fog.type === "FogExp2") {
                scene.fog = new FogExp2(fog.color, fog.density);
            }
            else {
                console.warn(`scene processor can not support this type fog:'${config.type}'`);
            }
        }
        return objectCreate(scene, config, {
            lookAt: true,
            background: true,
            environment: true,
            fog: true,
        }, engine);
    },
    dispose: objectDispose,
});
