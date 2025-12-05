// src/services/ExternalServices.mjs

export async function fetchPrintablesData() {
  try {
    const response = await fetch('/printer-core-insights/data/printables.json', {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Failed to load: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Error fetching printables.json:', err);
    return [];
  }
}