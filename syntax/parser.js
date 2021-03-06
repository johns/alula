/*
 * Parser module
 *
 *   const parse = require('./parser');
 *
 *   parse(text)
 *       Returns the abstract syntax tree for the given program text. This
 *       function will first pre-parse (figure out indents and dedents),
 *       then match against an Ohm grammar, then apply AST generation
 *       rules. If there are any errors, this function will throw an error.
 */

const fs = require('fs');
const ohm = require('ohm-js');
const Program = require('../ast/program');
const VariableDeclaration = require('../ast/variable-declaration');
const AssignmentStatement = require('../ast/assignment-statement');
const PrintStatement = require('../ast/print-statement');
const BreakStatement = require('../ast/break-statement');
const ReturnStatement = require('../ast/return-statement');
const ForStatement = require('../ast/for-statement');
const IfStatement = require('../ast/if-statement');
const Case = require('../ast/case');
const WhileStatement = require('../ast/while-statement');
const CallStatement = require('../ast/call-statement');
const FunctionDeclaration = require('../ast/function-declaration');
const BinaryExpression = require('../ast/binary-expression');
const PostfixExpression = require('../ast/postfix-expression');
const PrefixExpression = require('../ast/prefix-expression');
const IdentifierExpression = require('../ast/identifier-expression');
const SubscriptedExpression = require('../ast/subscripted-expression');
const Call = require('../ast/call');
const Parameter = require('../ast/parameter');
const Argument = require('../ast/argument');
const BooleanLiteral = require('../ast/boolean-literal');
const NumericLiteral = require('../ast/numeric-literal');
const StringLiteral = require('../ast/string-literal');
const ListLiteral = require('../ast/list-literal');
const DictLiteral = require('../ast/dict-literal');
const StructLiteral = require('../ast/struct-literal');
const { Type, DictType, ListType } = require('../ast/type');
const Pair = require('../ast/pair');

const grammar = ohm.grammar(fs.readFileSync('./syntax/alula.ohm'));

// Ohm turns `x?` into either [x] or [], which we should clean up for our AST.


function unpack(a) {
  return a.length === 0 ? null : a[0];
}

/* eslint-disable no-unused-vars */
const astGenerator = grammar.createSemantics().addOperation('ast', {
  Program(body) { return new Program(body.ast()); },
  Stmt_simple(statement) { return statement.ast(); },
  Stmt_for(_1, decl, _2, test, _3, assign, body) {
    return new ForStatement(decl.ast(), test.ast(), assign.ast(), body.ast());
  },
  Stmt_while(_1, test, suite) { return new WhileStatement(test.ast(), suite.ast()); },
  Stmt_if(_1, firstTest, firstSuite, _2, moreTests, moreSuites, _3, lastSuite) {
    const tests = [firstTest.ast(), ...moreTests.ast()];
    const bodies = [firstSuite.ast(), ...moreSuites.ast()];
    const cases = tests.map((test, index) => new Case(test, bodies[index]));
    return new IfStatement(cases, unpack(lastSuite.ast()));
  },
  Stmt_function(_1, id, _2, params, suite) {
    return new FunctionDeclaration(id.ast(), params.ast(), suite.ast());
  },
  SimpleStmt_assign(v, op, e) { return new AssignmentStatement(v.ast(), op.ast(), e.ast()); },
  SimpleStmt_print(_, e) { return new PrintStatement(e.ast()); },
  SimpleStmt_break(_) { return new BreakStatement(); },
  SimpleStmt_return(_, e) { return new ReturnStatement(unpack(e.ast())); },
  SimpleStmt_call(c) { return new CallStatement(c.ast()); },
  Suite(_1, statement, _2) { return [statement.ast()]; },

  Type_string(_) { return Type.STRING; },
  Type_number(_) { return Type.NUM; },
  Type_boolean(_) { return Type.BOOL; },
  Type_list(_1, _2, elementType, _3) { return new ListType(elementType.ast()); },
  Type_dictionary(_1, _2, keyType, _3, valueType, _4) {
    return new DictType(keyType.ast(), valueType.ast());
  },
  Type_struct(_1, _2, bindings, _3) { throw new Error('Structs not done yet'); },
  Type_undefined(_) { return Type.UNDEFINED; },
  Pair(key, _1, value) { return new Pair(key.ast(), value.ast()); },

  Exp_or(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp_and(left, op, right) { return new BinaryExpression(op.ast(), right.ast()); },
  Exp1_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp2_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp3_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp4_binary(id, op, operand) { return new BinaryExpression(id.ast(), op.ast(), operand.ast()); },
  Exp5_postfix(expression, op) { return new PostfixExpression(expression.ast(), op.ast()); },
  Exp6_prefix(op, expression) { return new PrefixExpression(op.ast(), expression.ast()); },
  Exp7_parens(_1, expression, _2) { return expression.ast(); },
  Call(callee, _1, args) { return new Call(callee.ast(), args.ast()); },
  VarDecl(t, v, _2, e) { return new VariableDeclaration(t.ast(), v.ast(), e.ast()); },
  VarExp_subscripted(v, _1, e, _2) { return new SubscriptedExpression(v.ast(), e.ast()); },
  VarExp_simple(id) { return new IdentifierExpression(id.ast()); },
  Param(_1, id, _2, exp) { return new Parameter(id.ast(), unpack(exp.ast())); },
  Arg(id, _, exp) { return new Argument(unpack(id.ast()), exp.ast()); },
  NonemptyListOf(first, _, rest) { return [first.ast(), ...rest.ast()]; },
  EmptyListOf() { return []; },
  boollit(_) { return new BooleanLiteral(!!this.sourceString); },
  numlit(_1, _2, _3, _4, _5, _6) { return new NumericLiteral(+this.sourceString); },
  strlit(_1, chars, _6) { return new StringLiteral(this.sourceString); },
  Listlit(_1, e, _2) { return new ListLiteral(e.ast()); },
  Dictlit(_1, e, _2) { return new DictLiteral(e.ast()); },
  Structlit(_1, e, _2) { return new StructLiteral(e.ast()); },
  id(_1, _2) { return this.sourceString; },
  _terminal() { return this.sourceString; },
});
/* eslint-enable no-unused-vars */

module.exports = (text) => {
  const match = grammar.match(text);
  if (!match.succeeded()) {
    throw new Error(`Syntax Error: ${match.message}`);
  }
  return astGenerator(match).ast();
};
