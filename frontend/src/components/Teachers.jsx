// frontend/src/components/Teachers.jsx
import React, { useEffect, useState } from 'react';
import { fetchTeachers, addTeacher, deleteTeacher, updateTeacher } from '../api';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [newTeacher, setNewTeacher] = useState({ first_name: '', last_name: '', email: '', phone: '' });
    const [editTeacher, setEditTeacher] = useState(null);

    useEffect(() => {
        fetchTeachers()
            .then(response => setTeachers(response.data))
            .catch(error => console.error("Error fetching teachers:", error));
    }, []);

    const handleAddTeacher = async () => {
        await addTeacher(newTeacher);
        setNewTeacher({ first_name: '', last_name: '', email: '', phone: '' });
        fetchTeachers().then(response => setTeachers(response.data));
    };

    const handleDeleteTeacher = async (id) => {
        await deleteTeacher(id);
        fetchTeachers().then(response => setTeachers(response.data));
    };

    const handleUpdateTeacher = async (id) => {
        await updateTeacher(id, editTeacher);
        setEditTeacher(null);
        fetchTeachers().then(response => setTeachers(response.data));
    };

    return (
        <div>
            <h2>Teachers</h2>

            {/* Add Teacher Form */}
            <div>
                <h3>Add Teacher</h3>
                <input
                    type="text"
                    value={newTeacher.first_name}
                    placeholder="First Name"
                    onChange={(e) => setNewTeacher({ ...newTeacher, first_name: e.target.value })}
                />
                <input
                    type="text"
                    value={newTeacher.last_name}
                    placeholder="Last Name"
                    onChange={(e) => setNewTeacher({ ...newTeacher, last_name: e.target.value })}
                />
                <input
                    type="email"
                    value={newTeacher.email}
                    placeholder="Email"
                    onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                />
                <input
                    type="text"
                    value={newTeacher.phone}
                    placeholder="Phone"
                    onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                />
                <button onClick={handleAddTeacher}>Add Teacher</button>
            </div>

            {/* Edit Teacher Form */}
            {editTeacher && (
                <div>
                    <h3>Edit Teacher</h3>
                    <input
                        type="text"
                        value={editTeacher.first_name}
                        onChange={(e) => setEditTeacher({ ...editTeacher, first_name: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editTeacher.last_name}
                        onChange={(e) => setEditTeacher({ ...editTeacher, last_name: e.target.value })}
                    />
                    <input
                        type="email"
                        value={editTeacher.email}
                        onChange={(e) => setEditTeacher({ ...editTeacher, email: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editTeacher.phone}
                        onChange={(e) => setEditTeacher({ ...editTeacher, phone: e.target.value })}
                    />
                    <button onClick={() => handleUpdateTeacher(editTeacher.teacher_id)}>Update Teacher</button>
                </div>
            )}

            {/* Teachers Table */}
            <table>
                <thead>
                    <tr>
                        <th>Teacher ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher => (
                        <tr key={teacher.teacher_id}>
                            <td>{teacher.teacher_id}</td>
                            <td>{teacher.first_name}</td>
                            <td>{teacher.last_name}</td>
                            <td>{teacher.email}</td>
                            <td>{teacher.phone}</td>
                            <td>
                                <button onClick={() => setEditTeacher(teacher)}>Edit</button>
                                <button onClick={() => handleDeleteTeacher(teacher.teacher_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Teachers;
