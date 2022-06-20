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
    let pairs = [];
    let playerDiscs = this.findAllPlayersDiscs(player);
    
    playerDiscs.forEach(disc => {
      let horizontalValidMoves = this.searchHorizontal(disc);
      if (horizontalValidMoves.length != 0) {
        validMoves.push(horizontalValidMoves[0]);
        pairs.push(horizontalValidMoves[1]);
      }
      
      // let verticalValidMoves = this.searchVertical(disc);
      // if (verticalValidMoves.length != 0) {
      //   validMoves.push(verticalValidMoves);
      // }
      
      // let diagonalRightValidMoves = this.searchDiagonalRight(disc);
      // if (diagonalRightValidMoves.length != 0) {
      //   validMoves.push(diagonalRightValidMoves);
      // }

      // let diagonalLeftValidMoves = this.searchDiagonalLeft(disc);
      // if (diagonalLeftValidMoves.length != 0) {
      //   validMoves.push(diagonalLeftValidMoves);
      // } 
    });
    // validMoves.forEach(element => {
    //   // console.log(element[0], element[1]);
    // });
    return [validMoves, pairs];
  }

  searchHorizontal(disc) {
    let horizontalValidMoves = [];
    let horizontalValidMovesRight = [];
    let horizontalDiscToFlipRight = [];
    let horizontalDiscToFlipLeft = [];
    let horizontalValidMovesLeft = [];
    let pairs = [];
    let boardGrid = this.boardGrid;

    function serachRight(disc) {
      let x = disc[0];
      let y = disc[1];
      let player = boardGrid[x][y];

      for (let i = x; i < 7; i++) {
        if (boardGrid[i][y] != 0) {
          if (boardGrid[i][y] != player) {
            let discToFlip = [i, y];
            horizontalDiscToFlipRight.push(discToFlip);
          }
          if (boardGrid[i][y] != player && boardGrid[i + 1][y] == 0) {
            let position = [i + 1, y];
            horizontalValidMoves.push(position);
            horizontalValidMovesRight.push(position);
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
          if (boardGrid[i][y] != player) {
            let discToFlip = [i, y];
            horizontalDiscToFlipLeft.push(discToFlip);
          }
          if (boardGrid[i][y] != player && boardGrid[i - 1][y] == 0) {
            let position = [i - 1, y];
            horizontalValidMoves.push(position);
            horizontalValidMovesLeft.push(position);
            break;
          }
        }
      }
    };

    serachRight(disc);
    searchLeft(disc);

    if (horizontalValidMovesRight.length != 0 ) {
      let pair = ["key", horizontalValidMovesRight, "value", horizontalDiscToFlipRight]
      pairs.push(pair);
    } 
    
    if (horizontalValidMovesLeft.length != 0) {
      let pair = ["key", horizontalValidMovesLeft, "value", horizontalDiscToFlipLeft]
      pairs.push(pair);
    }

    return [horizontalValidMoves, pairs];
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

  searchDiagonalRight(disc) {
    let diagonalValidMoves = [];
    let boardGrid = this.boardGrid;

    function searchUp(disc) {
      let x = disc[0];
      let y = disc[1];
      let player = boardGrid[x][y];
      let j = y + 1;
      
      for (let i = x - 1; i > 0; i--) {
        if (boardGrid[i][j] != 0) {
          if (boardGrid[i][j] != player && boardGrid[i - 1][j + 1] == 0) {
            let position = [i - 1, j + 1];
            diagonalValidMoves.push(position);
            break;
          }
        } 
        j++;
      }
    }

    function searchDown(disc) {
      let x = disc[0];
      let y = disc[1];
      let player = boardGrid[x][y];
      let j = y - 1;
      
      for (let i = x + 1; i < 7; i++) {
        if (boardGrid[i][j] != 0) {
          if (boardGrid[i][j] != player && boardGrid[i + 1][j - 1] == 0) {
            let position = [i + 1, j - 1];
            diagonalValidMoves.push(position);
            break;
          }
        } 
        j--;
      }
    }

    searchUp(disc);
    searchDown(disc);

    return diagonalValidMoves;
  }

  searchDiagonalLeft(disc) {
    let diagonalValidMoves = [];
    let boardGrid = this.boardGrid;

    function searchUp(disc) {
      let x = disc[0];
      let y = disc[1];
      let player = boardGrid[x][y];
      let j = y - 1;
      
      for (let i = x - 1; i > 0; i--) {
        if (boardGrid[i][j] != 0) {
          if(boardGrid[i][j] == player){
            break;
          } else {
            if (boardGrid[i][j] != player && boardGrid[i - 1][j - 1] == 0) {
              let position = [i - 1, j - 1];
              diagonalValidMoves.push(position);
              break;
            }
          }
          
        } 
        j--;
      }
    }

    function searchDown(disc) {
      let x = disc[0];
      let y = disc[1];
      let player = boardGrid[x][y];
      let j = y + 1;
      
      for (let i = x + 1; i < 7; i++) {
        if(boardGrid[i][j] == player){
          break;
        } else {
          if (boardGrid[i][j] != 0) {
            if (boardGrid[i][j] != player && boardGrid[i + 1][j + 1] == 0) {
              let position = [i + 1, j + 1];
              diagonalValidMoves.push(position);
              break;
            }
          }
        }
        j++;
      }
    }

    searchUp(disc);
    searchDown(disc);

    return diagonalValidMoves;
  }
}

export { Board };
