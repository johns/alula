module.exports = class DictLiteral {
  constructor(elements) {
    this.elements = elements;
  }

  analyze(context) {
    this.elements.forEach(e => e.analyze(context));
  }

  toString() {
    return `[${this.elements.toString()}]`;
  }
};
