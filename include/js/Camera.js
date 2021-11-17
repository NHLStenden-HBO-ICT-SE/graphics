import * as THREE from "/include/modules/three.module.js";

export default class Camera {

    testCamera;

    constructor(fieldOfView, aspectRatio, near, far,) {
        this.fieldOfView = fieldOfView;
        this.aspectRatio = aspectRatio;
        this.near = near;
        this.far = far;
    }

    createCamera() {
        this.testCamera = new THREE.PerspectiveCamera(this.fieldOfView, this.aspectRatio, this.near, this.far);
        this.testCamera.position.set(0, 0, 35);
    }

    test(velX, velY, velZ) {
        this.testCamera.position.x = this.testCamera.position.x - velX;
        this.testCamera.position.y = this.testCamera.position.y - velY;
        this.testCamera.position.z = this.testCamera.position.z - velZ;
    }
}