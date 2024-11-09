// backend/routes/enrollments.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all enrollments
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM Enrollment');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Add a new enrollment
router.post('/', async (req, res) => {
    const { student_id, course_id, enrollment_date } = req.body;
    try {
        const [result] = await pool.execute(
            'INSERT INTO Enrollment (student_id, course_id, enrollment_date) VALUES (?, ?, ?)',
            [student_id, course_id, enrollment_date]
        );
        res.json({ id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update enrollment
router.put('/:id', async (req, res) => {
    const { student_id, course_id, enrollment_date } = req.body;
    const { id } = req.params;
    try {
        await pool.execute(
            'UPDATE Enrollment SET student_id = ?, course_id = ?, enrollment_date = ? WHERE enrollment_id = ?',
            [student_id, course_id, enrollment_date, id]
        );
        res.send('Enrollment updated');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete enrollment
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.execute('DELETE FROM Enrollment WHERE enrollment_id = ?', [id]);
        res.send('Enrollment deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
