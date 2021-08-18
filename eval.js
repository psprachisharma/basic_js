/* A "direct eval" is a call to the eval() function with an expression that uses the exact,
unqualified name "eval" (which is beginning to feel like a reserved word). Direct calls to eval()
use the variable environment of the calling context. Any other call-an indirect call-uses the global 
object as its variable environment and cannot ReadableStream, write, or define local variables 
or functions. (Both direct and indirect calls can define new variables only with var. Uses of let 
and const inside an evaluated string create variables and constants that are local to the
evaluation and do not alter the calling or global environment). */

const geval = eval; // using another name creates a global eval
let x = "global", y = "global"; //two global variables
function f(){ // this function does a local eval
    let x = "local"; //define a local variable
    eval("x += 'changed';"); //direct eval sets local variable
    return x; // return changed local variable
}
function g() { // this function does a global eval
    let y = "local"; // a local variable
    geval("y += 'changed';"); // indirect eval sets global variable
    return y; // return unchanged local variable
}
console.log(f(), x); // Local variable changed: prints "localchanged global"
console.log(g(), y); // Global variable changed: prints "local globalchanged"


/* Strict eval()
Strict mode imposes further restrictions on the behavior of the eval() function and even on 
the use of the identifier “eval”. When eval() is called from strict-mode code, or when the 
string of code to be evaluated itself begins with a “use strict” directive, then eval() does 
a local eval with a private variable environment. This means that in strict mode, evaluated 
code can query and set local variables, but it cannot define new variables or functions in the local scope.

Furthermore, strict mode makes eval() even more operator-like by effectively making “eval” 
into a reserved word. You are not allowed to overwrite the eval() function with a new value. 
And you are not allowed to declare a variable, function, function parameter, or catch block 
parameter with the name “eval”. */