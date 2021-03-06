//Object Literals
let empty = {};                             // An object with no properties
let point = {x:0, y:0};                     // Two numeric properties
let p2 = {x: point.x, y: point.y+1};        // More complex values
let book = {                
    "main title": "Learning JS",            // These property names include spaces,
    "sub-title": "A Practical Example",     // and hyphens, so use string literals.
    for: "everyone",                        // for is reserved, but no quotes.
    author: {                               // The value of this property is
        firstname: "Tavishi",               // itself an object.
        surname: "Sharma"
    }
};   
//Object.create()
let o1 = Object.create({x:1, y:2});         //o1 inherits properties x and y
o1.x + o1.y                                 // => 3         
let o2 = Object.create(null);               // o2 inherits no props or methods.
let o3 = Object.create(Object.prototype);   // o3 is like {} or new Object().
let o = {x: "don't change this value"};
library.function(Object.create(o));         //Guard against accidental modifications
//Inheritance
let o = {};                                 // o inherits object methods from Object.prototype
o.x = 1;                                    // and it now has an own property x.
let p = Object.create(o);                   // p inherits properties from o and Object.prototype
p.y = 2;                                    // and has an own property y.
let q = Object.create(p);                   // q inherits properties from p,o, and...
q.z = 3;                                    // ...Object.prototype and has an own property z.
let f = q.toString();                       // toString is inherited from Object.prototype
q.x + q.y                                   // => 3; x and y are inherited from o and p

let unitcircle = {r:1};                     // An object to inherit from
let c = Object.create(unitcircle);          // c inherits the property r
c.x = 1; c.y = 1;                           // c defines two properties of its own
c.r = 2;                                    // c overrides its inherited property
unitcircle.r                                // => 1: the prototype is not affected

// Property Access
//A verbose and explicit technique 
let surname = undefined;
if(book) {
    if(book.author){
        surname = book.author.surname;
    }
}
//A concise and idiomatic alternative to get surname or null or undefined
surname = book && book.author && book.author.surname; 
//or
let surname = book?.author?.surname;
//Delete
delete book.author;                         // The book object now has no author property
delete book["main title"];                  // Now it doesn't have "main title", either.
// In strict mode, all these deletions throw TypeError instead of returning false
delete Object.prototype                     // => false: property is non-configurable
var x = 1;                                  // Declare a global variable
delete globalThis.x                         // => false: can't delete this property
function f() {}                             // Declare a global function
delete globalThis.f                         // => false: can't delete this property either

globalThis.x = 1;                           // Create a configurable global property (no let or var)
delete x                                    // => true: this property can be deleted

/* In strict mode, however, delete raises a SyntaxError if its operand is an unqualified identifier
like x, and you have to be explicit about the property access: */
delete x;                                   // SyntaxError in strict mode
delete globalThis.x;                        // This works
//Object Testing Properties
let o = {x:1};
"x" in o                                    // => true: o has an own property "x"
"y" in o                                    // => false: o doesn't have a property "y"                                    
"toString" in o                             // => true: o inherits a toString property
//or
o.hasOwnProperty("x");                      // => true: o has an own property "x"
o.hasOwnProperty("y");                      // => false: o doesn't have a property "y"
o.hasOwnProperty("toString");               // => false: toString is an inherited property
//or
o.propertyIsEnumerable("x")                 // => true: o has an own enumrable property x
o.propertyIsEnumerable("toString")          // => false: not an own property
Object.prototype.propertyIsEnumerable("toString")// => false: not enumerable
//or
o.x !== undefined                           // => true: o has a property x
o.y !== undefined                           // => false: o doesn't have a property y
o.toString !== undefined                    // => true: o inherits a toString property
//Enumerating Properties
let o = {x:1, y:2, z:3};                    // Three enumerable own properties
o.propertyIsEnumerable("toString")          // => false: not enumerable
for(let p in o){                            // Loop through the properties
    console.log(p);                         // Prints x,y, and z, but not toString
}
/* To guard against enumerating inherited properties with for/in, you can add an explicit 
check inside the loop body: */
for(let p in o){
    if(!o.hasOwnProperty(p)) continue;       // Skip inherited properties
}
for(let p in o){
    if(typeof o[p] === "function") continue; // Skip all methods
}
/* As an alternative to using a for/in loop, it is often easier to get an array of property 
names for an object and then loop through that array with a for/of loop. There are four 
functions you can use to get an array of property names:
Object.keys() returns an array of the names of the enumerable own properties of an object. 
It does not include non-enumerable properties, inherited properties, or properties whose 
name is a Symbol. 
Object.getOwnPropertyNames() works like Object.keys() but returns an array of the names 
of non-enumerable own properties as well, as long as their names are strings. 
Object.getOwnPropertySymbols() returns own properties whose names are Symbols, whether 
or not they are enumerable. 
Reflect.ownKeys() returns all own property names, both enumerable and non-enumerable, and 
both string and Symbol.  */

//Extending Objects
let target = {x:1}, source = {y:2, z:3};
for(let key of Object.keys(source)){
    target[key] = source[key];
}
target // => {x:1, y:2, z:3}

Object.assign(o, defaults); //overwrites everything in o with defaults

/* create a new object, copy the defaults into it, and then override those defaults 
with the properties in o: */
o = Object.assign({}, defaults, o); 

/* avoid the overhead of the extra object creation and copying by writing a version
of Object.assign() that copies properties only if they are missing: */

