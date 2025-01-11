const question = document.getElementById("question");
const input = document.getElementById("input");
const checkBtn = document.getElementById("checkBtn");
const keys = document.querySelectorAll(".keys");

let x, y;

// Creating multiplication
let createMultiplication = () => {
  let randX = () => {
    return Math.floor(Math.random() * 8) + 2;
  };

  let randY = () => {
    return Math.floor(Math.random() * 8) + 2;
  };

  x = randX();
  y = randY();

  let expression = `${x} * ${y} =`;
  question.textContent = expression;
  return expression;
};
createMultiplication();

function showBoolean(trueFalse, borderColor, color) {
  const feedback = document.getElementById("feedback");
  feedback.textContent = trueFalse;
  feedback.style.borderColor = borderColor;
  feedback.style.color = color;

  setTimeout(() => {
    feedback.textContent = "";
    feedback.style.borderColor = "transparent";
  }, 1000);

  return feedback;
}

// Answer checking
const checkAnswer = () => {
  let expression = question.textContent;
  const result = expression
    .split("=")
    .shift()
    .split("*")
    .reduce((a, b) => a * b);

  if (input.value == result) {
    let newExpression = createMultiplication();
    question.textContent = newExpression;
    showBoolean("To'g'ri!", "lightgreen", "green");
  } else if (input.value == "") {
    showBoolean("Yozing!", "darkgray", "black");
  } else {
    showBoolean("Noto'g'ri!", "lightcoral", "red");
  }

  input.value = "";
};

window.onload = function() {
  document.getElementById('input').focus();
}

checkBtn.addEventListener("click", checkAnswer);

// "Enter" key handle
const enterKeydown = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    checkAnswer();
  }
};

input.addEventListener("keydown", enterKeydown);

keys.forEach((key) => {
  key.addEventListener("click", (event) => {
    event.target.classList.toggle("active");
    takeActive();
  });
});

function takeActive() {
  const activeButtons = document.querySelectorAll(".active");

  if (activeButtons.length === 0) {
    return null;
  }

  let randomButton =
    activeButtons[Math.floor(Math.random() * activeButtons.length)];
  return randomButton;
}
takeActive();

document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("table");
  const rows = table.rows;

  for (let i = 1; i < rows.length; i++) {
    for (let j = 1; j < rows[i].cells.length; j++) {
      rows[i].cells[j].addEventListener("mouseover", (event) => {
        highlightCells(rows, i, j);
        event.target.classList.add("hovered");
      });
      rows[i].cells[j].addEventListener("mouseout", (event) => {
        removeHighlight(rows);
        event.target.classList.remove("hovered");
      });
    }
  }

  function highlightCells(rows, rowIndex, colIndex) {
    for (let i = 0; i < rows.length; i++) {
      rows[i].cells[colIndex].classList.add("highlight");
    }
    for (let j = 0; j < rows[rowIndex].cells.length; j++) {
      rows[rowIndex].cells[j].classList.add("highlight");
    }
  }

  function removeHighlight(rows) {
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].cells.length; j++) {
        rows[i].cells[j].classList.remove("highlight");
        rows[i].cells[j].classList.remove("hovered");
      }
    }
  }
});

// Make hidden or visible

document.getElementById("check").addEventListener("change", function () {
  const element = document.querySelector("table");
  const centering = document.querySelector("main");

  if (this.checked) {
    element.style.display = "none";
    centering.style.justifyContent = "center";
  } else {
    element.style.display = "";
    centering.style.justifyContent = "space-evenly";
  }
});
