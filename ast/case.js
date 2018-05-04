module.exports = class Case {
  constructor(test, body) {
    if (Array.isArray(test) && test.length > 0 && Array.isArray(test[0])) {
      test = [test];
    }
    if (Array.isArray(body) && body.length > 0 && Array.isArray(body[0])) {
      body = body[0];
    }

    Object.assign(this, { test, body });
  }

  analyze(context) {
    console.log('*******', this.test, '*******');
    this.test.analyze(context);
    const bodyContext = context.createChildContextForBlock();
    this.body.forEach(s => s.analyze(bodyContext));
  }

  optimize() {
    this.test = this.test.optimize();
    // Suggested: if test is false, remove case. if true, remove following cases and the alt
    this.body.map(s => s.optimize()).filter(s => s !== null);
    // Suggested: Look for returns/breaks in the middle of the body
    return this;
  }
};
