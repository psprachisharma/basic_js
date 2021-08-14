let a = [];
a.push(1,2,3);
a.reverse();

points.dist = function(){
    let p1 = this[0];
    let p2 = this[1];
    let a = p2.x - p1.x;
    let b = p2.y - p2.y;
    return Math.sqrt(a*a + b*b);
};

points.dist();

function abs(x){
    if(x>=0){
        return x;
    } else {
        return -x;
    }
}

abs(-10) === abs(10)

function sum(array){
    let sum = 0;
    for(let x of array){
        sum+=x;
    }
    return sum;
}

sum(primes)

function factorial(n){
    let product = 1;
    while(n>1){
        product *= n;
        n--;
    }
    return product;
}

factorial(4)

function factorial2(n){
    let i, product = 1;
    for(i=2;i<=n;i++)
        product *= i;
    return product;
}

factorial2(5)

class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    distance(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
}

let p = new Point(1,1);

p.distance()