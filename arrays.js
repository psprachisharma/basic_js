let letters = [..."Hello world"]; // An array of letters
let string = "";
for(let letter of letters){
    string += letter;
}
string // => "Hello world"; we reassembled the original text

let everyother = "";
for(let [index, letter] of letters.entries()){
    if(index % 2 === 0)
        everyother += letter; //letters at even indexes
}
everyother //=> "Hlowrd"

let uppercase = "";
letters.forEach(letter => { // Note arrow function syntax here
    uppercase += letter.toUpperCase();
});
uppercase // => "HELLOW WORLD"

let vowels = "";
for(let i=0; i < letters.length; i++){      // For each index in the array
    let letter = letters[i];                // Get the element at that index
    if(/[aeiou]/.test(letter)){             // Use a regular expression test
        vowels += letter;                   // If it is a vowel, remember it
    }
}
vowels // => "eoo"

//Multidimensional Arrays 

//Create a multidimensional array
let table = new Array(10);                  // 10 rows of the table
for(let i=0; i<table.length; i++){
    table[i] = new Array(10);               // Each row has 10 columns
}

// Initialize the array
for(let row = 0; row<table.length; row++){
    for(let col = 0; col < table[row].length; col++){
        table[row][col] = row*col;
    }
}

// Use the multidimesional array to compute 5*7
table[5][7] // => 35

//forEach method
let data = [1,2,3,4,5], sum = 0;
// Compute the sum of the elements of the array
data.forEach(value => {sum += value;});       // sum == 15

//Now increment each array element
data.forEach(function(v, i, a) { a[i] = v+1;});// data == [2,3,4,5,6]

//map()
let a = [1,2,3];
a.map(x => x*x) // => [1,4,9]: the function takes input x and returns x*x

//filter()
let a = [5,4,3,2,1];
a.filter(x => x < 3)            // => [2,1]; values less than 3
a.filter((x,i) => i%2 === 0)    // => [5,3,1]; every other value

/* Note that filter() skips missing elements in sparse arrays and that its return
value is always dense. To close the gaps in a sparse array, you can do this: */
let dense = sparse.filter(() => true);
/* And to close gaps and remove undefined and null elements, you can use filter, like this: */
a = a.filter(x => x!== undefined && x !== null);

// find() and findIndex()
let a = [1,2,3,4,5];
a.findIndex(x => x === 3)       // => 2; the value 3 appears at index 2
a.findIndex(x => x < 0)         // => -1; no negative numbers in the array
a.find(x => x%5 === 0)          // => 5: this is a multiple of 5
a.find(x => x%7 === 0)          // => undefined: no multiples of 7 in the array

// every() and some()
// every() method is like the mathematical “for all” quantifier ∀
let a = [1,2,3,4,5];
a.every(x => x< 10)             // => true: all values are < 10.      
a.every(x => x%2 === 0)         // => false: not all values are even.

// some() method is like the mathematical “there exists” quantifier ∃
let a = [1,2,3,4,5];
a.some(x => x%2 === 0)          // => true; a has some even numbers 
a.some(isNaN)                   // => false; a has no non-numbers.

// reduce() and reduceRight() also goes by "inject" and "fold"
let a = [1,2,3,4,5];
a.reduce((x,y) => x+y, 0)       // => 15; the sum of the values
a.reduce((x,y) => x*y, 1)       // => 120; the product of the values
a.reduce((x,y) => (x>y) ? x:y)  // => 5; the largest of the values

// Compute 2^(3^4). Exponentiation has right-to-left precedence
let a = [2,3,4];
a.reduceRight((acc, val) => Math.pow(val, acc)) // => 2.4178516392292583e+24

// Flattening arrays with flat() and flatMap()
[1, [2, 3]].flat()              // => [1,2,3]
[1, [2, [3]]].flat()            // => [1,2,[3]]

let a = [1,[2,[3,[4]]]];
a.flat(1)                       // => [1, 2,[3,[4]]]
a.flat(2)                       // => [1, 2, 3,[4]]
a.flat(3)                       // => [1, 2, 3, 4]
a.flat(4)                       // => [1, 2, 3, 4]

let phrases = ["hello world", "the definitive guide"];
let words = phrases.flatMap(phrase => phrase.split(" "));
words // => ["hello", "world", "the", "definitive", "guide"];

//Map non-negative numbers to their square roots
[-2, -1, 1, 2].flatMap(x => x<0 ? []: Math.sqrt(x)) // => [1, 2**0.5]

// Adding arrays with concat()
let a = [1,2,3];
a.concat(4,5)                       // => [1,2,3,4,5]
a.concat([4,5],[6,7])               // => [1,2,3,4,5,6,7]; arrays are flattened
a.concat(4, [5,[6,7]])              // => [1,2,3,4,5,[6,7]]; but not nested arrays
a                                   // => [1,2,3]; the original array is unmodified

// shift() method
let q = [];                         // q == []
q.push(1,2);                        // q == [1,2]
q.shift();                          // q == [2]; returns 1
q.push(3)                           // q == [2,3]
q.shift()                           // q == [3]; returns 2
q.shift()                           // q == []; returns 3

//unshift() method
let a = [];                         // a == []
a.unshift(1)                        // a == [1]
a.unshift(2)                        // a == [2,1]
a = [];                             // a == []
a.unshift(1,2)                      // a == [1,2]

// slice() method
let a = [1,2,3,4,5];
a.slice(0,3);                       // Returns [1,2,3]
a.slice(3);                         // Returns [4,5]
a.slice(1,-1);                      // Returns [2,3,4]
a.slice(-3,-2);                     // Returns [3]

