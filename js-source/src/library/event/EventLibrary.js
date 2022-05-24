import * as OpenWindow from "./BasicEventLibrary/openWindow";
import * as MoveTo from "./RealTimeAnimateLibrary/moveTo";
import * as MoveSpacing from "./RealTimeAnimateLibrary/moveSpacing";
import * as Vecter3To from "./RealTimeAnimateLibrary/vector3To";
import * as FocusObject from "./RealTimeAnimateLibrary/focusObject";
export class EventLibrary {
    static configLibrary = new Map();
    static generatorLibrary = new Map();
    static register = function (config, generator) {
        if (EventLibrary.configLibrary.has(config.name)) {
            console.warn(`EventLibrary has already exist this event generator: ${config.name}, that will be cover.`);
        }
        EventLibrary.configLibrary.set(config.name, JSON.parse(JSON.stringify(config)));
        EventLibrary.generatorLibrary.set(config.name, generator);
    };
    static generateConfig(name, merge) {
        if (!EventLibrary.configLibrary.has(name)) {
            console.warn(`event library can not found config by name: ${name}`);
            return {
                name: "",
            };
        }
        const recursion = (config, merge) => {
            for (const key in merge) {
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
        const template = JSON.parse(JSON.stringify(EventLibrary.configLibrary.get(name)));
        recursion(template, merge);
        return template;
    }
    static generateEvent(config, engine) {
        if (!EventLibrary.generatorLibrary.has(config.name)) {
            console.error(`event library can not found generator by name: ${config.name}`);
            return () => { };
        }
        return EventLibrary.generatorLibrary.get(config.name)(engine, config);
    }
    static has(name) {
        return EventLibrary.configLibrary.has(name);
    }
}
EventLibrary.register(OpenWindow.config, OpenWindow.generator);
EventLibrary.register(MoveTo.config, MoveTo.generator);
EventLibrary.register(MoveSpacing.config, MoveSpacing.generator);
EventLibrary.register(Vecter3To.config, Vecter3To.generator);
EventLibrary.register(FocusObject.config, FocusObject.generator);
//# sourceMappingURL=EventLibrary.js.map