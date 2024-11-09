// frontend/src/api.js
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api';  // Make sure this matches your backend API URL

// --- Students API ---
export const fetchStudents = () => axios.get(`${apiUrl}/students`);
export const addStudent = (student) => axios.post(`${apiUrl}/students`, student);
export const deleteStudent = (id) => axios.delete(`${apiUrl}/students/${id}`);
export const updateStudent = (id, student) => axios.put(`${apiUrl}/students/${id}`, student);

// --- Teachers API ---
export const fetchTeachers = () => axios.get(`${apiUrl}/teachers`);
export const addTeacher = (teacher) => axios.post(`${apiUrl}/teachers`, teacher);
export const deleteTeacher = (id) => axios.delete(`${apiUrl}/teachers/${id}`);
export const updateTeacher = (id, teacher) => axios.put(`${apiUrl}/teachers/${id}`, teacher);

// --- Courses API ---
export const fetchCourses = () => axios.get(`${apiUrl}/courses`);
export const addCourse = (course) => axios.post(`${apiUrl}/courses`, course);
export const deleteCourse = (id) => axios.delete(`${apiUrl}/courses/${id}`);
export const updateCourse = (id, course) => axios.put(`${apiUrl}/courses/${id}`, course);

// --- Enrollments API ---
export const fetchEnrollments = () => axios.get(`${apiUrl}/enrollments`);
export const addEnrollment = (enrollment) => axios.post(`${apiUrl}/enrollments`, enrollment);
export const deleteEnrollment = (id) => axios.delete(`${apiUrl}/enrollments/${id}`);
export const updateEnrollment = (id, enrollment) => axios.put(`${apiUrl}/enrollments/${id}`, enrollment);
