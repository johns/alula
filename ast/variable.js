const TYPE = require("./type");

module.exports = class Variable {
  constructor(id, declaredType) {
        this.declaredType = declaredType;
        this.id = id;
    }

    analyze(context) {
        this.exp.analyze(context);
        if (!this.declaredType.equals(this.exp.type)) {
            throw new Error('Declared type does not match the evaluated type.');
        }
        context.checkIfVariableIsAlreadyDeclared(this.id);
        context.addVariable(this.id, this.exp);
    }

};
