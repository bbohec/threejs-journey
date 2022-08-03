import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')
if (!canvas) throw new Error('Canvas not found')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

// POSITIONNING

// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1
mesh.position.set(0.7, -0.6, 1)
scene.add(mesh)
console.log("Vector size",mesh.position.length())
mesh.position.normalize() //>>> Update position to a vector of 1
console.log("Vector size",mesh.position.length())
mesh.position.set(0.7, -0.6, 1)


// SCALING
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.y = 0.5
mesh.scale.set(2,0.5,0.5)

// ROTATION >> AXIS ORDER IS IMPORTANT BEFORE APPLY ROTATION
mesh.rotation.reorder("YXZ")
// mesh.rotation.x = Math.PI * 0.25 
// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.z = 0
mesh.rotation.set(Math.PI * 0.25, Math.PI * 0.25, 0)
// INSTEAD USE QUATERNION but it's more mathematical (not learned yet)
//mesh.quaternion.set(...)





// GROUPING - A group is a 3D object
const group = new THREE.Group()
scene.add(group)
const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
//group.add(cube1)
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
cube2.position.x = -2
//group.add(cube2)
const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({ color: 0x0000ff }))
cube3.position.x = 2
//group.add(cube3)
group.add(cube1, cube2, cube3)
group.position.y = 1
group.scale.y = 2
group.rotation.y = 1






// Axes Helper - Make an 3D axes 3D object that can be added to a scene
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)


/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.y = 1
// camera.position.x = 1
scene.add(camera)
console.log("Distance between two vectors",mesh.position.distanceTo(camera.position))


// Look at can be applied to all kind of 3D Object
//camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)