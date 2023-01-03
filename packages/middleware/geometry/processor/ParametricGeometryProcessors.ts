import {
  BufferGeometry,
  BoxBufferGeometry,
  CircleBufferGeometry,
  ConeBufferGeometry,
  CylinderBufferGeometry,
  PlaneBufferGeometry,
  RingBufferGeometry,
  SphereBufferGeometry,
  TorusGeometry,
  Vector3,
  Vector2,
} from "three";

import { CONFIGTYPE } from "../../constants/CONFIGTYPE";
import {
  BoxGeometryConfig,
  CircleGeometryConfig,
  ConeGeometryConfig,
  CubicBezierCurveGeometryConfig,
  CylinderGeometryConfig,
  GeometryConfig,
  LineCurveGeometryConfig,
  LineShapeGeometryConfig,
  LineTubeGeometryConfig,
  PlaneGeometryConfig,
  QuadraticBezierCurveGeometryConfig,
  RingGeometryConfig,
  SphereGeometryConfig,
  SplineCurveGeometryConfig,
  SplineTubeGeometryConfig,
  TorusGeometryConfig,
} from "../GeometryInterface";
import {
  CubicBezierCurveGeometry,
  LineCurveGeometry,
  LineShapeGeometry,
  LineTubeGeometry,
  QuadraticBezierCurveGeometry,
  SplineCurveGeometry,
  SplineTubeGeometry,
} from "@vis-three/core";
import { commands, create as commonCreate } from "./common";
import { defineProcessor } from "../../module";

const constructMap = new Map<CONFIGTYPE, (config: any) => BufferGeometry>();

constructMap.set(CONFIGTYPE.BOXGEOMETRY, (config: BoxGeometryConfig) => {
  return new BoxBufferGeometry(
    config.width,
    config.height,
    config.depth,
    config.widthSegments,
    config.heightSegments,
    config.depthSegments
  );
});

constructMap.set(CONFIGTYPE.SPHEREGEOMETRY, (config: SphereGeometryConfig) => {
  return new SphereBufferGeometry(
    config.radius,
    config.widthSegments,
    config.heightSegments,
    config.phiStart,
    config.phiLength,
    config.thetaStart,
    config.thetaLength
  );
});

constructMap.set(CONFIGTYPE.PLANEGEOMETRY, (config: PlaneGeometryConfig) => {
  return new PlaneBufferGeometry(
    config.width,
    config.height,
    config.widthSegments,
    config.heightSegments
  );
});

constructMap.set(CONFIGTYPE.CIRCLEGEOMETRY, (config: CircleGeometryConfig) => {
  return new CircleBufferGeometry(
    config.radius,
    config.segments,
    config.thetaStart,
    config.thetaLength
  );
});

constructMap.set(CONFIGTYPE.CONEGEOMETRY, (config: ConeGeometryConfig) => {
  return new ConeBufferGeometry(
    config.radius,
    config.height,
    config.radialSegments,
    config.heightSegments,
    config.openEnded,
    config.thetaStart,
    config.thetaLength
  );
});

constructMap.set(
  CONFIGTYPE.CYLINDERGEOMETRY,
  (config: CylinderGeometryConfig) => {
    return new CylinderBufferGeometry(
      config.radiusTop,
      config.radiusBottom,
      config.height,
      config.radialSegments,
      config.heightSegments,
      config.openEnded,
      config.thetaStart,
      config.thetaLength
    );
  }
);

