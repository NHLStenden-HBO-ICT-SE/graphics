import * as THREE from '../../node_modules/three/build/three.module.js';

/** Class representing a Camera. */
export default class Camera {
    /**
     * Create a camera.
     * @param {number} fieldOfView - The field of view for the camera.
     * @param {number} aspectRatio - The aspect ratio for the camera.
     * @param {number} near - The near for the camera.
     * @param {number} far - The far for the camera.
     * @param {number} z - The z position for the camera
     * @class
     */
    constructor(fieldOfView, aspectRatio, near, far, z) {
        this.fieldOfView = fieldOfView;
        this.aspectRatio = aspectRatio;
        this.near = near;
        this.far = far;
        this.z = z;
    }

    /**
     * Create the perspective camera from treejs.
     * @return {object} The camera.
     */
    createCamera() {
        this.camera = new THREE.PerspectiveCamera(this.fieldOfView, this.aspectRatio, this.near, this.far);
        this.camera.position.set(0, 0, this.z);
        return this.camera;
    }

    /**
     * Rotate the camera with the given position.
     * @param velX - The X position for the camera.
     * @param velY - The Y position for the camera.
     * @param velZ - The Z position for the camera.
     */
    rotate(velX, velY, velZ) {
        this.camera.position.x = this.camera.position.x - velX;
        this.camera.position.y = this.camera.position.y - velY;
        this.camera.position.z = this.camera.position.z - velZ;
    }
}