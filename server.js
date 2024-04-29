const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

//CORS config
app.use(cors())

// Set up the Express app to handle incoming requests
app.get('/api/scrape', async (req, res) => {
  // Extract the keyword from the query parameter
  const keyword = req.query.keyword;
  
  try {
    // Fetch all products from the Fake Store API
    const response = await axios.get(`https://fakestoreapi.com/products`);
    // Extract the products from the response
    const products = response.data;
    // Filter products based on keyword match
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(keyword.toLowerCase()));

    // Format the scraped data for filtered products
    const scrapedData = filteredProducts.map(product => ({
      title: product.title,
      rating: product.rating.rate,
      reviews: product.rating.count,
      description: product.description,
      image: product.image,
      price: product.price
    }));

    // Send the scraped data as JSON response
    res.json(scrapedData);
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});