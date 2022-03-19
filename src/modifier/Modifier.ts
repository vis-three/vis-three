export interface ModifierParameters {
  use: boolean
}

export abstract class Modifier {
  use: boolean = true

  constructor (parameters: ModifierParameters) {
    this.use = parameters.use !== undefined ? parameters.use : true
  }

  abstract render()
  abstract dispose()
}