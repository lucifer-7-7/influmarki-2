const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
let path = require('path');

let emailRouter = require('./routes/emailRouter');  

// Set view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
 // Or the correct path to your static files

app.set('views', path.join(__dirname, 'views'));
// Mongoose connection
mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.get('/', (req, res) => {
    res.render("index")
});

app.use("/emails", emailRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});