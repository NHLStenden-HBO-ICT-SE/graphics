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
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true
  });

  const cameraClass = new Camera(70, 16 / 9, 0.1, 1000, 50);
  const camera = cameraClass.createCamera();

  const scene = new THREE.Scene();

  const spheres = [];
  
  const geometry = new THREE.SphereGeometry(0.5, 32, 16);
  const loader = new THREE.TextureLoader();

  const sun = new Planets("sun" , 0, 0.2, 10, 0);
  sun.createPlanet(scene, geometry, loader, spheres);

  const mercury = new Planets("mercury", 4, 1.5, 0.4, 4);
  mercury.createPlanet(scene, geometry, loader, spheres);

  const venus = new Planets("venus", 1.6, 2, 0.95, 7.2);
  venus.createPlanet(scene, geometry, loader, spheres);

  const earth = new Planets("earth", 1, 365, 1, 10);
  earth.createPlanet(scene, geometry, loader, spheres);

  const mars = new Planets("mars", 0.53, 686, 0.53, 15);
  mars.createPlanet(scene, geometry, loader, spheres);

  const jupiter = new Planets("jupiter", 0.09, 10000, 2.5, 25);
  jupiter.createPlanet(scene, geometry, loader, spheres);

  const saturn = new Planets("saturn", 0.03, 24000, 2, 30);
  saturn.createPlanet(scene, geometry, loader, spheres);

  const uranus = new Planets("uranus", 0.01, 42000, 1.5, 40);
  uranus.createPlanet(scene, geometry, loader, spheres);

  const neptune = new Planets("neptune", 0.006, 92000, 1.25, 55);
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

    var fpsDiv = document.getElementById('fpsCounter');
    fpsDiv.innerHTML = "fps: " + Math.round(fps);

    var daysDiv = document.getElementById('daysCounter');
    daysDiv.innerHTML = "days:" + Math.round(time + difference);

    cameraClass.rotate(velX, velY, velZ);

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
