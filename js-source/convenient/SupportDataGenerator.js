import { getConfigModelMap } from "../utils/utils";
import { generateConfig } from "./generateConfig";
export class SupportDataGenerator {
    static configModelMap = getConfigModelMap();
    supportData;
    supportDataType;
    constructor() { }
    create(type) {
        if (!type) {
            console.warn('you must give a module type in create params');
            return this;
        }
        this.supportData = {};
        this.supportDataType = type;
        return this;
    }
    add(config) {
        if (!this.supportData || !this.supportDataType) {
            console.warn(`you must call 'create' method before the 'add' method`);
            return this;
        }
        if (!config.type) {
            console.warn(`config can not found attribute 'type'`);
            return this;
        }
        if (SupportDataGenerator.configModelMap[config.type] !== this.supportDataType) {
            console.warn(`current generator create config which module is in: ${this.supportDataType}, but you provide type is '${config.type}'`);
            return this;
        }
        this.supportData[config.vid] = generateConfig(config.type, config);
        return this;
    }
    get() {
        this.supportDataType = undefined;
        if (this.supportData) {
            return this.supportData;
        }
        else {
            return {};
        }
    }
}
//# sourceMappingURL=SupportDataGenerator.js.map