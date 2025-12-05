import { loadHeaderFooter } from "./utils.mjs";
import { fetchThangsJSON } from "./ExternalServices.mjs";



displayModels();
loadHeaderFooter();


async function displayModels() {
  const models = await fetchThangsJSON();
  console.log("Loaded Thangs models:", models);
}