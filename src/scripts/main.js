import { loadHeaderFooter } from "./utils.mjs";
import { fetchPrintablesData } from "./ExternalServices.mjs";



displayModels();
loadHeaderFooter();


async function displayModels() {
  const models = await fetchPrintablesData();
  console.log("Loaded Thangs models:", models);
}