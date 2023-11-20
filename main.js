import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


let FOV = 75;
let aspectRatio = window.innerWidth / window.innerHeight;

// Create a scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(FOV, aspectRatio, 0.1, 1000);
scene.background = new THREE.Color(0xffff00);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a Controller
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = true;
controls.minDistance = 700;
controls.maxDistance = 3000;

// Add Skybox
let skyboxImage = 'corona';
function createSkyBox(skyboxImage) {
    const materialArray = createMaterialArray(skyboxImage);
    const SkyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
    return new THREE.Mesh(SkyboxGeometry, materialArray);
}
const SkyBox = createSkyBox(skyboxImage);
scene.add(SkyBox);

// Render the Scene
const animate = function () {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};
animate();


// Utilities
function createPathStrings(fileName) {
    const basePath = 'textures/skybox/ulukai/';
    const baseName = fileName;
    const fileType = '.png';
    const sides = ['ft', 'bk', 'up', 'dn', 'rt', 'lf'];
    const pathStrings = sides.map(side => `${basePath}${baseName}_${side}${fileType}`);
    return pathStrings;
}
function createMaterialArray(image) {
    const skyboxImagepaths = createPathStrings(image);
    const materialArray = skyboxImagepaths.map(image => {
        let texture = new THREE.TextureLoader().load(image);
        return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    });
    return materialArray;
}
