const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Basic security headers
app.use((req, res, next) => {
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

// Endpoint to get prefill data
app.get('/api/prefill', (req, res) => {
  try {
    const filePath = path.join(__dirname, '../prefill_data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading prefill data:', err);
        return res.status(500).json({ error: 'Error reading prefill data' });
      }
      res.json(JSON.parse(data));
    });
  } catch (error) {
    console.error('Error in prefill endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to handle form submission
app.post('/api/submit', (req, res) => {
  try {
    const submissionData = {
      ...req.body,
      timestamp: new Date().toISOString(),
      id: Date.now() 
    };

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'serviceType', 'description'];
    const missingFields = requiredFields.filter(field => !submissionData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        missingFields 
      });
    }

    const logFilePath = path.join(__dirname, 'submissions.log');
    const logEntry = JSON.stringify(submissionData) + '\n';

    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) {
        console.error('Error writing submission to log:', err);
        return res.status(500).json({ error: 'Error logging submission' });
      }
      
      console.log('Submission logged:', submissionData);
      res.status(200).json({ 
        message: 'Submission received and logged successfully',
        submissionId: submissionData.id
      });
    });
  } catch (error) {
    console.error('Error in submit endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Digital Service Intake API'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/api/health`);
});


