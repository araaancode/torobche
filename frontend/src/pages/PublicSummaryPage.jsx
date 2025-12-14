// pages/PublicSummaryPage.jsx
const PublicSummaryPage = () => {
    const { publicId } = useParams();
    const [resume, setResume] = useState(null);

    useEffect(() => {
        fetchResumeSummary(publicId);
    }, [publicId]);

    if (!resume) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <img
                        src={resume.personalInfo.avatar}
                        alt={resume.personalInfo.fullName}
                        className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                    <h1 className="text-3xl font-bold">
                        {resume.personalInfo.fullName}
                    </h1>
                    <p className="text-xl text-gray-600">
                        {resume.personalInfo.jobTitle}
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">خلاصه</h2>
                    <p className="text-gray-700">{resume.personalInfo.summary}</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">مهارت‌های کلیدی</h2>
                    <div className="flex flex-wrap gap-2">
                        {resume.skills.slice(0, 5).map(skill => (
                            <span key={skill._id} className="badge badge-primary">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>

                <Link
                    to={`/r/${publicId}/full`}
                    className="btn btn-primary w-full"
                >
                    مشاهده رزومه کامل
                </Link>
            </div>
        </div>
    );
};