//your JS code here. If required.

    const submitBtn = document.getElementById("submit");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const board = document.getElementById("game-board");
    const messageDiv = document.getElementById("message");
    const cells = document.querySelectorAll(".cell");
    let currentPlayer = "X";
    let player1 = "";
    let player2 = "";
    let boardState = Array(9).fill("");

    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // cols
      [0,4,8], [2,4,6]           // diagonals
    ];

    submitBtn.addEventListener("click", () => {
      player1 = player1Input.value.trim();
      player2 = player2Input.value.trim();

      if (player1 === "" || player2 === "") {
        alert("Please enter both player names.");
        return;
      }

      document.getElementById("player-form").style.display = "none";
      board.style.display = "block";
      messageDiv.textContent = `${player1}, you're up`;
    });

    function checkWinner() {
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
          const winner = boardState[a] === "X" ? player1 : player2;
          messageDiv.textContent = `${winner} congratulations you won!`;
          cells.forEach(cell => cell.style.pointerEvents = "none");
          return true;
        }
      }
      if (!boardState.includes("")) {
        messageDiv.textContent = "It's a draw!";
        return true;
      }
      return false;
    }

    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (cell.textContent === "") {
          boardState[index] = currentPlayer;
          cell.textContent = currentPlayer;
          if (!checkWinner()) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            messageDiv.textContent = currentPlayer === "X" ? `${player1}, you're up` : `${player2}, you're up`;
          }
        }
      });
    });
