// Yeah, this code was made in a rush. It's quite a mess. 

// New update coming soon!

const keyboard = document.querySelector("#numeric-keyboard");
const clearArray = ["AC", "C", "Backspace", "Escape"];
const operatorArray = ["%", "÷", "+", "-", "×",
                        "/", "*", "Enter"];
const numbersArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const charArray = ["AC", "C", "%", "÷", 7, 8, 9, "+", 4, 5, 6, "-",
                    1, 2, 3, "×", 0, "."];
for (let i = 0; i < 5; i++) {
    const line = document.createElement("div");
    line.setAttribute("id", `lineNumber${i}`);
    line.classList.add("lines");
    for (let j = 0; j < 4; j++) {
        if (((j + 4 * i) !== 18) && ((j + 4 * i) !== 19)) {
            const key = document.createElement("div");
            key.setAttribute("id", `keyNumber${j + 4 * i}`);
            key.classList.add("keys");
            key.textContent = charArray[j + 4 * i];
            line.appendChild(key);
        } else {
            if ((j + 4 * i) === 18) {
                const key = document.createElement("div");
                key.setAttribute("id", `keyNumber${j + 4 * i}`);
                key.classList.add("keys");
                key.textContent = '=';
                line.appendChild(key);
            }
        }
    }
    keyboard.appendChild(line);
}

let validEquation = [];

function truncateNumbers() {
    let firstNumber = "", secondNumber = "", i = 0;
    let operatorIndex = 0;
    do {
        firstNumber += `${(validEquation[i])}`;
        i++;
        operatorIndex = i;
    } while(typeof(validEquation[i]) !== "string" && i < validEquation.length);

    if (operatorIndex !== 0) {
        for (let j = operatorIndex + 1; j < validEquation.length; j++) {
            secondNumber += `${(validEquation[j])}`;
        }
        validEquation = [Number(firstNumber), validEquation[operatorIndex], Number(secondNumber)];
    } else {
        validEquation[0] = firstNumber;
    }
}

function evaluateEquation(n1, n2, operator) {
    let answer;
    let stringNumber = '';
    switch(operator) {
        case "%":
            answer = ((n1 / 100) * n2);
            break;
        case "÷":
            answer = (n1 / n2);
            break;
        case "+":
            answer = (n1 + n2);
            break;
        case "-":
            answer = (n1 - n2);
            break;
        case "×": 
            answer = (n1 * n2);
            break;
        default:
            console.error("Invalid operation.");
            break;
    }
    stringNumber = `${(answer.toFixed(3))}`;
    if (stringNumber.split('').length > 7) {
        stringNumber = (stringNumber.slice(7));
    }
    return parseFloat(stringNumber);
}

const whereValuesAreShown = document.querySelector("#showValues");

function updateEquationResult() {
    truncateNumbers();
    const equationSize = validEquation.length;
    if (equationSize === 1) {
        return validEquation[0];
    } else if (equationSize === 2 ) {
        return validEquation[0]; 
    } else {
        const n1 = validEquation[0];
        const n2 = validEquation[2]; 
        const operator = validEquation[1];
        const result = evaluateEquation(n1, n2, operator);
        validEquation.splice(0, 3);
        validEquation.push(result);
        whereValuesAreShown.textContent = result;
        return validEquation[0];
    }
}

function floatUpdate() {
    truncateNumbers();
    const n1 = validEquation[0];
    const n2 = validEquation[2]; 
    const operator = validEquation[1];
    const result = evaluateEquation(n1, n2, operator);
    validEquation.splice(0, 3);
    validEquation.push(result);
    return validEquation[0];
}

const keys = keyboard.querySelectorAll(".keys");
const keyArray = Array.from(keys);
let operKey;
let hitCounter = 0;
let nextNumberFloat = false;
let floatPoint;
let integerPart;
let lastNumber;

