module.exports = class ListLiteral {
  constructor(value) {
    this.value = value;
  }

  analyze() { // eslint-disable-line class-methods-use-this
    // Intentionally empty
  }

  optimize() {
    return this;
  }
};
