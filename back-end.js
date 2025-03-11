const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());

// Parse JSON requests
app.use(bodyParser.json());

app.post('/proxy', async (req, res) => {
    const { question } = req.body; // Get the question from the request body
    const apiUrl = 'https://mtri4fosrcw3ekig6xubcjuhpe0lyndj.lambda-url.us-east-1.on.aws/'; // The API URL of Lambda function, which was given as query url in cdk deploy step.

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });

        const data = await response.json();
        res.json(data); // Send the response back to the frontend
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
