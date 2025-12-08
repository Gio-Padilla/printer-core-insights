import { loadHeaderFooter } from "./utils.mjs";
import { initBenchyViewer } from "./benchyViewer.mjs";

loadHeaderFooter();
// Initialize the 3D viewer
initBenchyViewer('viewer', '/models/benchy.glb'); // Path to your Benchy GLB file