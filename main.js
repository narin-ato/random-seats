// Initialize
const nameAddForm = document.querySelector(".parts-info__form");
const nameInput = document.querySelector(".parts-info__form input:first-child");
const nameList = document.querySelector(".parts-info__list");
const totalNum = document.querySelector(".parts-info__number");
const playBtnForm = document.querySelector(".random-seats__form");
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

const seats = document.querySelectorAll(".random-seats__seat");

function paintRandomSeats(seats, nameList) {
  console.log("paint start!");
  let seatNum = 0;
  nameList.forEach((ownerName) => {
    const seat = seats[seatNum];
    if (seat.childNodes.length === 0) {
      console.log("there is no data in localstorage!");
      console.log(`${ownerName}`);
      const newOwner = document.createElement("span");
      seat.appendChild(newOwner);
      newOwner.innerText = ownerName;
    } else {
      console.log("there is existing data in localstorage!");
      console.log(`${ownerName}`);
      seat.childNodes[0].innerHTML = ownerName;
    }

    seatNum++;
  });
}

function shuffle(arr) {
  console.log("Shuffle start!");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // temp
  console.log(arr);
  //
  paintRandomSeats(seats, arr);
}

function handleRandomBtn(e) {
  e.preventDefault();
  if (toSaveNewName.length === 0) {
    alert("참여자 명단을 먼저 작성해주세요!");
  } else {
    shuffle(toSaveNewName);
  }
}

playBtnForm.addEventListener("click", handleRandomBtn);
