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