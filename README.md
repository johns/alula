![alula logo](Alula.png)

Welcome to Alula, the language that does away with the semicolon, but embraces the colon. Alula is a static, weakly typed programming languages that focuses on parallelism and simplicity through the standardized use of the colon. Alula takes inspiration from Python, with hints of Elm.


### Features
* All variable declarations, function calls, and and conditional statements require a colon to designate the beginning
* Any arguments are separated with a comma directly after the colon
* Chained functions are separated by ->, designated another "step"
* Parenthesis are exclusively used for logic and arithmetic precedence

| Alula              | JavaScript         | Description   |
| ------------------ |:------------------:| ---------------:|
| type name: value   | var name = value; | Variable Declarations|
| if: params {...} | if (params) {...}           | if-statements |
| while: params {...}| while(params) {...} | while-loop |
| for: i:0, i < max, i++ {...} | for (var i = 0; i < max; i++) {...} | for-loop |
| return: 0 | return 0; | return statement |
| variable -> getValue: 12 -> getMax -> toString | variable.getValueAt(12).getMax().toString() | Chainable Functions

* The following types are checked at compile time.
  * Number - num
  * Boolean - bool
  * String - string
  * Struct - struct
  * List - list
  * Dictionary - dict
  * Undefined - undefined

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

##### Closure
A basic closure that finds the previous x value and multiplies it by y
```
function closure: x, y {
  currentX: x
  return: function next: {
    currentX: x * y
    return: currentX
  }
}

closureVariable: closure: 3, 2    
closureVariable -> next
```
