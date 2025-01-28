const awsServerlessExpress = require('aws-serverless-express');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const tasksRoutes = require('./routes/tasks');
const contactRoutes = require('./routes/contacts');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


// Routes
app.use('/api/tasks', tasksRoutes);
app.use('/api/contacts', contactRoutes);

// Create the server
const server = awsServerlessExpress.createServer(app);
// Lambda handler
exports.handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
};


// Start LOCAL server
//const PORT = 5000;
//app.listen(PORT, () => {
//  console.log(`Server running on port ${PORT}`);
//});
