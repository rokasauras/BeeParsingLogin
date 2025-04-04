const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// In-memory user store (for demo only)
const USERS = [{ email: "test@bees.com", password: "buzz123" }];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Received login:', email, password);
    const user = USERS.find(u => u.email === email && u.password === password);
    if (user) {
        return res.status(200).json({ message: 'Login successful', token: 'mock-token-123' });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
});

// Register route
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    console.log('Received registration:', name, email);
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    const exists = USERS.find(u => u.email === email);
    if (exists) {
        return res.status(409).json({ message: 'User already exists.' });
    }
    // Save the new user (in-memory only)
    USERS.push({ email, password });
    console.log('New user registered:', email);
    return res.status(201).json({ message: 'Registration successful!' });
});

// Start the server
app.listen(PORT, () => console.log(`🐝 Bee Parsing backend running at http://localhost:${PORT}`));
