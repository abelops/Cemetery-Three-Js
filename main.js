import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui'
// Debug 
const gui = new dat.GUI()
const scene = new THREE.Scene()


// Load texture
const textureLoader = new THREE.TextureLoader()
const doorColor = textureLoader.load('./static/textures/door/color.jpg')
const doorAlpha = textureLoader.load('./static/textures/door/alpha.jpg')
const doorAmbi = textureLoader.load('./static/textures/door/ambientOcclusion.jpg')
const doorH = textureLoader.load('./static/textures/door/height.jpg')
const doorNor = textureLoader.load('./static/textures/door/normal.jpg')
const doorMetal = textureLoader.load('./static/textures/door/metalness.jpg')
const doorRough = textureLoader.load('./static/textures/door/roughness.jpg')

const matCap = textureLoader.load('./static/textures/matcaps/4.png')
const grdient = textureLoader.load('./static/textures/gradients/3.png')



// Wall textures

const bricksColor = textureLoader.load('./static/textures/bricks/color.jpg')
const bricksAmbColor = textureLoader.load('./static/textures/bricks/ambientOcclusion.jpg')
const bricksNorColor = textureLoader.load('./static/textures/bricks/normal.jpg')
const bricksRougColor = textureLoader.load('./static/textures/bricks/roughness.jpg')

// ground Texture

const grassColor = textureLoader.load('./static/textures/grass/color.jpg')
const grassAmbColor = textureLoader.load('./static/textures/grass/ambientOcclusion.jpg')
const grassNorColor = textureLoader.load('./static/textures/grass/normal.jpg')
const grassRougColor = textureLoader.load('./static/textures/grass/roughness.jpg')

grassColor.repeat.set(8,8)
grassAmbColor.repeat.set(8,8)
grassNorColor.repeat.set(8,8)
grassRougColor.repeat.set(8,8)

grassColor.wrapS = THREE.RepeatWrapping
grassAmbColor.wrapS = THREE.RepeatWrapping
grassNorColor.wrapS = THREE.RepeatWrapping
grassRougColor.wrapS = THREE.RepeatWrapping

grassColor.wrapT = THREE.RepeatWrapping
grassAmbColor.wrapT = THREE.RepeatWrapping
grassNorColor.wrapT = THREE.RepeatWrapping
grassRougColor.wrapT = THREE.RepeatWrapping


// Ghosts
// const ghost1 = new THREE.PointLight('#ff00ff',2,3)
// scene.add(ghost1)

// const ghost2 = new THREE.PointLight('#00ffff',2,3)
// scene.add(ghost2)

// const ghost3 = new THREE.PointLight('#ffff00',2,3)
// scene.add(ghost3)


// Fog
const fog = new THREE.Fog("#262837", 1, 15)
scene.fog = fog

// House
// Group
const house = new THREE.Group()
scene.add(house)

// Lights
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.3)

gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

const doorLight = new THREE.PointLight('#ff7d46', 1,7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)


const directionalLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
directionalLight.position.set(4,5,-2)
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
gui.add(directionalLight.position,'x').min(-5).max(5).step(0.001)
gui.add(directionalLight.position,'y').min(-5).max(5).step(0.001)
gui.add(directionalLight.position,'z').min(-5).max(5).step(0.001)
scene.add(directionalLight)




// Walls
const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4,2.5,4),
    new THREE.MeshStandardMaterial({
        map: bricksColor,
        aoMap: bricksAmbColor,
        normalMap: bricksNorColor,
        roughnessMap: bricksRougColor
    })
    )
walls.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array,2)
     )
walls.position.y = 2.5/2
house.add(walls)


// Grass texture

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.5,1,4),
    new THREE.MeshStandardMaterial({color: '#b35f45'})
    )
roof.position.y= 3
roof.rotation.y= Math.PI/4
house.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2.2,2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColor,
        transparent: true,
        alphaMap: doorAlpha,
        aoMap: doorAmbi,
        displacementMap: doorH,
        displacementScale: 0.1,
        normalMap: doorNor,
        metalnessMap: doorMetal,
        roughnessMap: doorRough
    })
    )
door.position.z = 2.01
door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array,2)
     )
door.position.y = 1
house.add(door)

// Bush
const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({color: '#89c854'})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.position.set(0.8,0.2,2.2)
bush1.scale.set(0.5,0.5,0.5)
house.add(bush1)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.position.set(1.4,0.2,2.2)
bush2.scale.set(0.2,0.2,0.2)
house.add(bush2)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4,0.4,0.4)
bush3.position.set(-1.4,0.1,2.2)
house.add(bush3)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.3,0.3,0.3)
bush4.position.set(-1.4,0,2.5)
house.add(bush4)

