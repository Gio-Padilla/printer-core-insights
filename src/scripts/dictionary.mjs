export async function loadDictionaryAndApplyTooltips(jsonPath, cssClass = 'add-dictionary') {
  try {
    // Load dictionary
    const response = await fetch(jsonPath);
    const dictionaryData = await response.json();
    
    // Create lookup map
    const dictionary = new Map();
    dictionaryData.forEach(item => {
      dictionary.set(item.term.toLowerCase(), item.description);
    });
    
    // Get all terms for regex matching
    const terms = dictionaryData.map(item => item.term);
    
    // Process elements
    const elements = document.querySelectorAll(`.${cssClass}`);
    elements.forEach(element => {
      highlightTermsInElement(element, dictionary, terms);
    });
    
  } catch (error) {
    console.error('Error loading dictionary:', error);
  }
}

function highlightTermsInElement(element, dictionary, terms) {
  let html = element.innerHTML;
  
  // Create regex to find all dictionary terms
  const escapedTerms = terms.map(term => 
    term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  
  const pattern = new RegExp(`\\b(${escapedTerms.join('|')})\\b`, 'gi');
  
  // Replace terms with spans
  html = html.replace(pattern, (match) => {
    const term = match;
    const key = term.toLowerCase();
    
    if (dictionary.has(key)) {
      const description = dictionary.get(key);
      return `<span class="dictionary-term" title="${description}">${term}</span>`;
    }
    
    return match;
  });
  
  element.innerHTML = html;
}