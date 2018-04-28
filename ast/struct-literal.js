module.exports = class StructLiteral {
  constructor(id, body) {
    this.id = id;
    this.body = body;
  }

  analyze() { // eslint-disable-line class-methods-use-this
    // Intentionally empty
  }

  optimize() {
    return this;
  }
};
