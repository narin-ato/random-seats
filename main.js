const nameAddForm = document.querySelector(".parts-info__form");
const nameInput = document.querySelector(".parts-info__form input:first-child");
const nameList = document.querySelector(".parts-info__list");
const closeBtn = document.querySelector(".parts-info__close-btn");

const NAME_KEY = "Modori members";
let toSaveNewName = [];

// console.log(nameInput);
// console.log(nameAddBtn);
// const handlingEvents {

// }

function saveNameList() {
  localStorage.setItem(NAME_KEY, JSON.stringify(toSaveNewName));
}

function paintName(enteredName) {
  const newPerson = document.createElement("li");
  nameList.appendChild(newPerson);
  newPerson.classList.add("parts-info__person");
  const newName = document.createElement("span");
  newPerson.appendChild(newName);
  newName.innerText = enteredName;
  const newBtn = document.createElement("button");
  newPerson.appendChild(newBtn);
  newBtn.classList.add("parts-info__close-btn");
  const newCloseBtn = document.createElement("span");
  newBtn.appendChild(newCloseBtn);
  newCloseBtn.innerText = "X";
}

const savedName = localStorage.getItem(NAME_KEY);

if (savedName !== null) {
  const parsedNameList = JSON.parse(savedName);
  toSaveNewName = parsedNameList;
  parsedNameList.forEach(paintName);
}

function handleAddNameSubmit(event) {
  event.preventDefault();
  const enteredName = nameInput.value;
  nameInput.value = "";

  toSaveNewName.push(enteredName);
  console.log(toSaveNewName);
  saveNameList();
  paintName(enteredName);
}

function handleDelete(event) {
  console.log(event.parentNode);
}

nameAddForm.addEventListener("submit", handleAddNameSubmit);

console.log(closeBtn);
closeBtn.addEventListener("click", handleDelete);

// function handleRandomBtn(event) {
//   if (savedName === null) {
//     alert("이름을 먼저 추가하세요!")
//   } else {
//  }
//}
