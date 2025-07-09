// Write your script here

const form = document.querySelector("#inputs");
const gridsContainer = document.querySelector("#grids");
const message = document.querySelector(".message");
message.style.fontWeight = "bold";
const playersName = [];
let count = 1;

const grids = document.querySelectorAll(".grid");
grids.forEach((e) => {
  e.addEventListener("click", togglePlayerInput);
});

form.addEventListener("submit", toggleView);

function toggleView(e) {
  e.preventDefault();
  form.style.display = "none";
  gridsContainer.style.display = "grid";
  playersName.push(form.playerA.value.trim());
  playersName.push(form.playerB.value.trim());
  togglePlayerName(e);
  form.reset();
}

function togglePlayerName() {
  if (count % 2 !== 0) {
    message.innerText = `${playersName[0]}, you're up`;
  } else {
    message.innerText = `${playersName[1]}, you're up`;
  }
  count++;
}

function togglePlayerInput(e) {
  if (e === "won") {
    message.innerText = `${
      count % 2 !== 0 ? playersName[1] : playersName[0]
    } congratulations you won!`;
    grids.forEach((e) => {
      e.removeEventListener("click", togglePlayerInput);
    });
    return;
  }

  if (count % 2 !== 0) {
    e.target.innerText = "o";
  } else {
    e.target.innerText = "x";
  }

  let value = checkIfPlayerHasWon();
  if (value !== undefined) {
    playerWon(value);
    return;
  }

  togglePlayerName();
}

function checkIfPlayerHasWon() {
  if (
    grids[0].innerText === grids[1].innerText &&
    grids[1].innerText === grids[2].innerText &&
    grids[0].innerText !== ""
  ) {
    return [0, 1, 2];
  } else if (
    grids[3].innerText === grids[4].innerText &&
    grids[4].innerText === grids[5].innerText &&
    grids[3].innerText !== ""
  ) {
    return [3, 4, 5];
  } else if (
    grids[6].innerText === grids[7].innerText &&
    grids[7].innerText === grids[8].innerText &&
    grids[6].innerText !== ""
  ) {
    return [6, 7, 8];
  } else if (
    grids[0].innerText === grids[3].innerText &&
    grids[3].innerText === grids[6].innerText &&
    grids[0].innerText !== ""
  ) {
    return [0, 3, 6];
  } else if (
    grids[1].innerText === grids[4].innerText &&
    grids[4].innerText === grids[7].innerText &&
    grids[1].innerText !== ""
  ) {
    return [1, 4, 7];
  } else if (
    grids[2].innerText === grids[5].innerText &&
    grids[5].innerText === grids[8].innerText &&
    grids[2].innerText !== ""
  ) {
    return [2, 5, 8];
  } else if (
    grids[0].innerText === grids[4].innerText &&
    grids[4].innerText === grids[8].innerText &&
    grids[0].innerText !== ""
  ) {
    return [0, 4, 8];
  } else if (
    grids[2].innerText === grids[4].innerText &&
    grids[4].innerText === grids[6].innerText &&
    grids[2].innerText !== ""
  ) {
    return [2, 4, 6];
  }
}

function playerWon(value) {
  value.forEach((e) => {
    grids[e].style.backgroundColor = "rgb(128,0,128)";
  });

  togglePlayerInput("won");
}