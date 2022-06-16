import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.141.0/build/three.module.js';

class Controller {
  board;
  view;
  camera;
  scene;

  constructor(board, view) {
    this.board = board;
    this.view = view;
    this.camera = view.getCamera();
    this.scene = view.getScene();
    this.renderer = view.getRenderer();
  }

  initController() {
    console.log('init Controller class');
    this.board.initBaord();
    // this.view.initView();
    // console.log("init scope " + this.camera);
    document.body.onload = this.view.constructBasicScene();
    this.onPointerMove = this.onPointerMove.bind(this);
    window.addEventListener('click', this.onPointerMove);
    // this.addRaycaster();
  }

  onPointerMove(event) {
    // console.log("method scope " + this.camera);
    let raycaster = new THREE.Raycaster();
    let pointer = new THREE.Vector2();

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, this.camera);

    let intersects = raycaster.intersectObjects(this.scene.children);
    let x = intersects[0].object.position.x
    let y = intersects[0].object.position.y

    this.view.makeDisc(x, y, 0);

    this.renderer.render(this.scene, this.camera);
  }
}

export { Controller };
