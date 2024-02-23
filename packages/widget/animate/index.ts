import { Easing, Tween } from "@tweenjs/tween.js";

export interface AnimateParams<O extends object = any> {
  target: O;
  to: Partial<O>;
  duration?: number;
  delay?: number;
  runtime?: boolean;
  easing?: (amount: number) => number;
}

export interface Animation<O extends object = any> extends Tween<O> {
  
}

export { Easing };

export const animate = function <O extends object = any>(
  params: AnimateParams<O>
) {
  const tween = new Tween(params.target)
    .to(params.to)
    .duration(params.duration || 500)
    .delay(params.delay || 0)
    .easing(Easing.Quadratic.InOut)
    .start();
};
