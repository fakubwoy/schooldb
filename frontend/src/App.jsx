// frontend/src/App.jsx
import React from 'react';
import Students from './components/Students';
import Teachers from './components/Teachers';
import Courses from './components/Courses';
import Enrollments from './components/Enrollments';
import './App.css';

function App() {
    return (
        <div>
            <Students />
            <Teachers />
            <Courses />
            <Enrollments />
        </div>
    );
}

export default App;
