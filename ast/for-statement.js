module.exports = class ForStatement {
  constructor(decl, test, assign, body) {
    Object.assign(this, { decl, test, assign, body});
  }

  analyze(context) {
    this.decl.analyze(context);
    this.test.analyze(context);
    this.assign.analyze(context);
    const bodyContext = context.createChildContextForLoop();
    this.body.forEach(s => s.analyze(bodyContext));
  }

  optimize() {
    this.decl = this.decl.optimize();
    this.test = this.test.optimize();
    this.assign = this.assign.optimize();
    this.body.map(s => s.optimize()).filter(s => s !== null);
    // Suggested: Look for returns/breaks in the middle of the body
    return this;
  }
};
