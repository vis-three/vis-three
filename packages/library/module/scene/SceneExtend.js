import { MODULETYPE } from "@vis-three/middleware";
export default function (engine) {
    engine.setSceneBySymbol = function (scene) {
        const compiler = this.compilerManager.getCompiler(MODULETYPE.SCENE);
        if (compiler.map.has(scene)) {
            this.setScene(compiler.map.get(scene));
        }
        else {
            console.warn("can not found scene", scene);
        }
        return this;
    };
}
