import * as THREE from 'three'
import { Euler, Quaternion, Vector3 } from 'three'

function clamp(num, min, max) {
  return num <= min
    ? min
    : num >= max
      ? max
      : num
}

interface SimpleRect {
  height: number
  width: number
}

const fits = (ref: SimpleRect, other: SimpleRect): boolean =>
  other.width <= ref.width && other.height <= ref.height

const getViewSimpleRect = (): SimpleRect => ({
  height: window.innerHeight,
  width: window.innerWidth,
})

const aspect = 16 / 9
const canvas = document.getElementById('canvas')

const renderer = new THREE.WebGL1Renderer({
  canvas
})

const onResize = () => {
  const v = getViewSimpleRect()
  const opt1: SimpleRect = {
    height: v.height,
    width: v.height * aspect
  }
  const opt2: SimpleRect = {
    height: v.width / aspect,
    width: v.width
  }
  const desired = fits(v, opt1) ? opt1 : opt2

  renderer.setSize(desired.width, desired.height);
}

onResize()

window.addEventListener('resize', onResize)

const camera = new THREE.PerspectiveCamera(45, aspect, 1, 500);
camera.position.set(0, 60, 190);
camera.lookAt(0, 70, 0);

const scene = new THREE.Scene();

const N = 20
const SPHERE_RADIUS = 3
type Sphere = THREE.Mesh<THREE.SphereGeometry, THREE.LineBasicMaterial>

const spheres: Array<Sphere> = new Array(N)
const geometry = new THREE.SphereGeometry(SPHERE_RADIUS, 10, 10)
for (let i = 0; i < N; i++) {
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff })
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(0, i * 7, 0)
  spheres[i] = sphere
  scene.add(sphere)
}


const clock = new THREE.Clock(true)

let pause = false
let et = 0

const fpsCounter = document.getElementById('fps-counter')
const updateFPS = (fps: number) => {
  fpsCounter.innerHTML = fps + ''
}

const animate = function () {
  if (!pause) {
    requestAnimationFrame(animate);
  }
  const dt = clock.getDelta()
  const fps = Math.floor(1/dt)
  
  et += dt
  for (let s of spheres) {
  }

  renderer.render(scene, camera);
  updateFPS(fps)
};

window.addEventListener('keydown', (evt) => {
  if (evt.key === ' ') {
    pause = !pause
    if (!pause) {
      animate();
      clock.start()
    } else {
      clock.stop()
    }
  }
})

animate()
