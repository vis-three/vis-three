import { PathConfig, bezierSegmentConfig } from "@vis-three/module-path";
import {
  AlwaysDepth,
  BaseEvent,
  BufferAttribute,
  BufferGeometry,
  DynamicDrawUsage,
  LineBasicMaterial,
  LineDashedMaterial,
  LineSegments,
  Matrix4,
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  Plane,
  Points,
  PointsMaterial,
  Quaternion,
  Raycaster,
  ShaderMaterial,
  Vector2,
  Vector3,
} from "three";
import { PointerManager } from "@vis-three/plugin-pointer-manager";
import { getArcDetail } from "@vis-three/utils";
import { anchorTexture, moveTexture, switchTexture } from "./texture";

type MoveCurveIndexMap = Record<
  number,
  {
    type: "c1" | "c2";
    segmentIndex: number;
  }
>;

export enum PATHSUPPORTCONTROLS_EVENT {
  MOUSEDOWN = "mousedown",
  CHANGING = "changing",
  MOUSEUP = "mouseup",
  CLICK = "click",
}

export interface ContolsEvent extends BaseEvent {
  index: number;
  config: PathConfig;
  last: boolean;
  object: Object3D;
  operate: "anchor" | "move";
}

export class PathSupportControls extends Object3D<ContolsEvent> {
  static anchorMaterial = new PointsMaterial({
    map: anchorTexture,
    transparent: true,
    depthFunc: AlwaysDepth,
    alphaTest: 0.01,
    sizeAttenuation: false,
    size: 15,
  });

  static moveMaterial = new PointsMaterial({
    map: moveTexture,
    transparent: true,
    depthFunc: AlwaysDepth,
    alphaTest: 0.01,
    sizeAttenuation: false,
    size: 15,
  });

  static moveHelperMaterial = new LineBasicMaterial({
    color: "rgb(100, 100, 100)",
  });

  dragging = false;
  raycaster = new Raycaster();

  private anchorGizmo = new Points(
    new BufferGeometry(),
    PathSupportControls.anchorMaterial
  );

  private moveGizmo = new Points(
    new BufferGeometry(),
    PathSupportControls.moveMaterial
  );

  private moveHelper = new LineSegments(
    new BufferGeometry(),
    PathSupportControls.moveHelperMaterial
  );

  private plane = new Plane();
  private pointerManager!: PointerManager;

  private cachePlaneVector3 = new Vector3();
  private cacheQuaternion = new Quaternion();
  private cacheNormal = new Vector3();
  private cachePosition = new Vector3();

  private cacheMouseDownPoistion = new Vector3();
  private cacheMouseMoveDirection = new Vector3();

  private cacheConfigIndex = 0;

  private moveCurveIndexMap: MoveCurveIndexMap = {};
  private helperRangeMap: Record<
    number,
    { startIndex: number; previous: boolean }
  > = {};

  private currentGuizmo?: Points;
  private currentIndex = 0;
  private domElement!: HTMLElement;
  private camera!: PerspectiveCamera | OrthographicCamera;
  private config!: PathConfig;
  private object!: Object3D;
  private cacheObjectInvert!: Matrix4;

  private _pointerHover = this.pointerHover.bind(this);
  private _pointerMove = this.pointerMove.bind(this);
  private _pointerDown = this.pointerDown.bind(this);
  private _pointerUp = this.pointerUp.bind(this);

  constructor(
    camera: PerspectiveCamera | OrthographicCamera,
    dom: HTMLElement,
    object?: Object3D,
    config?: PathConfig
  ) {
    super();

    //@ts-ignore
    this.anchorGizmo.type = "PathSupportControlsAnchorGizmo";
    //@ts-ignore
    this.moveGizmo.type = "PathSupportControlsMoveGizmo";
    //@ts-ignore
    this.moveHelper.type = "PathSupportControlsMoveHelper";

    this.moveHelper.raycast = () => {};

    this.add(this.anchorGizmo, this.moveGizmo, this.moveHelper);

    this.renderOrder = Infinity;
    this.matrixAutoUpdate = false;

    object && this.setObject(object);
    config && this.setConfig(config);

    this.setDom(dom).setCamera(camera).connect();
  }

