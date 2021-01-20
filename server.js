const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

//Routes
const authRouter = require('./routes/auth');
const educationRoute = require('./routes/education');
const updateProfile = require('./routes/updateProfile');

//Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/public', express.static('./public/uploads'));

app.use('/api/auth', authRouter);
app.use('/api/education', educationRoute);
app.use('/api/update-profile', updateProfile);

//DB Connection
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('DB Connected!')
);

//Root Route
app.get('/', (req, res) => {
  res.send('Worked!!!');
});

// App Listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server up and running on 5000'));
