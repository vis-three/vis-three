import {
  defineObjectModel,
  ObjectModel,
} from "@vis-three/module-object";
import { getObject3DConfig, Object3DConfig } from "../Object3DConfig";
import { Object3D } from "three";

export default defineObjectModel<Object3DConfig, Object3D>((objectModel) => ({
  type: "Object3D",
  config: getObject3DConfig,
  create({ model, config, engine }) {
    const object = new Object3D();

    objectModel.create!({
      model: model as unknown as ObjectModel,
      target: object,
      config,
      filter: {},
      engine,
    });

    return object;
  },
  dispose({ target }) {
    objectModel.dispose!({ target });
  },
}));