  setDom(dom: HTMLElement) {
    if (this.domElement) {
      this.disconnect();
    }

    this.domElement = dom;

    this.connect();
    return this;
  }

  setCamera(camera: PerspectiveCamera | OrthographicCamera) {
    this.camera = camera;
    return this;
  }

  setObject(object: Object3D) {
    this.object = object;
    this.matrix = object.matrix;
    this.matrixWorld = object.matrixWorld;
    this.cacheObjectInvert = object.matrixWorld.clone().invert();
    object.parent!.add(this);
    return this;
  }

  setConfig(config: PathConfig) {
    this.config = config;

    this.moveCurveIndexMap = {};
    this.helperRangeMap = {};

    const moveCurveIndexMap = this.moveCurveIndexMap;
    const helperRangeMap = this.helperRangeMap;

    const anchor: number[] = [];
    const move: number[] = [];
    const helper: number[] = [];

    this.config.curves.forEach((segment, i, arr) => {
      // anchor
      if (i === arr.length - 1) {
        anchor.push(
          segment.params[0],
          segment.params[1],
          0,
          segment.params[segment.params.length - 2],
          segment.params[segment.params.length - 1],
          0
        );
      } else {
        anchor.push(segment.params[0], segment.params[1], 0);
      }

      // move
      if (segment.curve === "arc") {
        move.push(segment.params[2], segment.params[3], 0);
        moveCurveIndexMap[move.length / 3 - 1] = {
          segmentIndex: i,
          type: "c1",
        };
      } else if (segment.curve === "bezier") {
        move.push(segment.params[2], segment.params[3], 0);

        helper.push(
          segment.params[0],
          segment.params[1],
          0,
          segment.params[2],
          segment.params[3],
          0
        );

        moveCurveIndexMap[move.length / 3 - 1] = {
          segmentIndex: i,
          type: "c1",
        };

        move.push(
          (<bezierSegmentConfig>(<unknown>segment.params))[4],
          (<bezierSegmentConfig>(<unknown>segment.params))[5],
          0
        );

        helper.push(
          segment.params[segment.params.length - 2],
          segment.params[segment.params.length - 1],
          0,
          (<bezierSegmentConfig>(<unknown>segment.params))[4],
          (<bezierSegmentConfig>(<unknown>segment.params))[5],
          0
        );

        moveCurveIndexMap[move.length / 3 - 1] = {
          segmentIndex: i,
          type: "c2",
        };

        helperRangeMap[i] = {
          startIndex: helper.length / 3 - 4,
          previous: false,
        };
        helperRangeMap[i + 1] = {
          startIndex: helper.length / 3 - 4,
          previous: true,
        };
      } else if (segment.curve === "quadratic") {
        move.push(segment.params[2], segment.params[3], 0);

        helper.push(
          segment.params[0],
          segment.params[1],
          0,
          segment.params[2],
          segment.params[3],
          0,
          segment.params[segment.params.length - 2],
          segment.params[segment.params.length - 1],
          0,
          segment.params[2],
          segment.params[3],
          0
        );

        moveCurveIndexMap[move.length / 3 - 1] = {
          segmentIndex: i,
          type: "c1",
        };

        helperRangeMap[i] = {
          startIndex: helper.length / 3 - 4,
          previous: false,
        };
        helperRangeMap[i + 1] = {
          startIndex: helper.length / 3 - 4,
          previous: true,
        };
      }
    });

    const updateGizmoGeometry = function (
      gizmo: Points | LineSegments,
      position: number[]
    ) {
      const geometry = gizmo.geometry;
      geometry.setAttribute(
        "position",
        new BufferAttribute(new Float32Array(position), 3).setUsage(
          DynamicDrawUsage
        )
      );

      geometry.getAttribute("position").needsUpdate = true;
      geometry.computeBoundingBox();
      geometry.computeBoundingSphere();
    };

    updateGizmoGeometry(this.anchorGizmo, anchor);
    updateGizmoGeometry(this.moveGizmo, move);
    updateGizmoGeometry(this.moveHelper, helper);

    return this;
  }

  update() {
    this.setConfig(this.config);
  }

