// Initialize
const nameAddForm = document.querySelector(".parts-info__form");
const nameInput = document.querySelector(".parts-info__form input:first-child");
const nameList = document.querySelector(".parts-info__list");
const totalNum = document.querySelector(".parts-info__number");
const NAME_KEY = "Modori members";

let closeBtns = document.querySelectorAll(".parts-info__close-btn");
let toSaveNewName = [];

const savedName = localStorage.getItem(NAME_KEY);

if (savedName !== null) {
  const parsedNameList = JSON.parse(savedName);
  toSaveNewName = parsedNameList;
  parsedNameList.forEach(paintName);
  countNumber();
}

// USER ACTION
// 1. Add participants
function paintName(enteredName) {
  const newPerson = document.createElement("li");
  const newName = document.createElement("span");
  const newBtn = document.createElement("button");
  const newCloseBtn = document.createElement("span");

  nameList.appendChild(newPerson);
  newPerson.appendChild(newName);
  newPerson.appendChild(newBtn);
  newBtn.appendChild(newCloseBtn);

  newPerson.classList.add("parts-info__person");
  newName.innerText = enteredName;
  newBtn.classList.add("parts-info__close-btn");
  newBtn.innerText = "X";

  closeBtns = document.querySelectorAll(".parts-info__close-btn");
  closeBtnsEventListen(closeBtns);
  // newCloseBtn.innerText = "X";
}

function saveNameList() {
  localStorage.setItem(NAME_KEY, JSON.stringify(toSaveNewName));
}

nameAddForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredName = nameInput.value;
  nameInput.value = "";

  toSaveNewName.push(enteredName);
  saveNameList();
  countNumber();
  paintName(enteredName);
});

// 2. Delete participants

function handleDelete(event) {
  const deleteElement = event.target.parentNode;
  const deleteName = event.target.parentNode.childNodes[0].innerText;
  toSaveNewName = toSaveNewName.filter((item) => item != deleteName);

  saveNameList();
  deleteElement.remove();
  countNumber();
}

function closeBtnsEventListen(elementList) {
  elementList.forEach((btn) => {
    btn.addEventListener("click", handleDelete);
  });
}

if (savedName !== null) {
  closeBtnsEventListen(closeBtns);
}

// 3. Number of participants
function countNumber() {
  totalNum.innerHTML = `${toSaveNewName.length}명`;
}

//  4. Play Random seats

// function handleRandomBtn(event) {
//   if (savedName === null) {
//     alert("이름을 먼저 추가하세요!")
//   } else {
//  }
//}
