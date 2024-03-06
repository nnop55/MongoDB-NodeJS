const mongoose = require("mongoose")

const uri = "mongodb://localhost:27017/"


const connectDb = () => {
        mongoose.connect(uri)
        const db = mongoose.connection;
        db.once("open", () => console.log("Connected to MongoDB"));
        db.on("error", (err) => console.error("MongoDB connection error:", err));
}

module.exports = connectDb