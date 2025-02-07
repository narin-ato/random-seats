// Initialize
const nameAddForm = document.querySelector(".parts-info__form");
const nameInput = document.querySelector(
  ".parts-info__form input:first-child"
) as HTMLInputElement;
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

function seatNumCheck(seats, nameList) {
  const seatsCount = seats.length;
  const nameCount = nameList.length;

  if (seatsCount > nameCount) {
    const deleteSeatsCount = seatsCount - nameCount;
    for (let i = 0; i < deleteSeatsCount; i++) {
      const targetSeat = seats[seats.length - (i + 1)];

      if (targetSeat.childNodes.length === 1) {
        targetSeat.removeChild(targetSeat.childNodes[0]);
      }
    }
  }
  return seats;
}

function paintRandomSeats(seats, nameList) {
  let seatNum = 0;
  const newSeats = seatNumCheck(seats, nameList);

  nameList.forEach((ownerName) => {
    const seat = newSeats[seatNum];
    if (seat.childNodes.length === 0) {
      const newOwner = document.createElement("span");
      seat.appendChild(newOwner);
      newOwner.innerText = ownerName;
    } else {
      seat.childNodes[0].innerHTML = ownerName;
    }

    seatNum++;
  });
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
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
