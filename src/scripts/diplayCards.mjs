import { getLocalStorage, setLocalStorage, showAlert, fetchJSON } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class DisplayCards {
  constructor() {
    this.mode = null; // "top10", "saved", "filaments", "parts"
  }

  // -----------------------------
  // SAVE / REMOVE
  // -----------------------------

  savePost(post) {
    const STORAGE_KEY = "saved-posts";
    let saved = getLocalStorage(STORAGE_KEY) || [];

    if (!saved.some(p => p.id === post.id)) {
      saved.push(post);
      setLocalStorage(STORAGE_KEY, saved);
      showAlert(`Saved: ${post.title}`);
    } else {
      showAlert(`Already saved: ${post.title}`);
    }
  }

  removePost(postId) {
    const STORAGE_KEY = "saved-posts";
    let saved = getLocalStorage(STORAGE_KEY) || [];

    const updated = saved.filter(p => p.id !== postId);
    setLocalStorage(STORAGE_KEY, updated);

    showAlert("Post removed");

    if (this.mode === "saved") {
      this.displaySavedCards();
    }
  }

  // -----------------------------
  // LOADING / DISPLAYING
  // -----------------------------

  async displayTop10Cards() {
    this.mode = "top10";
    const services = new ExternalServices();
    const posts = await services.getRedditTopPosts();
    this.renderCards(posts);
  }

  displaySavedCards() {
    this.mode = "saved";
    const saved = getLocalStorage("saved-posts") || [];
    this.renderCards(saved);
  }

  async displayParts() {
    this.mode = "parts";
    const partsJSON = await fetchJSON("/data/parts.json");
    this.renderCards(partsJSON);
  }

  // ⭐ NEW ⭐
  async displayFilaments() {
    this.mode = "filaments";
    const filamentsJSON = await fetchJSON("/data/filament.json");
    this.renderCards(filamentsJSON);
  }

  renderCards(cards, toElement = document.querySelector(".cards")) {
    toElement.innerHTML = "";

    if (!cards.length) {
      toElement.innerHTML = "<p>No Data To Display</p>";
      return;
    }

    cards.forEach(card => {
      toElement.appendChild(this.buildCard(card));
    });
  }

  // -----------------------------
  // CARD FACTORY
  // -----------------------------

  buildCard(card) {
    if (this.mode === "parts") return this.buildPartsCard(card);
    if (this.mode === "filaments") return this.buildFilamentCard(card); // ⭐ NEW ⭐
    return this.buildRedditCard(card);
  }

  // -----------------------------
  // PARTS CARD
  // -----------------------------

  buildPartsCard(card) {
    const item = document.createElement("div");
    item.classList.add("card");

    item.innerHTML = `
      <h3>${card.part}</h3>
      <img src="/images/parts/${card.image}" alt="${card.part}" width="300" loading="lazy">
      <p>${card.description}</p>
    `;

    return item;
  }

  // -----------------------------
  // ⭐ FILAMENT CARD ⭐
  // -----------------------------

  buildFilamentCard(card) {
    const item = document.createElement("div");
    item.classList.add("card");

    item.innerHTML = `
      <h3>${card.part}</h3>
      <img src="/images/filaments/${card.image}" alt="${card.part}" width="300" loading="lazy">
      <p>${card.description}</p>
    `;

    return item;
  }

  // -----------------------------
  // REDDIT CARD
  // -----------------------------

  buildRedditCard(card) {
    const item = document.createElement("div");
    item.classList.add("card");

    const showRemove = this.mode === "saved";

    item.innerHTML = `
      <img src="${card.image}" alt="Image" width="300" loading="lazy">
      <a href="${card.url}" target="_blank">${card.title}</a>
      <div class="reddit-meta">
        👍 ${card.score} • by ${card.author}
      </div>

      ${showRemove ? `<button class="remove-btn">Remove</button>` : ""}
    `;

    item.querySelector("img").addEventListener("click", () => {
      this.savePost(card);
    });

    if (showRemove) {
      item.querySelector(".remove-btn").addEventListener("click", () => {
        this.removePost(card.id);
      });
    }

    return item;
  }
}
