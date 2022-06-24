import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.141.0/build/three.module.js';
// import * as THREE from '../node_modules/three/build/three.module.js'

class View {
  scene;
  camera;
  renderer;
  is3D = true;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(21 / - 2, 21 / 2, 15 / 2, 15 / - 2, 1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.initView();
  }

  initView() {
    console.log('init View class');
    this.sceneSetup();
    this.rendererSetup();
    this.cameraSetup();
    // this.sayHi();
  }

  sayHi() {
    // H
    this.makeDisc(1.1, 2, 1);
    this.makeDisc(1.1, 3, 0);
    this.makeDisc(1.1, 4, 1);
    this.makeDisc(1.1, 5, 0);
    this.makeDisc(1.1, 6, 1);
    this.makeDisc(2.1, 4, 0);
    this.makeDisc(3.1, 4, 0);
    this.makeDisc(4.1, 2, 1);
    this.makeDisc(4.1, 3, 0);
    this.makeDisc(4.1, 4, 1);
    this.makeDisc(4.1, 5, 0);
    this.makeDisc(4.1, 6, 1);
    // I
    this.makeDisc(6.1, 2, 0);
    this.makeDisc(6.1, 3, 1);
    this.makeDisc(6.1, 4, 0);
    this.makeDisc(6.1, 5, 1);
    this.makeDisc(6.1, 6, 0);

    this.updateView();
  }

  makeDisc(x, y, boardGrid_x, boardGrid_y, option) {
    if (option == 1) {
      const black_group = new THREE.Group();
      black_group.name = "disc"
      black_group.boardGrid_x = boardGrid_x;
      black_group.boardGrid_y = boardGrid_y;

      // black half 
      const black_geometry = new THREE.CylinderGeometry(0.35, 0.35, 0.1, 50);
      const black_material = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const black_disc = new THREE.Mesh(black_geometry, black_material);
      black_disc.boardGrid_x = boardGrid_x;
      black_disc.boardGrid_y = boardGrid_y;
      black_disc.position.x = x;
      black_disc.position.y = y;
      black_disc.position.z = 0.1;
      black_disc.rotation.x = -1.5;

      // white half 
      const white_group = new THREE.Group();
      const white_geometry = new THREE.CylinderGeometry(0.35, 0.35, 0.1, 50);
      const white_material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
      const white_disc = new THREE.Mesh(white_geometry, white_material);

      white_disc.boardGrid_x = boardGrid_x;
      white_disc.boardGrid_y = boardGrid_y;
      white_disc.position.x = x;
      white_disc.position.y = y;
      white_disc.position.z = 0;
      white_disc.rotation.x = -1.5;

      // add
      black_group.add(black_disc, white_disc);
      this.scene.add(black_group);

    } else if (option == 2) {

      const white_group = new THREE.Group();
      white_group.name = "disc"
      white_group.boardGrid_x = boardGrid_x;
      white_group.boardGrid_y = boardGrid_y;

      // black half 
      const black_geometry = new THREE.CylinderGeometry(0.35, 0.35, 0.1, 50);
      const black_material = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const black_disc = new THREE.Mesh(black_geometry, black_material);
      black_disc.boardGrid_x = boardGrid_x;
      black_disc.boardGrid_y = boardGrid_y;
      black_disc.position.x = x;
      black_disc.position.y = y;
      black_disc.position.z = 0;
      black_disc.rotation.x = - 1.5;

      // white half 
      const white_geometry = new THREE.CylinderGeometry(0.35, 0.35, 0.1, 50);
      const white_material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
      const white_disc = new THREE.Mesh(white_geometry, white_material);

      white_disc.boardGrid_x = boardGrid_x;
      white_disc.boardGrid_y = boardGrid_y;
      white_disc.position.x = x;
      white_disc.position.y = y;
      white_disc.position.z = 0.1;
      white_disc.rotation.x = - 1.5;

      white_group.add(white_disc, black_disc);
      this.scene.add(white_group);
    }
  }