// splice() method
let a = [1,2,3,4,5,6,7,8];
a.splice(4)                         // => [5,6,7,8]; a is now [1,2,3,4]
a.splice(1,2)                       // => [2,3]; a is now [1,4]
a.splice(1,1)                       // => [4]; a is now [1]

let a = [1,2,3,4,5];
a.splice(2,0,"a","b")               // => []; a is now [1,2,"a","b",3,4,5]
a.splice(2,2,[1,2],3)               // => ["a","b"]; a is now [1,2,[1,2],3,3,4,5]

/* fill(): fill() method sets the elements of an array, or a slice of an array, to a 
specified value. It mutates the array it is called on, and also returns the 
modified array: */
let a = new Array(5);               // Start with no elements and length 5
a.fill(0)                           // => [0,0,0,0,0]; fill the array with zeros
a.fill(9,1)                         // => [0,9,9,9,9]; fill with 9 starting at index 1
a.fill(8,2,-1)                      // => [0,9,8,8,9]; fill with 8 at indexes 2,3

//copyWithin()
let a = [1,2,3,4,5];
a.copyWithin(1)                     // => [1,1,2,3,4]: copy array elements up one
a.copyWithin(2,3,5)                 // => [1,1,3,4,4]: copy last 2 elements to index 2
a.copyWithin(0, -2)                 // => [4,4,3,4,4]: negative offsets work, too

//indexOf() and lastIndexOf() methods
let a = [0,1,2,1,0];
a.indexOf(1)                        // => 1: a[1] is 1
a.lastIndexOf(1)                    // => 3: a[3] is 1
a.indexOf(3)                        // => -1: no element has value 3

/* Find all occurrences of a value x in an array a and return an array 
of matching indexes */
function findall(a,x){
    let results = [],               // The array of indexes we'll return
        len = a.length,             // The length of the array to be searched
        pos = 0;                    // The position to search from
    while(pos < len){               // While more elements to search...
        pos = a.indexOf(x, pos);    // Search
        if(pos === -1)  break;      // If nothing found, we're done.
        results.push(pos);          // Otherwise, store index in array
        pos = pos + 1;              // And start next search at next element     
    }
    return results;                 // Return array of indexes
}

//includes()
let a = [1, true, 3, NaN];
a.includes(true);                   // => true
a.includes(2);                      // => false
a.includes(NaN);                    // => true
a.indexOf(NaN)                      // => -1; indexOf can't find NaN

//sort()
let a = ["banana", "cherry", "apple"];
a.sort();                           // a == ["apple", "banana", "cherry"]

let a = [33,4,1111,222];
a.sort();                           // a == [1111,222,33,4]; alphabetical order
a.sort(function(a,b){               // Pass a comparator function
    return a-b;                     // Returns < 0, 0, or >0, depending on order
});                                 // a == [4,33,222,1111]; numerical order
a.sort((a,b) => b-a);               // a == [1111,222,33,4]; reverse numerical order

let a = ["ant", "Bug", "cat", "Dog"];
a.sort();                           // a == ["Bug", "Dog", "ant", "cat"]; case-sensitive sort
a.sort(function(s,t){
    let a = s.toLowerCase();
    let b = t.toLowerCase();
    if(a < b) return -1;
    if(a > b) return 1;
    return 0;
});                                 // a == ["ant","Bug","cat","Dog"]; case-insensitive sort

//reverse()
let a = [1,2,3];
a.reverse();                        // a == [3,2,1]

let a = [1,2,3];
a.join()                            // => "1,2,3"
a.join(" ")                         // => "1 2 3"
a.join("")                          // => "123"
let b = new Array(10);              // An array of length 10 with no elements
b.join("-")                         // => "---------": a string of 9 hyphens

//toString()
[1,2,3].toString()                  // => "1,2,3"
["a","b","c"].toString()            // => "a,b,c"
[1, [2, "c"]].toString()            // => "1,2,c"


Array.isArray([])                   // => true
Array.isArray({})                   // => false

// Array-like objects
let a = {};                         // Start with a regular empty object

// Add properties to make it "array-like"
let i = 0;
while(i < 10){
    a[i] = i*i;
    i++;
}
a.length = i;

// Now iterate through it as if it were a real array
let total = 0;
for(let j = 0; j < a.length; j++){
    total += a[j];
}

/* Determine if o is an array-like Object.
Strings and functions have numeric length properties, but are excluded by the typeof test. 
In client-side JavaScript, DOM text nodes have a numeric length property, and may need to be 
excluded with an additional o.nodeType !== 3 test. */
function isArrayLike(o){
    if(o &&                                 // o is not null, undefined, etc.
        typeof o === "object" &&            // o is an object
        Number.isFinite(o.length) &&        // o.length is a finite number
        o.length >= 0 &&                    // o.length is non-negative
        Number.isInteger(o.length) &&       // o.length is an integer
        o.length < 4294967295){             // o.length < 2^32 - 1
            return true;                    // Then o is array-like.
        } else {
            return false;                   // Otherwise it is not.
        }
}

let a = {"0": "a", "1": "b", "2":"c", length: 3};       // An array-like object
Array.prototype.join.call(a, "+")                       // => "a+b+c"
Array.prototype.map.call(a, x => x.toUpperCase())       // => ["A", "B", "C"]
Array.prototype.slice.call(a, 0)                        // => ["a", "b", "c"]: true array copy
Array.from(a)                                           // => ["a", "b", "c"]: easier array copy