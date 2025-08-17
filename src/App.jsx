import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Subjects from './Subjects';
import Subject from './Subject';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Subjects />} />
                <Route path="/subjects/:id" element={<Subject/>} />
                <Route path="/subjects/:id/chapters/:chapterId" element={<h1>This is a chapter</h1>} />
            </Routes>
        </Router>
    );
}

export default App;