import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, Link, useNavigate } from 'react-router-dom';

const API = "https://hsc-res-2b4d5cfc8dbf.herokuapp.com";
// const API = "http://localhost:4000";

function Chapter() {
    const { id, chapterId } = useParams();
    const [chapter, setChapter] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const chapterResponse = await axios.get(`${API}/api/subjects/${id}/chapters/${chapterId}`);
                setChapter(chapterResponse.data);
                const response = await axios.get(`${API}/api/subjects/${id}/chapters/${chapterId}/videos`);
                setVideos(response.data);
            } catch (err) {
                setError("Failed to load videos. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, [chapterId]);

    if (loading) {
        return (
            <div className="container my-4">
                <h2>Loading videos...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container my-4">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="h3">{chapter?.name} Videos</h1>
                <button
                    onClick={() => navigate("/subjects/" + id)}
                    className="btn btn-outline-secondary btn-sm"
                >
                    Back
                </button>
            </div>

            {videos.length === 0 ? (
                <p>No videos found for this chapter.</p>
            ) : (
                <div className="d-flex flex-column gap-2">
                    {videos.map((video) => (
                        <Link
                            key={video.id}
                            to={`videos/${video.id}`}
                            className="btn btn-outline-primary text-start"
                        >
                            {video.video_serial}. {video.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Chapter;
