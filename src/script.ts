import './style.css'
import * as THREE from 'three'
import { tick } from './tick/tick'
import  gsap from 'gsap'




// Canvas
const canvas = document.querySelector('canvas.webgl')
if (!canvas) throw new Error('Canvas not found')


// Scene
const scene = new THREE.Scene()

// Sizes
const sizes = {
    width: 800,
    height: 600
}
// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const onTick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mesh.rotation.y = elapsedTime;

    // Render
    renderer.render(scene, camera)
}
tick(onTick,false)()