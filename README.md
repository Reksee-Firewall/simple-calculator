# simple-calculator
A calculator with the basic math operators. 

# The Odin Project Command 

Your calculator is going to contain functions for all of the basic math operators you typically find on simple calculators, so start by creating functions for the following items and testing them in your browser’s console.

- add; 
- subtract;
- divide;
- multiply.

A calculator operation will consist of a number, an operator, and another number. For example, 3 + 5. Create three variables for each of the parts of a calculator operation. Create a variable for the first number, the operator, and the second number. You’ll use these variables to update your display later.

Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.

Create a basic HTML calculator with buttons for each digit, each of the above functions and an “Equals” key. Add also a "clear" button.

Create the functions that populate the display when you click the number buttons. You should be storing the ‘display value’ in a variable somewhere for use in the next step.

Make the calculator work! You’ll need to store the first number and second number that are input into the calculator, utilize the operator that the user selects, and then operate() on the two numbers when the user presses the “=” key.

Users should be able to string together several operations and get the right answer, with each pair of numbers being evaluated at a time. For example, 12 + 7 - 5 * 3 = should yield 42.

Your calculator should not evaluate more than a single pair of numbers at a time. 

You should round answers with long decimals so that they don’t overflow the screen.

Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. Add a . button and let users input decimals!

Add a “backspace” button, so the user can undo if they click the wrong number.

Add keyboard support!