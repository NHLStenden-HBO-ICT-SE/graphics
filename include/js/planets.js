import * as THREE from '../../node_modules/three/build/three.module.js';

export default class Planets {

  group;
  object;

  constructor(name, positionSpeed, rotationSpeed, size, disSun) {
    this.name = name;
    this.positionSpeed = positionSpeed;
    this.rotationSpeed = rotationSpeed;
    this.size = size;
    this.disSun = disSun;
  }

  /**
   * 
   * @param {*} scene is the scene of the where all the planets are
   * @param {*} geometry 
   * @param {*} loader is the textureloader
   * @param {*} spheres are all the spheres
   */
  createPlanet(scene, geometry, loader, spheres) {
    this.group = new THREE.Group();
    this.object = new THREE.Mesh(geometry, this.createMaterial(loader));
    this.object.position.set(this.disSun, 0, 0);
    this.object.scale.setScalar(this.size);
    //shadow 
    this.object.castShadow = true;
    this.object.receiveShadow = true;

    //add object to the group
    this.group.add(this.object);
    scene.add(this.group);
    spheres.push(this);
  }

  /**
   * Creates a new material of a planet
   * @param {*} loader is the textureloader / image name
   * @returns returns the meshmaterial of the planet
   */
  createMaterial(loader) {
    return new THREE.MeshBasicMaterial({
      map: loader.load("/include/img/" + this.name + ".jpg"),
    });
  }

/**
 * 
 * @param {*} time 
 */
  rotate(time) {
    this.group.rotation.y = time * this.positionSpeed;
    this.object.rotation.y = time * this.rotationSpeed;
  }
}