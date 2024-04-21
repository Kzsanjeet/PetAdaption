const express = require("express");
const app = express();
const router = require('./route');
const connectDb = require('./dbConnection');
const cors = require("cors");

require("dotenv").config();

// Initialize database connection
connectDb();

// Use environment-defined port or fallback to 4001
const PORT = process.env.PORT || 4001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use('/', router);

// Route to serve homepage
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use("/uploads", express.static('uploads'))

// Updated error handling for app.listen
app.listen(PORT, (err) => {
    if (err) {
        console.error(`Failed to start server: ${err}`);
        process.exit(1); // Exit the process with an error code (1)
    }
    console.log(`Server is running on port ${PORT}`);
});
