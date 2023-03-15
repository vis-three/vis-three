export interface ModifierParameters {
  visible?: boolean;
  source: any;
}

export abstract class Modifier {
  visible = true;
  abstract source: any;

  constructor(parameters: ModifierParameters) {
    parameters.visible && (this.visible = parameters.visible);
  }

  abstract apply(): void;
  abstract render(): void;
  abstract dispose(): void;
}
