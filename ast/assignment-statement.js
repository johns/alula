module.exports = class AssignmentStatement {
  constructor(targets, op, sources) {
    if (Array.isArray(targets) && targets.length > 0 && Array.isArray(targets[0])) {
      targets = targets[0];
    }
    if (Array.isArray(sources) && sources.length > 0 && Array.isArray(sources[0])) {
      sources = sources[0];
    }

    Object.assign(this, { targets, op, sources });
  }

  analyze(context) {
    if (this.targets.length !== this.sources.length) {
      throw new Error('Number of variables does not equal number of expressions');
    }
    this.sources.forEach(e => e.analyze(context));
    this.targets.forEach(v => v.analyze(context));
  }

  optimize() {
    this.sources.forEach(e => e.optimize());
    this.targets.forEach(v => v.optimize());
    // Suggested: Turn self-assignments without side-effects to null
    return this;
  }
};