// Like Object.assign() but doesn't override existing properties
// (and also doesn't handle Symbol properties)
function merge(target, ...sources){
    for(let source of sources){
        for(let key of Object.keys(source)){
            if(!(key in target)){
                // This is different than Object.assign()
                target[key] = source[key];
            }
        }
    }
    return target;
}
Object.assign({x:1}, {x:2, y:2}, {y:3, z:4}) // => {x:2, y:3, z:4}
merge({x:1}, {x:2, y:2}, {y:3, z:4})         // => {x:1, y:2, z:4}

// Serializing Objects
/* Object serialization is the process of converting an object???s state to a string from 
which it can later be restored. The functions JSON.stringify() and JSON.parse() serialize 
and restore JavaScript objects.  */
let o = {x:1, y: {z: [false, null, ""]}}; // Define a test object
let s = JSON.stringify(o);                // s == '{"x":1, "y":{"z":[false, null, ""]}}'
let p = JSON.parse(s);                    // p == {x:1, y:{z: [false, null, ""]}}

// toString() Method
let point = {
    x: 1,
    y: 2,
    toString: function() {
        return `(${this.x}, ${this.y})`;
    }
};
String(point) // => "(1,2)": toString() is used for string conversions

//toLocaleString() Method
let point = {
    x: 1000,
    y: 2000,
    toString: function() {return `(${this.x}, ${this.y})`;},
    toLocaleString: function(){
        return `(${this.x.toLocaleString()}, ${this.y.toLocaleString})`;
    }
};
point.toString()        // => "(1000, 2000)"
point.toLocaleString()  // => "(1,000, 2,000)": note thousands separators
//valueOf() method
let point = {
    x: 3,
    y: 4,
    valueOf: function() { return Math.hypot(this.x, this.y);}
};
Number(point)   // => 5: valueOf() is used for conversions to numbers
point > 4       // => true
point > 5       // => false
point < 6       // => true
//toJSON() method
let point = {
    x: 1,
    y: 2,
    toString: function() { return `(${this.x}, ${this.y})`;},
    toJSON: function() { return this.toString();}
};
JSON.stringify([point])  // => '["(1, 2)"]'

//Computed Property Names
const PROPERTY_NAME = "pl";
function computePropertyName() { return "p" + 2; }

let o = {};
o[PROPERTY_NAME] = 1;
o[computePropertyName()] = 2;

const PROPERTY_NAME = "p1";
function computePropertyName() { return "p" + 2; }

let p = {
    [PROPERTY_NAME]: 1,
    [computePropertyName()]: 2
};

p.p1 + p.p2 // => 3

//Spread Operator

let position = {x:0, y:0};
let dimensions = { width: 100, height: 75};
let rect = {...position, ...dimensions};
rect.x + rect.y + rect.width + rect.height // => 175

/* If the object that is spread and the object it is being spread into both have a property 
with the same name, then the value of that property will be the one that comes last: */
let o = { x: 1 };
let p = { x: 0, ...o};
p.x // => 1 : the value from object o overrides the initial value
let q = {...o, x: 2};
q.x // => 2: the value 2 overrides the previous value from o

/* Also note that the spread operator only spreads the own properties of an object, 
not any inherited ones: */

let o = Object.create({x: 1}); // o inherits the property x
let p = {...o};
p.x                            // => undefined

// Shorthand methods

let square = {
    area: function(){
        return this.side*this.side;
    },
    side: 10
};
square.area() // => 100

//or

let square = {
    area() { return this.side*this.side;},
    side: 10
};
square.area() // => 100

const METHOD_NAME = "m";
const symbol = Symbol();
let weirdMethods = {
    "method With Spaces" (x) { return x+1;},
    [METHOD_NAME] (x) { return x+2;},
    [symbol] (x) { return x+3;}
};
weirdMethods["method With Spaces"](1)   // => 2
weirdMethods[METHOD_NAME](1)            // => 3
weirdMethods[symbol](1)                 // => 4

// Property Getters and Setters
let o = {
    //An ordinary data property
    dataProp: value,

    //An accessor property defined as a pair of functions.
    get accessorProp() { return this.dataProp; },
    set accessorProp(value) { this.dataProp = value; }
};

let p = {
    // x and y are regular read-write data properties.
    x: 1.0,
    y: 1.0,

    // r is a read-write accessor poroperty with getter and setter.
    // Don't forget to put a comma after accessor methods.
    get r(){ return Math.hypot(this.x, this.y);},
    set r(newvalue) {
        let oldvalue = Math.hypot(this.x, this.y);
        let ratio = newvalue/oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },
    // theta is a read-only accessor property with getter only.
    get theta() { return Math.atan2(this.y, this.x);}
};
p.r // => MATH.SQART2
p.theta // => MATH.PI / 4

// This object generates strictly increasing serial numbers.
const serialnum = {
    // This data property holds the next serial number.
    // The _ in the property name hints that it is for internal use only.
    _n: 0,

    // Return the current value and increment it
    get next() { return this._n++; },

    // Set a new value of n, but only if it's larger than the current value
    set next(n) {
        if( n > this._n) this._n = n;
        else throw new Error("serial number can only be set to a larger value");
    }
};
serialnum.next = 10;    // Set the starting serial number
serialnum.next          // => 10
serialnum.next          // => 11: different value each time we get next

// This object has accessor properties that return random numbers.
// The expression "random.octet", for example, yields a random number
// between 0 and 255 each time it is evaluated.
const random = {
    get octet() { return Math.floor(Map.random()*256);},
    get uint16() { return Math.floor(Math.random()*65536);},
    get int16() { return Math.floor(Math.random()*65536)-32768;}
};