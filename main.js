import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js";

var velX = 0;
var velY = 0;
var velZ = 0;

var rotX = 0;
var rotY = 0;
var RotZ = 0;
 
var speed = 2;
var friction = 0.92;


function main() {
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

  const boxWidth = 1; //1
  const boxHeight = 1; //1
  const boxDepth = 1; //1
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  //canvas.width = 1000;
  //canvas.height = 800;

  const cubes = []; // just an array we can use to rotate the cubes
  const loader = new THREE.TextureLoader();

  // const material = new THREE.MeshBasicMaterial({
  //   map: loader.load('https://threejsfundamentals.org/threejs/resources/images/wall.jpg'),
  // });

  //Voor de memes.
  const material = new THREE.MeshBasicMaterial({
    map: loader.load("Wall.jpg"),
  });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cubes.push(cube); // add to our list of cubes to rotate

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
    //console.log(t);

    // document.addEventListener("keypress", function(event) {

    // });

    // if (t >= 1) {
    //   console.log(
    //     "camera pos :" +
    //       camera.position.x +
    //       " " +
    //       camera.position.y +
    //       " " +
    //       camera.position.z
    //   );w
    //   console.log(
    //     "camera rot :" +
    //       camera.rotation.x +
    //       " " +
    //       camera.rotation.y +
    //       " " +
    //       camera.rotation.z
    //   );
    //   console.log("FPS: " + x);
    //   x = 0;
    //   t = 0;
    // }

    document.onkeypress = function (evt) {
      evt = evt || window.event;
      var charCode = evt.keyCode || evt.which;
      var charStr = String.fromCharCode(charCode);
      //alert(charStr);
      switch (charStr) {
        case "w":
        if(velZ < speed){
          velZ++;
        }
          // camera.position.z = camera.position.z - 1;
          // //camera.translateZProperty().set(camera.getTranslateZ() + 10);
          // //alert(charStr + "test w" );
          break;
        case "s":
          if(velZ > -speed){
            velZ--;
          }
          // camera.position.z = camera.position.z + 1;
          // //camera.translateZProperty().set(camera.getTranslateZ() - 10);
          // //alert(charStr + "test s" );
          break;
        case "a":
          if(velX < speed){
            velX++;
          }
          // camera.position.x = camera.position.x - 1;
          // //camera.translateXProperty().set(camera.getTranslateX() + 10);
          // //alert(charStr + "test a" );
          break;
        case "d":
          if(velX > -speed){
            velX--;
          }
          // camera.position.x = camera.position.x + 1;
          // //camera.translateXProperty().set(camera.getTranslateX() - 10);
          // //alert(charStr + "test d" );
          break;
        case "z":
          if(velY < speed){
            velY++;
          }
          // camera.position.y = camera.position.y - 1;
          // //camera.translateYProperty().set(camera.getTranslateY() + 10);
          // //alert(charStr + "test y" );
          break;
        case "x":
          if(velY > -speed){
            velY--;
          }
          // camera.position.y = camera.position.y + 1;
          // //camera.translateYProperty().set(camera.getTranslateY() - 10);
          // //alert(charStr + "test x" );
          break;
        case "q":
          camera.rotation.y = camera.rotation.y + 0.02;
          //camera.translateYProperty().set(camera.getTranslateY() - 10);
          //alert(charStr + "test x" );
          break;
        case "e":
          camera.rotation.y = camera.rotation.y - 0.02;
          //camera.translateYProperty().set(camera.getTranslateY() - 10);
          //alert(charStr + "test x" );
          break;
        case "r":
          camera.rotation.x = camera.rotation.x + 0.02;
          //camera.translateYProperty().set(camera.getTranslateY() - 10);
          //alert(charStr + "test x" );
          break;
        case "f":
          camera.rotation.x = camera.rotation.x - 0.02;
          //camera.translateYProperty().set(camera.getTranslateY() - 10);
          //alert(charStr + "test x" );
          break;
        case "c":
          camera.rotation.z = camera.rotation.z + 0.02;
          //camera.translateYProperty().set(camera.getTranslateY() - 10);
          //alert(charStr + "test x" );
          break;
        case "v":
          camera.rotation.z = camera.rotation.z - 0.02;
          //camera.translateYProperty().set(camera.getTranslateY() - 10);
          //alert(charStr + "test x" );
          break;
      }
    };

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
      const speed = 0.2 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    
    velX *= friction;
    velY *= friction;
    velZ *= friction;


    console.log("FPS: " + velX);

    camera.position.x = camera.position.x - velX;
    camera.position.y = camera.position.y - velY;
    camera.position.z = camera.position.z - velZ;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
