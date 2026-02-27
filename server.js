//importing the express frame work
const express = require('express'); 

//importing user-related routes from another file.
const userRoutes = require('./routes/userRoutes'); 

//importing a custom error handling middleware.
const errorHandler = require('./middleware/errorHandler');

//Creating an Express application.
const app = express(); 

//Setting the port number.
//process.env.PORT → used in production (like deployment).
//5000 → default port for local development.
const port = process.env.PORT || 5000;

//Middleware to parse JSON request body.
app.use(express.json());

//Middleware to parse form data.
app.use(express.urlencoded({ extended: false }));

//Mounting user routes.
app.use('/api/users', userRoutes);

// 404 catch-all - fallback middleware - If no route matches, this runs.
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Central error handler
app.use(errorHandler);

//makes the server start listening.
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});