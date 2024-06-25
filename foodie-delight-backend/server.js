const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://shubhamlondhe63:shubhamlondhe63@cluster0.kah4t4w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cors());
app.use(bodyParser.json());

const restaurantRoutes = require('./routes/restaurants');
app.use('/restaurants', restaurantRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
