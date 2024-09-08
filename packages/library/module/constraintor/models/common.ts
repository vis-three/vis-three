export const commonRegCommand = {
  reg: new RegExp(".*"),
  handler(params) {
    params.model.set(params);
    params.target.constrain();
  },
};
