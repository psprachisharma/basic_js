// Loops
// While Loop
let  count = 0;
while(count < 10){
    console.log(count);
    count++;
}
// Do/While Loop
function printArray(a){
    let len=a.length, i=0;
    if(len === 0){
        console.log("Empty Array");
    } else {
        do {
            console.log(a[i]);
        } while(++i < len);
    }
}
// For Loop
for(let count = 0; count < 10; count++){
    console.log(count);
}
let i,j, sum=0;
for(i=0,j=10; i<10; i++, j--){
    sum += i*j;
}
function tail(o){ //return the tail of linked list o
    for(; o.next; o=o.next) /* empty */; // traverse while o.next is truthy
    return o;
}
// For/of Loop
let data = [1,2,3,4,5,6,7,8,9], sum = 0;
for(let element of data) {
    sum += element;
}

sum // => 45

let o = {x:1, y:2, z:3};
for(let element of o){ //throws TypeError because o is not iterable
    console.log(element);
}

let o = {x:1, y:2, z:3};
let keys = "";
for(let k of Object.keys(o)){
    keys += k;
}
keys // => "xyz"

let sum = 0;
for(let v of Object.values(o)){
    sum += v;
}
sum // => 6
let pairs = "";
for(let [k,v] of Object.entries(o)){
    pairs += k+v;
}
pairs // => "x1y2z3"
let frequency = {};
for(let letter of "mississippi"){
    if(frequency[letter]){
        frequency[letter]++;
    } else {
        frequency[letter] = 1;
    }
}
frequency // => {m:1, i:4, s:4, p:2}
let text = "Na na na na na na na na na Batman!";
let wordSet = new Set(text.split(" "));
let unique = [];
for(let word of wordSet){
    unique.push(word);
}
unique // => ["Na", "na", "Batman!"]
let m = new Map([[1, "one"]]);
for(let[key, value] of m){
    key // => 1
    value // => "one"
}
// For/await
// Read chunks from an asynchronously iterable stream and print them out
async function printStream(stream){
    for await (let chunk of stream){
        console.log(chunk);
    }
}
// For/in
for(let p in o){ // Assign property names of o to variable p
    console.log(o[p]); // Print the value of each property
}
let o = {x:1, y:2, z:3};
let a = [], i=0;
for(a[i++] in o) /* empty */ ;
for(let i in a) console.log(i);
//Break
let matrix = getData(); // Get a 2D array of numbers from somewhere
// Now sum all the numbers in the matrix.
let sum = 0, success = false;
// Start with a labeled statement that we can break out if errors occur
computeSum: if(matrix){
    for(let x=0; x<matrix.length; x++){
        let row = matrix[x];
        if(!row)
        break computeSum;
        for(let y=0; y<row.length; y++){
            let cell = row[y];
            if(isNaN(cell)) break computeSum;
            sum += cell;
        }
    }
    success = true;
}
// The break statements jump here. If we arrive here with sucess == false
// then there was something wrong with the matrix we were given.
// Otherwise, sum contains the sum of all cells of the matrix.
//Continue
for(let i=0; i< data.length;i++){
    if(!data[i]) continue; // can't proceed with undefined data
    total += data[i];
}
//return
function square(x) { return x*x; } // a function that has a return statement
square(2) // => 4
function displayObject(o){
    //Return immediately if the argument is null or undefined.
    if(!o) return;
        //Rest of function goes here...
}
// Yield: A generator function that yields a range of integers
function range(from, to){
    for(let i=from; i<= to; i++){
        yield i; //yield is an operator rather than a statement
    }
}
//Throw
function factorial(x){
    //If the input argument is invalid, throw an exception!
    if(x < 0) throw new Error("x must not be negative");
    //Otherwise, compute a value and return normally
    let f;
    for(f=1; x>1; f *=x, x--) /* empty */;
    return f;
}
factorial(4) //=>24
//Try/Catch/Finally
try{
    /* Normally, this code runs from the top of the block to the bottom
    without problems. But it can sometimes throw an exception,
    either directly, with a throw statement, or indirectly, by calling
    a method that throws an exception. */
}
catch(e){
/*     The statements in this block are exceuted if, and only if, the try 
    block throws an exception. These statements can use the local variable 
    e to refer to the Error object or other value that was thrown. 
    This block may handle the exception somehow, may ignore the 
    exception by doing nothing, or may rethrow the exception with throw. */ 
}
finally{
/*     This block contains statements that are always executed, regardless of 
    what happens in the try block. They are executed whether the try 
    block terminates:
    1) normally, after reaching the bottom of the block
    2) because of a break, continue, or return statement 
    3) with an exception that is handled by a catch clause above 
    4) with an uncaught exception that is still propgating  */
}
try{
    //Ask the user to enter a number
    let n = Number(prompt("Please enter a positive integer", ""));
    //Compute the factorial of the number, assuming the input is valid
    let f = factorial(n);
    //Display the result
    alert(n + "!=" +f);
} catch(ex){ // If the user's input was not valid, we end up here
    alert(ex); // Tell the user what the error is
}
//Like JSON.parse(), but return undefined instead of throwing an error
function parseJSON(s){
    try{
        return JSON.parse(s);
    } catch {
        //Something went wrong but we don't care what it was
        return undefined;
    }
}
//Class
class Circle {
    constructor(radius) { this.r = radius; }
    area() {return Math.PI*this.r*this.r;}
    circumference(){return 2*Math.PI*this.r;}
}