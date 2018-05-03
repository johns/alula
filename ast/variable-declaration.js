const util = require('util');
const Variable = require('./variable');

// A VariableDeclaration declares one or more variables. The variable objects
// will be created during semantic analysis.
module.exports = class VariableDeclaration {
  // During syntax analysis (parsing), all we do is collect the variable names.
  // We will make the variable objects later, because we have to add them to a
  // semantic analysis context.
  constructor(type, ids, initializers) {
    this.type = type;
    this.ids = Array.isArray(ids) ? ids : [ids];
    this.initializers = Array.isArray(initializers) ? initializers : [initializers];
  }

  analyze(context) {
    if (this.ids.length !== this.initializers.length) {
      throw new Error('Number of variables does not equal number of initializers');
    }
    

    // We don't want the declared variables to come into scope until after the
    // declaration line, so we will analyze all the initializing expressions
    // first.
    this.initializers.forEach(e => e.analyze(context));

    // Now we can create actual variable objects and add to the current context.
    this.variables = this.ids.map(id => new Variable(id, this.type));
    this.variables.forEach(variable => context.add(variable));
  }

  optimize() {
    return this;
  }
};
