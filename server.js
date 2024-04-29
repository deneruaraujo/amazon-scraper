const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors())

app.get('/api/scrape', async (req, res) => {
  const keyword = req.query.keyword;
  
  try {
    const response = await axios.get(`https://fakestoreapi.com/products`);
    const products = response.data;
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(keyword.toLowerCase()));

    const scrapedData = filteredProducts.map(product => ({
      title: product.title,
      rating: product.rating.rate,
      reviews: product.rating.count,
      description: product.description,
      image: product.image,
      price: product.price
    }));

    res.json(scrapedData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});