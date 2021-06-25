
# Calculate Factorial of a number using Recursion
def ResFactorial(n):
    if (n == 0):
        return 1
    return n* ResFactorial(n-1)


print(ResFactorial(100))
