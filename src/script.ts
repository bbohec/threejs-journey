import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ticker } from "./tick/ticker"
import gsap from 'gsap'

/**
 * Debug
 */
const gui = new dat.GUI({title: 'Debug'})


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


/**
 * Base
 */

// Canvas
const canvas:HTMLElement|null = document.querySelector('canvas.webgl')
if (!canvas) throw new Error('Canvas not found')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
gui
  .add(mesh.position, 'y')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('elevation')
gui.add(mesh,'visible').name('visible')
gui.add(material, 'wireframe').name('wireframe')
gui.addColor(material, 'color').name('color')

const parameters = {
  color:0xff0000,
  spin:() => {
    gsap.to(mesh.rotation, {
      y: mesh.rotation.y+10,
      duration: 1,
    })
  }
}

gui
  .addColor(parameters, 'color')
  .onChange(()=> {
    material.color.set(parameters.color)
  })
gui.add(parameters, 'spin').name('spin')

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
window.addEventListener('keydown', (e) =>{
  if (e.key === 'h') {
    gui._hidden ? gui.show() : gui.hide()
  }
})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    //antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
/**
 * Animate
 */

const tick = () =>
{
    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)
}

ticker(tick)()