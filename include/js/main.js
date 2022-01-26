import * as THREE from '../../node_modules/three/build/three.module.js';
import Planets from "/include/js/Planets.js";
import Camera from "/include/js/Camera.js";

/**
 * velocity from X
 * @type {number}
 */
var velX = 0;
/**
 * velocity from Y
 * @type {number}
 */
var velY = 0;
/**
 * velocity from Z
 * @type {number}
 */
var velZ = 0;

/**
 * speed for the rotation
 * @type {number}
 */
var speed = 2;
/**
 * friction for the rotation
 * @type {number}
 */
var friction = 0.20;

/**
 * check if the program is running
 * @type {boolean}
 */
var running = false;
/**
 * the time of how long the program is running
 * @type {number}
 */
var runningTime = 0;
/**
 * difference between the time and the running time
 * @type {number}
 */
var difference = 0;

/**
 * the main function of the program, runs when the program starts
 * @function main
 */
function main() {
  /**
   * time when the last started loop started
   * @type {number}
   */
  var lastLoop = new Date();

  /**
   * canvas where the scene is set on
   * @type {object}
   */
  const canvas = document.querySelector("#c");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  /**
   * The threejs renderer
   * @type {object}
   */
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true
  });

  const cameraClass = new Camera(70, 16 / 9, 0.1, 1000, 50);
  const camera = cameraClass.createCamera();

  const scene = new THREE.Scene();

  /**
   * The threejs pointlight
   * @type {object}
   */
  const light = new THREE.PointLight( 0xFF0000, 1, 100 );
  light.position.set(0, 0, 20);
  light.castShadow = true; 
  light.add()
  scene.add( light );

  light.shadow.mapSize.width = 512; 
  light.shadow.mapSize.height = 512; 
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 500; 

  //array with all the planets
  const spheres = [];
  
  /**
   * The threejs sphere geometry
   * @type {object}
   */
  const geometry = new THREE.SphereGeometry(0.5, 32, 16);

  /**
   * The threejs sphere texture loader
   * @type {object}
   */
  const loader = new THREE.TextureLoader();

  //creates all the planets and adds them to the scene
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

  /**
   * Renders the scene frame by frame
   * @param {number} time the real live time
   */
  function render(time) {
    time *= 0.001;
    
    /**
     * When specific keys are pressed moves or rotates the camera around the sun
     * @param {object} evt The onkeypress event
     */
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

    // Rotates the planets around the sun and rotating around the planet itself
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

    //Calculates and displays the FPS of the scene
    var thisLoop = new Date();
    var fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;
    var fpsDiv = document.getElementById('fpsCounter');
    fpsDiv.innerHTML = "fps: " + Math.round(fps);

    cameraClass.rotate(velX, velY, velZ);

    // Starts rendering the scene with the camera and the scene.
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();

alert("Welkom in ons zonnestelsel. Je kunt de applicatie starten met spatie, en er doorheen bewegen doormiddel van de toetsen: W,A,S,D. Roteren kan doormiddel van de toetsen: Q,E,R,F,C,V. Veel plezier!");