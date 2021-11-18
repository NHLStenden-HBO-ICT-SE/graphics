import * as THREE from "/include/modules/three.module.js";
import Planets from "/include/js/Planets.js";
import Camera from "/include/js/Camera.js";

var velX = 0;
var velY = 0;
var velZ = 0;
 
var speed = 2;
var friction = 0.20;

var running = false;
var runningTime = 0;
var difference = 0;

function main() {
  var lastLoop = new Date();
  const canvas = document.querySelector("#c");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const renderer = new THREE.WebGLRenderer({ canvas });

  const cameraClass = new Camera(40, 16 / 9, 0.1, 1000);
  const camera = cameraClass.createCamera();

  const scene = new THREE.Scene();

  const spheres = [];
  
  const geometry = new THREE.SphereGeometry(0.51, 32, 32);
  const loader = new THREE.TextureLoader();

  const sun = new Planets("sun" , 0, 0.2, 10, 0);
  sun.createPlanet(scene, geometry, loader, spheres);

  const earth = new Planets("earth", 0.5, 1, 2, 10);
  earth.createPlanet(scene, geometry, loader, spheres);

  const mercury = new Planets("mercury", 0.3, 1, 1, 6);
  mercury.createPlanet(scene, geometry, loader, spheres);

  const venus = new Planets("venus", 0.7, 1, 1, 8);
  venus.createPlanet(scene, geometry, loader, spheres);

  const mars = new Planets("mars", 0.5, 1, 1, 10);
  mars.createPlanet(scene, geometry, loader, spheres);

  const jupiter = new Planets("jupiter", 0.8, 1, 1, 12);
  jupiter.createPlanet(scene, geometry, loader, spheres);

  const neptune = new Planets("neptune", 0.7, 1, 1, 16);
  neptune.createPlanet(scene, geometry, loader, spheres);
  
  function render(time) {
    time *= 0.001;
    
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
        case " ":
          if (running) {
            runningTime = time + difference;
            running = false;
          } else {
            running = true;
          }
          break;
      }
    };

    if (running) {
      spheres.forEach(planet => {
        planet.rotate(time + difference);
      });
    } else {
      difference = runningTime - time;
    }

    velX *= friction;
    velY *= friction;
    velZ *= friction;


    var thisLoop = new Date();
    var fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;

    var div = document.getElementById('fpsCounter');
    div.innerHTML = Math.round(fps);

    cameraClass.test(velX, velY, velZ);

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
