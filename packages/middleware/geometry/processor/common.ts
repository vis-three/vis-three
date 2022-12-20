import { CurveGeometry } from "@vis-three/core";
import {
  Box3,
  BufferGeometry,
  EdgesGeometry,
  Euler,
  Quaternion,
  ShapeGeometry,
  TubeGeometry,
} from "three";
import { ProcessorCommands, ProcessParams } from "../../module";
import { GeometryAllType, GeometryConfig } from "../GeometryInterface";

export const transfromAnchor = function <
  T extends BufferGeometry,
  C extends GeometryConfig
>(geometry: T, config: C): T {
  // 曲线几何和形状几何不期望先center
  // TODO:不再自动居中几何
  if (
    !(geometry instanceof CurveGeometry) &&
    !(geometry instanceof TubeGeometry) &&
    !(geometry instanceof ShapeGeometry)
  ) {
    geometry.center();
  }

  geometry.computeBoundingBox();

  const box: Box3 = geometry.boundingBox!;
  const position = config.position;
  const rotation = config.rotation;
  const scale = config.scale;

  // 先应用旋转缩放
  const quaternion = new Quaternion().setFromEuler(
    new Euler(rotation.x, rotation.y, rotation.z, "XYZ")
  );

  // 再应用缩放
  geometry.applyQuaternion(quaternion);
  geometry.scale(scale.x, scale.y, scale.z);

  // 计算位置
  if (
    !(geometry instanceof CurveGeometry) &&
    !(geometry instanceof TubeGeometry) &&
    !(geometry instanceof ShapeGeometry)
  ) {
    geometry.center();
  }

  geometry.computeBoundingBox();

  // 根据旋转缩放运算位置
  geometry.translate(
    ((box.max.x - box.min.x) / 2) * position.x,
    ((box.max.y - box.min.y) / 2) * position.y,
    ((box.max.z - box.min.z) / 2) * position.z
  );
  return geometry;
};

const commonRegCommand = {
  reg: new RegExp(".*"),
  handler({ config, target, processor, engine }: ProcessParams<any, any>) {
    const newGeometry = processor.create(config, engine);
    target.copy(newGeometry);
    target // TODO: 使用dispatch通知更新 // 辅助的更新根据uuid的更新而更新，直接copy无法判断是否更新
      .dispatchEvent({
        type: "update",
      });
    target.uuid = newGeometry.uuid;

    newGeometry.dispose();
  },
};

export const commands: ProcessorCommands<GeometryConfig, BufferGeometry> = {
  add: {
    groups({ target, value }) {
      target.addGroup(value.start, value.count, value.materialIndex);
    },
    $reg: [commonRegCommand],
  },
  set: {
    groups(params) {
      const { path, target, config } = params;
      if (path[1] !== undefined) {
        target.groups.splice(Number(params.path[1]), 1);
        const group = config.groups[path[1]];
        target.addGroup(group.start, group.count, group.materialIndex);
      } else {
        console.warn(`geometry processor can not set group`, params);
      }
    },
    $reg: [commonRegCommand],
  },
  delete: {
    groups({ target, key }) {
      target.groups.splice(Number(key), 1);
    },
    $reg: [commonRegCommand],
  },
};

export const create = function <
  T extends BufferGeometry,
  C extends GeometryConfig
>(target: T, config: C): T {
  target.clearGroups();
  for (const group of config.groups) {
    target.addGroup(group.start, group.count, group.materialIndex);
  }
  return transfromAnchor<T, C>(target, config);
};
