module.exports = class ArrowExpression {
  constructor(variable, id) {
    Object.assign(this, { variable, id });
  }

  analyze(context) {
    this.variable.analyze(context);
    this.id.analyze(context);
  }

  optimize() {
    this.variable = this.variable.optimize();
    this.id = this.id.optimize();
    return this;
  }
};
