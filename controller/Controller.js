import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.141.0/build/three.module.js';

class Controller {
  board;
  raycaster = new THREE.Raycaster();
  pointer = { x : 0, y : 0 };
  view;

  constructor(board, view) {
    this.board = board;
    this.view = view;
  }

  initController() {
    console.log('init Controller class');
    this.board.initBaord();
    // this.view.initView();
    document.body.onload = this.view.constructBasicScene();
    this.addRaycaster();
  }

  addRaycaster() {
    var camera = this.view.camera;
    var raycaster = this.raycaster;
    var pointer = this.pointer;
    var scene = this.view.scene;
    var renderer = this.view.renderer;

    function onPointerMove( event ) {

      // calculate pointer position in normalized device coordinates
      // (-1 to +1) for both components

      pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    

      // update the picking ray with the camera and pointer position
      raycaster.setFromCamera( pointer, camera );

      // calculate objects intersecting the picking ray
      var intersects = raycaster.intersectObjects( scene.children );

      
      intersects[ 0 ].object.material.color.set( 0x90EE90 );

      renderer.render( scene, camera );

    }

    window.addEventListener( 'pointermove', onPointerMove );

    // window.requestAnimationFrame(render);
  }
}

export { Controller };