// Graves
const graves  = new THREE.Group()
scene.add(graves)

const graveGeometry= new THREE.BoxBufferGeometry(0.6,0.8,0.2)
const graveMaterial = new THREE.MeshStandardMaterial({color: '#b2b6b1'})

for(var i=0; i < 50; i++){
    const angle = Math.random()*Math.PI * 2
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.y = 0.4
    const radius = 3 + Math.random() * 6
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    grave.castShadow= true
    grave.position.x = x
    grave.position.z = z
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    graves.add(grave)
}

// Floor
const planeGeometry = new THREE.PlaneBufferGeometry( 20, 20 );
const planeMaterial = new THREE.MeshStandardMaterial( {
    map: grassColor,
    aoMap: grassAmbColor,
    normalMap: grassNorColor,
    roughnessMap: grassRougColor,
    side: THREE.DoubleSide} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotation.x = Math.PI/2
plane.receiveShadow = true
plane.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(plane.geometry.attributes.uv.array,2)
     )
scene.add(plane)


// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);
camera.position.z= 10
scene.add(camera)

// Orbit control
const controls = new OrbitControls(camera, document.body)
controls.enableDamping = true
controls.enabled= true
const canvas = document.getElementsByClassName('canvas')[0]

// Shadow
doorLight.castShadow = true
directionalLight.castShadow = true
// ghost1.castShadow = true
// ghost2.castShadow = true
// ghost3.castShadow = true

bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
walls.castShadow = true
plane.receiveShadow = true


// Outer walls
const leftWall = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.3,3,20),
    new THREE.MeshStandardMaterial({
        map: bricksColor,
        aoMap: bricksAmbColor,
        normalMap: bricksNorColor,
        roughnessMap: bricksRougColor,
        side: THREE.DoubleSide
    })
    )
leftWall.position.set(-10,1.5,0)
scene.add(leftWall)

const rightWall = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.3,3,20),
    new THREE.MeshStandardMaterial({
        map: bricksColor,
        aoMap: bricksAmbColor,
        normalMap: bricksNorColor,
        roughnessMap: bricksRougColor,
        side: THREE.DoubleSide
    })
    )
rightWall.position.set(10,1.5,0)
scene.add(rightWall)


const frontWall = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.3,3,20.3),
    new THREE.MeshStandardMaterial({
        map: bricksColor,
        aoMap: bricksAmbColor,
        normalMap: bricksNorColor,
        roughnessMap: bricksRougColor,
        side: THREE.DoubleSide
    })
    )
frontWall.position.set(0,1.5,10)
frontWall.rotation.y = Math.PI/2
scene.add(frontWall)


const backWall = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.3,3,20.3),
    new THREE.MeshStandardMaterial({
        map: bricksColor,
        aoMap: bricksAmbColor,
        normalMap: bricksNorColor,
        roughnessMap: bricksRougColor,
        side: THREE.DoubleSide
    })
    )
backWall.position.set(0,1.5,-10)
backWall.rotation.y = Math.PI/2
scene.add(backWall)

// Corner lights
// const fl = new THREE.PointLight("#ffffff", 0.3)
// fl.position.set(10,4,10)
// scene.add(fl)

// Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.shadowMap.enabled = true
renderer.setClearColor('#262837')

window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth/ window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})
const axes = new THREE.AxesHelper(4)
scene.add(axes)


document.body.appendChild(renderer.domElement)
const clock = new THREE.Clock();
function animate(){
    let elapsedTime = clock.getElapsedTime();
    // ghost1.position.x = Math.cos(elapsedTime*0.5) * 4 
    // ghost1.position.y = Math.sin(elapsedTime*0.5) * 4 
    // ghost1.position.z = Math.sin(elapsedTime*0.5) * 4 
    // ghost1.position.y = Math.sin(elapsedTime*0.5) * 4 
    // ghost2.position.x = Math.cos(elapsedTime*0.2) * 4 
    // ghost2.position.y = Math.sin(elapsedTime*0.2) * 4 
    // ghost2.position.z = Math.sin(elapsedTime*0.2) * 4 
    // ghost2.position.y = Math.sin(elapsedTime*0.2) * 4 
    // ghost3.position.x = Math.cos(elapsedTime*0.7) * 4 
    // ghost3.position.y = Math.sin(elapsedTime*0.7) * 4 
    // ghost3.position.z = Math.sin(elapsedTime*0.7) * 4 
    // ghost3.position.y = Math.sin(elapsedTime*0.7) * 4 
    controls.update()
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()

