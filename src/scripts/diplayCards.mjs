import { getLocalStorage, setLocalStorage, showAlert } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class DisplayCards {

  savePost(post) {
    const STORAGE_KEY = "saved-posts";

    let saved = getLocalStorage(STORAGE_KEY) || [];

    // Avoid duplicates by Reddit ID
    if (!saved.some(p => p.id === post.id)) {
      saved.push(post);
      setLocalStorage(STORAGE_KEY, saved);
      showAlert(`Saved: ${post.title}`);
    } else {
      showAlert(`Already saved: ${post.title}`);
    }
  }

  async displayTop10Cards() {
    const services = new ExternalServices();
    const posts = await services.getRedditTopPosts();
    // console.log(posts);
    this.displayCards(posts);
  }

  displaySavedCards() {
    const STORAGE_KEY = "saved-posts";
    const saved = getLocalStorage(STORAGE_KEY) || [];
    this.displayCards(saved);
  }

  displayCards(cardsJSON, toElement = document.querySelector(".cards")) {
    toElement.innerHTML = "";

    // Correct check for empty array
    if (!cardsJSON.length) {
      toElement.innerHTML = "<p>No Data to Display</p>";
      return;
    }

    cardsJSON.forEach(card => {
      toElement.appendChild(this.returnCardHTML(card));
    });
  }

  returnCardHTML(cardJSON) {
    const item = document.createElement("div");
    item.classList.add("card");

    item.innerHTML = `
      <img src="${cardJSON.image}" alt="Image" width="300">
      <a href="${cardJSON.url}" target="_blank">${cardJSON.title}</a>
      <div class="reddit-meta">
        👍 ${cardJSON.score} • by ${cardJSON.author}
      </div>
    `;

    item.querySelector("img").addEventListener("click", () => {
      this.savePost(cardJSON);
    });

    return item;
  }
}
