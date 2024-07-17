const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config')
const authRoutes = require('./routes/authRoute')
const userRoutes = require('./routes/userRoute')
const testRoutes = require('./routes/testRoute');
const cors = require('cors')

const app = express();

// MongoDB connection
mongoose.connect(config.mongoURL, {})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Port
const PORT = config.port || 5000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/test", testRoutes);

// Listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
