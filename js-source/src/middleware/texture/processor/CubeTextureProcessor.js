import { CubeTexture } from "three";
import { defineProcessor } from "../../../core/Processor";
import { syncObject } from "../../../utils/utils";
import { CONFIGTYPE } from "../../constants/configType";
import { getResource } from "./common";
const instanceClasses = [HTMLImageElement, HTMLVideoElement, HTMLCanvasElement];
const imageHanlder = function ({ target, index, value, engine }) {
    target.images[index] = getResource(value, engine, instanceClasses);
    target.needsUpdate = true;
};
export default defineProcessor({
    configType: CONFIGTYPE.CUBETEXTURE,
    commands: {
        set: {
            cube: {
                px({ target, value, engine }) {
                    imageHanlder({
                        target,
                        value,
                        engine,
                        index: 0,
                    });
                },
                nx({ target, value, engine }) {
                    imageHanlder({
                        target,
                        value,
                        engine,
                        index: 1,
                    });
                },
                py({ target, value, engine }) {
                    imageHanlder({
                        target,
                        value,
                        engine,
                        index: 2,
                    });
                },
                ny({ target, value, engine }) {
                    imageHanlder({
                        target,
                        value,
                        engine,
                        index: 3,
                    });
                },
                pz({ target, value, engine }) {
                    imageHanlder({
                        target,
                        value,
                        engine,
                        index: 4,
                    });
                },
                nz({ target, value, engine }) {
                    imageHanlder({
                        target,
                        value,
                        engine,
                        index: 5,
                    });
                },
            },
        },
    },
    create(config, engine) {
        const texture = new CubeTexture();
        const cube = config.cube;
        const images = [
            getResource(cube.px, engine, instanceClasses),
            getResource(cube.nx, engine, instanceClasses),
            getResource(cube.py, engine, instanceClasses),
            getResource(cube.ny, engine, instanceClasses),
            getResource(cube.pz, engine, instanceClasses),
            getResource(cube.nz, engine, instanceClasses),
        ];
        texture.image = images;
        syncObject(config, texture, {
            type: true,
            cube: true,
        });
        texture.needsUpdate = true;
        return texture;
    },
    dispose(target) {
        target.dispose();
    },
});
//# sourceMappingURL=CubeTextureProcessor.js.map