import { PathConfig } from "@vis-three/module-path";
import {
  AlwaysDepth,
  BaseEvent,
  BufferAttribute,
  BufferGeometry,
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

interface FunIndexMap {
  arcVertical: number[];
  arcClockwise: number[];
  bezierCP1: number[];
  bezierCP2: number[];
  quadraticCP1: number[];
}

export enum PATHSUPPORTCONTROLS_EVENT {
  MOUSEDOWN = "mousedown",
  CHANGING = "changing",
  MOUSEUP = "mouseup",
}

export interface ContolsEvent extends BaseEvent {
  index: number;
  config: PathConfig;
  last: boolean;
  object: Object3D;
  operate: "anchor" | "move" | "switch";
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

  static switchMaterial = new PointsMaterial({
    map: switchTexture,
    transparent: true,
    depthFunc: AlwaysDepth,
    alphaTest: 0.01,
    sizeAttenuation: false,
    size: 15,
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
  private switchGizmo = new Points(
    new BufferGeometry(),
    PathSupportControls.switchMaterial
  );

  private plane = new Plane();
  private pointerManager!: PointerManager;

  private cachePlaneVector3 = new Vector3();
  private cacheQuaternion = new Quaternion();
  private cacheNormal = new Vector3();
  private cachePosition = new Vector3();
  private cacheVertical = 0;

  private cacheMouseDownPoistion = new Vector3();
  private cacheMouseMoveDirection = new Vector3();

  // 缓存几何点属于哪类功能
  private geometryIndexFunMap: FunIndexMap = {
    arcVertical: [],
    arcClockwise: [],
    bezierCP1: [],
    bezierCP2: [],
    quadraticCP1: [],
  };

  private anchorArcUpdateIndexs: number[] = [];
  // 圆弧的方向辅助
  private arcVecticalDirectionsMap: Record<
    number,
    {
      segment: number;
      direction: Vector3;
    }
  > = {};

  private cacheConfigIndex = 0;

  private currentGuizmo?: Points;
  private currentIndex = 0;
  private domElement!: HTMLElement;
  private camera!: PerspectiveCamera | OrthographicCamera;
  private config!: PathConfig;
  private object!: Object3D;

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
    this.switchGizmo.type = "PathSupportControlsSwitchGizmo";

    this.add(this.anchorGizmo, this.moveGizmo, this.switchGizmo);

    this.renderOrder = Infinity;
    this.matrixAutoUpdate = false;

    config && this.setConfig(config);
    object && this.setObject(object);

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
    return this;
  }

  setConfig(config: PathConfig) {
    this.geometryIndexFunMap = {
      arcVertical: [],
      arcClockwise: [],
      bezierCP1: [],
      bezierCP2: [],
      quadraticCP1: [],
    };

    this.arcVecticalDirectionsMap = {};

    this.anchorArcUpdateIndexs = [];

    this.config = config;
    const anchor: number[] = [];
    const switchs: number[] = [];
    const move: number[] = [];

    const geometryIndexFunMap = this.geometryIndexFunMap;
    const arcVecticalDirectionsMap = this.arcVecticalDirectionsMap;

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

      // move and switch
      if (segment.curve === "arc") {
        this.anchorArcUpdateIndexs.push(i, i + 1);

        const arcDetail = getArcDetail(
          ...(segment.params as [
            number,
            number,
            number,
            boolean,
            number,
            number
          ])
        );
        //arc move
        move.push(arcDetail.center.x, arcDetail.center.y, 0);

        geometryIndexFunMap.arcVertical.push(move.length / 3 - 1);

        arcVecticalDirectionsMap[move.length / 3 - 1] = {
          segment: i,
          direction: new Vector3(
            arcDetail.verticalDirection.x,
            arcDetail.verticalDirection.y,
            0
          ),
        };

        // arc switch
        const harf = arcDetail.mid
          .clone()
          .sub(arcDetail.start)
          .multiplyScalar(0.5);
        const clockwisePosition = arcDetail.start.clone().add(harf);

        switchs.push(clockwisePosition.x, clockwisePosition.y, 0);

        // TODO: 当前switch只有arc有，之后得考虑其他曲线也有switch
        geometryIndexFunMap.arcClockwise.push(i);
      }
    });

    const updateGizmoGeometry = function (gizmo: Points, position: number[]) {
      const geometry = gizmo.geometry;
      geometry.setAttribute(
        "position",
        new BufferAttribute(new Float32Array(position), 3)
      );

      geometry.getAttribute("position").needsUpdate = true;
      geometry.computeBoundingBox();
      geometry.computeBoundingSphere();
    };

    updateGizmoGeometry(this.anchorGizmo, anchor);
    updateGizmoGeometry(this.moveGizmo, move);
    updateGizmoGeometry(this.switchGizmo, switchs);

    return this;
  }

  update() {
    this.setConfig(this.config);
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
    dispose(this.switchGizmo);
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
    this.plane.set(this.cacheNormal, this.cachePosition.length());

    const intersectPoint = this.intersectPoint(event);

    if (intersectPoint) {
      this.dragging = true;

      if (this.currentGuizmo === this.switchGizmo) {
        const configIndex =
          this.geometryIndexFunMap.arcClockwise[this.currentIndex];
        const currentSegment = this.config.curves[configIndex];

        this.dispatchEvent({
          type: PATHSUPPORTCONTROLS_EVENT.MOUSEDOWN,
          index: configIndex,
          config: this.config,
          last: false,
          object: this.object,
          operate: "switch",
        });

        (<boolean>(<unknown>currentSegment.params[3])) =
          !currentSegment.params[3];

        this.dispatchEvent({
          type: PATHSUPPORTCONTROLS_EVENT.CHANGING,
          index: configIndex,
          config: this.config,
          last: false,
          object: this.object,
          operate: "switch",
        });

        this.cacheConfigIndex = configIndex;
        this.domElement.addEventListener("mouseup", this._pointerUp);
        return;
      }

      this.cacheMouseDownPoistion
        .copy(this.intersectPlane(event)!)
        .sub(this.cachePosition);

      if (this.currentGuizmo === this.moveGizmo) {
        if (this.geometryIndexFunMap.arcVertical.includes(this.currentIndex)) {
          const message = this.arcVecticalDirectionsMap[this.currentIndex];
          this.cacheVertical = this.config.curves[message.segment].params[2];
          this.dispatchEvent({
            type: PATHSUPPORTCONTROLS_EVENT.MOUSEDOWN,
            index: message.segment,
            config: this.config,
            last: false,
            object: this.object,
            operate: "move",
          });

          this.cacheConfigIndex = message.segment;
        }
      }

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
        operate: "anchor",
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
    vect.sub(this.cachePosition);

    this.cacheMouseMoveDirection
      .copy(vect)
      .sub(this.cacheMouseDownPoistion)
      .normalize();

    const currentGuizmo = this.currentGuizmo;
    const currentIndex = this.currentIndex;
    const config = this.config;
    const cacheConfigIndex = this.cacheConfigIndex;
    const geometryIndexFunMap = this.geometryIndexFunMap;

    if (currentGuizmo === this.anchorGizmo) {
      const length = config.curves.length;
      if (currentIndex !== config.curves.length) {
        const segment = config.curves[currentIndex];
        segment.params[0] = vect.x;
        segment.params[1] = vect.y;
      } else {
        const segment = config.curves[length - 1];
        segment.params[segment.params.length - 2] = vect.x;
        segment.params[segment.params.length - 1] = vect.y;
      }

      const position = this.anchorGizmo.geometry.getAttribute("position");
      const array = position.array as unknown as Array<number>;

      array[currentIndex * 3] = vect.x;
      array[currentIndex * 3 + 1] = vect.y;

      position.needsUpdate = true;

      if (this.anchorArcUpdateIndexs.includes(this.currentIndex)) {
        // TODO:只update arc相关的点
        this.update();
      }

      this.dispatchEvent({
        type: PATHSUPPORTCONTROLS_EVENT.CHANGING,
        index: cacheConfigIndex,
        config: this.config,
        last: this.currentIndex === this.config.curves.length ? true : false,
        object: this.object,
        operate: "anchor",
      });
    } else if (currentGuizmo === this.moveGizmo) {
      if (geometryIndexFunMap.arcVertical.includes(currentIndex)) {
        const message = this.arcVecticalDirectionsMap[currentIndex];

        const angle = this.cacheMouseMoveDirection.angleTo(message.direction);

        config.curves[message.segment].params[2] =
          this.cacheVertical +
          vect.sub(this.cacheMouseDownPoistion).length() * Math.cos(angle);

        const arcDetail = getArcDetail(
          ...(config.curves[message.segment].params as [
            number,
            number,
            number,
            boolean,
            number,
            number
          ])
        );
        const position = this.moveGizmo.geometry.getAttribute("position");
        const array = position.array as unknown as number[];
        array[currentIndex * 3] = arcDetail.center.x;
        array[currentIndex * 3 + 1] = arcDetail.center.y;

        position.needsUpdate = true;

        this.dispatchEvent({
          type: PATHSUPPORTCONTROLS_EVENT.CHANGING,
          index: message.segment,
          config: this.config,
          last: false,
          object: this.object,
          operate: "move",
        });
      }
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
      operate:
        this.currentGuizmo === this.anchorGizmo
          ? "anchor"
          : this.currentGuizmo === this.moveGizmo
          ? "move"
          : "switch",
    });
  }
}
