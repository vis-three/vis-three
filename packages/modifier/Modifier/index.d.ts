export interface ModifierParameters {
    visible?: boolean;
    source?: any;
}
export declare abstract class Modifier {
    visible: boolean;
    abstract source: any;
    constructor(parameters: ModifierParameters);
    abstract apply(): void;
    abstract render(): void;
    abstract dispose(): void;
}
