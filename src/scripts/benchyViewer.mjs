// I had to look up how to do a lot of this, and after I figured it out, it took a while for me to get everything refined.

import * as THREE from "https://esm.sh/three@0.158.0";
import { GLTFLoader } from "https://esm.sh/three@0.158.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://esm.sh/three@0.158.0/examples/jsm/controls/OrbitControls.js";


export function initBenchyViewer(containerId, modelUrl) {
  const container = document.getElementById(containerId);
  container.style.position = 'relative';

  // Scene, camera, renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Lighting
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, -10, 0);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  camera.position.set(0, 13, 37);

  // Load Model
  const loader = new GLTFLoader();
    loader.load(
    modelUrl,
    function (gltf) {
        const model = gltf.scene;

        model.position.y = -25; // adjust for default hight position

        scene.add(model);
        animate();
    },
    undefined,
    function (error) {
        console.error('Error loading model:', error);
    }
    );

  // Animate
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    // This is used to test the right angle.
    // console.log(`camera.position.set(${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)})`);
  }

  // Handle resizing
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}
