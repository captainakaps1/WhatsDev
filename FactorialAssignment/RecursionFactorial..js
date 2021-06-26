// Calculate Factorial of a number using Recursion
function RecursionFactorial(n) {
    if (n === 0) {
        return 1;
    }

    return n * factorial(n - 1);
}
console.log(RecursionFactorial(5));