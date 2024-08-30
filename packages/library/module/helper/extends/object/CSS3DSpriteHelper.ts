import { CSS3DSprite } from "@vis-three/module-css3d/extends/CSS3DSprite";
import { VisCSS3DSprite } from "@vis-three/module-css3d/extends/VisCSS3DSprite";

import {
  Color,
  EdgesGeometry,
  Intersection,
  LineSegments,
  PlaneGeometry,
  Raycaster,
  ShaderMaterial,
} from "three";
import { getHelperLineMaterial, VisHelper } from "../common";

const vertex = `
uniform float rotation2D;

#include <common>

void main() {
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );

	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

	vec2 alignedPosition = position.xy * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation2D ) * alignedPosition.x - sin( rotation2D ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation2D ) * alignedPosition.x + cos( rotation2D ) * alignedPosition.y;

	mvPosition.xy += rotatedPosition;

	gl_Position = projectionMatrix * mvPosition;

}

`;

const fragment = `

uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1.0);
}
`;

class CSS3DSpriteHelperMaterial extends ShaderMaterial {
  constructor() {
    super();
    this.vertexShader = vertex;
    this.fragmentShader = fragment;
    this.uniforms = {
      color: { value: new Color("white") },
      rotation2D: { value: 0 },
    };
  }
}

export class CSS3DSpriteHelper extends LineSegments implements VisHelper {
  target: VisCSS3DSprite;
  // @ts-ignore
  type = "VisCSS3DSpriteHelper";

  private observer: MutationObserver;

  constructor(target: CSS3DSprite) {
    super();
    this.geometry = new EdgesGeometry(new PlaneGeometry(1, 1));
    this.geometry.computeBoundingBox();

    this.material = new CSS3DSpriteHelperMaterial();

    this.matrixAutoUpdate = false;
    this.matrix = target.matrix;
    this.matrixWorldNeedsUpdate = false;
    this.matrixWorld = target.matrixWorld;

    this.target = target;

    const observer = new MutationObserver(() => {
      this.geometry.dispose();
      this.geometry = new EdgesGeometry(
        new PlaneGeometry(target.width, target.height)
      );
      this.geometry.computeBoundingBox();
    });

    observer.observe(target.element, {
      attributeFilter: ["style"],
    });

    this.observer = observer;

    this.onBeforeRender = () => {
      (<CSS3DSpriteHelperMaterial>this.material).uniforms.rotation2D.value =
        // @ts-ignore
        this.target.rotation2D;
    };

    this.raycast = () => {};
    this.updateMatrixWorld = () => {};
  }

  dispose() {
    this.observer.disconnect();
  }
}
