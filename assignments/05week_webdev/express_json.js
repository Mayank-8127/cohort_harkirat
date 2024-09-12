const express = require('express');
const app = express();

// Use express.json() middleware to parse JSON bodies
app.use(express.json());

// Define a POST route to handle JSON data
app.post('/data', (req, res) => {
  // Access the parsed JSON data from req.body
  const data = req.body;
  console.log('Received data:', data);

  // Send a response
  res.send('Data received');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});