const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware.js');
const connectDB = require('./config/db');

//Port declaration
const port = process.env.PORT || 5000;

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

//Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}
//Error handler
app.use(errorHandler);

app.listen(port || 5000, () =>
  console.log('Server listening on port http://localhost:' + port)
);
