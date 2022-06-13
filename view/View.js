import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.141.0/build/three.module.js';
// import * as THREE from '../node_modules/three/build/three.module.js'

class View {

  constructor() {
    // from developer.mozilla.org
    document.body.onload = this.addElement;
  }

  initView() {
    console.log('init View class');
  }

  // from developer.mozilla.org
  addElement() {

      const scene = new THREE.Scene();
      const axesHelper = new THREE.AxesHelper( 10 );
      // scene.add( axesHelper );
      scene.background = new THREE.Color( 0xc6e4ee );
      scene.fog = new THREE.Fog( 0x72645b, 2, 15 );
			const camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 0.2, 1000 );
      
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry( 40, 40 ),
        new THREE.MeshPhongMaterial( { color: 0xFFC, specular: 0x101010 } )
      );
      plane.rotation.x = - Math.PI / 3;
      plane.position.y = - 0.2;
      scene.add( plane );

      plane.receiveShadow = true;

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

      const cube = new THREE.Mesh(
        new THREE.BoxGeometry( 1, 1, 1 ),
        new THREE.MeshBasicMaterial( { color: 0x8cd6ff } ) 
      );
      cube.rotation.x = - Math.PI / 3;
      cube.position.y = 0.5;
      cube.position.z = 1;
      scene.add( cube );

      const cube2 = new THREE.Mesh(
        new THREE.BoxGeometry( 1, 1, 1 ),
        new THREE.MeshBasicMaterial( { color: 0xFFD700 } ) 
      );
      cube2.rotation.x = - Math.PI / 3;
      cube2.position.y = 1;
      cube2.position.x = 4;
    

      scene.add( cube2 );

      const cube3 = new THREE.Mesh(
        new THREE.BoxGeometry( 1, 1, 1 ),
        new THREE.MeshBasicMaterial( { color: 0xFFD600 } ) 
      );
      cube3.rotation.x = - Math.PI / 3;
      cube3.position.y = 2;
      cube3.position.x = 8;
      cube3.position.z = 1;

      scene.add( cube3 );
		
      camera.position.z = 0;
      camera.position.x = 2;
      camera.position.z = 10;
           

      function animate() {
				requestAnimationFrame( animate );

				cube.rotation.x += 0.05;
				cube.rotation.y += 0.02;
        cube.rotation.z += 0.001

        cube2.rotation.x += 0.05;
				cube2.rotation.y += 0.02;
        cube2.rotation.z += 0.1

        cube3.rotation.x += 0.05;
				cube3.rotation.y += 0.02;
        cube3.rotation.z += 0.1

        camera.rotation.z += - 0.005; 

        // if(camera.position.x != 10 && camera.position.z != 10) {
        //   animateCamera();
        // } 

				renderer.render( scene, camera );
			};

      function animateCamera() {
        camera.position.x -= 5;
        camera.position.z -= 5;
      }

			animate();
  }
}


export { View };
