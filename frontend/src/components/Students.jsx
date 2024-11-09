// frontend/src/components/Students.jsx
import React, { useEffect, useState } from 'react';
import { fetchStudents, addStudent, deleteStudent, updateStudent } from '../api';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({ first_name: '', last_name: '', dob: '', email: '', phone: '' });
    const [editStudent, setEditStudent] = useState(null);

    useEffect(() => {
        fetchStudents()
            .then(response => setStudents(response.data))
            .catch(error => console.error("Error fetching students:", error));
    }, []);

    const handleAddStudent = async () => {
        await addStudent(newStudent);
        setNewStudent({ first_name: '', last_name: '', dob: '', email: '', phone: '' });
        fetchStudents().then(response => setStudents(response.data));
    };

    const handleDeleteStudent = async (id) => {
        await deleteStudent(id);
        fetchStudents().then(response => setStudents(response.data));
    };

    const handleUpdateStudent = async (id) => {
        await updateStudent(id, editStudent);
        setEditStudent(null);
        fetchStudents().then(response => setStudents(response.data));
    };

    return (
        <div>
            <h2>Students</h2>
            
            {/* Add Student Form */}
            <div>
                <h3>Add Student</h3>
                <input
                    type="text"
                    value={newStudent.first_name}
                    placeholder="First Name"
                    onChange={(e) => setNewStudent({ ...newStudent, first_name: e.target.value })}
                />
                <input
                    type="text"
                    value={newStudent.last_name}
                    placeholder="Last Name"
                    onChange={(e) => setNewStudent({ ...newStudent, last_name: e.target.value })}
                />
                <input
                    type="date"
                    value={newStudent.dob}
                    placeholder="Date of Birth"
                    onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })}
                />
                <input
                    type="email"
                    value={newStudent.email}
                    placeholder="Email"
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                />
                <input
                    type="text"
                    value={newStudent.phone}
                    placeholder="Phone"
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                />
                <button onClick={handleAddStudent}>Add Student</button>
            </div>

            {/* Edit Student Form */}
            {editStudent && (
                <div>
                    <h3>Edit Student</h3>
                    <input
                        type="text"
                        value={editStudent.first_name}
                        onChange={(e) => setEditStudent({ ...editStudent, first_name: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editStudent.last_name}
                        onChange={(e) => setEditStudent({ ...editStudent, last_name: e.target.value })}
                    />
                    <input
                        type="date"
                        value={editStudent.dob}
                        onChange={(e) => setEditStudent({ ...editStudent, dob: e.target.value })}
                    />
                    <input
                        type="email"
                        value={editStudent.email}
                        onChange={(e) => setEditStudent({ ...editStudent, email: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editStudent.phone}
                        onChange={(e) => setEditStudent({ ...editStudent, phone: e.target.value })}
                    />
                    <button onClick={() => handleUpdateStudent(editStudent.student_id)}>Update Student</button>
                </div>
            )}

            {/* Student Table */}
            <table>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date of Birth</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.student_id}>
                            <td>{student.student_id}</td>
                            <td>{student.first_name}</td>
                            <td>{student.last_name}</td>
                            <td>{student.dob}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>
                                <button onClick={() => setEditStudent(student)}>Edit</button>
                                <button onClick={() => handleDeleteStudent(student.student_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Students;
