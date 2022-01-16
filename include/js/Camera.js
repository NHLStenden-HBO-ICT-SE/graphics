import * as THREE from '../../node_modules/three/build/three.module.js';

export default class Camera {
    constructor(fieldOfView, aspectRatio, near, far, z) {
        this.fieldOfView = fieldOfView;
        this.aspectRatio = aspectRatio;
        this.near = near;
        this.far = far;
        this.z = z;
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(this.fieldOfView, this.aspectRatio, this.near, this.far);
        this.camera.position.set(0, 0, this.z);
        return this.camera;
    }

    rotate(velX, velY, velZ) {
        this.camera.position.x = this.camera.position.x - velX;
        this.camera.position.y = this.camera.position.y - velY;
        this.camera.position.z = this.camera.position.z - velZ;
    }
}