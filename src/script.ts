import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ticker } from "./tick/ticker"




// CURSOR
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5;
})



// Canvas
const canvas:HTMLElement|null = document.querySelector('canvas.webgl')
if (!canvas) throw new Error('Canvas not found')


// Scene
const scene = new THREE.Scene()

// Sizes
const sizes = {
    width: 800,
    height: 600
    //height: 800
}
// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

const verticalFov = 75
// be aware of z-fighting glitches
const near = 0.1 // very close
const far = 100 // quite far according to current meshs that are viewed
// Camera
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(verticalFov, aspectRatio, near ,far)
// const camera = new THREE.OrthographicCamera(
//     -1*aspectRatio,
//     1*aspectRatio,
//     1,
//     -1,
//     near,
//     far
// )
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)



// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
//const clock = new THREE.Clock()

const controls = new OrbitControls(camera, canvas)
// controls.target.y = 2
// controls.update()
controls.enableDamping = true

const onTick = () => {
    //const elapsedTime = clock.getElapsedTime()

    // // Update objects
    // mesh.rotation.y = elapsedTime;

    // // Update camera without builtin controls
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * Math.PI
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * Math.PI
    // camera.position.y = cursor.y * 5
    // camera.lookAt(mesh.position)
    controls.update()

    // Render
    renderer.render(scene, camera)
}
ticker(onTick,true)()