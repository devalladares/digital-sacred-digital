const cameraDistance = 35

let instructions = document.getElementById("instructions");
let blocker = document.getElementById("blocker");
let info = document.getElementById("info");
let main = document.getElementById("main");
let animlogo = document.getElementById("animlogo");

const enterButton = document.getElementById("btn").addEventListener("click", hider);;
const enterButton2 = document.getElementById("btn2").addEventListener("click", hider);;

function hider() {

  instructions.style.display = 'none';
  blocker.style.display = 'none';
  info.style.display = 'none';
  main.style.display = 'none';


  animlogo.style.display = 'none';
  gui.show()
}

function shower() {

  instructions.style.display = 'box';
  blocker.style.display = 'block';
  info.style.display = 'block';
  main.style.display = 'block';
  main.style.display = '-webkit-box;';
  main.style.display = '-moz-box';
  main.style.display = 'box';


  animlogo.style.display = 'block';
  gui.hide()
}



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// GUI
const gui = new dat.GUI({
  // hide: true
})
gui.show()

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

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color('green')
ambientLight.intensity = (0.9)

const dirLight = new THREE.DirectionalLight()
const dirLightH = new THREE.DirectionalLightHelper(dirLight, 0.5)
dirLight.color = new THREE.Color('blue')
dirLight.position.set(1, 1, 1)
dirLight.castShadow = true

const material2 = new THREE.MeshStandardMaterial()

const hemLight = new THREE.HemisphereLight('blue', 'red', 0.5)
scene.add(ambientLight)
scene.add(dirLight)
scene.add(hemLight)
dirLight.hemLight = true

const geometry3 = new THREE.CircleGeometry(15, 32);
const material3 = new THREE.MeshBasicMaterial({
  // color: '#e2eadd',
  color: '#b2ded2'
});

const base = new THREE.Mesh(geometry3, material3);
base.rotation.x = -Math.PI * 0.5
base.position.y = -12
// scene.add(base);



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
let cubeGroup = null


/**
 * Params
 */
const params = {}
// params.num = random(10, 100)
// params.sphereRadius = random(0.0001, 0.1)
params.rotationSpeed = 0.001
// params.gap = random(1, 1.5)
params.gap = 1
params.spread = 1.5
// params.ringNumber = 5
params.ringNumber = 10
params.emptySpace = .5
params.hide = false
params.textField = "Digital Sacred"

generateMandala()

function generateMandala() {

  if (sphere !== null) {
    geometry.dispose()
    material.dispose()
    scene.remove(group)
    scene.remove(cubeGroup)
  }

  group = new THREE.Group();
  cubeGroup = new THREE.Object3D()
  material = new THREE.MeshBasicMaterial()


  for (let i = 1; i < params.ringNumber; i++) {

    createRings(i * params.gap + params.emptySpace, -i * params.spread, i)
  }

  outliner(params.ringNumber * params.gap + params.emptySpace, -params.ringNumber * params.spread)

  // group.add(torus);
  scene.add(group)
}

/**
 * Rings
 */
function createRings(radiuser, distance, index) {

  let randomiser = random(0, 8)

  if (randomiser < 2.5) {

    createSphere(radiuser, distance, index)

  } else if (randomiser > 2.5 && randomiser < 5) {

    createTorus(radiuser, distance, index)

  } else if (randomiser > 5) {

    createCubes(radiuser, distance, index)

  }

  // createCubes(radiuser, distance, index)

}


/**
 * Sphere
 */
function createSphere(radiuser, distance, index) {
  geometry = new THREE.SphereGeometry(random(0.05, 0.5), 32, 32)

  let num = Math.round(random(16, 80))
  let angle = (Math.PI * 2) / num

  for (let i = 0; i < num; i++) {

    let x = Math.sin(i * angle) * radiuser
    let y = Math.cos(i * angle) * radiuser

    sphere = new THREE.Mesh(geometry, material2)
    sphere.position.set(x, y, distance)

    group.add(sphere)
  }
}

/**
 * Torus
 */
function createTorus(radiuser, distance, index) {

  let torusWidth = random(0.05, 0.2)

  let torusGeometry = new THREE.TorusGeometry(radiuser, torusWidth, 16, 100);
  let torus = new THREE.Mesh(torusGeometry, material2);
  torus.position.set(0, 0, distance)

  torus.receiveShadow = true
  group.add(torus)
}



function createCubes(radiuser, distance, index) {

  let scaler = 0.5

  geometry = new THREE.BoxGeometry(scaler, scaler, scaler)

  let num = Math.round(random(16, 80))
  let angle = (Math.PI * 2) / num

  for (let i = 0; i < num; i++) {

    let x = Math.sin(i * angle) * radiuser
    let y = Math.cos(i * angle) * radiuser

    sphere = new THREE.Mesh(geometry, material2)
    sphere.position.set(x, y, distance)

    sphere.rotation.z = Math.sin(i * angle)
    sphere.rotation.x = Math.cos(i * angle)
    sphere.rotation.z = Math.cos(i * angle)

    cubeGroup.add(sphere)
    group.add(cubeGroup)
  }


}

function outliner(radiuser, distance) {

  let torusWidth = random(0.05, 0.2)

  let torusGeometry = new THREE.TorusGeometry(radiuser, torusWidth, 32, 100);
  let torus = new THREE.Mesh(torusGeometry, material2);
  torus.position.set(0, 0, distance)

  torus.receiveShadow = true
  group.add(torus)

}

/**
 * GUI
 */

var about = {
  about: function() {
    shower()
  }
};
var obj = {
  randomise: function() {
    generateMandala()
  }
};
gui.add(about, 'about').name('About');
gui.add(obj, 'randomise').name('Randomise');



// Mandala
var mandala = gui.addFolder('Mandala');
mandala.add(params, 'ringNumber').min(1).max(12).step(1).onFinishChange(generateMandala).name('Rings')
mandala.add(params, 'rotationSpeed').min(-0.005).max(0.005).name('Rotation Speed')
mandala.add(params, 'gap').min(0.01).max(5).onFinishChange(generateMandala).name('Gap')
mandala.add(params, 'emptySpace').min(0).max(5).onFinishChange(generateMandala).name('Centre')
mandala.add(params, 'spread').min(0).max(10).onFinishChange(generateMandala).name('Spread')

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

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////


/**
 * Camera
 */
// Base camera
// const camera = new THREE.OrthographicCamera( sizes.width / - 2, sizes.width / 2, sizes.height / 2, sizes.height / - 2, 1, 1000);

const camera = new THREE.PerspectiveCamera(32, sizes.width / sizes.height, 0.1, 200)
camera.position.x = 0
camera.position.y = 0
camera.position.z = cameraDistance
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.autoRotate = true
controls.enablePan = false


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

  cubeGroup.children.forEach((element, i) => {

    const object = cubeGroup.children[i];

    //
    // object.rotation.y = Math.sin(elapsedTime) * .5 + Math.cos(elapsedTime) * .2
    // object.rotation.z = Math.sin(elapsedTime) * .75 + Math.sin(elapsedTime * .75) + 1
    object.rotation.x = Math.cos(elapsedTime) * .25 + Math.sin(elapsedTime * .85) * 2

    object.rotation.y += Math.sin(0.0001 * i)
    // object.rotation.z += Math.cos(0.00001)
    // object.rotation.z += Math.sin(elapsedTime)
    // object.rotation.x += Math.cos(elapsedTime)
    // object2.position.y = Math.sin(t + i) * 1.5



  })


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
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
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
