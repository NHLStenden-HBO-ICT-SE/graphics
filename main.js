import * as THREE from "./three.module.js";

var velX = 0;
var velY = 0;
var velZ = 0;

var rotX = 0;
var rotY = 0;
var RotZ = 0;
 
var speed = 2;
var friction = 0.20;


function main() {
  var lastLoop = new Date();
  const canvas = document.querySelector("#c");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const renderer = new THREE.WebGLRenderer({ canvas });
  var t = 0;
  var x = 0;
  

  //origineel
  // const fov = 75;
  // const aspect = 2;  // the canvas default
  // const near = 0.1;
  // const far = 10; //5
  // const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // camera.position.z = 3; //2

  const fieldOfView = 40;
  const aspectRatio = 16 / 9;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    near,
    far
  );
  camera.position.z = 3; //2

  const scene = new THREE.Scene();

  const spheres = []; // just an array we can use to rotate the spheres
  
  const geometry = new THREE.SphereGeometry(0.51, 32, 32);
  const loader = new THREE.TextureLoader();
  const material = new THREE.MeshBasicMaterial({
    map: loader.load("earth.jpg"),
  });
  const earth = new THREE.Mesh(geometry, material);
  earth.position.x = 2;
  scene.add(earth);
  spheres.push(earth); // add to our list of spheres to rotate

  const material2 = new THREE.MeshBasicMaterial({
    map: loader.load("sun.jpg"),
  });

  const sphere2 = new THREE.Mesh(geometry, material2);
  scene.add(sphere2);
  spheres.push(sphere2); // add to our list of spheres to rotate

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;
    t = t + 0.01;
    x++;

    document.onkeypress = function (evt) {
      evt = evt || window.event;
      var charCode = evt.keyCode || evt.which;
      var charStr = String.fromCharCode(charCode);
      switch (charStr) {
        case "w":
          if(velZ < speed){
            velZ++;
          }
          break;
        case "s":
          if(velZ > -speed){
            velZ--;
          }
          break;
        case "a":
          if(velX < speed){
            velX++;
          }
          break;
        case "d":
          if(velX > -speed){
            velX--;
          }
          break;
        case "z":
          if(velY < speed){
            velY++;
          }
          break;
        case "x":
          if(velY > -speed){
            velY--;
          }
          break;
        case "q":
          camera.rotation.y = camera.rotation.y + 0.02;
          break;
        case "e":
          camera.rotation.y = camera.rotation.y - 0.02;
          break;
        case "r":
          camera.rotation.x = camera.rotation.x + 0.02;
          break;
        case "f":
          camera.rotation.x = camera.rotation.x - 0.02;
          break;
        case "c":
          camera.rotation.z = camera.rotation.z + 0.02;
          break;
        case "v":
          camera.rotation.z = camera.rotation.z - 0.02;
          break;
      }
    };

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    spheres.forEach((sphere, ndx) => {
      const speed = 0.2 + ndx * 0.1;
      const rot = time * speed;
      // sphere.rotation.x = rot;
      sphere.rotation.y = rot;
    });

    
    velX *= friction;
    velY *= friction;
    velZ *= friction;


    var thisLoop = new Date();
    var fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;

    var div = document.getElementById('fpsCounter');
    div.innerHTML = Math.round(fps);

    camera.position.x = camera.position.x - velX;
    camera.position.y = camera.position.y - velY;
    camera.position.z = camera.position.z - velZ;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
