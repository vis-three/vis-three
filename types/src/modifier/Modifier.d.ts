export interface ModifierParameters {
    visible: boolean;
}
export declare abstract class Modifier {
    visible: boolean;
    constructor(parameters: ModifierParameters);
    abstract use(): any;
    abstract render(): any;
    abstract dispose(): any;
}
