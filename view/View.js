import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.141.0/build/three.module.js';
// import * as THREE from '../node_modules/three/build/three.module.js'

class View {

  constructor() {
    document.body.onload = this.addBasicScene;
  }

  initView() {
    console.log('init View class');
  }

  addBasicScene() {

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0xc6e4ee);
    // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.2, 1000);
    const camera = new THREE.OrthographicCamera( 21 / - 2, 21 / 2, 15 / 2, 15 / - 2, 1, 1000 );

    const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    for (let j = 0; j < 8; j++) {
      if (j % 2 != 0) {
        for (let i = 0; i < 8; i++) {

          if (i % 2 != 0) {
            const geometry = new THREE.BoxGeometry(1, 1, 0.01);
            const material = new THREE.MeshBasicMaterial({ color: 0x405336 });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            cube.position.x = i;
            cube.position.y = j;
            cube.position.z = - 0.1;
          } else {
            const geometry = new THREE.BoxGeometry(1, 1, 0.01);
            const material = new THREE.MeshBasicMaterial({ color: 0x405336 });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            cube.position.x = i;
            cube.position.y = j;
            cube.position.z = - 0.1;
          }
          i = i + 0.02;
        }
      } else {
        for (let i = 0; i < 8; i++) {
          if (i % 2 != 0) {
            const geometry = new THREE.BoxGeometry(1, 1, 0.01);
            const material = new THREE.MeshBasicMaterial({ color: 0x405336 });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            cube.position.x = i;
            cube.position.y = j;
            cube.position.z = - 0.1;
          } else {
            const geometry = new THREE.BoxGeometry(1, 1, 0.01);
            const material = new THREE.MeshBasicMaterial({ color: 0x405336 });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            cube.position.x = i;
            cube.position.y = j;
            cube.position.z = - 0.1;
          }
          i = i + 0.02;
        }
      }
      j = j + 0.02;
    }

    // FRAME
    const frame_geometry = new THREE.BoxGeometry(8.6, 8.6, 1);
    const frame_material = new THREE.MeshBasicMaterial({ color: 0x805322 });
    const frame_cube = new THREE.Mesh(frame_geometry, frame_material);
    const edges = new THREE.EdgesGeometry( frame_geometry );
    const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
    scene.add( line );
    line.position.x = 3.58;
    line.position.y = 3.58;
    line.position.z = - 0.7;
    frame_cube.position.x = 3.58;
    frame_cube.position.y = 3.58;
    frame_cube.position.z = - 0.7;
    scene.add(frame_cube);

    // LINES
    const board_geometry = new THREE.BoxGeometry(8.20, 8.20, 0.0001);
    const board_material = new THREE.MeshBasicMaterial({ color: 0x00000000 });
    const board_cube = new THREE.Mesh(board_geometry, board_material);
    board_cube.position.x = 3.55;
    board_cube.position.y = 3.59;
    board_cube.position.z = - 0.1;
    scene.add(board_cube);

    // CAMERA 
    camera.position.x = 5.5;
    camera.position.y = 2;
    camera.position.z = 5.0;

    camera.rotation.x = 0.27;
    camera.rotation.y = 0.27;
    camera.rotation.z = 0.65;

    function initDiscs() {
      const geometry1 = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 32);
      const material1 = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
      const cube1 = new THREE.Mesh(geometry1, material1);
      scene.add(cube1);
      cube1.position.x = 4.1;
      cube1.position.y = 4.1;
      cube1.position.z = 0;
      cube1.rotation.x = -1.5;
  
      const geometry2 = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 32);
      const material2 = new THREE.MeshBasicMaterial({ color: 0x00000000 });
      const cube2 = new THREE.Mesh(geometry2, material2);
      scene.add(cube2);
      cube2.position.x = 3.1;
      cube2.position.y = 4.1;
      cube2.position.z = 0;
      cube2.rotation.x = -1.5;
      
      const geometry3 = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 32);
      const material3 = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
      const cube3 = new THREE.Mesh(geometry3, material3);
      scene.add(cube3);
      cube3.position.x = 3.1;
      cube3.position.y = 3.1;
      cube3.position.z = 0;
      cube3.rotation.x = -1.5;

      const geometry4 = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 32);
      const material4 = new THREE.MeshBasicMaterial({ color: 0x00000000 });
      const cube4 = new THREE.Mesh(geometry4, material4);
      scene.add(cube4);
      cube4.position.x = 4.1;
      cube4.position.y = 3.1;
      cube4.position.z = 0;
      cube4.rotation.x = -1.5;
    };

    initDiscs();

  
    
    // RENDER
    renderer.render(scene, camera);
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