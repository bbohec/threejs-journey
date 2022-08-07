import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ticker } from "./tick/ticker"
declare global {
    interface Document {
      mozCancelFullScreen?: () => Promise<void>;
      msExitFullscreen?: () => Promise<void>;
      webkitExitFullscreen?: () => Promise<void>;
      mozFullScreenElement?: Element;
      msFullscreenElement?: Element;
      webkitFullscreenElement?: Element;
    }
  
    interface HTMLElement {
      msRequestFullscreen?: () => Promise<void>;
      mozRequestFullscreen?: () => Promise<void>;
      webkitRequestFullscreen?: () => Promise<void>;
    }
  }

// Canvas
const canvas:HTMLElement|null = document.querySelector('canvas.webgl')
if (!canvas) throw new Error('Canvas not found')


// Scene
const scene = new THREE.Scene()

// Object
//const geometry = new THREE.BoxGeometry(1, 1, 1,2,2,2)
const geometry = new THREE.BufferGeometry()
const count = 50
const positions = new Float32Array(count * 3*3)
for (let i = 0; i < count*3*3; i++) {
    positions[i] = Math.random() -0.5
}


const positionsAttribute = new THREE.BufferAttribute(positions, 3)

geometry.setAttribute('position', positionsAttribute)

const material = new THREE.MeshBasicMaterial({ color: 0xff0000 , wireframe: true})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth ,
    height: window.innerHeight,
}

window.addEventListener('resize', () =>{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate

const tick = () =>
{
    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)
}

ticker(tick)()