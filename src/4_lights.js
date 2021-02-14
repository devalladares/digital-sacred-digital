// import './style.css'
import * as THREE from '../node_modules/three/build/three.module.js'
import * as dat from '../node_modules/three/examples/jsm/libs/dat.gui.module.js'
import {
  OrbitControls
} from '../node_modules/three/examples/jsm/controls/OrbitControls.js'
import {
  RectAreaLightHelper
} from '../node_modules/three/examples/jsm/helpers/RectAreaLightHelper.js'
console.log(RectAreaLightHelper)



/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color('green')
ambientLight.intensity = (0.9)


const dirLight = new THREE.DirectionalLight()
const dirLightH = new THREE.DirectionalLightHelper(dirLight,0.5)
dirLight.color = new THREE.Color('red')
dirLight.position.set(1, 1, 1)

const hemLight = new THREE.HemisphereLight('blue', 'red', 0.5)
const hemLightH = new THREE.HemisphereLightHelper(hemLight,0.1)

const pointLight = new THREE.PointLight('yellow', 0.5)
const pointLightH = new THREE.PointLightHelper(pointLight, 0.5)
pointLight.position.set(1, -0.5, 1)

const rectAreaLight = new THREE.RectAreaLight('purple', 2, 1, 1)
const rectAreaLightH = new RectAreaLightHelper(rectAreaLight)
rectAreaLight.position.set(1, -0.5, 1)
rectAreaLight.lookAt(new THREE.Vector3())

const spotlight = new THREE.SpotLight('pink',0.5,10,Math.PI*0.1,0.25,1)
spotlight.position.set(0,2,3)

scene.add(ambientLight)
scene.add(dirLight)
scene.add(dirLightH)
scene.add(hemLight)
scene.add(hemLightH)
scene.add(pointLight)
scene.add(pointLightH)
scene.add(rectAreaLight)
scene.add(rectAreaLightH)
scene.add(spotlight)

gui.add(ambientLight, 'intensity').min(0).max(1)
gui.add(hemLight, 'intensity').min(0).max(1)
gui.add(dirLight, 'intensity').min(0).max(1)
gui.add(pointLight, 'intensity').min(0).max(1)
gui.add(pointLight.position, 'x').min(-5).max(5)
gui.add(pointLight.position, 'y').min(-5).max(5)
gui.add(pointLight.position, 'z').min(-5).max(5)
gui.add(rectAreaLight, 'intensity').min(0).max(1)
gui.add(rectAreaLight, 'width').min(-5).max(5)
gui.add(rectAreaLight, 'height').min(-5).max(5)
gui.add(rectAreaLight.position, 'x').min(-5).max(5)
gui.add(rectAreaLight.position, 'y').min(-5).max(5)
gui.add(rectAreaLight.position, 'z').min(-5).max(5)
gui.add(spotlight, 'intensity').min(0).max(1)
gui.add(spotlight, 'distance').min(0).max(4)
gui.add(spotlight, 'angle').min(0).max(4)
gui.add(spotlight, 'penumbra').min(0).max(4)


//
// const pointLight = new THREE.PointLight(0xffffff, 0.5)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  material
)
sphere.position.x = -1.5

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.75, 0.75, 0.75),
  material
)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  material
)
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.65

scene.add(sphere, cube, torus, plane)

const fog = new THREE.Fog('yellow', 1, 15)
scene.fog = fog

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

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







/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime
  cube.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = 0.15 * elapsedTime
  cube.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
