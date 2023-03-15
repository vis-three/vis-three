export class Modifier {
    visible = true;
    constructor(parameters) {
        parameters.visible && (this.visible = parameters.visible);
    }
}
