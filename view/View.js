import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.122.0/build/three.module.js';

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
      scene.background = new THREE.Color( 0xc6e4ee );
      scene.fog = new THREE.Fog( 0x72645b, 2, 15 );
			const camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 0.2, 1000 );
      
      camera.lookAt( -1, 0, -1 );
      // camera.up.set( 0, 0, 1 );
      camera.updateProjectionMatrix();

      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry( 40, 40 ),
        new THREE.MeshPhongMaterial( { color: 0xFFC, specular: 0x101010 } )
      );
      plane.rotation.x = - Math.PI / 2.5;
      plane.position.y = - 0.2;
      scene.add( plane );

      plane.receiveShadow = true;

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

      const cube = new THREE.Mesh(
        new THREE.BoxGeometry( 1, 1, 1 ),
        new THREE.MeshBasicMaterial( { color: 0xFFD700 } ) 
      );
      cube.rotation.x = - Math.PI / 3;
      cube.position.y = 0.5;
      scene.add( cube );
		
      camera.position.z = 5;
      camera.position.x = 150;
      camera.position.z = 150;

      

      function animate() {
				requestAnimationFrame( animate );

				cube.rotation.x += 0.05;
				cube.rotation.y += 0.02;
        cube.rotation.z += 0.1

        if(camera.position.x != 5) {
          animateCamera();
        }

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
