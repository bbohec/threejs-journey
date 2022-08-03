import './style.css'
import * as THREE from 'three'
import { tick } from './tick'

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


const onTick = () => {
    renderer.render(scene, camera)
}
tick(onTick)()


