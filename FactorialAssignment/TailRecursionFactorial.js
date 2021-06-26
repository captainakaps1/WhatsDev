// # Calculate Factorial of a number using Tail Recursion
function TailRecursionFactorial(n, a) {
    if (n == 0) return a;

    return TailRecursionFactorial(n - 1, n * a);
}

function Factorial(n) {
    return TailRecursionFactorial(n, 1);
}

console.log(Factorial(1000));