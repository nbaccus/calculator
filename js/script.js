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

function getObjectkey(obj, value) {
    for (var property in obj) {
        if (obj[property] == value) {
            return property;
        }
    }
    return null;
}

// ------------------------------------------------------------ 

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

for (let i = 1; i <= 19; i++) {
    if (i!=1) {
        const btn = document.createElement("button");
        let btntextvar = calculator[`btn${i-1}`];
        switch(calculator[`btn${i-1}`]){
            case("divide"):
                btntextvar = "÷";
                break;
            case("add"):
                btntextvar = "+";
                break;
            case("subtract"):
                btntextvar = "-";
                break;
            case("multiply"):
                btntextvar = "x";
                break;
            case("equals"):
                btntextvar = "=";
                break;
        }
        const btntext = document.createTextNode(btntextvar);
        btn.id = `btn${i-1}`;
        btn.value = calculator[`btn${i-1}`];
        btn.className="button";
        btn.appendChild(btntext);
        wrapper.appendChild(btn);
    }
    else {
        const div = document.createElement("div");
        div.setAttribute("id", "display");
        wrapper.appendChild(div);
    }
}


let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener('click', function() {
    if (button.value=="equals") {
        if (calculation.y==null && calculation.operation != null) {
            displayCurrentCalc("SYNTAX ERROR");
        }
        else if(calculation.operation == null) {
            displayCurrentCalc(calculation.x);
        }
        else {
            if (calculation.operation=="divide" && calculation.y=="0") {
                displayCurrentCalc("MATH ERROR");
                initialiseCalculation();
            }
            else {
                let result = operate(calculation.x, calculation.y, calculation.operation);
                let displayresult = 
                parseFloat(operate(calculation.x, calculation.y, calculation.operation)).toFixed(2);
                displayCurrentCalc(displayresult);
                initialiseCalculation();
                calculation.x = result;
            }
        }
    }
    else if (button.value=="C") {
        initialiseCalculation();
        displayCurrentCalc("");
    }
    else if (button.value == "DEL") {
        if (isNaN(displayvariable)==false || displayvariable.slice(displayvariable-1)==".") {
            key = getObjectkey(calculation, displayvariable);
            if (key != null) {
                calculation[key] = calculation[key].substring(0,calculation[key].length-1);
                displayvariable = calculation[key];
                displayCurrentCalc(displayvariable);
            }
        }
        else {
            calculation.operation = null;
            displayCurrentCalc("");
        }
    }
    else if (button.value==".") {
        
        if (calculation.y == null) {
            if ((calculation.x).includes(".")==false) {
                calculation.x += button.value;
                displayvariable=calculation.x;
            }
        }
        else {
            if ((calculation.y).includes(".")==false) {
            calculation.y += button.value;
            displayvariable=calculation.y;
            }
        }
        displayCurrentCalc(displayvariable);
    }

     else {   
        if (isNaN(button.value)) {
            if (calculation.operation!=null && calculation.y==null) {
                    displayvariable="SYNTAX ERROR";
                }
            else if (calculation.operation != null && calculation.y!=null) {
                console.log("inhere");
                let result = 
                parseFloat(operate(calculation.x, calculation.y, calculation.operation)).toFixed(5);
                calculation.x = Number(result);
                calculation.y = null;
                calculation.operation = button.value;
                displayvariable=button.innerHTML;
                

            }
            else {
                displayvariable=button.innerHTML;
                storeOperation(calculation,button.value);
                }
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