// Get our base container to hold the calculator
const containerDiv = document.querySelector(".container");

// Create our input/output display
const displayDiv = document.createElement("div");
displayDiv.classList.add("display");
containerDiv.appendChild(displayDiv)

function buildButtons() {
  const layout = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "+", "←"],
    ["Clear"]
  ];
  layout.forEach(buttons => {
    const row = document.createElement("div");
    row.classList.add("row");
    buttons.forEach(button => {
      const calcButton = document.createElement("button");
      calcButton.textContent = button;
      calcButton.classList.add("inputButton");
      calcButton.addEventListener("click", receiveInput);
      row.appendChild(calcButton);
    });
    containerDiv.appendChild(row);
  });
}

function receiveInput() {
  console.log(this.textContent)
}

buildButtons()