module.exports = class ForStatement {
  constructor(decl, test, assign, body) {
    if (Array.isArray(decl) && decl.length > 0 && Array.isArray(decl[0])) {
      decl = decl[0];
    }
    if (Array.isArray(assign) && assign.length > 0 && Array.isArray(assign[0])) {
      assign = assign[0];
    }
    if (Array.isArray(body) && body.length > 0 && Array.isArray(body[0])) {
      body = body[0];
    }
    if (Array.isArray(test) && test.length > 0 && Array.isArray(test[0])) {
      test = test[0];
    }
    Object.assign(this, {
      decl, test, assign, body,
    });
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
