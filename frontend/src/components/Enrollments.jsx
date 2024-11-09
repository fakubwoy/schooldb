// frontend/src/components/Enrollments.jsx
import React, { useEffect, useState } from 'react';
import { fetchEnrollments, addEnrollment, deleteEnrollment, updateEnrollment } from '../api';

const Enrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [newEnrollment, setNewEnrollment] = useState({ student_id: '', course_id: '', enrollment_date: '' });
    const [editEnrollment, setEditEnrollment] = useState(null);

    useEffect(() => {
        fetchEnrollments()
            .then(response => setEnrollments(response.data))
            .catch(error => console.error("Error fetching enrollments:", error));
    }, []);

    const handleAddEnrollment = async () => {
        await addEnrollment(newEnrollment);
        setNewEnrollment({ student_id: '', course_id: '', enrollment_date: '' });
        fetchEnrollments().then(response => setEnrollments(response.data));
    };

    const handleDeleteEnrollment = async (id) => {
        await deleteEnrollment(id);
        fetchEnrollments().then(response => setEnrollments(response.data));
    };

    const handleUpdateEnrollment = async (id) => {
        await updateEnrollment(id, editEnrollment);
        setEditEnrollment(null);
        fetchEnrollments().then(response => setEnrollments(response.data));
    };

    return (
        <div>
            <h2>Enrollments</h2>

            {/* Add Enrollment Form */}
            <div>
                <h3>Add Enrollment</h3>
                <input
                    type="text"
                    value={newEnrollment.student_id}
                    placeholder="Student ID"
                    onChange={(e) => setNewEnrollment({ ...newEnrollment, student_id: e.target.value })}
                />
                <input
                    type="text"
                    value={newEnrollment.course_id}
                    placeholder="Course ID"
                    onChange={(e) => setNewEnrollment({ ...newEnrollment, course_id: e.target.value })}
                />
                <input
                    type="date"
                    value={newEnrollment.enrollment_date}
                    placeholder="Enrollment Date"
                    onChange={(e) => setNewEnrollment({ ...newEnrollment, enrollment_date: e.target.value })}
                />
                <button onClick={handleAddEnrollment}>Add Enrollment</button>
            </div>

            {/* Edit Enrollment Form */}
            {editEnrollment && (
                <div>
                    <h3>Edit Enrollment</h3>
                    <input
                        type="text"
                        value={editEnrollment.student_id}
                        onChange={(e) => setEditEnrollment({ ...editEnrollment, student_id: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editEnrollment.course_id}
                        onChange={(e) => setEditEnrollment({ ...editEnrollment, course_id: e.target.value })}
                    />
                    <input
                        type="date"
                        value={editEnrollment.enrollment_date}
                        onChange={(e) => setEditEnrollment({ ...editEnrollment, enrollment_date: e.target.value })}
                    />
                    <button onClick={() => handleUpdateEnrollment(editEnrollment.enrollment_id)}>Update Enrollment</button>
                </div>
            )}

            {/* Enrollments Table */}
            <table>
                <thead>
                    <tr>
                        <th>Enrollment ID</th>
                        <th>Student ID</th>
                        <th>Course ID</th>
                        <th>Enrollment Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.map(enrollment => (
                        <tr key={enrollment.enrollment_id}>
                            <td>{enrollment.enrollment_id}</td>
                            <td>{enrollment.student_id}</td>
                            <td>{enrollment.course_id}</td>
                            <td>{enrollment.enrollment_date}</td>
                            <td>
                                <button onClick={() => setEditEnrollment(enrollment)}>Edit</button>
                                <button onClick={() => handleDeleteEnrollment(enrollment.enrollment_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Enrollments;
