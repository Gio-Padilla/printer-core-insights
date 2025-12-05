export async function fetchThangsJSON() {
  // BASE_URL ensures GitHub Pages paths work
  const url = `${import.meta.env.BASE_URL}data/thangs.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch JSON: " + response.status);
    }
    const data = await response.json();

    // Thangs wraps search results in .data.models → adjust if needed
    return data.data?.models || data.models || data;
  } catch (error) {
    console.error("Error loading Thangs JSON:", error);
    return [];
  }
}