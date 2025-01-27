const { initializeSocket } = require('./socket');
const http = require('http');
const app = require('./app');
const cors = require('cors'); // Import the cors package
const port = process.env.PORT || 3000;

// Add CORS middleware to the app
app.use(cors()); // Allow requests from any origin

// Create the HTTP server
const server = http.createServer(app);

// Initialize socket with the server
initializeSocket(server);

// Start the server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