  private updateHelper(segmentIndex: number) {
    const helperRangeMap = this.helperRangeMap;

    if (helperRangeMap[segmentIndex] !== undefined) {
      const { startIndex, previous } = helperRangeMap[segmentIndex];
      const segment = previous
        ? this.config.curves[segmentIndex - 1]
        : this.config.curves[segmentIndex];

      const position = this.moveHelper.geometry.getAttribute("position");

      if (segment.curve === "bezier") {
        position.setXYZ(startIndex, segment.params[0], segment.params[1], 0);
        position.setXYZ(
          startIndex + 1,
          segment.params[2],
          segment.params[3],
          0
        );
        position.setXYZ(
          startIndex + 2,
          segment.params[segment.params.length - 2],
          segment.params[segment.params.length - 1],
          0
        );
        position.setXYZ(
          startIndex + 3,
          (<bezierSegmentConfig>(<unknown>segment.params))[4],
          (<bezierSegmentConfig>(<unknown>segment.params))[5],
          0
        );
      } else if (segment.curve === "quadratic") {
        position.setXYZ(startIndex, segment.params[0], segment.params[1], 0);
        position.setXYZ(
          startIndex + 1,
          segment.params[2],
          segment.params[3],
          0
        );
        position.setXYZ(
          startIndex + 2,
          segment.params[segment.params.length - 2],
          segment.params[segment.params.length - 1],
          0
        );
        position.setXYZ(
          startIndex + 3,
          segment.params[2],
          segment.params[3],
          0
        );
      }
      position.needsUpdate = true;
    }

    return this;
  }

  use(pointerManager: PointerManager) {
    this.pointerManager = pointerManager;
  }

  connect() {
    if (this.object && this.config) {
      this.domElement.addEventListener("pointermove", this._pointerHover);
      this.domElement.addEventListener("mousedown", this._pointerDown);
    }
    return this;
  }

  disconnect() {
    this.domElement.removeEventListener("pointermove", this._pointerHover);
    this.domElement.removeEventListener("mousedown", this._pointerDown);
    return this;
  }

  dispose() {
    const dispose = (object: Points) => {
      object.geometry.dispose();
      if (Array.isArray(object.material)) {
        object.material.forEach((m) => {
          m.dispose();
        });
      } else {
        object.material.dispose();
      }
    };

    dispose(this.anchorGizmo);
    dispose(this.moveGizmo);
  }

  private intersectPoint(event: MouseEvent) {
    this.raycaster.setFromCamera(this.pointerManager.mouse, this.camera);

    const intersect = this.raycaster.intersectObject(this, true);

    if (intersect.length) {
      this.currentGuizmo = intersect[0].object as Points;
      this.currentIndex = intersect[0].index!;
      return {
        guizmo: this.currentGuizmo,
        index: this.currentIndex,
      };
    }

    return null;
  }

  private intersectPlane(event: MouseEvent) {
    this.raycaster.setFromCamera(this.pointerManager.mouse, this.camera);
    return this.raycaster.ray.intersectPlane(
      this.plane,
      this.cachePlaneVector3
    );
  }

  private pointerHover(event: MouseEvent) {
    if (this.dragging || !this.visible) {
      return;
    }

    const intersectPoint = this.intersectPoint(event);

    if (Number.isInteger(intersectPoint?.index)) {
      this.domElement.style.cursor = "move";
    } else {
      this.domElement.style.cursor = "";
    }
  }

  private pointerDown(event: MouseEvent) {
    if (!this.visible) {
      return;
    }

    this.cacheQuaternion.setFromRotationMatrix(this.object.matrixWorld);
    this.cacheNormal.set(0, 0, 1).applyQuaternion(this.cacheQuaternion);
    this.cachePosition.setFromMatrixPosition(this.object.matrixWorld);
    this.plane.set(
      this.cacheNormal,
      this.cachePosition.projectOnVector(this.cacheNormal).length()
    );
    const intersectPoint = this.intersectPoint(event);

    if (intersectPoint) {
      this.dragging = true;

      this.cacheMouseDownPoistion
        .copy(this.intersectPlane(event)!)
        .sub(this.cachePosition);

      const cacheConfigIndex =
        this.currentIndex === this.config.curves.length
          ? this.currentIndex - 1
          : this.currentIndex;

      this.dispatchEvent({
        type: PATHSUPPORTCONTROLS_EVENT.MOUSEDOWN,
        index: cacheConfigIndex,
        config: this.config,
        last: this.currentIndex === this.config.curves.length ? true : false,
        object: this.object,
        operate: this.currentGuizmo === this.moveGizmo ? "move" : "anchor",
      });
      this.cacheConfigIndex = cacheConfigIndex;

      this.domElement.addEventListener("mousemove", this._pointerMove);
      this.domElement.addEventListener("mouseup", this._pointerUp);
    }
  }

