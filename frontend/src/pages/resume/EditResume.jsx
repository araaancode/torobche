// client/src/pages/EditResume.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../../contexts/ResumeContext';
import ResumeBuilder from './ResumeBuilder.jsx'; // Add .jsx extension

const EditResume = () => {
    const { resumeId } = useParams();
    const navigate = useNavigate();
    const { loadResume, resumeData } = useResume();

    React.useEffect(() => {
        if (resumeId) {
            const loaded = loadResume(resumeId);
            if (!loaded) {
                navigate('/my-resumes');
            }
        }
    }, [resumeId, loadResume, navigate]);

    return <ResumeBuilder />;
};

export default EditResume;