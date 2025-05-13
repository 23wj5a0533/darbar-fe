const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello from your first Node.js backend!');
});

app.get('/about', (req, res) => {
  res.send('This is the About page.');
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/contact', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).send('Name and email are required.');
  }

  const message = `Name: ${name}, Email: ${email}\n`;
  fs.appendFile('submissions.txt', message, (err) => {
    if (err) return res.status(500).send('Failed to save submission.');
    res.redirect('/thank-you');
  });
});

app.get('/thank-you', (req, res) => {
  res.sendFile(path.join(__dirname, 'thank-you.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
