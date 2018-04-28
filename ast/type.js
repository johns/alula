class Type {
    constructor(type) {
        this.type = type;
    }
    equals(typeO) {
        return this.type === typeO.type;
    }
    toString() {
        const typeString = `Type ${this.type}`;
        return typeString;
    }
}

Type.INT = new Type("num");
Type.FLOAT = new Type("num");
Type.STRING = new Type("string");
Type.BOOL = new Type("bool");
Type.LIST = new Type("list");
Type.DICT = new Type("dict");
Type.STRUCT = new Type("struct");

module.exports = Type;
