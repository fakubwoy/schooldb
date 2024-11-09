// backend/routes/api.js
const express = require('express');
const db = require('../config');
const router = express.Router();

router.get('/students', (req, res) => {
    db.query('SELECT * FROM Student', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.get('/teachers', (req, res) => {
    db.query('SELECT * FROM Teacher', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.get('/courses', (req, res) => {
    db.query('SELECT * FROM Course', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.get('/enrollments', (req, res) => {
    db.query('SELECT * FROM Enrollment', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

module.exports = router;
