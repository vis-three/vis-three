import { BoxBufferGeometry, BufferGeometry, ShaderMaterial, } from "three";
import { objectCommands, objectCreate, objectDispose, } from "../object/ObjectProcessor";
export const replaceMaterial = new ShaderMaterial({
    fragmentShader: `
  void main () {
    gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
  }
  `,
});
export const replaceGeometry = new BoxBufferGeometry(10, 10, 10);
export const geometryHandler = function ({ target, value, engine }) {
    const geometry = engine.compilerManager.getGeometry(value);
    if (!geometry) {
        console.warn(`can not found geometry by vid in engine: ${value}`);
        target.geometry = replaceGeometry;
        return;
    }
    target.geometry = geometry;
};
export const materialHandler = function ({ target, config, engine }) {
    let material;
    if (typeof config.material === "string") {
        material =
            engine.compilerManager.getMaterial(config.material) || replaceMaterial;
    }
    else {
        material = config.material.map((vid) => engine.compilerManager.getMaterial(vid) || replaceMaterial);
    }
    target.material = material;
};
export const solidObjectCreate = function (object, config, filter, engine) {
    if (!filter.geometry) {
        let geometry = engine.getObjectBySymbol(config.geometry);
        if (!(geometry instanceof BufferGeometry)) {
            console.warn(`geometry vid in engine is not instance of BufferGeometry: ${config.geometry}`, geometry);
            geometry = replaceGeometry;
        }
        object.geometry.dispose();
        object.geometry = geometry;
    }
    if (!filter.material) {
        let material;
        if (typeof config.material === "string") {
            material =
                engine.compilerManager.getMaterial(config.material) || replaceMaterial;
        }
        else {
            material = config.material.map((vid) => engine.compilerManager.getMaterial(vid) || replaceMaterial);
        }
        object.material = material;
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
//# sourceMappingURL=SolidObjectProcessor.js.map