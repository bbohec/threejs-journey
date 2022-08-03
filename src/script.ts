import './style.css'
import * as THREE from 'three'
import { tick } from './tick'
import  gsap from 'gsap'




// Canvas
const canvas = document.querySelector('canvas.webgl')
if (!canvas) throw new Error('Canvas not found')

// Scene
export const scene = new THREE.Scene()


// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
export const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
export const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// let time = Date.now()  WITHOUT CLOCK

//Clock
const clock = new THREE.Clock()


function circleRevolutionAnimation(object:THREE.Object3D, eslapedTime: number, speed:number) {
    object.position.y = Math.sin(eslapedTime*speed) // Trig UP and DOWN
    object.position.x = Math.cos(eslapedTime*speed )// Trig LEFT and RIGHT
}
function revolutionPerSecond(object:THREE.Object3D, eslapedTime: number,revolutionPerSecond:number) {
    object.rotation.y = eslapedTime * Math.PI * 2 * revolutionPerSecond
}


gsap.to(camera.position, {x:2,delay:1, duration:1})
gsap.to(camera.position, {x:-2,delay:2, duration:2})
gsap.to(camera.position, {x:0,delay:4, duration:1})

// const animateObjects = () => {
//     // WITHOUT CLOCK
//     // const currentTime = Date.now()
//     // const deltaTime = currentTime - time
//     // time = currentTime
//     // mesh.position.x += 0.001 * deltaTime
//     // mesh.position.y += 0.001 * deltaTime
//     // mesh.rotation.y += 0.001 * deltaTime

//     // WITH CLOCK
//     //const eslapedTime = clock.getElapsedTime()
//     //revolutionPerSecond(mesh,eslapedTime,1)
//     //circleRevolutionAnimation(mesh,eslapedTime,1) 
//     //circleRevolutionAnimation(camera,eslapedTime,5) 
//     //camera.lookAt(mesh.position)
// }

const onTick = () => {
    //animateObjects()
    camera.lookAt(mesh.position)
    renderer.render(scene, camera)
}
tick(onTick,true)()






