import { Color, EdgesGeometry, LineSegments, PlaneBufferGeometry, ShaderMaterial, } from "three";
const vertex = `

#include <common>

void main() {
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );

	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

  bool isPerspective = isPerspectiveMatrix( projectionMatrix );

  if ( isPerspective ) scale *= - mvPosition.z;

	vec2 alignedPosition = position.xy * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( 0.0 ) * alignedPosition.x - sin( 0.0 ) * alignedPosition.y;
	rotatedPosition.y = sin( 0.0 ) * alignedPosition.x + cos( 0.0 ) * alignedPosition.y;

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
        };
    }
}
export class CSS2DPlaneHelper extends LineSegments {
    target;
    type = "VisCSS2DPlaneHelper";
    observer;
    constructor(target) {
        super();
        this.geometry = new EdgesGeometry(new PlaneBufferGeometry(1, 1));
        this.geometry.computeBoundingBox();
        this.material = new CSS2DHelperMaterial();
        this.scale.copy(target.matrixScale);
        this.position.set(target.position.x, target.position.y, target.position.z);
        this.target = target;
        const observer = new MutationObserver(() => {
            this.scale.copy(target.matrixScale);
        });
        observer.observe(target.element, {
            attributeFilter: ["style"],
        });
        this.observer = observer;
        this.onBeforeRender = () => {
            this.position.set(this.target.position.x, this.target.position.y, this.target.position.z);
        };
        this.raycast = () => { };
    }
    dispose() {
        this.observer.disconnect();
    }
}
