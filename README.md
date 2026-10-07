# Basic Calculator

A simple calculator that supports addition, subtraction, multiplication, division, decimal values, clear, and equals. Built for Task 7 (Basic Calculator) of my Web Development internship.

**Live page:** https://cedrick40.github.io/basic-calculator/

## About the project

The page has a display and a grid of buttons. The user can type numbers, choose an operator, and press equals to see the result. Division by zero is handled with a clear message, so it never breaks the calculator. The calculator does not use `eval`.

## Objective

To practice JavaScript event handling, arithmetic operations, and DOM manipulation.

## Tools used

- HTML5
- CSS3
- JavaScript
- VS Code
- Git and GitHub (free)

## Features

- Addition, subtraction, multiplication, and division
- Decimal values (only one decimal point per number)
- Clear (`C`) and equals (`=`) buttons
- Chained calculations: `12 + 5 × 2 =` gives 34, because `12 + 5` is calculated when `×` is pressed
- Pressing two operators in a row replaces the first one
- After equals, a new digit starts a fresh calculation, and an operator continues with the result
- Results are rounded to remove floating-point errors, so `0.1 + 0.2` shows `0.3`
- Divide-by-zero handling: shows "Cannot divide by zero" and resets
- A limit of 12 digits per number so the display does not overflow
- Responsive layout for desktop and mobile

## How it works

1. **State:** the calculator remembers `currentValue` (the number being typed, as text), `previousValue` (the first number), `operator`, and two flags: `startNewNumber` and `isError`.
2. **Event delegation:** one `click` listener on the buttons container handles every button. `event.target.closest("button")` finds the button, and `dataset.type` and `dataset.value` read its `data-type` and `data-value` attributes.
3. **Actions:** separate functions handle numbers, the decimal point, operators, equals, and clear.
4. **Arithmetic without `eval`:** the `calculate(a, b, op)` function uses if / else if conditions for each operator. For division it checks that the divisor is not zero first, and returns `null` so the caller can show the error.
5. **Display:** `updateDisplay()` writes the current number and a small history line (for example `12 +`) to the page, and adds the `error` class when needed (DOM manipulation).

## Styling

A soft blue-white page with a white card and a blue top edge. The buttons use CSS Grid with 4 columns: `C` spans 3 columns and `0` spans 2 columns. Operators are light blue, clear is light red, and equals is solid blue. The buttons have hover, active, and keyboard-focus styles, and a media query adjusts the sizes on small screens.

## Project structure

```
basic-calculator/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Outcome

A working calculator that handles all four operations, decimals, chaining, clear, equals, and divide-by-zero, and works on desktop and mobile. This task taught me how to store and update application state, how event delegation works, why `eval` should be avoided, and how to lay out buttons with CSS Grid.

## Author

Cedrick Niyibikora

- GitHub: https://github.com/Cedrick40
- LinkedIn: https://www.linkedin.com/in/cedrick10