  private pointerMove(event: MouseEvent) {
    if (!this.visible && !this.dragging) {
      return;
    }

    const vect = this.intersectPlane(event);

    if (!vect) {
      return;
    }
    vect.sub(this.cachePosition).applyMatrix4(this.cacheObjectInvert);

    this.cacheMouseMoveDirection
      .copy(vect)
      .sub(this.cacheMouseDownPoistion)
      .normalize();

    const currentGuizmo = this.currentGuizmo;
    const currentIndex = this.currentIndex;
    const config = this.config;
    const cacheConfigIndex = this.cacheConfigIndex;

    if (currentGuizmo === this.anchorGizmo) {
      const length = config.curves.length;
      if (currentIndex !== config.curves.length) {
        const segment = config.curves[currentIndex];
        segment.params[0] = vect.x;
        segment.params[1] = vect.y;

        this.updateHelper(currentIndex);
      } else {
        const segment = config.curves[length - 1];
        segment.params[segment.params.length - 2] = vect.x;
        segment.params[segment.params.length - 1] = vect.y;

        this.updateHelper(length - 1);
      }

      const position = this.anchorGizmo.geometry.getAttribute("position");
      const array = position.array as unknown as Array<number>;

      array[currentIndex * 3] = vect.x;
      array[currentIndex * 3 + 1] = vect.y;

      position.needsUpdate = true;

      this.dispatchEvent({
        type: PATHSUPPORTCONTROLS_EVENT.CHANGING,
        index: cacheConfigIndex,
        config: this.config,
        last: this.currentIndex === this.config.curves.length ? true : false,
        object: this.object,
        operate: "anchor",
      });
    } else if (currentGuizmo === this.moveGizmo) {
      const segmentIndex = this.moveCurveIndexMap[currentIndex].segmentIndex;

      const segment = config.curves[segmentIndex];
      const type = this.moveCurveIndexMap[currentIndex].type;

      if (type === "c1") {
        segment.params[2] = vect.x;
        segment.params[3] = vect.y;
      } else if (type === "c2") {
        segment.params[4] = vect.x;
        segment.params[5] = vect.y;
      }

      const position = this.moveGizmo.geometry.getAttribute("position");
      const array = position.array as unknown as Array<number>;

      array[currentIndex * 3] = vect.x;
      array[currentIndex * 3 + 1] = vect.y;

      position.needsUpdate = true;

      this.updateHelper(segmentIndex);

      this.dispatchEvent({
        type: PATHSUPPORTCONTROLS_EVENT.CHANGING,
        index: cacheConfigIndex,
        config: this.config,
        last: this.currentIndex === this.config.curves.length ? true : false,
        object: this.object,
        operate: "move",
      });
    }
  }

  private pointerUp(event: MouseEvent) {
    this.dragging = false;

    this.domElement.removeEventListener("mousemove", this._pointerMove);
    this.domElement.removeEventListener("mouseup", this._pointerUp);

    if (this.currentGuizmo) {
      this.currentGuizmo.geometry.computeBoundingSphere();
      this.currentGuizmo.geometry.computeBoundingBox();
    }

    this.dispatchEvent({
      type: PATHSUPPORTCONTROLS_EVENT.MOUSEUP,
      index: this.cacheConfigIndex,
      config: this.config,
      last: this.currentIndex === this.config.curves.length ? true : false,
      object: this.object,
      operate: this.currentGuizmo === this.anchorGizmo ? "anchor" : "move",
    });
  }
}
