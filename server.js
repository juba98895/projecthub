const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// STATIC FRONTEND FILES
// =======================
app.use(express.static(path.join(__dirname, "public")));

// =======================
// UPLOADS FOLDER (IMPORTANT)
// =======================
app.use("/uploads", express.static("uploads"));

// =======================
// ROUTES
// =======================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/project"));

// =======================
// HOME ROUTE
// =======================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// =======================
// MONGODB CONNECTION
// =======================
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("🚀 ProjectHub Server Running");
    console.log(`🌍 http://localhost:${PORT}`);
});