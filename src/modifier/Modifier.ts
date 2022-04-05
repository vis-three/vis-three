export interface ModifierParameters {
  visible: boolean;
}

export abstract class Modifier {
  visible = true;

  constructor(parameters: ModifierParameters) {
    this.visible = parameters.visible !== undefined ? parameters.visible : true;
  }

  abstract use();
  abstract render();
  abstract dispose();
}
