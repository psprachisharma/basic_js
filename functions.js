// Nested Functions
function hypotenuse(a, b){
    function square(x) { return x*x; }
    return Math.sqrt(square(a) + square(b));
}

let calculator = { // An object literal
    operandi1: 1,
    operandi2: 1,
    add() {
        /* We're using method shorthand syntax for this function. Note the use of 
        this keyword to refer to the containing object. */
        this.result = this.operandi1 + this.operandi2;
    }
};
calculator.add();   // A method invocation to compute 1+1.
calculator.result   // => 2

let o = {                   // An object o.
    m: function() {         // Method m of the object.
        let self = this;    // Save the "this" value in a variable.
        this === o          // => true: "this" is the object o. 
        f();                // Now call the helper function f().

        function f() {      // A nested function f
            this === o      // => false: "this" is global or undefined
            self === o      // => true: self is the outer "this" value.
        }
    }
};
o.m();                      // Invoke the method m on the object o.

// Optional Parameters and Defaults
/* Append the names of the enumerable properties of object o to the array a, 
and return a. If a is omitted, create and return a new array. */
function getPropertyNames(o, a){
    if(a === undefined) a = []; // If undefined, use a new array
    for(let property in o) a.push(property);
    return a;
}

// getPropertyNames() can be invoked with one or two arguments:
let o = {x: 1}, p = {y: 2, z: 3};   // Two objects for testing
let a = getPropertyNames(o);        // a == ["x"]; get o's properties in a new array
getPropertyNames(p,a);              // a == ["x", "y", "z"]; add p's properties to it

function max(first=-Infinity, ...rest) {
    let maxValue = first; // Start by assuming the first arg is biggest
    // Then loop through the test of the arguments, lookking for bigger
    for(let n of rest){
        if(n > maxValue){
            maxValue = n;
        }
    }
    // return the biggest
    return maxValue;
}
max(1, 10, 100, 2, 3, 1000, 4, 5, 6) // => 1000

// Arguments Object
function max(x) {
    let maxValue = -Infinity;
    // Loop through the arguments, looking for, and remembering, the biggest.
    for(let i = 0; i< arguments.length; i++){
        if(arguments[i] > maxValue) maxValue = arguments[i];
    }
    // return the biggest
    return maxValue;
}
max(1, 10, 100, 2, 3, 1000, 4, 5, 6) // => 1000

// Spread Operator
// This function takes a function and returns a wrapped version
function timed(f) {
    return function(...args){ // Collect args into a rest parameter array
        console.log(`Entering function ${f.name}`);
        let startTime = Date.now();
        try {
            // Pass all of our arguments to the wrapped function
            return f(...args); // Spread the args back out again
        }
        finally {
            // Before we return the wrapped return value, print elapsed time.
            console.log(`Exiting ${f.name} after ${Date.now()-startTime}ms`);
        }
    };
}
// Compute the sum of the numbers between 1 and n by brute force
function benchmark(n) {
    let sum = 0;
    for(let i = 1; i <= n; i++) sum += i;
    return sum;
}
// Now invoke the timed version of that test function
timed(benchmark)(1000000) // => 500000500000; this is the sum of the numbers

// Multiply the vector {x,y} or {x,y,z} by a scalar value
function vectorMultiply({x,y,z=0}, scalar){
    return {x: x*scalar, y:y*scalar, z:z*scalar};
}
vectorMultiply({x:1, y:2}, 2) // => {x:2, y:4, z:0}

function arraycopy ({from, to=from, n=from.length, fromIndex = 0, toIndex = 0}){
    let valuesToCopy = from.slice(fromIndex, fromIndex+n);
    to.splice(toIndex, 0, ...valuesToCopy);
    return to;
}
let a = [1,2,3,4,5], b = [9,8,7,6,5];
arraycopy({from: a, n: 3, to: b, toIndex: 4})

// Argument Types
/* Return the sum of the elements an iterable object a. 
the elements of a must all be numbers.  */
function sum(a) {
    let total = 0;
    for(let element of a){ // Throws TypeError if a is not iterable
        if(typeof element !== "number"){
            throw new TypeError("sum(): elements must be numbers");
        }
        total += element;
    }
    return total;
}
sum([1,2,3])            // => 6
sum(1,2,3);              // !TypeError: 1 is not iterable
sum([1,2,"3"]);         // !TypeError: element 2 is not a number

// Using functions as data
// We define some simple functions here
function add(x,y) { return x+y; }
function subtract(x,y) { return x-y; }
function multiply(x,y) { return x*y; }
function divide(x,y) { return x/y; }

/* Here's a function that takes one of the preceding functions as an argument and 
invokes it on two operands */
function operate(operator, operand1, operand2){
    return operator(operand1, operand2);
}

// We could invoke this function like this to compute the value (2+3) + (4*5):
let i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5));

/* For the sake of the example, we implement the simple functions again, 
this time within an object literal; */
const operators = {
    add:        (x,y) => x+y,
    subtract:   (x,y) => x-y,
    multiply:   (x,y) => x*y,
    divide:     (x,y) => x/y,
    pow:        Math.pow // This works for predefined functions too
};

/* This function takes the name of an operator, looks up that operator in the Object, 
and then invokes it on the supplied operands. Note the syntax used to invoke the
operator function. */
function operate2(operation, operand1, operand2){
    if(typeof operators[operation] === "function") {
        return operators[operation](operand1, operand2);
    }
    else throw "unknown operator";
}

operate2("add", "hello", operate2("add"," ","world")) //=> "hello world"
operate2("pow", 10, 2) //=> 100

// Defining your own function properties 
/* Initialize the counter property of the function object.
Function declarations are hoisted so we really can do this assignemnt before 
the function declaration. */
uniqueInteger.counter = 0;

/* This function returns a different integer each time it is called. It uses a property 
of itself to remember the next value to be returned.  */
function uniqueInteger(){
    return uniqueInteger.counter++; // return and increment counter property
}
uniqueInteger()     // => 0
uniqueInteger()     // => 1

// Compute factorials and cache results as properties of the function itself.
function factorial(n){
    if(Number.isInteger(n) && n > 0){           // Positive integers only
        if(!(n in factorial)){                  // If no cached result
            factorial[n] = n*factorial(n-1);    //Compute and cache it
        }
        return factorial[n];                    // Return the cached result
    } else {
        return NaN;                             // If inout was bad
    }
}
factorial[1] = 1;          // Initialize the cache to hold this base case.
factorial(6)               // => 720
factorial[5]               // => 120; the call above caches this value

function counter() {
    let n = 0;
    return {
        count: function() { return n++;},
        reset: function() { n = 0; }
    };
}
let c = counter(), d = counter();   // Create two counters
c.count()                           // => 0
d.count()                           // => 0; they count independently
c.reset()                           // reset() and count() methods share state
c.count()                           // => 0: becaue we reset c
d.count()                           // => 1: d was not reset

function counter(n){
    return {
        // Property getter method returns and 
    }
}