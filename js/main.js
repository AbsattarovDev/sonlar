import { translations } from "./translations.js";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("Service Worker Registered"))
    .catch((error) =>
      console.log("Service Worker Registration Failed:", error)
    );
}

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

// Answer check
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

// Toggle menu
function toggleMenu() {
  const menu = document.querySelector(".menu");
  const button = document.querySelector(".menuBtn");
  const rect = button.getBoundingClientRect();

  if (menu.classList.contains("show")) {
    menu.style.opacity = "0";
    menu.style.transform = "translateY(-10px)";
    setTimeout(() => {
      menu.style.display = "none";
      menu.classList.remove("show");
    }, 200);
    return;
  }

  menu.style.display = "block";
  menu.style.opacity = "0";
  menu.style.transform = "translateY(-10px)";

  requestAnimationFrame(() => {
    const menuWidth = menu.offsetWidth;

    menu.style.top = `${rect.bottom + window.scrollY}px`;
    menu.style.left = `${rect.left + window.scrollX - menuWidth}px`;

    menu.style.opacity = "1";
    menu.style.transform = "translateY(0)";
    menu.classList.add("show");
  });
}

document.addEventListener("click", (e) => {
  const menu = document.querySelector(".menu");
  const button = document.querySelector(".menuBtn");

  if (!menu.contains(e.target) && !button.contains(e.target)) {
    menu.style.opacity = "0";
    menu.style.transform = "translateY(-10px)";
    setTimeout(() => {
      menu.style.display = "none";
      menu.classList.remove("show");
    }, 200);
  }
});

// Button event listener
document.querySelector(".menuBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu();
});

// Language switch
const enBtn = document.getElementById("enBtn");
const uzBtn = document.getElementById("uzBtn");
const ruBtn = document.getElementById("ruBtn");
const buttons = [enBtn, uzBtn, ruBtn];

function changeLanguage(lang) {
  document.getElementById("checkBtn").textContent =
    translations[lang].checkButton;
  // document.getElementById("helpText").textContent =
  //   translations[lang].helpButton;

  localStorage.setItem("selectedLanguage", lang);

  buttons.forEach((btn) => (btn.style.background = "transparent"));

  document.getElementById(`${lang}Btn`).style.background = "#d4d4d4";
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("selectedLanguage") || "uz";
  changeLanguage(savedLang);
});

buttons.forEach((btn) => {
  btn.addEventListener("click", () =>
    changeLanguage(btn.id.replace("Btn", ""))
  );
});
