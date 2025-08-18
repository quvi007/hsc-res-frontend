import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

// const API = "https://hsc-res-2b4d5cfc8dbf.herokuapp.com";
const API = "http://localhost:4000";

function ViewVideo() {
  const { id, chapterId, videoId } = useParams();
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `${API}/api/subjects/${id}/chapters/${chapterId}/videos/${videoId}`
        );
        setVideo(response.data);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };
    fetchVideo();
  }, [id, chapterId, videoId]);

  const youtubeId = video ? video.url.split("v=")[1]?.split("&")[0] : "";

  return (
    <div className="container my-4">
      {/* Top bar with Back button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4 mb-0">{video ? video.title : "Video"}</h1>
        <button
          onClick={() => navigate("/subjects/" + id + "/chapters/" + chapterId)}
          className="btn btn-outline-secondary btn-sm"
        >
          Back
        </button>
      </div>

      {/* Responsive video wrapper */}
      <div className="ratio ratio-16x9">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?vq=hd1080`}
          title={video ? video.title : "YouTube video player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {video?.description && (
        <p className="mt-3 text-muted">{video.description}</p>
      )}
    </div>
  );
}

export default ViewVideo;
