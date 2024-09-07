export const commonRegCommand = {
  reg: new RegExp(".*"),
  handler(params) {
    params.processor.set(params);
    params.target.constrain();
  },
};
