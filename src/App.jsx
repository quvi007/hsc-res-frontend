import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Subjects from './Subjects';
import Subject from './Subject';
import AddVideo from './AddVideo';
import Chapter from './Chapter';
import ViewVideo from './ViewVideo';

function App() {
    return (
        <Router basename='/hsc-res'>
            <Routes>
                <Route path="/" element={<Subjects />} />
                <Route path="/subjects/:id" element={<Subject/>} />
                <Route path="/subjects/:id/chapters/:chapterId" element={<Chapter/>} />
                <Route path="/subjects/:id/chapters/:chapterId/add-video" element={<AddVideo/>} />
                <Route path="/subjects/:id/chapters/:chapterId/videos/:videoId" element={<ViewVideo/>} />
                {/* <Route path="/admin" element={}/> */}
            </Routes>
        </Router>
    );
}

export default App;