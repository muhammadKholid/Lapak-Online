require('dotenv').config();
const express = require('express');
const cors = require('cors');

const router = require('./routers/index.js');
const errorHandler = require('./middlewares/errorHandlers');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Listening on port: ', port);
});
