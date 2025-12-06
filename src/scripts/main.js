import { loadHeaderFooter } from "./utils.mjs";
import { loadDictionaryAndApplyTooltips } from "./dictionary.mjs";
import DisplayCards from "./diplayCards.mjs";

loadDictionaryAndApplyTooltips("./data/dictionary.json", "add-dictionary");
loadHeaderFooter();
displayCardEvents();

function displayCardEvents() {
  const displayCards = new DisplayCards();
  displayCards.displayTop10Cards();

  const savedButton = document.querySelector(".card-buttons .saved");
  const button10 = document.querySelector(".card-buttons .top-10");

  // ❗ Pass the functions, do NOT call them
  savedButton.addEventListener("click", () => displayCards.displaySavedCards());
  button10.addEventListener("click", () => displayCards.displayTop10Cards());
}
