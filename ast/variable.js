const TYPE = require("./type");

module.exports = class Variable {
  constructor(declaredType, id, exp) {
        this.declaredType = declaredType;
        this.id = id;
        this.exp = exp;
    }

    analyze(context) {
        this.exp.analyze(context);
        if (!this.declaredType.equals(this.exp.type)) {
            throw new Error("Declared type does not match the evaluated type.");
        }
        context.checkIfVariableIsAlreadyDeclared(this.id);
        context.addVariable(this.id, this.exp);
    }

    toString() {
        const declString = `(Decl let ${this.type} ${this.id} = ${this.exp})`;
        return declString;
    }
};
