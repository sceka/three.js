// Find the latest version by visiting https://cdn.skypack.dev/three.

import * as THREE from "https://cdn.skypack.dev/three@0.126.1";
import * as dat from "dat.gui";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";
const gui = new dat.GUI();
const world = {
  plane: {
    width: 19,
    height: 19,
    widthSegments: 17,
    heightSegments: 17,
  },
};
gui.add(world.plane, "width", 1, 20).onChange(generatePlane);
gui.add(world.plane, "height", 1, 20).onChange(generatePlane);
gui.add(world.plane, "widthSegments", 1, 20).onChange(generatePlane);
gui.add(world.plane, "heightSegments", 1, 20).onChange(generatePlane);

function generatePlane() {
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
  );
  const { array } = planeMesh.geometry.attributes.position;

  for (let i = 0; i < array.length; i++) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i + 2] = z + Math.random();
  }
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

document.body.appendChild(renderer.domElement);
new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;

const planeGeometry = new THREE.PlaneGeometry(19, 19, 17, 17);
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);
const backlight = new THREE.DirectionalLight(0xffffff, 1);
backlight.position.set(0, 0, -1);
scene.add(backlight);

const mouse = {
  x: undefined,
  y: undefined,
};

addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
  console.log(mouse);
});
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
