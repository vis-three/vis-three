import * as LinearTime from "./linearTime";
import * as SinWave from "./sinWave";
export class AniScriptLibrary {
    static configLibrary = new Map();
    static generatorLibrary = new Map();
    static register = function (config, generator) {
        if (AniScriptLibrary.configLibrary.has(config.name)) {
            console.warn(`EventLibrary has already exist this event generator: ${config.name}, that will be cover.`);
        }
        AniScriptLibrary.configLibrary.set(config.name, JSON.parse(JSON.stringify(config)));
        AniScriptLibrary.generatorLibrary.set(config.name, generator);
    };
    static generateConfig(name, merge) {
        if (!AniScriptLibrary.configLibrary.has(name)) {
            console.warn(`event library can not found config by name: ${name}`);
            return {
                name: "",
            };
        }
        const recursion = (config, merge) => {
            for (const key in merge) {
                if (config[key] === undefined) {
                    continue;
                }
                if (typeof merge[key] === "object" &&
                    merge[key] !== null &&
                    !Array.isArray(merge[key])) {
                    recursion(config[key], merge[key]);
                }
                else {
                    config[key] = merge[key];
                }
            }
        };
        const template = JSON.parse(JSON.stringify(AniScriptLibrary.configLibrary.get(name)));
        recursion(template, merge);
        return template;
    }
    static generateScript(engine, target, attribute, config) {
        if (!AniScriptLibrary.generatorLibrary.has(config.name)) {
            console.error(`event library can not found generator by name: ${config.name}`);
            return () => { };
        }
        return AniScriptLibrary.generatorLibrary.get(config.name)(engine, target, attribute, config);
    }
    static has(name) {
        return AniScriptLibrary.configLibrary.has(name);
    }
}
AniScriptLibrary.register(LinearTime.config, LinearTime.generator);
AniScriptLibrary.register(SinWave.config, SinWave.generator);
//# sourceMappingURL=AniScriptLibrary.js.map