import { translations } from "./translations.js";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
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

let selectedNumbers = [];

// Creating multiplication
let createMultiplication = (specificNumber = null) => {
  let x, y;

  if (selectedNumbers.length === 0) {
    x = Math.floor(Math.random() * 8) + 2;
    all.classList.add("active");
  } else {
    x =
      specificNumber ||
      selectedNumbers[Math.floor(Math.random() * selectedNumbers.length)];
    all.classList.remove("active");
  }

  y = Math.floor(Math.random() * 8) + 2;

  let expression = `${x} * ${y} =`;
  question.textContent = expression;
  return expression;
};

createMultiplication();

// Answer check
const checkAnswer = () => {
  let expression = question.textContent;
  const result = expression
    .split("=")
    .shift()
    .split("*")
    .reduce((a, b) => a * b);

  const wrongSquare = document.getElementById("wrong");
  const rightSquare = document.getElementById("right");

  if (input.value == result) {
    let newExpression = createMultiplication();
    question.textContent = newExpression;

    trueAnswer.textContent++;
    trueAnswer.classList.add("animated");
    rightSquare.classList.add("animated");
    setTimeout(() => {
      trueAnswer.classList.remove("animated");
      rightSquare.classList.remove("animated");
    }, 300);
  } else if (input.value == "") {
    input.classList.add("shaking");
    setTimeout(() => {
      input.classList.remove("shaking");
    }, 1000);
  } else {
    falseAnswer.textContent++;
    falseAnswer.classList.add("animated");
    wrongSquare.classList.add("animated");
    setTimeout(() => {
      falseAnswer.classList.remove("animated");
      wrongSquare.classList.remove("animated");
    }, 300);
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
    const number = parseInt(event.target.innerText);

    if (selectedNumbers.includes(number)) {
      selectedNumbers = selectedNumbers.filter((n) => n !== number);
      event.target.classList.remove("active");
    } else {
      selectedNumbers.push(number);
      event.target.classList.add("active");
    }

    all.classList.remove("active");

    if (selectedNumbers.length > 0) {
      createMultiplication(selectedNumbers[selectedNumbers.length - 1]);
    } else {
      createMultiplication();
    }

    input.focus();
  });
});

// Shuffle button (asks (2-9))
all.addEventListener("click", function () {
  selectedNumbers = [];
  keys.forEach((key) => key.classList.remove("active"));
  all.classList.add("active");

  createMultiplication();

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

// Service worker logic
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then((registration) => {
    console.log("Service Worker registered.");

    registration.onupdatefound = () => {
      const newWorker = registration.installing;
      newWorker.onstatechange = () => {
        if (
          newWorker.state === "installed" &&
          navigator.serviceWorker.controller
        ) {
          console.log("New update available! Reloading...");
          window.location.reload();
        }
      };
    };
  });

  // Listen for messages from service worker
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data.action === "reloadPage") {
      console.log("Reloading page due to new service worker.");
      window.location.reload();
    }
  });
}
