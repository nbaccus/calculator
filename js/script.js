function add(a,b) {
    return a+b
}
function subtract(a,b) {
    return a-b
}

function multiply(a,b) {
    return a*b
}
function divide(a,b) {
    return a/b
}

function operate(x, y, operator) {

    switch (operator) {
        case "multiply":
            return multiply(x,y);
        case "divide":
           return divide(x,y);
        case "add":
            let a=+x;
            let b=+y;
            return add(a,b);
        case "subtract":
            return subtract(x,y);
    }
}

const wrapper = document.querySelector(".wrapper");

const calculator = {
    btn1 : "C",
    btn2 : "DEL",
    btn3 : "divide",
    btn4 : "7",
    btn5 : "8",
    btn6 : "9",
    btn7 : "multiply",
    btn8 : "4",
    btn9 : "5",
    btn10 : "6",
    btn11 : "add",
    btn12 : "1",
    btn13 : "2",
    btn14 : "3",
    btn15 : "subtract",
    btn16 : "0",
    btn17 : ".",
    btn18 : "equals", 
}

let calculation = {};

function initialiseCalculation(){
    calculation = {
        x: null,
        operation: null,
        y: null,
    };
}



function storeNumber(object, number) {
    if (object.x == null) {
        object.x = number; 
    }
    else if (object.operation == null) {
        object.x += number;
    }
    else  {
        if (object.y==null) {
        object.y=number;
        }
        else {
            object.y += number;
        }

    }
}

function storeOperation(object, operation) {
    if (object.operation == null) {
        object.operation = operation;
    }
}

function displayCurrentCalc(displayvariable) {
    const display = document.getElementById("display");
    display.innerHTML = `${displayvariable}`;
    
}


for (let i = 1; i <= 19; i++) {
    if (i!=1) {
        const btn = document.createElement("button");
        const btntext = document.createTextNode(calculator[`btn${i-1}`]);
        btn.id = `btn${i-1}`;
        btn.value = calculator[`btn${i-1}`];
        btn.className="button";
        btn.appendChild(btntext);
        wrapper.appendChild(btn);

    }
    else {
        const text = document.createTextNode("display");
        const div = document.createElement("div");
        div.setAttribute("id", "display");
        div.appendChild(text);
        wrapper.appendChild(div);
    }
    
}


let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener('click', function() {
    if (button.value=="equals") {
        let result = operate(calculation.x, calculation.y, calculation.operation);
        displayCurrentCalc(result);
        initialiseCalculation();
        calculation.x = result;
        
    }
    else if (button.value=="C") {
        initialiseCalculation();
        displayCurrentCalc("");
    }
     else {   
        if (isNaN(button.value)) {
            if (calculation.operation!=null) {
                    displayvariable="ERROR";
                }
            else {
                displayvariable=button.value;
                }
            storeOperation(calculation,button.value);
            
             }
         else {
             storeNumber(calculation, button.value);
             if (calculation.operation == null) {
                displayvariable = calculation.x
                }
             else {
                 displayvariable=calculation.y;
                }
             }
        displayCurrentCalc(displayvariable);
        }
    
        
        
    });

});