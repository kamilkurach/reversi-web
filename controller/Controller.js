import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.141.0/build/three.module.js';

class Controller {
  board;
  view;
  camera;
  scene;
  player;
  validMoves;

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
    this.view.makeDisc(4.1, 4.1, 1);
    this.board.setBoardGrid(4, 4, 1);

    this.view.makeDisc(3.1, 4.1, 2);
    this.board.setBoardGrid(3, 4, 2);

    this.view.makeDisc(3.1, 3.1, 1);
    this.board.setBoardGrid(3, 3, 1);

    this.view.makeDisc(4.1, 3.1, 2);
    this.board.setBoardGrid(4, 3, 2);

    this.validMoves = this.board.findValidMoves(this.player);
    // console.log("player " + this.player);
    // console.log(this.validMoves);

    this.board.printBoardGrid();

    this.view.updateView();
  };

  onPointerMove(event) {
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
      let x = move[0][0]; // -> check validMoves undefined problem
      let y = move[0][1];
      if (boardGrid_x == x && boardGrid_y == y) {
        this.addDisc(view_x, view_y, boardGrid_x, boardGrid_y, this.player);

        this.view.removeHighlightValidMoves(this.validMoves);
    
        this.board.printBoardGrid();

        if (this.player == 1) {
          this.player = 2;
        } else if (this.player == 2) {
          this.player = 1;
        }
        
        this.validMoves = this.board.findValidMoves(this.player);
        // console.log("player " + this.player);
        // console.log(this.validMoves);
        
        this.view.highlightValidMoves(this.validMoves);

        this.renderer.render(this.scene, this.camera);
      }
    });
  }

  addDisc(view_x, view_y, boardGrid_x, boardGrid_y, state) {
    this.board.setBoardGrid(boardGrid_x, boardGrid_y, state);
    this.view.makeDisc(view_x, view_y, state);
  }

}

export { Controller };
