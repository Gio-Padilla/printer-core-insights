import { loadHeaderFooter } from "./utils.mjs";
import DisplayCards from "./diplayCards.mjs";

loadHeaderFooter();
displayCardEvents();

function displayCardEvents() {
  const displayCards = new DisplayCards();
  displayCards.displayParts();

  const partsBtn = document.querySelector(".card-buttons .parts-btn");
  const filamentsBtn = document.querySelector(".card-buttons .filaments-btn");
  
  partsBtn.addEventListener("click", () => displayCards.displayParts());
  filamentsBtn.addEventListener("click", () => displayCards.displayFilaments());
}
