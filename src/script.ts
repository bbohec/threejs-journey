import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ticker } from "./tick/ticker"
import {GUI} from "lil-gui"
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'

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


const baseUrl = new URL(import.meta.env.BASE_URL,import.meta.url )
const helvetikerRegularFontUrl =  `${baseUrl.href}fonts/helvetiker_regular.typeface.json`
const matCapTextureUrl = `${baseUrl.href}textures/matcaps/8.png` 

/**
 * Base
 */
// Canvas
const canvas:HTMLElement|null = document.querySelector('canvas.webgl')
if (!canvas) throw new Error('Canvas not found')

const debug = new GUI()





const fontLoader = new FontLoader()
fontLoader.load(helvetikerRegularFontUrl, font=> {
  const textGeometry = new TextGeometry(
    'Hello Three.js',{
      font,
      size:0.5,
      height: 0.2,
      curveSegments:10,
      bevelEnabled:true,
      bevelThickness:0.03,
      bevelSize:0.02,
      bevelOffset:0,
      bevelSegments:10
    }
  )
  // textGeometry.computeBoundingBox()
  // if(textGeometry.boundingBox)
  //   textGeometry.translate(
  //     (textGeometry.boundingBox?.max.x + textGeometry.boundingBox?.min.x)*-0.5,
  //     (textGeometry.boundingBox?.max.y + textGeometry.boundingBox?.min.y)*-0.5,
  //     (textGeometry.boundingBox?.max.z + textGeometry.boundingBox?.min.z)*-0.5,
  //   )
  //   textGeometry.computeBoundingBox()
  // console.log(textGeometry.boundingBox)
  textGeometry.center()
  const textMesh = new THREE.Mesh(textGeometry,matcapMaterial)
  scene.add(textMesh)
})




// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load(matCapTextureUrl)


/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
console.time("0")
const torusGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 20)
const matcapMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
for (let index = 0; index < 1000; index++) {
  const donut = new THREE.Mesh(torusGeometry, matcapMaterial)
  donut.position.set(
    (Math.random()-0.5)*50,
    (Math.random()-0.5)*50,
    (Math.random()-0.5)*50,
  )
  donut.rotation.set(
    Math.random()*Math.PI,
    Math.random()*Math.PI,
    0
  )
  const scale = Math.log(Math.random() * 3 )
  donut.scale.set(scale,scale,scale)
  scene.add(donut) 
}
console.timeEnd("0")


// scene.add(cube)
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)
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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () =>
{
    const delta = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

}

ticker(tick,undefined,false)()