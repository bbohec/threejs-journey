import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ticker } from "./tick/ticker"
import gsap from 'gsap'

/**
 * Textures
 */
const baseUrl = import.meta.url
const loadingManager = new THREE.LoadingManager(
    () => { console.log('All resources loaded') },
    (url, loaded, total) => { console.log(`${loaded/total*100}%`) },
    (url) => { console.log(`ERROR loading ${url}`) }
)
const textureLoader = new THREE.TextureLoader(loadingManager)
// const alphaTexture = textureLoader.load(new URL('/textures/door/alpha.jpg', baseUrl).href)
// const ambientOcclusionTexture = textureLoader.load(new URL('/textures/door/ambientOcclusion.jpg', baseUrl).href)
const colorTexture = textureLoader.load(new URL('/textures/minecraft.png', baseUrl).href)
// const heightTexture = textureLoader.load(new URL('/textures/door/height.jpg', baseUrl).href)
// const metalnessTexture = textureLoader.load(new URL('/textures/door/metalness.jpg', baseUrl).href)
// const normalTexture = textureLoader.load(new URL('/textures/door/normal.jpg', baseUrl).href)
// const roughnessTexture = textureLoader.load(new URL('/textures/door/roughness.jpg', baseUrl).href)

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI / 4
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5
colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

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
const material = new THREE.MeshBasicMaterial({ map: colorTexture , color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)




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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
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