// import './style.css'
import * as THREE from '../node_modules/three/build/three.module.js'
import * as dat from '../node_modules/three/examples/jsm/libs/dat.gui.module.js'
import {
  OrbitControls
} from '../node_modules/three/examples/jsm/controls/OrbitControls.js'
// import gsap from './gsap'
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')



// Scene
const scene = new THREE.Scene()


const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)


const doorColorTexture = textureLoader.load('../textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('../textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('../textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('../textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('../textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('../textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('../textures/door/roughness.jpg')

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

const gui = new dat.GUI()

const fontLoader = new THREE.FontLoader()

fontLoader.load(
  '../static/fonts/editorial.json',
  (font) => {
    console.log('fontloaded')

    const textGeometry = new THREE.TextGeometry(
      'FUCK', {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegment: 1,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegment: 1
      }
    )

    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //   -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
    //   -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
    //   -(textGeometry.boundingBox.max.z - 0.03) * 0.5
    //
    // )

    textGeometry.center()


    // const textMaterial = new THREE.MeshBasicMaterial()
    const textMaterial = new THREE.MeshMatcapMaterial()
    textMaterial.matcap = matcapTexture
    // textMaterial.wireframe = true
    const text = new THREE.Mesh(textGeometry, textMaterial)
    scene.add(text)
  }
)




/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const ambientLight = new THREE.AmbientLight('white', 0.5)
const pointLight = new THREE.PointLight('white', 0.5)
pointLight.position.x = 2
pointLight.position.y = 2

scene.add(ambientLight, pointLight)

// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color.set('#ff00ff')
// material.color = new THREE.Color('yellow')
// material.wireframe = true
// material.opacity = 0.5
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color('red')

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false


// const material = new THREE.MeshStandardMaterial()
// // material.metalness = 0.45
// // material.roughness = 0.65
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5,0.5)
// material.alphaMap = doorAlphaTexture
// material.transparent= true



const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.envMap = envMapTexture


gui.add(material, 'metalness')
  .min(0)
  .max(1)
  .step(0.0001)

gui.add(material, 'roughness')
  .min(0)
  .max(1)
  .step(0.0001)

gui.add(material, 'aoMapIntensity')
  .min(0).max(10)
gui.add(material, 'displacementScale')
  .min(0).max(10)


const torus = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64, 128), material
)

torus.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(
    torus.geometry.attributes.uv.array, 2
  ))

torus.position.x = -1.25

const sphere = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 64), material
)

sphere.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(
    sphere.geometry.attributes.uv.array, 2
  ))

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 100, 100), material
)

plane.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(
    plane.geometry.attributes.uv.array, 2
  ))

console.log()

sphere.position.x = 1.25

// scene.add(sphere, plane, torus)


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

  // Update controls
  controls.update()

  sphere.rotation.y = elapsedTime * 0.1
  torus.rotation.x = elapsedTime * 0.2
  plane.rotation.z = elapsedTime * 0.3

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
