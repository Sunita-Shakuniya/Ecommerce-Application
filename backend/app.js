// backend/app.js or server.js

const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const admin = require('firebase-admin');
require("dotenv").config();

const paymentRoutes = require("./routes/paymentRoutes");
const configRoutes = require('./routes/firebaseRoutes');

const app = express();


const corsOptions = {
  origin: 'http://localhost:5173', // or '*' for all origins (not recommended for production)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Use the payments route
//app.use("/api", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/config", configRoutes);  // Add this line
app.use("/api/", paymentRoutes);

// Example route to check Firebase connectivity
app.get('/test-firebase', async (req, res) => {
  try {
    const users = await auth.listUsers(); // Example Firebase Admin SDK usage
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to connect to Firebase' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Backend is running');
});