constructMap.set(
  CONFIGTYPE.LINECURVEGEOMETRY,
  (config: LineCurveGeometryConfig) => {
    return new LineCurveGeometry(
      config.path.map(
        (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
      ),
      config.divisions,
      config.space
    );
  }
);

constructMap.set(
  CONFIGTYPE.SPLINECURVEGEOMETRY,
  (config: SplineCurveGeometryConfig) => {
    return new SplineCurveGeometry(
      config.path.map(
        (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
      ),
      config.divisions,
      config.space
    );
  }
);

constructMap.set(
  CONFIGTYPE.CUBICBEZIERCURVEGEOMETRY,
  (config: CubicBezierCurveGeometryConfig) => {
    return new CubicBezierCurveGeometry(
      config.path.map(
        (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
      ),
      config.divisions,
      config.space
    );
  }
);

constructMap.set(
  CONFIGTYPE.QUADRATICBEZIERCURVEGEOMETRY,
  (config: QuadraticBezierCurveGeometryConfig) => {
    return new QuadraticBezierCurveGeometry(
      config.path.map(
        (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
      ),
      config.divisions,
      config.space
    );
  }
);

constructMap.set(
  CONFIGTYPE.LINETUBEGEOMETRY,
  (config: LineTubeGeometryConfig) => {
    return new LineTubeGeometry(
      config.path.map(
        (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
      ),
      config.tubularSegments,
      config.radius,
      config.radialSegments,
      config.closed
    );
  }
);

constructMap.set(
  CONFIGTYPE.SPLINETUBEGEOMETRY,
  (config: SplineTubeGeometryConfig) => {
    return new SplineTubeGeometry(
      config.path.map(
        (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
      ),
      config.tubularSegments,
      config.radius,
      config.radialSegments,
      config.closed
    );
  }
);

constructMap.set(CONFIGTYPE.TORUSGEOMETRY, (config: TorusGeometryConfig) => {
  return new TorusGeometry(
    config.radius,
    config.tube,
    config.radialSegments,
    config.tubularSegments,
    config.arc
  );
});

constructMap.set(CONFIGTYPE.RINGGEOMETRY, (config: RingGeometryConfig) => {
  return new RingBufferGeometry(
    config.innerRadius,
    config.outerRadius,
    config.thetaSegments,
    config.phiSegments,
    config.thetaStart,
    config.thetaLength
  );
});

constructMap.set(
  CONFIGTYPE.LINESHAPEGEOMETRY,
  (config: LineShapeGeometryConfig) => {
    return new LineShapeGeometry(
      config.path.map((vector2) => new Vector2(vector2.x, vector2.y)),
      config.curveSegments
    );
  }
);

const create = function (config: GeometryConfig): BufferGeometry {
  if (!constructMap.has(config.type as CONFIGTYPE)) {
    console.error(
      `parametric geometry can not support this type config: ${config.type}`
    );
    return new BufferGeometry();
  }

  return commonCreate(
    constructMap.get(config.type as CONFIGTYPE)!(config),
    config
  );
};

const dispose = function (target: BufferGeometry): void {
  target.dispose();
};

const parametricProcessorFactory = function (configType: CONFIGTYPE) {
  return defineProcessor({
    configType,
    commands,
    create,
    dispose,
  });
};

const ParametricGeometryList = [
  CONFIGTYPE.BOXGEOMETRY,
  CONFIGTYPE.SPHEREGEOMETRY,
  CONFIGTYPE.PLANEGEOMETRY,
  CONFIGTYPE.CIRCLEGEOMETRY,
  CONFIGTYPE.CONEGEOMETRY,
  CONFIGTYPE.CYLINDERGEOMETRY,
  CONFIGTYPE.LINECURVEGEOMETRY,
  CONFIGTYPE.SPLINECURVEGEOMETRY,
  CONFIGTYPE.CUBICBEZIERCURVEGEOMETRY,
  CONFIGTYPE.QUADRATICBEZIERCURVEGEOMETRY,
  CONFIGTYPE.LINETUBEGEOMETRY,
  CONFIGTYPE.SPLINETUBEGEOMETRY,
  CONFIGTYPE.TORUSGEOMETRY,
  CONFIGTYPE.RINGGEOMETRY,
  CONFIGTYPE.LINESHAPEGEOMETRY,
];

export const ParametricGeometryProcessors = ParametricGeometryList.map((type) =>
  parametricProcessorFactory(type)
);
