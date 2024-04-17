const mongoose = require("mongoose")
function connectDB() {
    try {
        if (!process.env.CONNECT_URI) {
            console.log("Please provide a connection string");
            process.exit(1);
        }
        console.log("Attempting to connect to MongoDB Atlas...");
        mongoose.connect(process.env.CONNECT_URI)
            .then(() => console.log("ConnecteD to database"))
            .catch((error) => {
                console.log("Error occurred while connect to database: " + error);
                process.exit(1);
            });
    } catch (err) {
        console.log("Error occurred while connecting to database: " + err);
    }
}

module.exports = connectDB