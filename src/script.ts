import * as THREE from 'three';

const scene = new THREE.Scene();
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: "#ff0000" }));
scene.add(mesh);

const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height , 0.1, 1000);
camera.position.z = 3;
camera.position.x = 1;
camera.position.y = 1;
scene.add(camera);

const canvas = document.querySelector('.webgl');
if (!canvas) throw new Error('No canvas found');
const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);