keyArray.forEach((key) => {
    key.addEventListener('mouseenter', () => {
        key.style.marginBottom = '0.5rem';
        key.style.color = "hsl(0, 0%, 0%)";
        if (clearArray.some((char) => (char === key.textContent))) {
            key.classList.add("turnRed");
        } else if (operatorArray.some((char) => (char === key.textContent))) {
            key.classList.add("turnBlue");
        } else if (numbersArray.some((char) => (char === key.textContent))) {
            key.classList.add("turnWhite");
        } else {
            key.classList.add("turnGreen");
        }
    });
    key.addEventListener('mouseleave', () => {
        key.style.marginBottom = '0rem';
        if (!key.classList.contains("operatorSelected")) {
            key.style.color = "hsl(0, 0%, 100%)";
        }
        if (clearArray.some((char) => (char === key.textContent))) {
            key.classList.remove("turnRed");
        } else if (operatorArray.some((char) => (char === key.textContent))) {
            key.classList.remove("turnBlue");
        } else if (numbersArray.some((char) => (char === key.textContent))) {
            key.classList.remove("turnWhite");
        } else {
            key.classList.remove("turnGreen");
        }
    });
    key.addEventListener('click', () => {
        key.style.marginBottom = '0rem';
        setTimeout(() => {key.style.marginBottom = '0.5rem'}, 100);

        if (key.textContent === "=") {
            if (validEquation.length === 0 || validEquation.length === 1 || !validEquation.some((str) => typeof(str) === "string")) {
                console.error("There is not enough values within the array.");
                return null;
            }
        }

        if (clearArray.some((char) => (char === key.textContent))) {
            switch(key.textContent) {
                case "AC":
                    validEquation = [];
                    whereValuesAreShown.textContent = "WIPED";
                    let floatPoint = document.querySelector("#keyNumber17");
                    floatPoint.classList.remove("operatorSelected");
                    floatPoint.style.color = "hsl(0, 0%, 100%)";
                    for (operKey of keys) {
                        if (operatorArray.includes(operKey.textContent) ) {
                            operKey.style.color = 'hsl(0, 0%, 100%)';
                            operKey.classList.remove("operatorSelected");
                            hitCounter = validEquation.length - 1;
                        }
                    }
                    break;
                case "C": 
                    if (typeof(validEquation[validEquation.length - 1]) !== "string") {
                        whereValuesAreShown.textContent = whereValuesAreShown.textContent.slice(0, -1);
                        validEquation.pop();
                        hitCounter--;
                    } else {
                        for (operKey of keys) {
                            if (operatorArray.includes(operKey.textContent) ) {
                                operKey.style.color = 'hsl(0, 0%, 100%)';
                                operKey.classList.remove("operatorSelected");
                                hitCounter = validEquation.length - 1;
                            }
                        }
                    }
                    break; 
                default: 
                    console.error("Error!");
            }
        } else if (operatorArray.some((char) => (char === key.textContent))) {
            if (validEquation.length === 0) {
                validEquation.push(Number(0));
            } 
            if (validEquation.some((elem) => (typeof(elem) === "string"))) {
                if (typeof(validEquation[validEquation.length - 1]) === "string") {
                    console.error("ERROR: TWO OPERATORS ENTRY");
                } else {
                    updateEquationResult();
                }
            }
            key.classList.add("operatorSelected");
            validEquation.push(key.textContent);
            hitCounter = 0;
        } else if (numbersArray.some((char) => (char === key.textContent))) {
            if (validEquation.some((elem) => (typeof(elem) === "string"))) {
                for (operKey of keys) {
                    if (operatorArray.includes(operKey.textContent)) {
                        operKey.style.color = 'hsl(0, 0%, 100%)';
                        operKey.classList.remove("operatorSelected");
                    }
                }
            } 
            whereValuesAreShown.textContent = '';
            if (validEquation.some((elem) => (typeof(elem) === "string"))) {
                i = 0;
                do {
                    i++;
                    operatorIndex = i;
                } while(typeof(validEquation[i]) !== "string");
                if (hitCounter < 7) {
                    hitCounter++;
                    if (key.textContent !== '.') {
                        if (nextNumberFloat) {
                            floatPoint = document.querySelector("#keyNumber17");
                            floatPoint.classList.remove("operatorSelected");
                            floatPoint.style.color = "hsl(0, 0%, 100%)";
                            validEquation.push(parseFloat((Number(key.textContent) / 10) + lastNumber));
                            nextNumberFloat = false;
                        } else {
                            lastNumber = Number(key.textContent);
                            validEquation.push(Number(key.textContent));
                        }
                    } else {
                        if (validEquation.splice(operatorIndex + 1).length !== 0) {
                            key.classList.add("operatorSelected");
                            nextNumberFloat = true;
                            whereValuesAreShown.textContent = lastNumber;
                        }
                    }
                }
                for (i = operatorIndex + 1; i < validEquation.length; i++) {
                     whereValuesAreShown.textContent += `${validEquation[i]}`;
                }
            } else {
                if (hitCounter < 7) {
                    hitCounter++;
                    if (key.textContent !== '.') {
                        if (nextNumberFloat) {
                            floatPoint = document.querySelector("#keyNumber17");
                            floatPoint.classList.remove("operatorSelected");
                            floatPoint.style.color = "hsl(0, 0%, 100%)";
                            validEquation.push("+", parseFloat(Number(key.textContent) / 10));
                            floatUpdate();
                            nextNumberFloat = false;
                        } else {
                            validEquation.push(Number(key.textContent));
                        }
                    } else {
                        if (validEquation.length !== 0) {
                            key.classList.add("operatorSelected");
                            nextNumberFloat = true;
                        }
                    }
                }
                for (i = 0; i < validEquation.length; i++) {
                    whereValuesAreShown.textContent += `${validEquation[i]}`;
                } 
            }
        } else {
            updateEquationResult();
        }
    });
});

let setKey;
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case '0':
            setKey = document.querySelector("#keyNumber16");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break;
        case '1':
            setKey = document.querySelector("#keyNumber12");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break;
        case '2':
            setKey = document.querySelector("#keyNumber13");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break;
        case '3':
            setKey = document.querySelector("#keyNumber14");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break;
        case '4':
            setKey = document.querySelector("#keyNumber8");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break;
        case '5': 
            setKey = document.querySelector("#keyNumber9");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break;
        case '6':
            setKey = document.querySelector("#keyNumber10");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break;
        case '7':
            setKey = document.querySelector("#keyNumber4");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break;
        case '8':
            setKey = document.querySelector("#keyNumber5");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break; 
        case '9':
            setKey = document.querySelector("#keyNumber6");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break; 
        case "Backspace":
            setKey = document.querySelector("#keyNumber1");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break;
        case "Escape": 
            setKey = document.querySelector("#keyNumber0");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break;
        case "/":
            setKey = document.querySelector("#keyNumber3");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break;
        case "*":
            setKey = document.querySelector("#keyNumber15");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break;
        case "-":
            setKey = document.querySelector("#keyNumber11");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break;
        case "+":
            setKey = document.querySelector("#keyNumber7");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break;
        case "Enter":
            setKey = document.querySelector("#keyNumber18");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break; 
        case ".":
            setKey = document.querySelector("#keyNumber17");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break; 
        case "%":
            setKey = document.querySelector("#keyNumber2");
            setKey.click();
            setTimeout(() => setKey.style.marginBottom = '0rem', 200);
            break;
        default:
            break;
    }
})