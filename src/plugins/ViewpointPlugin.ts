import { OrthographicCamera, PerspectiveCamera } from "three";
import { BaseEvent } from "../core/EventDispatcher";
import { Engine } from "../engine/Engine";
import { Vector3Config } from "../middleware/common/CommonConfig";
import { Plugin } from "./plugin";
import { SetSizeEvent } from "./WebGLRendererPlugin";

export enum VIEWPOINT {
  DEFAULT = "default",
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right",
  FRONT = "front",
  BACK = "back",
}

export interface ViewpointEvent extends BaseEvent {
  viewpoint: VIEWPOINT;
}

export interface ViewpointParameters {
  viewpoint?: VIEWPOINT;
  perspective?: {
    position?: Vector3Config;
    lookAt?: Vector3Config;
    up?: Vector3Config;
  };
  orthograpbic?: {
    distance?: number;
    up?: Vector3Config;
  };
}

export const ViewpointPlugin: Plugin<ViewpointParameters> = function (
  this: Engine,
  params: ViewpointParameters = {}
): boolean {
  // 前置条件
  if (!this.webGLRenderer) {
    console.error("must install some renderer before BasicViewpoint plugin.");
    return false;
  }

  if (!this.scene) {
    console.error("must install some scene before BasicViewpoint plugin.");
    return false;
  }

  !params.viewpoint && (params.viewpoint = VIEWPOINT.DEFAULT);

  !params.perspective && (params.perspective = {});
  !params.perspective.position &&
    (params.perspective.position = {
      x: 60,
      y: 60,
      z: 60,
    });

  !params.perspective.lookAt &&
    (params.perspective.lookAt = {
      x: 0,
      y: 0,
      z: 0,
    });

  !params.perspective.up &&
    (params.perspective.up = {
      x: 0,
      y: 1,
      z: 0,
    });

  !params.orthograpbic && (params.orthograpbic = {});
  !params.orthograpbic.up &&
    (params.orthograpbic.up = {
      x: 0,
      y: 1,
      z: 0,
    });

  const perspectiveCamera = new PerspectiveCamera();

  perspectiveCamera.position.set(
    params.perspective.position.x,
    params.perspective.position.y,
    params.perspective.position.z
  );

  perspectiveCamera.lookAt(
    params.perspective.lookAt.x,
    params.perspective.lookAt.y,
    params.perspective.lookAt.z
  );

  perspectiveCamera.up.set(
    params.perspective.up.x,
    params.perspective.up.y,
    params.perspective.up.z
  );

  const orthograpbicCamera = new OrthographicCamera(
    -window.innerWidth / 8,
    window.innerWidth / 8,
    -window.innerHeight / 8,
    window.innerHeight / 8
  );

  orthograpbicCamera.up.set(
    params.perspective.up.x,
    params.perspective.up.y,
    params.perspective.up.z
  );

  this.setViewpoint = function (viewpoint: VIEWPOINT): Engine {
    this.dispatchEvent({
      type: "setViewpoint",
      viewpoint,
    });
    return this;
  };

  this.addEventListener<SetSizeEvent>("setSize", (event) => {
    const width = event.width;
    const height = event.height;

    perspectiveCamera.aspect = width / height;
    perspectiveCamera.updateProjectionMatrix();

    orthograpbicCamera.left = -width / 16;
    orthograpbicCamera.right = width / 16;
    orthograpbicCamera.top = height / 16;
    orthograpbicCamera.bottom = -height / 16;
    orthograpbicCamera.updateProjectionMatrix();
  });

  const distance = params.orthograpbic.distance || 60;
  this.addEventListener<ViewpointEvent>("setViewpoint", (event) => {
    const viewpoint = event.viewpoint;

    if (viewpoint === VIEWPOINT.DEFAULT) {
      this.setCamera!(perspectiveCamera);
      return;
    }

    if (viewpoint === VIEWPOINT.TOP) {
      orthograpbicCamera.position.set(0, distance, 0);
    } else if (viewpoint === VIEWPOINT.BOTTOM) {
      orthograpbicCamera.position.set(0, -distance, 0);
    } else if (viewpoint === VIEWPOINT.RIGHT) {
      orthograpbicCamera.position.set(distance, 0, 0);
    } else if (viewpoint === VIEWPOINT.LEFT) {
      orthograpbicCamera.position.set(-distance, 0, 0);
    } else if (viewpoint === VIEWPOINT.FRONT) {
      orthograpbicCamera.position.set(0, 0, distance);
    } else if (viewpoint === VIEWPOINT.BACK) {
      orthograpbicCamera.position.set(0, 0, -distance);
    }

    this.setCamera!(orthograpbicCamera);
  });

  this.completeSet.add(() => {
    if (params.viewpoint === VIEWPOINT.DEFAULT) {
      this.setCamera!(perspectiveCamera);
    } else {
      this.setCamera!(orthograpbicCamera);
    }
  });
  return true;
};
