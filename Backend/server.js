const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '12345', // Replace with your MySQL password
    database: 'survey_db' // Replace with your database name
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

// Route to handle form submission
app.post('/submit-survey', (req, res) => {
    const { name, email, feedback } = req.body;

    const query = `INSERT INTO responses (name, email, feedback) VALUES (?, ?, ?)`;
    db.query(query, [name, email, feedback], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving survey response');
        } else {
            console.log('Survey response saved:', result);
            res.status(200).send('Survey submitted successfully');
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

