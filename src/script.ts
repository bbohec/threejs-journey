import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ticker } from "./tick/ticker"
import {GUI} from "lil-gui"


const debug = new GUI()

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')


const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/1/px.jpg',
    '/textures/environmentMaps/1/nx.jpg',
    '/textures/environmentMaps/1/py.jpg',
    '/textures/environmentMaps/1/ny.jpg',
    '/textures/environmentMaps/1/pz.jpg',
    '/textures/environmentMaps/1/nz.jpg'
])


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
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


const ambiantLight1 = new THREE.AmbientLight("white" , 0.5)
scene.add(ambiantLight1)
const pointLight = new THREE.PointLight("white", 0.3)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)

/**
 * Object
 */

// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.wireframe = true
// material.color.set(0x66ff66)
// material.opacity = 0.5
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// MESH NORMAL MATERIAL COMMONLY USED TO DEBUG NORMALS
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// Simulate Light & Shadow without having light in the scene
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()

// Performante rendering with light and shadow effect
//const material = new THREE.MeshLambertMaterial()

// Less performant rendering but better lighting quality
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 1000
// material.specular.set(0xffffff)

// For cartoon cell shading effect
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.45
// material.roughness = 0.65
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.alphaMap = doorAlphaTexture
// material.transparent = true


const material = new THREE.MeshStandardMaterial()
 material.metalness = 0.914
 material.roughness = 0.0
 material.envMap = environmentMapTexture


const folder = debug.addFolder('material')
folder.add(material, 'metalness', 0, 1).step(0.0001)
folder.add(material,"roughness",0,1).step(0.0001)
folder.add(material,"aoMapIntensity",0,3).step(0.0001)
folder.add(material,"displacementScale",0,1).step(0.0001)

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material)
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1,100,100), material)
const torus = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.1, 64, 120), material)

scene.add(sphere,plane,torus)
sphere.position.x = -1.5
torus.position.x = 1.5

const meshs = [sphere,plane,torus]


// APPLY UV COOORDINATES TO MESH
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () =>
{
    const delta = clock.getElapsedTime()

    // Update objects
    meshs.forEach(mesh =>{
      mesh.rotation.y = 0.8*delta
      mesh.rotation.x = 0.3*delta
    })

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

}

ticker(tick,undefined,false)()