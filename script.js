document.addEventListener('DOMContentLoaded', () => {
    const scrapeBtn = document.getElementById('scrape-btn');
    const keywordInput = document.getElementById('keyword');
    const resultsContainer = document.getElementById('results-container');
  
    scrapeBtn.addEventListener('click', async () => {
      const keyword = keywordInput.value.trim();
      if (!keyword) return;
  
      try {
        const response = await fetch(`http://localhost:3001/api/scrape?keyword=${keyword}`);
        if (!response.ok) {
          throw new Error('Error retrieving data from the server');
        }
        const data = await response.json();
        displayResults(data);
      } catch (error) {
        console.error('Error:', error);
        resultsContainer.innerHTML = `<p class="error">${error.message}</p>`;
      }
    });
  
    function displayResults(data) {
      if (data.length === 0) {
        resultsContainer.innerHTML = '<p>No results found</p>';
        return;
      }
  
      resultsContainer.innerHTML = data.map(product => `
        <div class="product">
          <h2>${product.title}</h2>
          <p>Rating: ${product.rating}</p>
          <img src="${product.image}" alt="Product Image">
        </div>
      `).join('');
    }
  });