const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

const productsApiUrl = "https://www.idkweb.site/wp-json/wc/v3/products";
const username = "ck_3d16c949afed57021de723f818515b17c3881454";
const password = "cs_ad53cee6bd8b9b19130fcea30b16e1dc941cd80e";

app.get('/products', async (req, res) => {
    try {
      // For debugging, send a simple response and return immediately.
      // Uncomment the next line to use it:
      // return res.send('Hello, World!');
      
      // Fetch products from the external API.
      const response = await fetch(productsApiUrl, {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
        }
      });
      
      // Check if the request was successful
      if (!response.ok) {
        console.error("Failed to fetch products:", response.statusText);
        return res.status(500).send('Internal Server Error');
      }
  
      // Parse the response body as JSON
      const products = await response.json();
      
      // Send the products as a JSON response
      res.json(products);
      
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send('Internal Server Error');
    }
  });
  

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
