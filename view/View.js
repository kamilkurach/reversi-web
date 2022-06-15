import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.141.0/build/three.module.js';
// import * as THREE from '../node_modules/three/build/three.module.js'

class View {
  scene;
  camera;
  renderer;

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
    this.initDiscs();
  }

  initDiscs() {
    this.makeDisc(4.1, 4.1, 1);
    this.makeDisc(3.1, 4.1, 0);
    this.makeDisc(3.1, 3.1, 1);
    this.makeDisc(4.1, 3.1, 0);
    this.updateView();
  };

  makeDisc(x, y, option) {
    if (option == 0) {
      const geometry1 = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 32);
      const material1 = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const cube1 = new THREE.Mesh(geometry1, material1);
      this.scene.add(cube1);
      cube1.position.x = x;
      cube1.position.y = y;
      cube1.position.z = 0;
      cube1.rotation.x = -1.5;
    } else if (option == 1) {
      const geometry1 = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 32);
      const material1 = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
      const cube1 = new THREE.Mesh(geometry1, material1);
      this.scene.add(cube1);
      cube1.position.x = x;
      cube1.position.y = y;
      cube1.position.z = 0;
      cube1.rotation.x = -1.5;
    }
  }

  sceneSetup() {
    this.scene.background = new THREE.Color(0xc6e4ee);
  }

  rendererSetup() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  cameraSetup() {
    // POSITION
    this.camera.position.x = 5.5;
    this.camera.position.y = 2;
    this.camera.position.z = 5.0;
    // ROTATION
    this.camera.rotation.x = 0.27;
    this.camera.rotation.y = 0.27;
    this.camera.rotation.z = 0.65;
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
        this.scene.add(cube);
        cube.position.x = j;
        cube.position.y = i;
        cube.position.z = - 0.1;
        j += 0.02;
      }
      i += 0.02;
    }

    // FRAME
    const frame_geometry = new THREE.BoxGeometry(8.6, 8.6, 1);
    const frame_material = new THREE.MeshBasicMaterial({ color: 0x805322 });
    const frame_cube = new THREE.Mesh(frame_geometry, frame_material);
    const edges = new THREE.EdgesGeometry(frame_geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));
    this.scene.add(line);
    line.position.x = 3.58;
    line.position.y = 3.58;
    line.position.z = - 0.7;
    frame_cube.position.x = 3.58;
    frame_cube.position.y = 3.58;
    frame_cube.position.z = - 0.7;
    this.scene.add(frame_cube);

    // LINES
    const board_geometry = new THREE.BoxGeometry(8.20, 8.20, 0.0001);
    const board_material = new THREE.MeshBasicMaterial({ color: 0x00000000 });
    const board_cube = new THREE.Mesh(board_geometry, board_material);
    board_cube.position.x = 3.55;
    board_cube.position.y = 3.59;
    board_cube.position.z = - 0.1;
    this.scene.add(board_cube);

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