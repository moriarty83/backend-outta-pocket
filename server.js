const port = process.env.PORT || 4000;
const express = require('express');
require("dotenv").config({ path: "./.env"});

const app = express();
const cors = require('cors');
const routes = require('./routes');

// middleware - CORS
app.use(cors());
app.options('*', cors());

// middleware - JSON parsing
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${req.url}] ${req.method} - ${new Date().toLocaleTimeString()}`);
    next();
});

// Middleware - API Routes
app.use('/api/v1', routes.User);
app.use('/api/v1/videos', routes.Video);
app.use('/api/v1/comments', routes.Comment);
app.use('/api/v1/reactions', routes.Reaction);

// Listen
app.listen(port, () => console.log(`Server is running on port ${port}`));