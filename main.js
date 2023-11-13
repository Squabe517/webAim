import * as THREE from 'three';

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

// Add Skybox
let skyboxImage = 'corona';
function createSkyBox(skyboxImage) {
    const materialArray = createMaterialArray(skyboxImage);
    const SkyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000);
    return new THREE.Mesh(SkyboxGeometry, materialArray);
}
const SkyBox = createSkyBox(skyboxImage);
scene.add(SkyBox);

// Create a Sphere
const sphereMesh = new THREE.SphereGeometry(1);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const sphere = new THREE.Mesh(sphereMesh, sphereMaterial);
scene.add(sphere);

camera.position.z = 5;

// Render the Scene
const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
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
