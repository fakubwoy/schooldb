// backend/routes/teachers.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all teachers
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM Teacher');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Add a new teacher
router.post('/', async (req, res) => {
    const { first_name, last_name, email, phone } = req.body;
    try {
        const [result] = await pool.execute(
            'INSERT INTO Teacher (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)',
            [first_name, last_name, email, phone]
        );
        res.json({ id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Update teacher
router.put('/:id', async (req, res) => {
    const { first_name, last_name, email, phone } = req.body;
    const { id } = req.params;
    try {
        await pool.execute(
            'UPDATE Teacher SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE teacher_id = ?',
            [first_name, last_name, email, phone, id]
        );
        res.send('Teacher updated');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete teacher
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.execute('DELETE FROM Teacher WHERE teacher_id = ?', [id]);
        res.send('Teacher deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
