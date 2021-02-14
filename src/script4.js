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

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// GUI
const gui = new dat.GUI({
  width: 300,
  name: 'Fish'
})


/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

let geometry = null
let material = null
let sphere = null
let group = null

/**
 * Params
 */
const params = {}
params.num = random(4, 40)
params.sphereRadius = random(0.001, 0.01)
params.rotationSpeed = 0.001
params.gap = random(1, 1.5)
// params.ringNumber = 5
params.ringNumber = 5
params.emptySpace = 1

generateMandala()

function generateMandala() {

  if (sphere !== null) {
    geometry.dispose()
    material.dispose()
    scene.remove(group)
  }

  group = new THREE.Group();
  material = new THREE.MeshBasicMaterial()

  for (let i = 1; i < params.ringNumber; i++) {

    createRings(i * params.gap + params.emptySpace)

  }

  scene.add(group)
}

/**
 * Rings
 */

function createRings(radiuser) {

  geometry = new THREE.SphereGeometry(random(0.001, 0.01), 32, 32)
  let num = Math.round(random(6, 20))
  let angle = (Math.PI * 2) / num

  for (let i = 0; i < num; i++) {

    let x = Math.sin(i * angle) * radiuser
    let y = Math.cos(i * angle) * radiuser

    sphere = new THREE.Mesh(geometry, material)
    sphere.position.set(x, y, 0)


    group.add(sphere)
  }
}


/**
 * GUI
 */
// gui.add(params, 'num').min(4).max(50).onChange(generateMandala)
// gui.add(params, 'sphereRadius').min(0.001).max(0.35).onChange(generateMandala)
// gui.add(params, 'rotationSpeed').min(-0.01).max(0.01)


var obj = {
  randomise: function() {

    generateMandala()

  }
};

gui.add(obj, 'randomise').name('!!! Randomise !!!');
gui.add(params, 'rotationSpeed').min(-0.005).max(0.005)
gui.add(params, 'gap').min(1).max(10).onFinishChange(generateMandala)
gui.add(params, 'ringNumber').min(1).max(5).onFinishChange(generateMandala)
gui.add(params, 'emptySpace').min(1).max(5).onFinishChange(generateMandala)





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


/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(32, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 40
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
