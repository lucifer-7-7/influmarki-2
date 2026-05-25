const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
let path = require('path');

// In-memory store for submitted emails
const submittedEmails = new Set();

// Set view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render("index")
});

app.post('/emails', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email required", status: "error" });
    }
    if (submittedEmails.has(email)) {
        return res.json({ message: "Email already exists", status: "exists" });
    }
    submittedEmails.add(email);
    res.json({ message: "Email added successfully", status: "success" });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});