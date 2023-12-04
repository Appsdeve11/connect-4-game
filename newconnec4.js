
class MemoryGame {
  constructor() {
    this.playerRed = "r";
    this.playerYellow = "y";
    this.currPlayer = this.playerRed;
    this.gameover = false;
    this.board = [];
    this.currColumns = [];
    this.rows = 6;
    this.columns = 7;
  }

  setGame() {
    this.board = [];
    this.currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.columns; c++) {
        row.push(" ");
        let tile = document.createElement("div");
        tile.id = r.toString() + "-" + c.toString();
        tile.classList.add("tile");
        tile.addEventListener("click", this.setPiece.bind(this));
        document.getElementById("board").append(tile);
      }
      this.board.push(row);
    }
  }

  setPiece() {
    if (this.gameover) {
      return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    r = this.currColumns[c];
    if (r < 0) {
      return;
    }

    this.board[r][c] = this.currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (this.currPlayer == this.playerRed) {
      tile.classList.add("red-piece");
      this.currPlayer = this.playerYellow;
    } else {
      tile.classList.add("yellow-piece");
      this.currPlayer = this.playerRed;
    }
    r -= 1;
    this.currColumns[c] = r;

    this.checkWinner();
  }

  checkWinner() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns - 3; c++) {
        if (this.board[r][c] != " ") {
          if (
            this.board[r][c] == this.board[r][c + 1] &&
            this.board[r][c + 1] == this.board[r][c + 2] &&
            this.board[r][c + 2] == this.board[r][c + 3]
          ) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }
  }

  setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (this.board[r][c] == this.playerRed) {
      winner.innerText = "Red Wins";
    } else {
      winner.innerText = "Yellow Wins";
    }

    this.gameover = true;
  }
}

window.onload = function () {
  const game = new MemoryGame();
  game.setGame();
};