import { globalAntiShake, MODULETYPE, } from "@vis-three/middleware";
import { objectCommands, objectCreate, objectDispose, } from "@vis-three/module-object";
import { BoxBufferGeometry, ShaderMaterial, } from "three";
export const replaceMaterial = new ShaderMaterial({
    fragmentShader: `
  void main () {
    gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
  }
  `,
});
export const replaceGeometry = new BoxBufferGeometry(10, 10, 10);
export const geometryHandler = function ({ target, value, engine }) {
    globalAntiShake.exec((finish) => {
        const geometry = engine.compilerManager.getObjectfromModule(MODULETYPE.GEOMETRY, value);
        if (!geometry) {
            if (finish) {
                console.warn(`can not found geometry by vid in engine: ${value}`);
            }
            target.geometry = replaceGeometry;
            return false;
        }
        target.geometry = geometry;
        return true;
    });
};
export const materialHandler = function ({ target, config, engine }) {
    globalAntiShake.exec((finish) => {
        let material;
        if (typeof config.material === "string") {
            material =
                engine.compilerManager.getObjectfromModule(MODULETYPE.MATERIAL, config.material) || replaceMaterial;
        }
        else {
            material = config.material.map((vid) => engine.compilerManager.getObjectfromModule(MODULETYPE.MATERIAL, vid) || replaceMaterial);
        }
        target.material = material;
        if ((Array.isArray(material) &&
            material.length &&
            material[0] === replaceMaterial) ||
            material === replaceMaterial) {
            return false;
        }
        return true;
    });
};
export const solidObjectCreate = function (object, config, filter, engine) {
    if (!filter.geometry) {
        object.geometry.dispose();
        geometryHandler({
            target: object,
            value: config.geometry,
            engine,
        });
    }
    if (!filter.material) {
        materialHandler({ target: object, config, engine });
    }
    return objectCreate(object, config, {
        geometry: true,
        material: true,
        ...filter,
    }, engine);
};
export const solidObjectDispose = function (target) {
    objectDispose(target);
};
export const solidObjectCommands = {
    add: {
        material: materialHandler,
        ...(objectCommands.add),
    },
    set: {
        geometry: geometryHandler,
        material: materialHandler,
        ...(objectCommands.set),
    },
    delete: {
        material: materialHandler,
        ...(objectCommands.delete),
    },
};
