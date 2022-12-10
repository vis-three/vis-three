import {
  Color,
  EdgesGeometry,
  Intersection,
  LineSegments,
  Matrix4,
  PerspectiveCamera,
  PlaneBufferGeometry,
  Raycaster,
  ShaderMaterial,
  Sprite,
  Vector2,
  Vector3,
} from "three";
import { CSS2DPlane } from "../../object/CSS2DPlane";
import { getHelperLineMaterial, VisHelper } from "../common";

const vertex = `

uniform float rotation;
uniform vec2 center;
uniform bool sizeAttenuation;

#include <common>

void main() {
  vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );

	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

	if (!sizeAttenuation) {
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) scale *= - mvPosition.z;
  }

	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;

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

class CSS2DHelperMaterial extends ShaderMaterial {
  constructor() {
    super();
    this.vertexShader = vertex;
    this.fragmentShader = fragment;
    this.uniforms = {
      color: { value: new Color("white") },
      center: {
        value: new Vector2(0.5, 0.5),
      },
      rotation: {
        value: 0,
      },
      sizeAttenuation: {
        value: false,
      },
    };
  }
}

export class SpriteHelper extends LineSegments implements VisHelper {
  target: Sprite;

  type = "VisSpriteHelper";

  constructor(target: Sprite) {
    super();
    this.geometry = new EdgesGeometry(new PlaneBufferGeometry(1, 1));
    this.geometry.computeBoundingBox();

    this.material = new CSS2DHelperMaterial();

    this.matrixAutoUpdate = false;
    this.matrixWorldNeedsUpdate = false;
    this.matrix = target.matrix;
    this.matrixWorld = target.matrixWorld;

    this.target = target;

    this.onBeforeRender = () => {
      (<CSS2DHelperMaterial>this.material).uniforms.rotation.value =
        this.target.material.rotation;
      (<CSS2DHelperMaterial>this.material).uniforms.sizeAttenuation.value =
        this.target.material.sizeAttenuation;
    };

    this.raycast = () => {};
  }
}
