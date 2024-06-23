export * from "./base";
export * from "./engine";
export * from "./eventDispatcher";
export * from "./plugin";
export * from "./strategy";

import { version } from "./package.json";

declare global {
  interface Window {
    __THREE__: string;
    __VIS__: string;
  }
}

if (!window.__THREE__) {
  console.error(
    `vis-three dependent on three.js module, pleace run 'npm i three' first.`
  );
}

if (window.__VIS__) {
  console.warn(`Duplicate vis-three frames are introduced`);
} else {
  window.__VIS__ = version;
}
