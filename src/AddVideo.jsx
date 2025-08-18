import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate, Link } from 'react-router-dom';

// const API = "https://hsc-res-2b4d5cfc8dbf.herokuapp.com";
const API = "http://localhost:4000";

function AddVideo() {
    const { id, chapterId } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        chapter_id: chapterId || "",
        video_serial: "",
        title: "",
        url: "",
        pdf: "",
        playlist_url: "",
        description: ""
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        // keep chapter_id synced with route
        if (chapterId) {
            setForm((f) => ({ ...f, chapter_id: chapterId }));
        }
    }, [chapterId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const validate = () => {
        if (!form.chapter_id) return "Missing chapter ID.";
        if (!form.title.trim()) return "Title is required.";
        if (!form.video_serial || Number.isNaN(Number(form.video_serial)))
            return "Video serial must be a number.";
        if (Number(form.video_serial) < 1)
            return "Video serial must be at least 1.";
        if (!form.url.trim() && !form.playlist_url.trim())
            return "Provide at least a Video URL or a Playlist URL.";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const v = validate();
        if (v) {
            setError(v);
            return;
        }

        try {
            setSubmitting(true);
            // Adjust endpoint to match your backend
            const endpoint = `${API}/api/subjects/${id}/chapters/${form.chapter_id}/videos`;
            const payload = {
                chapter_id: form.chapter_id,
                video_serial: Number(form.video_serial),
                title: form.title.trim(),
                url: form.url.trim(),
                pdf: form.pdf.trim(),
                playlist_url: form.playlist_url.trim(),
                description: form.description.trim(),
            };
            await axios.post(endpoint, payload);

            setSuccess("Video added successfully!");
            // Optionally navigate back to the chapter page after a short delay
            // setTimeout(() => {
            //     navigate(`/subjects/${id}/chapters/${form.chapter_id}`);
            // }, 800);
        } catch (err) {
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message ||
                "Failed to add video.";
            setError(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container my-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h1 className="h3 mb-0">Add a Video</h1>
                <div>
                    {chapterId && (
                        <Link
                            className="btn btn-outline-primary btn-sm"
                            to={`/subjects/${id}/chapters/${chapterId}`}
                        >
                            View Chapter
                        </Link>
                    )}
                </div>
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            {success && (
                <div className="alert alert-success" role="alert">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
                <div className="row g-3">
                    <div className="col-md-3">
                        <label htmlFor="video_serial" className="form-label">
                            Video Serial *
                        </label>
                        <input
                            type="number"
                            id="video_serial"
                            name="video_serial"
                            className="form-control"
                            value={form.video_serial}
                            onChange={handleChange}
                            min={1}
                            required
                        />
                        <div className="form-text">Order of the video within the chapter.</div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label">
                            Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-control"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter video title"
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="url" className="form-label">
                            Video URL *
                        </label>
                        <input
                            type="url"
                            id="url"
                            name="url"
                            className="form-control"
                            value={form.url}
                            onChange={handleChange}
                            placeholder="https://youtube.com/watch?v=..."
                        />
                        <div className="form-text">
                            Provide at least a Video URL or a Playlist URL.
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="playlist_url" className="form-label">
                            Playlist URL (optional)
                        </label>
                        <input
                            type="url"
                            id="playlist_url"
                            name="playlist_url"
                            className="form-control"
                            value={form.playlist_url}
                            onChange={handleChange}
                            placeholder="https://youtube.com/playlist?list=..."
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="pdf" className="form-label">
                            PDF URL (optional)
                        </label>
                        <input
                            type="url"
                            id="pdf"
                            name="pdf"
                            className="form-control"
                            value={form.pdf}
                            onChange={handleChange}
                            placeholder="https://example.com/notes.pdf"
                        />
                        <div className="form-text">
                            If you're hosting PDFs, paste the public link here.
                        </div>
                    </div>

                    <div className="col-12">
                        <label htmlFor="description" className="form-label">
                            Description (optional)
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-control"
                            rows="4"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Short summary or notes about the video..."
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                    <button
                        type="button"
                        className="btn btn-outline-secondary me-2"
                        onClick={() => navigate(-1)}
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                    >
                        {submitting ? "Saving..." : "Save Video"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddVideo;