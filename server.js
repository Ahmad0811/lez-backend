const express = require('express');
const colors = require('colors');

const errorHandler = require('./middleware/error');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json('API is running');
});

app.use('/api/stores', require('./router/stores'));
app.use('/api/categories', require('./router/categories'));
app.use('/api/products', require('./router/products'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on port ${PORT}`.yellow);
  }
});
