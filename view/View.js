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
    scene.fog = new THREE.Fog(0x72645b, 2, 15);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.2, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    for (let j = 0; j < 8; j++) {
      if (j % 2 != 0) {
        for (let i = 0; i < 8; i++) {
          
          if (i % 2 != 0) {
            const geometry = new THREE.BoxGeometry(1, 1, 0.01);
            const material = new THREE.MeshBasicMaterial({ color: 0x405336  });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            cube.position.x = i;
            cube.position.y = j;
          } else {
            const geometry = new THREE.BoxGeometry(1, 1, 0.01);
            const material = new THREE.MeshBasicMaterial({ color: 0x405336 });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            cube.position.x = i;
            cube.position.y = j;
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
            } else {
              const geometry = new THREE.BoxGeometry(1, 1, 0.01);
              const material = new THREE.MeshBasicMaterial({ color: 0x405336 });
              const cube = new THREE.Mesh(geometry, material);
              scene.add(cube);
              cube.position.x = i;
              cube.position.y = j;
            }
            i = i + 0.02;
          }
        }
        j = j+0.02
      }

      const geometry = new THREE.BoxGeometry(8.6, 8.6, 0.01);
      const material = new THREE.MeshBasicMaterial({ color: 0x805322 });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = 3.58;
      cube.position.y = 3.58;
      cube.position.z = - 0.1;
      scene.add(cube);

      const board_geometry = new THREE.BoxGeometry(8.3, 8.3, 0.01);
      const board_material = new THREE.MeshBasicMaterial({ color: 0x00000000 });
      const board_cube = new THREE.Mesh(board_geometry, board_material);
      board_cube.position.x = 3.58;
      board_cube.position.y = 3.58;
      board_cube.position.z = - 0.1;
      scene.add(board_cube);
    
      camera.position.x = 3.5;
      camera.position.y = 3.5;
      camera.position.z = 6.5;

      camera.rotation.x = 0;

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