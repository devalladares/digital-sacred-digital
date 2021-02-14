// import './style.css'
import * as THREE from '../node_modules/three/build/three.module.js'
import * as dat from '../node_modules/three/examples/jsm/libs/dat.gui.module.js'
import {
  OrbitControls
} from '../node_modules/three/examples/jsm/controls/OrbitControls.js'
// import gsap from './gsap'

const gui = new dat.GUI({
  closed: false,
  width: 400
})

const loadingManager = new THREE.LoadingManager()

// loadingManager.onStart = () => {
//   console.log('onStart')
// }
// loadingManager.onLoaded = () => {
//   console.log('onLoaded')
// }
// loadingManager.onProgress = () => {
//   console.log('onProgress')
// }
// loadingManager.onError = () => {
//   console.log('onError')
// }

const textureloader = new THREE.TextureLoader(loadingManager)
const colortexture = textureloader.load(
  '/static/minecraft.png'
)
const alphaTexture = textureloader.load(
  '/static/alpha.jpg'
)

const ambientOcclusionTexture = textureloader.load(
  '/static/ambientOcclusion.jpg'
)
const heightTexture = textureloader.load(
  '/static/height.jpg'
)
const normalTexture = textureloader.load(
  '/static/normal.jpg'
)
const metalnessTexture = textureloader.load(
  '/static/metalness.jpg'
)
const roughnessTexture = textureloader.load(
  '/static/roughness.jpg'
)

// colortexture.repeat.x = 2
// colortexture.repeat.y = 2
// colortexture.wrapS = THREE.MirrorRepeatWrapping
// colortexture.wrapT = THREE.MirrorRepeatWrapping
//
// colortexture.offset.x = 0.5
// colortexture.rotation = 1

// colortexture.minFilter = THREE.NearestFilter

colortexture.generateMipMaps = false
colortexture.magFilter = THREE.NearestFilter

const parameters = {
  color: 0xff0000,
  spin: () => {
    // console.log('fuck')
    mesh.rotation.y += 0.1
  }
}



gui.addColor(parameters, 'color')
  .onChange(() => {
    material.color.set(parameters.color)
  })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
console.log(geometry.attributes.uv)
const material = new THREE.MeshBasicMaterial({
  // color: parameters.color,
  map: colortexture

})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * // debug
 */
gui.add(mesh.position, 'y').min(-3).max(3).step(0.001).name('FUCK')
gui.add(mesh.rotation, 'y').min(-3).max(3).step(0.001)
gui.add(mesh.rotation, 'z').min(-3).max(3).step(0.001)

gui.add(mesh.rotation, 'z').min(-3).max(3).step(0.001)


gui.add(mesh, 'visible')

gui.add(material, 'wireframe')

gui.add(colortexture.offset, 'x')
gui.add(colortexture.repeat, 'x')
gui.add(colortexture, 'rotation')

// gui.add(color, )



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

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
