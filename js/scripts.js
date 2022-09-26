const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";

    }
    addDigit(digit){

        // Check if current operation has .
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();

    }

    // Process all calculator operations
    processOperation(operation) {
        // Check if current is empty
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            //Change operation
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);

            }
            return;
        }
        // Get current and previous values
        let operationValue;
        let previous =  +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperator();
                break;
            case "C":
                this.processClearAll();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
        }
        
    }

    updateScreen(operationValue = null, operation = null, current = null, previous = null) {
        console.log(operationValue, operation, current, previous)
        if (operationValue === null){
            this.currentOperationText.innerText += this.currentOperation; // Substitui pelo o texto exibido no painel por ele mesmo concatenado com o novo valor da operação atual

        }else{
            //Check if value is 0, if it is just add current value
            if(previous === 0){
                operationValue = current;
            }

            //Add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }

    }

    // Change math operators
    changeOperation(operation){
        const mathOperations = ["*", "/", "+", "-"];
        if(!mathOperations.includes(operation)) {
            return;
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation; // Analisa o texto atual do display acima, remove o último caractere que é o sinal operador e então adiciona o novo sinal
    }

    // Delete the last digit
    processDelOperator() {
        this.currentOperationText.innerText = 
        this.currentOperationText.innerText.slice(0, -1);
    }

    // Erase current operation
    processClearCurrentOperator(){
        this.currentOperationText.innerText = "";
    }
    processClearAll() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    processEqualOperator(){
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
        

    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText
        // Método para identificar se o usuário digitou um número ou uma operação
        if (+value >= 0 || value === ".")  {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
        
        
    })
})