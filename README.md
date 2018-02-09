# alula

![alula logo](Alula.png)

Welcome to Alula, the language that does away with the semicolon, but embraces the colon. Alula is a static, strongly typed programming languages that focuses on parallelism and simplicity through the standardized use of the colon. Alula takes inspiration from Python, with hints of Elm.


### Features
* All variable declarations, function calls, and and conditional statements require a colon to designate the beginning
* Any arguments are separated with a comma directly after the colon
* Chained functions are separated by ->, designated another "step"
* Parenthesis are exclusively used for logic and arithmetic precedence

| Alula                     | JavaScript         | Description   |
| ------------------------- |:----------------:| ---------:|
| type name: value   | var name = value; | Variable Declarations|
| if: params {...} | if (params) {...}           | if-statements |
| while: params {...}| while(params) {...} | while-loop |
| for: i:0, i < max, i++ {...} | for (var i = 0; i < max; i++) {...} | for-loop |
| return: 0 | return 0; | return statement |
| variable -> getValue: 12 -> getMax -> toString | variable.getValueAt(12).getMax().toString() | Chainable Functions
| # single line comment | // single line comment | single line comment |
| #: block comment :# | /\* block comment */ | multiple line comment |


* Alula contains 7 types. They are declared as followed
  * num numberVariable: 2
  * bool booleanVariable: false
  * string stringVariable: "This is text."
  * list listOfVariables<type>: ["List", "of", true, 5]
  * dict dictionaryOfVariables: {John: "Scott", J: 4, Olive: true}
  * struct aStructure: {...}
  * undefined

### Examples
Hello World
```
print: "Hello World"
```

##### Fibonacci Sequence
Iteratively finds fibonacci number at the nth index value
```
function fibonacci: position {
  result: 1
  for: i: 1, i < (position -> length), i++ {
    result +: result
  }
  return: result
}
```

##### Average
Finds the average of a list of numbers
```
function average: list {
  multipled: 1
  for: i:0, i < (list -> length), i++ {
    multiplied *: list[i]
  }
  return multiplied / (list -> length)
}
```

##### Check Odd / Even
Returns odd or even based on the input
```
function oddOrEven: number {
  if: number % 2 == 0 {
    return: 'even'
  } else:
    return: 'odd'
}
```

##### Closure
A basic closure that finds the previous x value and multiplies it by y
```
function closure: x, y {
  currentX: x
  return: function next: {
    currentX: currentX * y
    return: currentX
  }
}

closureVariable: closure: 3, 2    
closureVariable -> next
```
