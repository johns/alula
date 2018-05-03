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

class ListType {
    constructor(memberType) {
        this.memberType = memberType;
    }
    // equals(typeO) {
    //     return this.type === typeO.type;
    // }
    // toString() {
    //     const typeString = `Type ${this.type}`;
    //     return typeString;
    // }
}

class DictType {
    constructor(keyType, valueType) {
        Object.assign(this, { keyType, valueType });
    }
}

Type.INT = new Type("num");
Type.FLOAT = new Type("num");
Type.NUM = new Type("num");
Type.STRING = new Type("string");
Type.BOOL = new Type("bool");
Type.LIST = new Type("list");
Type.DICT = new Type("dict");
Type.STRUCT = new Type("struct");
Type.UNDEFINED = new Type("undefined");

module.exports = { Type, DictType, ListType };
