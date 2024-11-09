// frontend/src/components/Courses.jsx
import React, { useEffect, useState } from 'react';
import { fetchCourses, addCourse, deleteCourse, updateCourse } from '../api';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ course_name: '', teacher_id: '', credits: '' });
    const [editCourse, setEditCourse] = useState(null);

    useEffect(() => {
        fetchCourses()
            .then(response => setCourses(response.data))
            .catch(error => console.error("Error fetching courses:", error));
    }, []);

    const handleAddCourse = async () => {
        await addCourse(newCourse);
        setNewCourse({ course_name: '', teacher_id: '', credits: '' });
        fetchCourses().then(response => setCourses(response.data));
    };

    const handleDeleteCourse = async (id) => {
        await deleteCourse(id);
        fetchCourses().then(response => setCourses(response.data));
    };

    const handleUpdateCourse = async (id) => {
        await updateCourse(id, editCourse);
        setEditCourse(null);
        fetchCourses().then(response => setCourses(response.data));
    };

    return (
        <div>
            <h2>Courses</h2>

            {/* Add Course Form */}
            <div>
                <h3>Add Course</h3>
                <input
                    type="text"
                    value={newCourse.course_name}
                    placeholder="Course Name"
                    onChange={(e) => setNewCourse({ ...newCourse, course_name: e.target.value })}
                />
                <input
                    type="text"
                    value={newCourse.teacher_id}
                    placeholder="Teacher ID"
                    onChange={(e) => setNewCourse({ ...newCourse, teacher_id: e.target.value })}
                />
                <input
                    type="number"
                    value={newCourse.credits}
                    placeholder="Credits"
                    onChange={(e) => setNewCourse({ ...newCourse, credits: e.target.value })}
                />
                <button onClick={handleAddCourse}>Add Course</button>
            </div>

            {/* Edit Course Form */}
            {editCourse && (
                <div>
                    <h3>Edit Course</h3>
                    <input
                        type="text"
                        value={editCourse.course_name}
                        onChange={(e) => setEditCourse({ ...editCourse, course_name: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editCourse.teacher_id}
                        onChange={(e) => setEditCourse({ ...editCourse, teacher_id: e.target.value })}
                    />
                    <input
                        type="number"
                        value={editCourse.credits}
                        onChange={(e) => setEditCourse({ ...editCourse, credits: e.target.value })}
                    />
                    <button onClick={() => handleUpdateCourse(editCourse.course_id)}>Update Course</button>
                </div>
            )}

            {/* Courses Table */}
            <table>
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Teacher ID</th>
                        <th>Credits</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.course_id}>
                            <td>{course.course_id}</td>
                            <td>{course.course_name}</td>
                            <td>{course.teacher_id}</td>
                            <td>{course.credits}</td>
                            <td>
                                <button onClick={() => setEditCourse(course)}>Edit</button>
                                <button onClick={() => handleDeleteCourse(course.course_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Courses;
