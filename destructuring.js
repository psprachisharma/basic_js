// simple example
/* let [x,y] = [1,2]; // same as let x=1, y=2
[x,y] = [x+1, y+1]; // swap as x=x+1, y=y+1
[x,y] = [y,x]; // swap the value of the two variables 
[x,y]  */  // => [3,2]: the incremented and swapped values

// convert [x,y] coordinates to [r, theta] polar coordinates
function toPolar(x,y){
    return [Math.sqrt(x*x+y*y), Math.atan2(y,x)];
}

// convert polar to cartesian coordinates
function toCartesian(r, theta){
    return [r*Math.cos(theta), r*Math.sin(theta)];
}

let [r,theta] = toPolar(1.0, 1.0); // r==Math.sqrt(2); theta == Math.PI/4

let [x,y] = toCartesian(r, theta);

let o = {x:1, y:2}; // the object we'll loop over
for(const [name,value] of Object.entries(o)){
    console.log(name, value);// prints "x 1" and "y 2"
}

let [x,y] = [1]; // x ==1; y == undefined
[x,y]  = [1,2,3];  // x==1; y==2
[,x,,y] = [1,2,3,4]; // x ==2; y==4

let [x, ...y] = [1,2,3,4]; // y = [2,3,4]

let [a,[b,c]] = [1, [2,2.5], 3]; // a =1, b=2, c=2.5

let [first, ...rest] = "Hello"; // first == "H"; rest == ["e","l","l","o"]

let transparent = {r:0.0,g:0.0,b:0.0,a:1.0};// A RGBA color
let {r,g,b} = transparent; //r==0.0; g==0.0; b==0.0

// same as const sin= Math.sin, cos = Math.cos, tan = Math.tan
const {sin, cos, tan} = Math;

//same as const cosine = Math.cos , tangent = Math.tan
const{cos: cosine, tan:tangent} = Math;

let points = [{x:1, y:2}, {x:3, y:4}]; // an array of two point objects
let [{x:x1, y:y1}, {x:x2, y:y2}] = points; // destructured into 4 variables
(x1 === 1 && y1 === 2 && x2 ===3 && y2 ===4) // => true

let points = {p1: [1,2], p2:[3,4]}; // an object with 2 array props
let {p1: [x1, y1], p2:[x2,y2]} = points;// destructured into 4 vars
(x1===1 && y1===2 && x2===3 && y2 ===4) // => true

//start with a data structure and a complex destructuring 
let points = [{x:1, y:2}, {x:3, y:4}];
let [{x:x1, y:y1}, {x:x2, y:y2}] = points;

//check your destructuring syntax by flipping the assignment around
let points2 = [{x:x1, y:y1}, {x:x2, y:y2}]; //points2 = points