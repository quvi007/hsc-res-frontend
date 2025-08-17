import { useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const COLORS = ['primary', 'success', 'danger', 'warning', 'info', 'dark', 'secondary'];

function Subjects() {
    const [subjects, setSubjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get('https://hsc-res-2b4d5cfc8dbf.herokuapp.com/api/subjects');
                setSubjects(response.data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };
        fetchSubjects();
    }, []);

    return (
        <>
            <div className="container my-4">
                {/* quick styles for pretty hover/scale */}
                <style>
                    {`
          .subject-card {
            transition: transform .15s ease, box-shadow .15s ease;
            cursor: pointer;
          }
          .subject-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 .75rem 1.5rem rgba(0,0,0,.15);
          }
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
                </style>

                <h1 className="text-center mb-4">HSC Resource Finder</h1>
                <h2 className="mb-3">Subjects</h2>

                <div className="row g-4">
                    {subjects.map((subject, idx) => {
                        const color = COLORS[idx % COLORS.length];
                        const cardClass = `card text-bg-${color} border-0 h-100 subject-card`;

                        return (
                            <div className="col-12 col-md-6 col-lg-4" key={subject.id}>
                                <div
                                    className={cardClass}
                                    onClick={() => navigate(`/subjects/${subject.id}`)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            <h3 className="card-title m-0 fw-bold" style={{ fontSize: '1.5rem' }}>
                                                {subject.name}
                                            </h3>
                                        </div>

                                        {subject.description && (
                                            <p className="card-text mt-3 fs-6 line-clamp-3">
                                                {subject.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Subjects;