// backend/routes/courses.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all courses
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM Course');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Add a new course
router.post('/', async (req, res) => {
    const { course_name, teacher_id, credits } = req.body;
    try {
        const [result] = await pool.execute(
            'INSERT INTO Course (course_name, teacher_id, credits) VALUES (?, ?, ?)',
            [course_name, teacher_id, credits]
        );
        res.json({ id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update course
router.put('/:id', async (req, res) => {
    const { course_name, teacher_id, credits } = req.body;
    const { id } = req.params;
    try {
        await pool.execute(
            'UPDATE Course SET course_name = ?, teacher_id = ?, credits = ? WHERE course_id = ?',
            [course_name, teacher_id, credits, id]
        );
        res.send('Course updated');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete course
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.execute('DELETE FROM Course WHERE course_id = ?', [id]);
        res.send('Course deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
