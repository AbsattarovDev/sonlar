const question = document.getElementById("question");
const input = document.getElementById("input");
const checkBtn = document.getElementById("checkBtn");
const keys = document.querySelectorAll(".keys");
const trueAnswer = document.querySelector(".true");
const falseAnswer = document.querySelector(".false");

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
    trueAnswer.textContent++;
  } else if (input.value == "") {
    showBoolean("Yozing!", "darkgray", "black");
  } else {
    showBoolean("Noto'g'ri!", "lightcoral", "red");
    falseAnswer.textContent++;
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