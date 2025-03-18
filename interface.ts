interface Calc {
    add(a:number, b:number) :  number;
    subtract(a:number, b:number) : number;
} 

const calc: Calc = {
    add(a, b) {
        return a+b;
    },

    subtract(a, b) {
        return a-b;
    }
}

const result1 = calc.add(1, 2);
const result2 = calc.subtract(5, 3);

console.log(result1);
console.log(result2);