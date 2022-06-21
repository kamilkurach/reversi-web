import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.141.0/build/three.module.js';

class Controller {
  board;
  view;
  camera;
  scene;
  player;
  validMoves;
  pairs;
  searchResult;

  constructor(board, view) {
    this.board = board;
    this.view = view;
    this.camera = view.getCamera();
    this.scene = view.getScene();
    this.renderer = view.getRenderer();
    this.player = 1;
  }

  initController() {
    console.log('init Controller class');
    document.body.onload = this.view.constructBasicScene();
    this.onPointerMove = this.onPointerMove.bind(this);
    window.addEventListener('click', this.onPointerMove);

    // init
    this.initDiscs();
    this.board.recalcBoard(this.player);
    this.view.highlightValidMoves(this.board.validMoves, this.player);
    this.start();
    this.view.updateView();
  }

  initDiscs() {
    this.addDisc(3.1, 3.1, 3, 3, 1);
    this.addDisc(4.1, 3.1, 4, 3, 2);
    this.addDisc(3.1, 4.1, 3, 4, 2);
    this.addDisc(4.1, 4.1, 4, 4, 1);
  };

  onPointerMove(event) {
    console.clear();

    let raycaster = new THREE.Raycaster();
    let pointer = new THREE.Vector2();

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, this.camera);

    let intersects = raycaster.intersectObjects(this.scene.children);
    let view_x = intersects[0].object.position.x
    let view_y = intersects[0].object.position.y

    let boardGrid_x = view_x.toFixed(0);
    let boardGrid_y = view_y.toFixed(0);

    for (let move of this.board.validMoves) {
      let x = move[0];
      let y = move[1];
      if (boardGrid_x == x && boardGrid_y == y) {

        // current player
        this.addDisc(view_x, view_y, boardGrid_x, boardGrid_y, this.player);

        this.view.removeHighlightValidMoves(this.board.validMoves, this.player);

        //  flip disc/discs
        this.flip(boardGrid_x, boardGrid_y, this.player);

        // change player

        this.changePlayer();

        // new player 

        this.board.recalcBoard(this.player);

        this.view.highlightValidMoves(this.board.validMoves, this.player);

        // this.board.printBoardGrid();

        this.renderer.render(this.scene, this.camera);

        break;
      }
    };
  }

  start() {
    setTimeout(() => {
      this.randomPlay();
      this.start();
      if (this.board.validMoves.length == 0) {
        window.location.reload();
      }
    }, 3500);
  }

  reset() {
    this.player = 1;
    this.board.resetBoard();
    this.view.removeAllDiscs();
    this.initDiscs();
    this.board.recalcBoard(this.player);
    this.view.highlightValidMoves(this.board.validMoves, this.player);
    this.view.updateView();
  }

  randomPlay() {

    if (this.board.validMoves.length != 0) {

      let view_x = this.board.validMoves[0][0] + this.board.validMoves[0][0] * 0.02;
      let view_y = this.board.validMoves[0][1] + this.board.validMoves[0][1] * 0.02;

      let boardGrid_x = view_x.toFixed(0);
      let boardGrid_y = view_y.toFixed(0);

      for (let move of this.board.validMoves) {
        let x = move[0];
        let y = move[1];
        if (boardGrid_x == x && boardGrid_y == y) {

          // current player
          this.addDisc(view_x, view_y, boardGrid_x, boardGrid_y, this.player);

          this.view.removeHighlightValidMoves(this.board.validMoves, this.player);

          //  flip disc/discs
          this.flip(boardGrid_x, boardGrid_y, this.player);

          // change player

          this.changePlayer();

          // new player 

          this.board.recalcBoard(this.player);

          this.view.highlightValidMoves(this.board.validMoves, this.player);

          // this.board.printBoardGrid();

          this.renderer.render(this.scene, this.camera);

          break;
        }
      };
    }
  }

  changePlayer() {
    if (this.player == 1) {
      this.player = 2;
    } else if (this.player == 2) {
      this.player = 1;
    }
  }

  addDisc(view_x, view_y, boardGrid_x, boardGrid_y, state) {
    this.board.setBoardGrid(boardGrid_x, boardGrid_y, state);
    this.view.makeDisc(view_x, view_y, boardGrid_x, boardGrid_y, state);
  }

  removeDisc(boardGrid_x, boardGrid_y) {
    let state = 0;
    this.board.setBoardGrid(boardGrid_x, boardGrid_y, state);
    this.view.removeDisc(boardGrid_x, boardGrid_y);
  }

  flipDisc(boardGrid_x, boardGrid_y, player) {
    this.view.changeStateOfDisc(boardGrid_x, boardGrid_y, player);
    this.board.setBoardGrid(boardGrid_x, boardGrid_y, player);
  }

  flip(boardGrid_x, boardGrid_y, player) {
    this.board.pairs.forEach(element => {
      let key = element[1];
      let x_in_key = key[0][0];
      let y_in_key = key[0][1];

      if (x_in_key == boardGrid_x && y_in_key == boardGrid_y) {
        let discsToFlip = element.slice(3)[0];
        discsToFlip.forEach(disc => {
          this.flipDisc(disc[0], disc[1], player);
        });
      }
    });
  }

}

export { Controller };
