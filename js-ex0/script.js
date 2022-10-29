class Calculator {
    constructor(previousTextElement, currentTextElement) {
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;

        this.clear();
    }

    clear() {
        this.previousTextElement.innerText = '';
        this.currentTextElement.innerText = '';
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }

        this.currentOperand = this.currentOperand + number.toString();
    }

    deleteNumber() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    chooseOperation(operation) {
        if (this.currentOperand == '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {

        if (this.operation == undefined) return;

        let previous = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);

        if (isNaN(previous) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                this.currentOperand = previous + current;
                break;
            case '-':
                this.currentOperand = previous - current;
                break;
            case '/':
                this.currentOperand = previous / current;
                break;
            case '*':
                this.currentOperand = previous * current;
                break;
            default:
                return;
        }

        this.previousOperand = '';
        this.operation = undefined;
    }

    getDisplayNumber(number) {
        let numberString = number.toString();
        let integerValue = parseFloat(numberString.split('.')[0]);
        let decimalValue = numberString.split('.')[1];

        let output;
        if (isNaN(integerValue)) {
            output = '';
        } else {
            output = integerValue.toLocaleString('en', { maximumFractionDigits: 0 });
        }

        if (decimalValue != null) {
            output = `${output}.${decimalValue}`;
        }

        return output;
    }

    updateDisplay() {
        this.currentTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation.toString()}`;
        } else {
            this.previousTextElement.innerText = ''
        }
    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operandButtons = document.querySelectorAll('[data-operand]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const currentDisplay = document.querySelector('[data-current-operand]');
const previousDisplay = document.querySelector('[data-previous-operand]');
const equalsButton = document.querySelector('[data-equal]');

const calculator = new Calculator(previousDisplay, currentDisplay);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.deleteNumber();
    calculator.updateDisplay();
})

operandButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})