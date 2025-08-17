import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate, Link } from 'react-router-dom';

function Subject() {
    const [subject, setSubject] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [loadingChapters, setLoadingChapters] = useState(true);
    const [chaptersError, setChaptersError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/subjects/${id}`);
                setSubject(response.data);
            } catch (error) {
                console.error('Error fetching subject:', error);
            }
        };
        fetchSubject();
    }, [id]);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                setLoadingChapters(true);
                setChaptersError(null);
                // Adjust this endpoint to match your backend
                const { data } = await axios.get(`http://localhost:4000/api/subjects/${id}/chapters`);
                setChapters(data || []);
            } catch (error) {
                console.error('Error fetching chapters:', error);
                setChaptersError('Failed to load chapters.');
            } finally {
                setLoadingChapters(false);
            }
        };
        fetchChapters();
    }, [id]);

    if (!subject) {
        return <div className="container my-4"><h2>Loading...</h2></div>;
    }
    return (
        <div className="container my-4">
            <h1 className="mb-2">{subject.name}</h1>
            <p className="text-muted">{subject.description}</p>

            <hr className="my-4" />

            <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="h4 m-0">Chapters</h2>
                <span className="badge bg-secondary">{chapters.length}</span>
            </div>

            {loadingChapters && <p>Loading chapters…</p>}
            {chaptersError && <div className="alert alert-danger">{chaptersError}</div>}
            {!loadingChapters && !chaptersError && chapters.length === 0 && (
                <div className="alert alert-info">No chapters found for this subject.</div>
            )}

            <div className="row">
                <style>
                    {`
            .chapter-card:hover {
              box-shadow: 0 .75rem 1.5rem rgba(0,0,0,.1);
            }
          `}
                </style>

                {chapters.map((chapter) => (
                    <div className="col-12 mb-3" key={chapter.id}>
                        <div className="card chapter-card border-0 shadow-sm">
                            <div className="card-body">
                                <h3 className="h5">{chapter.name}</h3>
                                {chapter.description && (
                                    <p className="text-muted mb-3">{chapter.description}</p>
                                )}

                                {/* Links row */}
                                <div className="d-flex flex-wrap gap-2">
                                    <Link
                                        to={`/subjects/${id}/chapters/${chapter.id}`}
                                        className="btn btn-primary btn-sm"
                                    >
                                        View Chapter
                                    </Link>
                                    <Link
                                        to={`/subjects/${id}/chapters/${chapter.id}/videos`}
                                        className="btn btn-success btn-sm"
                                    >
                                        Lecture Videos
                                    </Link>
                                    <Link
                                        to={`/subjects/${id}/chapters/${chapter.id}/notes`}
                                        className="btn btn-info btn-sm text-white"
                                    >
                                        Lecture Notes
                                    </Link>
                                    <Link
                                        to={`/subjects/${id}/chapters/${chapter.id}/worksheets`}
                                        className="btn btn-warning btn-sm"
                                    >
                                        Worksheets
                                    </Link>
                                    <Link
                                        to={`/subjects/${id}/chapters/${chapter.id}/exams`}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Exams
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Subject;