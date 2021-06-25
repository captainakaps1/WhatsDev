# Calculate Factorial of a number using Tail Recursion
def TailResFactorial(n, a = 1):
    if (n == 0):
        return a
    return TailResFactorial(n - 1, n * a)


print(TailResFactorial(100))