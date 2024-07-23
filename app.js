const question = document.getElementById("question");
const input = document.getElementById("input");
const checkBtn = document.getElementById("checkBtn");
const feedback = document.getElementById("feedback");
const keys = document.querySelectorAll(".keys");

let x, y;

// Creating multiplication
let createMultiplication = () => {
  let randX = () => {
    return Math.floor(Math.random() * 8) + 2;
  };

  let randY = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

  x = randX();
  y = randY();

  question.textContent = `${x} * ${y} =`;

  let expression = `${x} * ${y} =`;
  return expression;
};
createMultiplication();

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
    feedback.textContent = "To'g'ri!";
    feedback.style.borderColor = "lightgreen";
    feedback.style.color = "green";
  } else if (input.value == "") {
    feedback.textContent = "Yozing!";
    feedback.style.borderColor = "darkgray";
    feedback.style.color = "black";
  } else {
    feedback.textContent = "Noto'g'ri!";
    feedback.style.borderColor = "lightcoral";
    feedback.style.color = "red";
  }

  input.value = "";
};

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