  removeDisc(boardGrid_x, boardGrid_y) {
    this.scene.children.forEach(disc => {
      if (disc.name == "disc") {
        let disc_x = disc.boardGrid_x;
        let disc_y = disc.boardGrid_y;
        if (disc_x == boardGrid_x && disc_y == boardGrid_y) {
          this.scene.remove(disc);
        }
      }
    });
    this.updateView();
  }

  removeAllDiscs() {
    this.scene.children.forEach(disc => {
      if (disc.name == "disc") {
        this.scene.remove(disc);
      }
    });
    this.updateView();
  }

  changeStateOfDisc(boardGrid_x, boardGrid_y, player) {
    // to be replaced by flip animation 
    this.scene.children.forEach(disc => {
      if (disc.name == "disc") {
        let disc_x = disc.boardGrid_x;
        let disc_y = disc.boardGrid_y;
        if (disc_x == boardGrid_x && disc_y == boardGrid_y) {
          if (player == 1) {
            this.animate(disc, player);
          } else if (player == 2) {
            this.animate(disc, player);
          }
        }
      }
    });
    this.updateView();
  }

  animate(disc, player) {
    let frame = () => new Promise(window.requestAnimationFrame);

    (async () => {
        if (disc.position.z == 0) {
          while (disc.position.z < 0.9) {
            await frame();
            disc.position.z += 0.1;
            
            disc.children[0].rotation.x -= 0.3;
            disc.children[1].rotation.x -= 0.3;
            this.updateView();
          }
          if (disc.position.z > 0.9) {
            while (disc.position.z > 0) {
              await frame();
              disc.position.z -= 0.1;
              this.updateView();
            }
          }
          if (player == 1) {
            disc.position.z = 0;
            disc.children[0].rotation.x = - 1.5;
            disc.children[1].rotation.x = - 1.5;
            disc.children[0].material.color.set(0x000000)
            disc.children[1].material.color.set(0xFFFFFF)
            this.updateView();
          } else if (player == 2) {
            disc.position.z = 0;
            disc.children[0].rotation.x = - 1.5;
            disc.children[1].rotation.x = - 1.5;
            disc.children[0].material.color.set(0xFFFFFF)
            disc.children[1].material.color.set(0x000000)
            this.updateView();
          }
        }
    })();
  }

  sceneSetup() {
    let arr = [0x41B3A3, 0x85DCB, 0xE8A87C, 0xC38D9E];
    let pick = Math.floor(Math.random() * arr.length);
    this.scene.background = new THREE.Color(arr[pick]);
  }

  getScene() {
    return this.scene;
  }

  rendererSetup() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  getRenderer() {
    return this.renderer;
  }

  highlightValidMoves(validMoves, player) {
    validMoves.forEach(move => {
      let x = move[0];
      let y = move[1];
      this.scene.children.forEach(square => {
        if (square.name == "square") {
          let square_x = square.position.x.toFixed(0);
          let square_y = square.position.y.toFixed(0);
          if (square_x == x && square_y == y) {
            if (player == 1) {
              square.material.color.set(0x90EE90);
              square.material.opacity = 0.7;
            } else if (player == 2) {
              square.material.color.set(0xff9248);
              square.material.opacity = 0.7;
            }
          }
        }
      });
    });
    this.updateView();
  }

  removeHighlightValidMoves(validMoves) {
    validMoves.forEach(move => {
      let x = move[0];
      let y = move[1];
      this.scene.children.forEach(square => {
        if (square.name == "square") {
          let square_x = square.position.x.toFixed(0);
          let square_y = square.position.y.toFixed(0);
          if (square_x == x && square_y == y) {
            square.material.color.set(0x405336);
            square.material.opacity = 1;
          }
        }
      });
    });
    this.updateView();
  }

