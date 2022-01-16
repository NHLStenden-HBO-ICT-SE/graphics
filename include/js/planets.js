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

  createPlanet(scene, geometry, loader, spheres) {
    this.group = new THREE.Group();
    this.object = new THREE.Mesh(geometry, this.createMaterial(loader));
    this.object.position.set(this.disSun, 0, 0);
    this.object.scale.setScalar(this.size);
    //shadow 
    this.object.castShadow = true;
    this.object.receiveShadow = true;

    this.group.add(this.object);
    scene.add(this.group);
    spheres.push(this);
  }

  createMaterial(loader) {
    return new THREE.MeshBasicMaterial({
      map: loader.load("/include/img/" + this.name + ".jpg"),
    });
  }

  rotate(time) {
    this.group.rotation.y = time * this.positionSpeed;
    this.object.rotation.y = time * this.rotationSpeed;
  }
}