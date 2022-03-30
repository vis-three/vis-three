export interface Process {
  key: string
  path: string[]
  value: any
}

export interface Processor {
  assemble: (params: any) => this
  process: (params: Process) => this
  processAll: () => this
  dispose: () => this
}