  cameraSetup() {
    if (this.is3D == true) {
      // POSITION
      this.camera.position.x = 5.5;
      this.camera.position.y = 5.5;
      this.camera.position.z = 5.0;
      // ROTATION
      this.camera.rotation.x = - 0.27;
      this.camera.rotation.y = 0.27;
      this.camera.rotation.z = 2.25;
    } else if (this.is3D == false) {
      // POSITION
      this.camera.position.x = 3;
      this.camera.position.y = 3;
      this.camera.position.z = 5.0;
      // ROTATION
      this.camera.rotation.x = 0;
      this.camera.rotation.y = 0
      this.camera.rotation.z = 1.57;
    }
  }

  getCamera() {
    return this.camera;
  }

  updateView() {
    // RENDER
    this.renderer.render(this.scene, this.camera);
  }

  constructBasicScene() {

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const geometry = new THREE.BoxGeometry(1, 1, 0.01);
        const material = new THREE.MeshBasicMaterial({ color: 0x405336 });
        const cube = new THREE.Mesh(geometry, material);
        cube.name = "square"
        cube.material.transparent = true;
        this.scene.add(cube);
        cube.position.x = i;
        cube.position.y = j;
        cube.position.z = - 0.1;
        j += 0.02;
      }
      i += 0.02;
    }

    // FRAME
    const frame_geometry = new THREE.BoxGeometry(8.6, 8.6, 0.5);
    const frame_material = new THREE.MeshBasicMaterial({ color: 0x805322 });
    const frame_cube = new THREE.Mesh(frame_geometry, frame_material);
    frame_cube.name = "frame_cube";
    const edges = new THREE.EdgesGeometry(frame_geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
    line.name = "frame_edges";
    this.scene.add(line);
    line.position.x = 3.58;
    line.position.y = 3.58;
    line.position.z = - 0.35;
    frame_cube.position.x = 3.58;
    frame_cube.position.y = 3.58;
    frame_cube.position.z = - 0.35;
    this.scene.add(frame_cube);

    // LINES
    const board_geometry = new THREE.BoxGeometry(8.20, 8.20, 0.0001);
    const board_material = new THREE.MeshBasicMaterial({ color: 0x00000000 });
    const board_lines = new THREE.Mesh(board_geometry, board_material);
    board_lines.name = "board_lines";
    board_lines.position.x = 3.57;
    board_lines.position.y = 3.57;
    board_lines.position.z = - 0.1;
    this.scene.add(board_lines);

    this.updateView();
  }
}

export { View };

// // chessbaord
// for (let j = 0; j < 8; j++) {
//   if (j % 2 != 0) {
//     for (let i = 0; i < 8; i++) {
//       if (i % 2 != 0) {
//         const geometry = new THREE.BoxGeometry(1, 1, 1);
//         const material = new THREE.MeshBasicMaterial({ color: 0x0000000  });
//         const cube = new THREE.Mesh(geometry, material);
//         scene.add(cube);
//         cube.position.x = i;
//         cube.position.y = j;
//       } else {
//         const geometry = new THREE.BoxGeometry(1, 1, 1);
//         const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
//         const cube = new THREE.Mesh(geometry, material);
//         scene.add(cube);
//         cube.position.x = i;
//         cube.position.y = j;
//       }
//     }
//     } else {
//       for (let i = 0; i < 8; i++) {
//         if (i % 2 != 0) {
//           const geometry = new THREE.BoxGeometry(1, 1, 1);
//           const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
//           const cube = new THREE.Mesh(geometry, material);
//           scene.add(cube);
//           cube.position.x = i;
//           cube.position.y = j;
//         } else {
//           const geometry = new THREE.BoxGeometry(1, 1, 1);
//           const material = new THREE.MeshBasicMaterial({ color: 0x0000000 });
//           const cube = new THREE.Mesh(geometry, material);
//           scene.add(cube);
//           cube.position.x = i;
//           cube.position.y = j;
//         }
//       }
//     }
//   }