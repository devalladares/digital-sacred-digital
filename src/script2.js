// import './style.css'
import * as THREE from '../node_modules/three/build/three.module.js'
import * as dat from '../node_modules/three/examples/jsm/libs/dat.gui.module.js'
import {
  OrbitControls
} from '../node_modules/three/examples/jsm/controls/OrbitControls.js'

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random(min, max) {
  return Math.random() * (max - min + 1) + min;
}

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

const params = {}
params.num = 20
params.sphereRadius = 0.25
params.rotationSpeed = 0.001

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


/**
 * Sphere
 */

let geometry = null
let material = null
let sphere = null
let group = null

function generateMandala() {

  if (sphere !== null) {
    geometry.dispose()
    material.dispose()
    scene.remove(group)
  }

  shapeRandomiser()
  material = new THREE.MeshBasicMaterial()
  group = new THREE.Group();

  let num = Math.round(params.num)
  let radius = 2
  let angle = (Math.PI * 2) / num

  for (let i = 0; i < params.num; i++) {

    let x = Math.sin(i * angle) * radius
    let y = Math.cos(i * angle) * radius

    sphere = new THREE.Mesh(geometry, material)
    sphere.position.set(x, y, 0)

    group.add(sphere)
  }
  scene.add(group)
}

let ring1 = generateMandala()

/**
 * GUI
 */
gui.add(params, 'num').min(4).max(50).onChange(generateMandala)
gui.add(params, 'sphereRadius').min(0.01).max(1).onChange(generateMandala)
gui.add(params, 'rotationSpeed').min(0).max(0.01)


var obj = {
  randomise: function() {
    gui.add(params, 'num').onChange(generateMandala).setValue(random(4, 50))

    console.log("hey")


  }
};

gui.add(obj, 'randomise');

/**
 * Shape Randomiser
 */
function shapeRandomiser() {

  let randomiser = random(0, 5)

  if (randomiser < 2.5) {

    geometry = new THREE.SphereGeometry(params.sphereRadius, 32, 32)

  } else {

    geometry = new THREE.BoxGeometry(params.sphereRadius, params.sphereRadius, params.sphereRadius)

  }

}





/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(32, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.autoRotate = true
controls.enablePan = false
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
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  group.rotation.z -= params.rotationSpeed


  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()

window.addEventListener('resize', () => {
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
