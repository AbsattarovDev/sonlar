const question = document.getElementById("question");
const input = document.getElementById("input");
const checkBtn = document.getElementById("checkBtn");
const keys = document.querySelectorAll(".keys");
const trueAnswer = document.querySelector(".true");
const falseAnswer = document.querySelector(".false");
const all = document.getElementById("all");

// Creating multiplication
let createMultiplication = () => {
  const activeButtons = document.querySelectorAll(".keys.active");

  let x, y;

  if (activeButtons.length === 0) {
    x = Math.floor(Math.random() * 8) + 2;
    all.classList.add("active");
  } else {
    const randomButton =
      activeButtons[Math.floor(Math.random() * activeButtons.length)];
    x = parseInt(randomButton.innerText);
    all.classList.remove("active");
  }

  y = Math.floor(Math.random() * 8) + 2;

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

window.onload = function () {
  input.focus();
};

checkBtn.addEventListener("click", function () {
  checkAnswer();

  input.focus();
});

// "Enter" key handle
const enterKeydown = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    checkAnswer();
  }
};

input.addEventListener("keydown", enterKeydown);

// Active toggle
keys.forEach((key) => {
  key.addEventListener("click", (event) => {
    event.target.classList.toggle("active");
    all.classList.remove("active");

    input.focus();
  });
});

all.addEventListener("click", function () {
  keys.forEach((key) => key.classList.remove("active"));

  all.classList.add("active");

  input.focus();
});
