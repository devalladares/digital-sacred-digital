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

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const particleTexture = textureLoader.load('../textures/particles/5.png')

//Paticles on Sphere

// const particlesGeometry = new THREE.SphereGeometry(1, 32, 32)
// const particlesMaterial = new THREE.PointsMaterial({})
// particlesMaterial.size = 0.02
// particlesMaterial.sizeAttenuation = true
// // particlesMaterial.sizeAttenuation = false
//
// const particles = new THREE.Points(particlesGeometry,particlesMaterial)
// scene.add(particles)
// particles.position.set(-1,0,0)

// //TORUS Particls
// const particlesGeometry2 = new THREE.TorusGeometry(0.2, 1, 32, 100)
// const particlesMaterial2 = new THREE.PointsMaterial()
// particlesMaterial2.size = 0.02
// particlesMaterial2.sizeAttenuation = true
// // particlesMaterial.sizeAttenuation = false
//
// const particles2 = new THREE.Points(particlesGeometry2,particlesMaterial2)
// particles2.position.set(1,0,0)
// scene.add(particles2)

//custom Buffer Geoemtry

const particlesGeometry = new THREE.BufferGeometry()
const count = 20000

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) {

  positions[i] = (Math.random() - 0.5) * 10
  colors[i] = Math.random()

}

particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
)

particlesGeometry.setAttribute(
  'color',
  new THREE.BufferAttribute(colors, 3)
)

const particlesMaterial = new THREE.PointsMaterial({
  // color: 'pink'
  // map:particleTexture
})
particlesMaterial.size = 0.1
particlesMaterial.sizeAttenuation = true
// particlesMaterial.sizeAttenuation = false
particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
// particlesMaterial.alphaTest = 0.001
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false
particlesMaterial.blending = THREE.AdditiveBlending
particlesMaterial.vertexColors = true


// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)
particles.position.set(-1, 0, 0)

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
camera.position.z = 3
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

  // particles.rotation.y = elapsedTime * 0.01

  for (let i = 0; i < count; i++) {

    const i3 = i * 3

    const x = particlesGeometry.attributes.position.array[i3]
    particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)

  }

  particlesGeometry.attributes.position.needsUpdate = true

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
