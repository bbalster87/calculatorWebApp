const inputValues = [];
const operations = [];
let currentValue = "";
let lastInput = "";

// Get our base container to hold the calculator
const containerDiv = document.querySelector(".container");

// Create our input/output display
const displayDiv = document.createElement("div");
displayDiv.classList.add("display");
containerDiv.appendChild(displayDiv)

function buildButtons() {
  // Defines the button layout
  const layout = [
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "x"],
    ["1", "2", "3", "-"],
    ["0", ".", "←", "+"],
    ["Clear", "="]
  ];
  layout.forEach(buttons => {
    // Build each row of buttons
    const row = document.createElement("div");
    row.classList.add("row");
    buttons.forEach(button => {
      // Create each button and assign it to the row
      const calcButton = document.createElement("button");
      calcButton.textContent = button;
      calcButton.classList.add("inputButton");
      calcButton.addEventListener("click", receiveInput);
      row.appendChild(calcButton);
    });

    // Adds the row of buttons to the calculator
    containerDiv.appendChild(row);
  });
}

function receiveInput() {
  if (displayDiv.textContent === "Can't divide by 0") {
    displayDiv.textContent = "";
  }

  // Clear all text on user clicking Clear button
  if (this.textContent === "Clear") {
    clear()
  }

  // Add a number to the current number string
  else if (Number(this.textContent) || this.textContent === "0") {
    displayDiv.textContent += this.textContent;
    currentValue += this.textContent;
    lastInput = this.textContent;
  }

  // Add a decimal place
  // check if there is another decimal place already in the input string
  else if (this.textContent === ".") {
    if (!currentValue.includes(".")) {
      displayDiv.textContent += this.textContent;
      currentValue += this.textContent;
      lastInput = this.textContent;
    }
    else {
      // Flash the display screen red
      console.log("To many . in the number")
    }
  }

  // Delete the last character that was input
  else if (this.textContent === "←") {
    if (Number(lastInput) || lastInput === ".") {
      try {
        displayDiv.textContent = displayDiv.textContent.slice(0, -1);
        currentValue = currentValue.slice(0, -1);
      }
      catch {
        // Catch TypeError from having no data left to backspace over
        clear()
      }
    }
    else if (["+", "x", "-", "÷"].some(v => lastInput === v)) {
      displayDiv.textContent = displayDiv.textContent.slice(0, -3);
      currentValue = inputValues.pop();
      operations.pop();
    }
    lastInput = displayDiv.textContent.slice(-1);
    if (lastInput === " " && displayDiv.textContent.length > 0) {
      lastInput = displayDiv.textContent[displayDiv.textContent.length - 2];
    }
  }

  // Calculate the correct answer based on the input values
  else if (this.textContent === "=") {
    inputValues.push(currentValue)
    calculate()
  }

  // Stores input numbers and operation based on user input
  // If last use input was an operation it will be replaced with the new operation
  else if (["+", "x", "-", "÷"].includes(this.textContent)) {
    if (["+", "x", "-", "÷"].some(v => lastInput === v)) {
      displayDiv.textContent = displayDiv.textContent.slice(0, -3);
      operations.pop();
    }
    else if (!(currentValue === "")) {
      inputValues.push(currentValue)
      currentValue = ""
    }
    displayDiv.textContent += ` ${this.textContent} `
    lastInput = this.textContent
    operations.push(this.textContent)
  }

  else {
    console.log("Invalid input")
  }
  console.log(`currentValue: ${currentValue}, lastInput: ${lastInput}`)
  console.log(`inputValues: ${inputValues}, operations: ${operations}`)
}

function clear() {
  // Clear all inout from the calculator
  displayDiv.textContent = "";
  currentValue  = "";
  lastInput = "";
  inputValues.splice(0, inputValues.length);
  operations.splice(0, operations.length);
}

function calculate() {
  // Calculate the answer
  let answer = "";
  let firstNum = "";

  operations.forEach(operation => {
    if (answer === "") {
      firstNum = inputValues.shift();
    } else {
      firstNum = answer;
    }
    const secondNum = inputValues.shift();

    if (operation === "+") {
      answer = Number(firstNum) + Number(secondNum);
    } else if (operation === "-") {
      answer = Number(firstNum) - Number(secondNum);
    } else if (operation === "x") {
      answer = Number(firstNum) * Number(secondNum);
    } else if (operation === "÷") {
      answer = Number(firstNum) / Number(secondNum);
    }
  })

  clear();

  if (isFinite(answer)) {
    displayDiv.textContent = answer;
    currentValue = answer.toString();
    lastInput = displayDiv.textContent.slice(-1);
  } else {
    displayDiv.textContent = "Can't divide by 0"
  }
}

buildButtons()