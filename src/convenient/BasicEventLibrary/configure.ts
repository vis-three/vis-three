import { BasicEventConfig } from "../../middleware/event/EventCompiler"

export interface OpenWindow extends BasicEventConfig{
  params: {
    url: string
  }
}

export type BasicEventAllConfig = OpenWindow

const configGenerator = function<T extends BasicEventConfig> (config: T) {
  return (merge: OpenWindow): OpenWindow => {
    return Object.assign(config, merge)
  }
}

export const BasicEventLibrary  = {
  openWindow: configGenerator<OpenWindow>({
    name: 'openWindow',
    params: {
      url: ''
    }
  })
}