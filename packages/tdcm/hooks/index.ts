import { AsyncScheduler } from "../scheduler";

// engine hook
export const toAsync = (fun: (finish: boolean) => boolean) => {
  AsyncScheduler.exec(fun);
};

export const toTrigger = () => {};
