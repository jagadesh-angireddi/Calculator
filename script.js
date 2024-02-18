

class Calculator{
    constructor(previousOperandTextElement,presentOperandTextElement){
        this.previousOperandTextElement= previousOperandTextElement;
        this.presentOperandTextElement = presentOperandTextElement;
        
        this.clear()
    }

    clear(){
        this.presentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.presentOperand=this.presentOperand.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number==='.' && this.presentOperand.includes('.'))return
        this.presentOperand = this.presentOperand.toString()+number.toString()

    }

    chooseOperation(operation){
        if(this.presentOperand==='')return
        if(this.previousOperand!==''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.presentOperand
        this.presentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const present = parseFloat(this.presentOperand)
        if (isNaN(prev)|| isNaN(present)) return
        switch(this.operation){
            case '+':
                computation = prev + present
                break
            case '-':
                computation = prev - present
                break     
            case '/':
                computation = prev / present
                break
            case '*':
                computation = prev * present
                break
            case '+':
                computation = prev + present
                break
            default:
                return
            
     
        } 
        this.presentOperand = computation
        this.operation = undefined
        this.previousOperand =""        
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits:0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.presentOperandTextElement.innerText = this.getDisplayNumber(this.presentOperand)
        if (this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText =''
        }
    }


}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton =document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-allclear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const presentOperandTextElement = document.querySelector('[data-present-operand]')


const calculator=new Calculator(previousOperandTextElement,presentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
}
)

allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
}
)

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
}
)
