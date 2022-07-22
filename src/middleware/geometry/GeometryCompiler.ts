import { BufferGeometry } from "three";
import { validate } from "uuid";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { GeometryAllType } from "./GeometryInterface";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ParametricGeometryProcessors } from "./processor/ParametricGeometryProcessors";
import LoadGeometryProcessor from "./processor/LoadGeometryProcessor";
import CustomGeometryProcessor from "./processor/CustomGeometryProcessor";
import EdgesGeometryProcessor from "./processor/EdgesGeometryProcessor";

export interface GeometryCompilerTarget
  extends CompilerTarget<GeometryAllType> {}

export class GeometryCompiler extends Compiler<
  GeometryAllType,
  GeometryCompilerTarget,
  BufferGeometry
> {
  MODULE: MODULETYPE = MODULETYPE.GEOMETRY;

  constructor() {
    super();
  }

  add(config: GeometryAllType): BufferGeometry | null {
    const geometry = super.add(config);

    if (geometry) {
      geometry.clearGroups();
      for (const group of config.groups) {
        geometry.addGroup(group.start, group.count, group.materialIndex);
      }
    }
    return geometry;
  }

  // 几何的set是重新生成几何然后clone或者copy
  set(vid: string, path: string[], value: any): this {
    if (!validate(vid)) {
      console.warn(
        `geometry compiler set function vid parameters is illeage: '${vid}'`
      );
      return this;
    }

    if (!this.map.has(vid)) {
      console.warn(
        `geometry compiler set function can not found vid geometry: '${vid}'`
      );
      return this;
    }

    const currentGeometry = this.map.get(vid)!;
    const config = this.target[vid];
    // const newGeometry = this.constructMap.get(config.type as CONFIGTYPE)!(
    //   config,
    //   this
    // );
    // currentGeometry.copy(newGeometry);
    // // 辅助的更新根据uuid的更新而更新，直接copy无法判断是否更新
    // // TODO: 使用dispatch通知更新
    // currentGeometry.dispatchEvent({
    //   type: "update",
    // });
    // currentGeometry.uuid = newGeometry.uuid;
    // newGeometry.dispose();

    return this;
  }
}

ParametricGeometryProcessors.forEach((processor) => {
  Compiler.processor(processor);
});

Compiler.processor(LoadGeometryProcessor);
Compiler.processor(CustomGeometryProcessor);
Compiler.processor(EdgesGeometryProcessor);
