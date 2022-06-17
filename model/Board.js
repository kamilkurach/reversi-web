class Board {
  boardGrid = [
    [0, 0, 0, 0, 0, 0, 0 ,0],
    [0, 0, 0, 0, 0, 0, 0 ,0],
    [0, 0, 0, 0, 0, 0, 0 ,0],
    [0, 0, 0, 0, 0, 0, 0 ,0],
    [0, 0, 0, 0, 0, 0, 0 ,0],
    [0, 0, 0, 0, 0, 0, 0 ,0],
    [0, 0, 0, 0, 0, 0, 0 ,0],
    [0, 0, 0, 0, 0, 0, 0 ,0],
  ]

  constructor() {
  }

  initBaord() {
    console.log('init Board class');
    this.printBoardGrid();
  }

  printBoardGrid() {
    console.table(this.boardGrid);
  }

  getBoardGrid() {
    return this.boardGrid;
  }

  setBoardGrid(x, y, state) {
    this.boardGrid[x][y] = state;
    this.printBoardGrid();
  }
}

export { Board };
