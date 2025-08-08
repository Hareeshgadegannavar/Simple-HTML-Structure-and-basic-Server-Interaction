const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Store form submissions (in a real app, you'd use a database)
let formSubmissions = [];

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Cognifyz Level 1 - Task 1',
        submissions: formSubmissions 
    });
});

// Handle form submissions
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.render('index', { 
            title: 'Cognifyz Level 1 - Task 1',
            submissions: formSubmissions,
            error: 'All fields are required!'
        });
    }
    
    const submission = {
        id: Date.now(),
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toLocaleString()
    };
    
    formSubmissions.push(submission);
    
    res.render('index', { 
        title: 'Cognifyz Level 1 - Task 1',
        submissions: formSubmissions,
        success: 'Form submitted successfully!'
    });
});

// API endpoint to get all submissions
app.get('/api/submissions', (req, res) => {
    res.json(formSubmissions);
});

// API endpoint to add new submission
app.post('/api/submissions', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required!' });
    }
    
    const submission = {
        id: Date.now(),
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toLocaleString()
    };
    
    formSubmissions.push(submission);
    res.status(201).json(submission);
});

// Clear all submissions
app.post('/clear', (req, res) => {
    formSubmissions = [];
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📝 Cognifyz Level 1 - Task 1: HTML Structure and Basic Server Interaction`);
}); 