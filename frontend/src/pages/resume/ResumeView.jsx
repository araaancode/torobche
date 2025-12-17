// client/src/pages/ResumeView.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ResumePreview from './ResumePreview';

const ResumeView = () => {
    const { resumeId } = useParams();

    // در اینجا می‌توانید از API برای دریافت رزومه استفاده کنید
    // برای دمو، از همان ResumePreview استفاده می‌کنیم

    return <ResumePreview />;
};

export default ResumeView;