
// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  updateCartNotification();
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

	// Get the current year
	const currentYear = new Date().getFullYear();

	// Get the last time the document was modified
	const lastModified = new Date(document.lastModified).toString();

	// Insert it into the HTML by ID
	document.getElementById("currentYear").textContent = currentYear;
	document.getElementById("lastModified").textContent = `Last Updated: ${lastModified}`;
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