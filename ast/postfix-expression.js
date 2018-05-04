const NumericLiteral = require('./numeric-literal');

module.exports = class UnaryExpression {
  constructor(operand, op) {
    Object.assign(this, { operand, op });
  }

  analyze(context) {
    this.operand.analyze(context);
  }

  optimize() {
    this.operand = this.operand.optimize();
    if (this.op === '--' && this.operand instanceof NumericLiteral) {
      return new NumericLiteral(this.operand.value - 1);
    } else if (this.op === '++' && this.operand instanceof NumericLiteral) {
      return new NumericLiteral(this.operand.value + 1);
    }
    return this;
  }
};
