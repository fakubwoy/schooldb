const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const studentsRoutes = require('./routes/students');
const teachersRoutes = require('./routes/teachers');
const coursesRoutes = require('./routes/courses');
const enrollmentsRoutes = require('./routes/enrollments');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/students', studentsRoutes);
app.use('/api/teachers', teachersRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/enrollments', enrollmentsRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
