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
    this.initDiscs();
    this.view.highlightValidMoves(this.validMoves);
  }

  initDiscs() {
    this.addDisc(3.1, 3.1, 3, 3, 1)
    this.addDisc(4.1, 3.1, 4, 3, 2)
    this.addDisc(3.1, 4.1, 3, 4, 2)
    this.addDisc(4.1, 4.1, 4, 4, 1)

    this.searchResult = this.board.findValidMoves(this.player);

    this.validMoves = this.searchResult[0];
    
    this.pairs = this.searchResult[1];

    this.view.updateView();
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

    this.validMoves.forEach(move => {
      let x = move[0];
      let y = move[1];
      if (boardGrid_x == x && boardGrid_y == y) {

        // current player
        this.addDisc(view_x, view_y, boardGrid_x, boardGrid_y, this.player);

        this.view.removeHighlightValidMoves(this.validMoves);
        
        //  flip disc/discs
        this.pairs.forEach(element => {
          let key = element[1];
          let x_in_key = key[0][0];
          let y_in_key = key[0][1];
          
          console.log(x_in_key, boardGrid_x , y_in_key, boardGrid_y, this.pairs);

          if (x_in_key == boardGrid_x && y_in_key == boardGrid_y) {
            let discsToFlip = element.slice(3)[0];
            discsToFlip.forEach(disc => {
              this.flipDisc(disc[0], disc[1], this.player);
            });
          }
        });

        if (this.player == 1) {
          this.player = 2;
          this.pairs = [];
        } else if (this.player == 2) {
          this.player = 1;
          this.pairs = [];
        }

        // new player 
        
        this.searchResult = this.board.findValidMoves(this.player);

        this.validMoves = this.searchResult[0];
    
        this.pairs = this.searchResult[1];

        this.view.highlightValidMoves(this.validMoves);

        this.board.printBoardGrid();

        this.renderer.render(this.scene, this.camera);
      }
    });
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

}

export { Controller };
