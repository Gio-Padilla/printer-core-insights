import { loadHeaderFooter } from "./utils.mjs";
import { loadDictionaryAndApplyTooltips } from "./dictionary.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadDictionaryAndApplyTooltips("./data/dictionary.json","add-dictionary");
loadHeaderFooter();

async function displayCards() {
  const displayLocation = document.querySelector(".cards");
  const services = new ExternalServices();
  const posts = await services.getRedditTopPosts();
  console.log(posts);
  displayLocation.innerHTML = "";
  posts.forEach(post => {
    const item = document.createElement("div");
    item.classList.add("card")
    item.innerHTML = `
      <img src="${post.preview}"  alt="Image" width="300">
      <a href="${post.link}" target="_blank">${post.title}</a>
      <div class="reddit-meta">
        👍 ${post.score} • by ${post.author}
      </div>
    `;
    displayLocation.appendChild(item);
  });
}





displayCards();