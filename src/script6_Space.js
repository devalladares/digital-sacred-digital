// import './style.css'
import * as THREE from '../node_modules/three/build/three.module.js'
import * as dat from '../node_modules/three/examples/jsm/libs/dat.gui.module.js'
import {
  OrbitControls
} from '../node_modules/three/examples/jsm/controls/OrbitControls.js'

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random1(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// GUI
const gui = new dat.GUI({
  width: 200
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

const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color('green')
ambientLight.intensity = (0.9)
// ambientLight.castShadow = true



const dirLight = new THREE.DirectionalLight()
const dirLightH = new THREE.DirectionalLightHelper(dirLight, 0.5)
dirLight.color = new THREE.Color('red')
dirLight.position.set(1, 1, 1)
dirLight.castShadow = true


const material2 = new THREE.MeshStandardMaterial()

const hemLight = new THREE.HemisphereLight('blue', 'red', 0.5)
scene.add(ambientLight)
scene.add(dirLight)
scene.add(hemLight)
dirLight.hemLight = true



const geometry3 = new THREE.CircleGeometry(30, 32);
const material3 = new THREE.MeshBasicMaterial({
  // color: '#e2eadd',
  color: '#DFE7D8'
});

const base = new THREE.Mesh(geometry3, material3);
scene.add(base);
base.rotation.x = -Math.PI * 0.5
base.position.y = -9




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
// params.num = random(10, 100)
// params.sphereRadius = random(0.0001, 0.1)
params.rotationSpeed = 0.001
// params.gap = random(1, 1.5)
params.gap = 1.2
// params.ringNumber = 5
params.ringNumber = 8
params.emptySpace = .25

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

  geometry = new THREE.SphereGeometry(random(0.01, 0.5), 32, 32)
  // shapeRandomiser()
  let num = Math.round(random(8, 100))
  let angle = (Math.PI * 2) / num

  for (let i = 0; i < num; i++) {

    let x = Math.sin(i * angle) * radiuser
    let y = Math.cos(i * angle) * radiuser

    sphere = new THREE.Mesh(geometry, material2)
    sphere.position.set(x, y, 0)

    group.add(sphere)
    sphere.castShadow = true
    sphere.receiveShadow = true

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

var mandala = gui.addFolder('Mandala Controls');
mandala.add(obj, 'randomise').name('Randomise');
mandala.add(params, 'rotationSpeed').min(-0.005).max(0.005).name('Rotation Speed')
mandala.add(params, 'gap').min(0.01).max(5).onFinishChange(generateMandala).name('Gap')
mandala.add(params, 'ringNumber').min(1).max(12).step(1).onFinishChange(generateMandala).name('Number of Rings')
mandala.add(params, 'emptySpace').min(1).max(5).onFinishChange(generateMandala).name('Centre Space')


var lightControls = gui.addFolder('Light Controls');

lightControls.add(ambientLight, 'intensity').min(0).max(1)
lightControls.add(hemLight, 'intensity').min(0).max(1)
lightControls.add(dirLight, 'intensity').min(0).max(1)





/**
 * Shape Randomiser
 */
function shapeRandomiser() {

  let randomiser = random(0, 5)

  if (randomiser < 2.5) {
    geometry = new THREE.SphereGeometry(random(0.01, 0.5), 32, 32)

  } else {

    let randommer = random(0.01, 0.5)
    geometry = new THREE.BoxGeometry(randommer, randommer, randommer)

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
const camera = new THREE.PerspectiveCamera(32, sizes.width / sizes.height, 0.1, 200)
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
renderer.setClearColor('#DFE7D8')

/////////////////////////////////////////////////////////


//shadows
renderer.shadowMap.enabled = false
renderer.shadowMap.type = THREE.PCFSoftShadowMap

group.castShadow = true
// doorlight.castShadow = true

base.receiveShadow = true

// base.shadow.mapSize.width = 256
// base.shadow.mapSize.height = 256
// base.shadow.camera.far = 7
// walls.receiveShadow = true

/////////////////////////////////////////////////////////

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
