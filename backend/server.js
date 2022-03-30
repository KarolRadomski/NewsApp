const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware.js');
const connectDB = require('./config/db');

const port = process.env.port || 5000;

//Connect to database
connectDB();

//Start server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routing
app.use('/api/news', require('./routes/newsRoutes'));
app.use('/api/users', require('./routes/adminRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

//Error handler
app.use(errorHandler);

app.listen(port, () =>
  console.log('Server listening on port http://localhost:' + port)
);
