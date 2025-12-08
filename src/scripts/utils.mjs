
// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// Return template based off of path location
export async function loadTemplate(path) {
  const htmlFile = await fetch(path);
  const template = await htmlFile.text();
  return template;
}
//
export function renderWithTemplate(template, parentElement) {
  parentElement.innerHTML = template;
}

export async function loadHeaderFooter() {
	const headerElement = document.querySelector(".header-location");
  const footerElement = document.querySelector(".footer-location");

  const headerTemplate = await loadTemplate("../partials/header.html");
  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate("../partials/footer.html");
  renderWithTemplate(footerTemplate, footerElement);

	menuEvent();
	updatePageTitle()

	// Get the current year
	const currentYear = new Date().getFullYear();

	// Get the last time the document was modified
	const lastModified = new Date(document.lastModified).toString();

	// Insert it into the HTML by ID
	document.getElementById("currentYear").textContent = currentYear;
	document.getElementById("lastModified").textContent = `Last Updated: ${lastModified}`;
}

export function updatePageTitle() {
	const pageTitleElement = document.querySelector('.header-location h1');
	const path = window.location.pathname;

	if (path.includes('/facts/')) {
		pageTitleElement.textContent = "FDM Facts";
	} else if (path.includes('/contact/')) {
		pageTitleElement.textContent = "Contact Us";
	} else {
		pageTitleElement.textContent = "Home";
	}
}

export function menuEvent() {
	// responsive navigation
	const menuToggle = document.querySelector(".header-menu button");
	const navMenu = document.querySelector(".header-menu nav");

	menuToggle.addEventListener("click", function () {
		navMenu.classList.toggle("open");
		menuToggle.classList.toggle("open");
	});
}

export function showAlert(message, durationSeconds = 1) {
  // Create the alert container
  const alert = document.createElement("div");
  alert.classList.add("center-alert");
  alert.textContent = message;

  // Add to DOM
  document.body.appendChild(alert);

  // Trigger fade-in
  requestAnimationFrame(() => {
    alert.classList.add("visible");
  });

  // Remove after duration
  setTimeout(() => {
    alert.classList.remove("visible");

    // Remove from DOM after fade-out
    alert.addEventListener("transitionend", () => {
      alert.remove();
    }, { once: true });

  }, durationSeconds * 1000);
}

export async function fetchJSON(path) {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("JSON fetch error:", error);
    return null; // or return {} depending on your use case
  }
}
