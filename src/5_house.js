// import './style.css'
import * as THREE from '../node_modules/three/build/three.module.js'
import * as dat from '../node_modules/three/examples/jsm/libs/dat.gui.module.js'
import {
  OrbitControls
} from '../node_modules/three/examples/jsm/controls/OrbitControls.js'
// import {
//   RectAreaLightHelper
// } from '../node_modules/three/examples/jsm/helpers/RectAreaLightHelper.js'
// console.log(RectAreaLightHelper)


/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Fog
const fog = new THREE.Fog('yellow', 1, 15)
scene.fog = fog

const house = new THREE.Group()
scene.add(house)

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('../textures/house/door/color.jpg')
const doorAlphaTexture = textureLoader.load('../textures/house/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('../textures/house/door/height.jpg')
const doorNormalTexture = textureLoader.load('../textures/house/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('../textures/house/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('../textures/house/door/roughness.jpg')

// Bricks
const bricksColorTexture = textureLoader.load('../textures/house/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('../textures/house/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('../textures/house/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('../textures/house/bricks/roughness.jpg')

// Grass
const grassColorTexture = textureLoader.load('../textures/house/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('../textures/house/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('../textures/house/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('../textures/house/grass/roughness.jpg')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping




//Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    normalMap: bricksNormalTexture,
    aoMap: bricksAmbientOcclusionTexture,
    roughnessMap: bricksRoughnessTexture
  })
)
walls.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
)


walls.position.y = 2.5 / 2
house.add(walls)

//roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({
    color: 'brown'
  })
)
roof.position.y = walls.geometry.parameters.height + roof.geometry.parameters.height / 2
roof.rotation.y = Math.PI / 4
house.add(roof)

//door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 50, 50),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture
  })
)


door.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)

door.position.y = door.geometry.parameters.height / 2
door.position.z = 2 + 0.01
house.add(door)

//bush
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
  color: 'green'
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
house.add(bush1)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
house.add(bush2)
bush2.scale.set(0.5, 0.5, 0.5)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
house.add(bush3)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
house.add(bush4)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)

//boinks

const boinks = new THREE.Group()
scene.add(boinks)

const boinkGeometry = new THREE.TorusGeometry(.2, 0.1, 10, 50)
const boinkMaterial = new THREE.MeshStandardMaterial({
  color: 'pink'
})
let boink
let boinker = []

for (let i = 0; i < 50; i++) {

  const angle = Math.random() * Math.PI * 2
  const radius = 3 + Math.random() * 6
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius

  boink = new THREE.Mesh(boinkGeometry, boinkMaterial)
  boink.position.set(x, 1, z)
  boink.rotation.y = (Math.random() - 0.5) * Math.PI
  boinks.add(boink)
  boink.castShadow = true
  boinker.push(boink)
}




/**
 * House
 */
// Temporary sphere
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 32, 32),
//     new THREE.MeshStandardMaterial({ roughness: 0.7 })
// )
// sphere.position.y = 1
// scene.add(sphere)

// grasse
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture
  })
)

floor.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)


floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('yellow', 0.4)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

const hem = new THREE.HemisphereLight('purple', 'blue', 0.2)
scene.add(hem)

// Directional light
const moonLight = new THREE.DirectionalLight('yellow', 0.4)
moonLight.position.set(4, 5, -2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001)
scene.add(moonLight)

//doorlight

const doorlight = new THREE.PointLight('orange', 1, 7)
doorlight.position.set(0, 2.2, 2.7)
house.add(doorlight)

// Ghosts

const ghost1 = new THREE.PointLight('red', 2, 3)
scene.add(ghost1)
const ghost2 = new THREE.PointLight('blue', 2, 3)
scene.add(ghost2)
const ghost3 = new THREE.PointLight('white', 2, 3)
scene.add(ghost3)





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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
renderer.setClearColor('yellow')

//shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.castShadow = true
doorlight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true
walls.castShadow = true

floor.receiveShadow = true
walls.receiveShadow = true

doorlight.shadow.mapSize.width = 256
doorlight.shadow.mapSize.height = 256
doorlight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  //Ghosts
  const ghost1Angle = elapsedTime * 0.5
  ghost1.position.x = Math.cos(ghost1Angle) * 4
  ghost1.position.z = Math.sin(ghost1Angle) * 4
  ghost1.position.y = Math.sin(elapsedTime * 3)

  const ghost2Angle = -elapsedTime * 0.32
  ghost2.position.x = Math.cos(ghost2Angle) * 5
  ghost2.position.z = Math.sin(ghost2Angle) * 5
  ghost2.position.y = Math.sin(elapsedTime * 1) + Math.sin(elapsedTime * 2.5)

  const ghost3Angle = -elapsedTime * 0.18
  ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
  ghost3.position.z = Math.sin(ghost3Angle) * (5 + Math.sin(elapsedTime * 0.32))
  ghost3.position.y = Math.sin(elapsedTime * 3)

  // for (let kk of boinker.length) {
  //   boink.rotation.y += 0.1
  // }

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
