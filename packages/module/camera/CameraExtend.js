import { MODULETYPE } from "@vis-three/middleware";
export default function (engine) {
    engine.setCameraBySymbol = function (camera) {
        const compiler = this.compilerManager.getCompiler(MODULETYPE.CAMERA);
        if (compiler.map.has(camera)) {
            this.setCamera(compiler.map.get(camera));
        }
        else {
            console.warn("can not found camera", camera);
        }
        return this;
    };
}
