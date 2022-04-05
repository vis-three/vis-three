import { Vector3Config, SymbolConfig } from "../common/CommonConfig";

export interface ObjectConfig extends SymbolConfig {
  type: string;
  name: string;
  castShadow: boolean;
  receiveShadow: boolean;
  lookAt: string;
  position: Vector3Config;
  rotation: Vector3Config;
  scale: Vector3Config;
  up: Vector3Config;
  visible: boolean;
  matrixAutoUpdate: boolean;
  renderOrder: number;
}

export const getObjectConfig = (): ObjectConfig => {
  return {
    vid: "",
    name: "",
    type: "Object3D",
    castShadow: true,
    receiveShadow: true,
    lookAt: "",
    visible: true,
    matrixAutoUpdate: true,
    renderOrder: 0,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    scale: {
      x: 1,
      y: 1,
      z: 1,
    },
    up: {
      x: 0,
      y: 1,
      z: 0,
    },
  };
};
