import { ObjectRule } from "@vis-three/module-object";
import { defineRule } from "@vis-three/tdcm";

export default defineRule([
  function (input) {
    return input.key !== "geometry";
  },
  ...ObjectRule,
]);
