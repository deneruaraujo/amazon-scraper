// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get references to HTML elements
  const scrapeBtn = document.getElementById('scrape-btn');
  const keywordInput = document.getElementById('keyword');
  const resultsContainer = document.getElementById('results-container');

  // Event listener for the button click
  scrapeBtn.addEventListener('click', async () => {
    // Get the keyword from the input field
    const keyword = keywordInput.value.trim();
    // If the keyword is empty, do nothing
    if (!keyword) return;

    try {
      // Fetch data from the backend using the keyword
      const response = await fetch(`http://localhost:3001/api/scrape?keyword=${keyword}`);
      // If the response is not OK, throw an error
      if (!response.ok) {
        throw new Error('Error retrieving data from the server');
      }
      // Parse the response as JSON
      const data = await response.json();
      // Display the results on the page
      displayResults(data);
    } catch (error) {
      // Handle errors by displaying an error message
      console.error('Error:', error);
      resultsContainer.innerHTML = `<p class="error">${error.message}</p>`;
    }
  });

  // Function to display the results on the page
  function displayResults(data) {
    // If no results are found, display a message
    if (data.length === 0) {
      resultsContainer.innerHTML = '<p>No results found</p>';
      return;
    }

    // Otherwise, display each product in a separate div
    resultsContainer.innerHTML = data.map(product => `
      <div class="product">
        <h2>${product.title}</h2>
        <p>Rating: ${product.rating}</p>
        <img src="${product.image}" alt="Product Image">
      </div>
    `).join('');
  }
});