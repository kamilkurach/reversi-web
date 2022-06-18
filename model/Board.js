class Board {
  boardGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]

  constructor() {
  }

  initBaord() {
    console.log('init Board class');
  }

  printBoardGrid() {
    console.table(this.boardGrid);
  }

  getBoardGrid() {
    return this.boardGrid;
  }

  setBoardGrid(x, y, state) {
    this.boardGrid[x][y] = state;
  }

  findAllPlayersDiscs(player) {
    let playerDiscs = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.boardGrid[i][j] == player) {
          let discPosition = [i, j];
          playerDiscs.push(discPosition);
        }
      }
    }
    return playerDiscs;
  }

  findValidMoves(player) {
    let validMoves = [];
    let playerDiscs = this.findAllPlayersDiscs(player);
    playerDiscs.forEach(disc => {

      let horizontalValidMoves = this.searchHorizontal(disc);
      validMoves.push(horizontalValidMoves);

      let verticalValidMoves = this.searchVertical(disc);
      validMoves.push(verticalValidMoves);

    });
    console.log(validMoves);
    return validMoves;
  }

  searchHorizontal(disc) {
    let horizontalValidMoves = [];
    let boardGrid = this.boardGrid;

    function serachRight(disc) {
      let x = disc[0];
      let y = disc[1];
      let player = boardGrid[x][y];

      for (let i = x; i < 7; i++) {
        if (boardGrid[i][y] != 0) {
          if (boardGrid[i][y] != player && boardGrid[i + 1][y] == 0) {
            let position = [i + 1, y];
            horizontalValidMoves.push(position);
            break;
          }
        }
      }
    }

    function searchLeft(disc) {
      let x = disc[0];
      let y = disc[1];
      let player = boardGrid[x][y];

      for (let i = x; i > 0; i--) {
        if (boardGrid[i][y] != 0) {
          if (boardGrid[i][y] != player && boardGrid[i - 1][y] == 0) {
            let position = [i - 1, y];
            horizontalValidMoves.push(position);
            break;
          }
        }
      }
    };

    serachRight(disc);
    searchLeft(disc);

    return horizontalValidMoves;
  }

  searchVertical(disc) {
    let verticalValidMoves = [];
    let boardGrid = this.boardGrid;

    function searchUp(disc) {
      let x = disc[0];
      let y = disc[1];
      let player = boardGrid[x][y];

      for (let i = y; i < 7; i++) {
        if (boardGrid[x][i] != 0) {
          if (boardGrid[x][i] != player && boardGrid[x][i + 1] == 0) {
            let position = [x, i + 1];
            verticalValidMoves.push(position);
            break;
          }
        }
      }
    }

    function searchDown(disc) {
      let x = disc[0];
      let y = disc[1];
      let player = boardGrid[x][y];

      for (let i = y; i > 0; i--) {
        if (boardGrid[x][i] != 0) {
          if (boardGrid[x][i] != player && boardGrid[x][i - 1] == 0) {
            let position = [x, i - 1];
            verticalValidMoves.push(position);
            break;
          }
        }
      }
    }

    searchUp(disc);
    searchDown(disc);

    return verticalValidMoves;
  }
}

export { Board };
