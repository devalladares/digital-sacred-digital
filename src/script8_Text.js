// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// GUI
const gui = new dat.GUI({
  hide: true
})
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#DFE7D8')




const instructions = document.querySelector('canvas.webgl');

instructions.addEventListener('click', function() {
  console.log('hey')
}, false);




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
// scene.add(base);
base.rotation.x = -Math.PI * 0.5
base.position.y = -9



/////////////////////////////////////////////////////////

const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const matcapTexture = textureLoader.load('../textures/matcaps/8.png')
const gradientTexture = textureLoader.load('../textures/gradients/5.jpg')

const envMapTexture = cubeTextureLoader.load([
  '../textures/env/1/px.jpg',
  '../textures/env/1/nx.jpg',
  '../textures/env/1/py.jpg',
  '../textures/env/1/ny.jpg',
  '../textures/env/1/px.jpg',
  '../textures/env/1/nz.jpg',
])

/////////////////////////////////////////////////////////



let fontLoader = new THREE.FontLoader()
let textGeometry = null
let text = null
let textMaterial = null

updateFont()


function updateFont() {

  if (textGeometry != null) {
    textGeometry.dispose()
    textMaterial.dispose()
    scene.remove(text)
  }

  fontLoader.load(
    '../static/fonts/editorial.json',
    (font) => {
      // console.log('fontloaded')
      textGeometry = new THREE.TextGeometry(
        params.textField, {
          font: font,
          size: 5,
          height: 0.2,
          curveSegment: 1,
          bevelEnabled: false,
          bevelThickness: 0.01,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegment: 3
        }
      )
      textGeometry.center()

      textMaterial = new THREE.MeshBasicMaterial()
      text = new THREE.Mesh(textGeometry, textMaterial)
      scene.add(text)

      text.position.z = -20
    }
  )
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
// params.num = random(10, 100)
// params.sphereRadius = random(0.0001, 0.1)
params.rotationSpeed = 0.001
// params.gap = random(1, 1.5)
params.gap = 1.2
// params.ringNumber = 5
params.ringNumber = 8
params.emptySpace = .5
params.hide = false
params.textField = "Digital Sacred"

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

    createRings(i * params.gap + params.emptySpace, -i)

  }

  scene.add(group)
}

/**
 * Rings
 */

function createRings(radiuser, distance) {

  geometry = new THREE.SphereGeometry(random(0.01, 0.5), 32, 32)
  // shapeRandomiser()
  let num = Math.round(random(8, 100))
  let angle = (Math.PI * 2) / num

  for (let i = 0; i < num; i++) {

    let x = Math.sin(i * angle) * radiuser
    let y = Math.cos(i * angle) * radiuser

    sphere = new THREE.Mesh(geometry, material2)
    // sphere.position.set(x, y, i * 0.1)
    sphere.position.set(x, y, distance)

    group.add(sphere)
    sphere.castShadow = true
    sphere.receiveShadow = true

  }
}


/**
 * GUI
 */

var about = {
  about: function() {
    // generateMandala()
  }
};
gui.add(about, 'about').name('About');


var obj = {
  randomise: function() {
    generateMandala()
  }
};

// Mandala
var mandala = gui.addFolder('Mandala');
mandala.add(obj, 'randomise').name('Randomise');
mandala.add(params, 'rotationSpeed').min(-0.005).max(0.005).name('Rotation Speed')
mandala.add(params, 'gap').min(0.01).max(5).onFinishChange(generateMandala).name('Gap')
mandala.add(params, 'ringNumber').min(1).max(12).step(1).onFinishChange(generateMandala).name('Number of Rings')
mandala.add(params, 'emptySpace').min(1).max(5).onFinishChange(generateMandala).name('Centre Space')

// Text
var textFolder = gui.addFolder('Text');
textFolder.add(params, "textField").onFinishChange(function(value) {
  updateFont(value)
});



// Lights
var lightControls = gui.addFolder('Lights');
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

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

// import './style.css'
import * as THREE from '../node_modules/three/build/three.module.js'
import * as dat from '../node_modules/three/examples/jsm/libs/dat.gui.module.js'
import {
  OrbitControls
} from '../node_modules/three/examples/jsm/controls/OrbitControls.js'
import {
  Water
} from '../node_modules/three/examples/jsm/objects/Water.js';
import {
  GLTFLoader
} from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import {
  RGBELoader
} from '../node_modules/three/examples/jsm/loaders/RGBELoader.js';
import {
  RoughnessMipmapper
} from '../node_modules/three/examples/jsm/utils/RoughnessMipmapper.js';
// import {
//   createWater
// } from './src/components/water.js';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random1(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}
