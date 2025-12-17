// client/src/hooks/useResume.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Mock API functions for development
const mockCreateResume = async (data) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        success: true,
        data: {
            resumeId: 'mock_' + Math.random().toString(36).substr(2, 9),
            resumeUrl: `${window.location.origin}/resume/mock`,
            editUrl: `${window.location.origin}/edit/mock`,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
    };
};

const mockGetResume = async (id) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        success: true,
        data: {
            _id: id,
            templateId: {
                _id: 'template_1',
                name: 'Modern Professional',
                designType: 'modern',
                theme: {
                    primaryColor: '#2563eb',
                    secondaryColor: '#64748b'
                }
            },
            personalInfo: {
                fullName: 'John Doe',
                title: 'Senior Software Engineer',
                email: 'john@example.com',
                phone: '+1 (555) 123-4567',
                about: 'Experienced software engineer with 5+ years of experience in web development...'
            },
            experience: [
                {
                    jobTitle: 'Senior Software Engineer',
                    company: 'Tech Corp Inc.',
                    location: 'San Francisco, CA',
                    startDate: '2020-01-01',
                    endDate: '2023-12-31',
                    current: false,
                    description: 'Led development of multiple web applications using React and Node.js',
                    achievements: [
                        'Increased application performance by 40%',
                        'Reduced server costs by 30% through optimization',
                        'Mentored 3 junior developers'
                    ],
                    employmentType: 'full-time'
                },
                {
                    jobTitle: 'Software Engineer',
                    company: 'Startup XYZ',
                    location: 'New York, NY',
                    startDate: '2018-06-01',
                    endDate: '2020-01-01',
                    current: false,
                    description: 'Developed and maintained customer-facing web applications',
                    achievements: [
                        'Built a scalable microservices architecture',
                        'Improved page load time by 60%'
                    ],
                    employmentType: 'full-time'
                }
            ],
            education: [
                {
                    degree: 'Bachelor of Science in Computer Science',
                    institution: 'Stanford University',
                    location: 'Stanford, CA',
                    fieldOfStudy: 'Computer Science',
                    startDate: '2014-09-01',
                    endDate: '2018-06-01',
                    current: false,
                    gpa: '3.8/4.0',
                    description: 'Graduated magna cum laude',
                    honors: ['Summa Cum Laude', 'Dean\'s List']
                }
            ],
            skills: [
                {
                    category: 'Programming Languages',
                    items: [
                        { name: 'JavaScript', level: 5 },
                        { name: 'Python', level: 4 },
                        { name: 'Java', level: 3 },
                        { name: 'TypeScript', level: 4 }
                    ]
                },
                {
                    category: 'Frameworks & Libraries',
                    items: [
                        { name: 'React', level: 5 },
                        { name: 'Node.js', level: 4 },
                        { name: 'Express', level: 4 },
                        { name: 'Next.js', level: 3 }
                    ]
                },
                {
                    category: 'Tools & Platforms',
                    items: [
                        { name: 'Git', level: 5 },
                        { name: 'Docker', level: 3 },
                        { name: 'AWS', level: 3 },
                        { name: 'MongoDB', level: 4 }
                    ]
                }
            ],
            projects: [
                {
                    title: 'E-commerce Platform',
                    description: 'Full-stack e-commerce platform with payment integration',
                    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                    link: 'https://github.com/username/ecommerce',
                    role: 'Full Stack Developer',
                    teamSize: 3
                }
            ],
            languages: [
                { language: 'English', proficiency: 'native' },
                { language: 'Spanish', proficiency: 'intermediate' }
            ],
            meta: {
                createdAt: new Date().toISOString(),
                resumeId: id,
                views: 42,
                downloads: 5,
                lastViewed: new Date().toISOString()
            }
        }
    };
};

export const useResume = (resumeId) => {
    return useQuery({
        queryKey: ['resume', resumeId],
        queryFn: () => mockGetResume(resumeId),
        enabled: !!resumeId,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};

export const useCreateResume = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: mockCreateResume,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['resumes']);

            // Store resume ID in localStorage for easy access
            if (data.data?.resumeId) {
                localStorage.setItem('lastResumeId', data.data.resumeId);
            }
        },
        onError: (error) => {
            console.error('Failed to create resume:', error);
        },
    });
};

export const useUpdateResume = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }) => {
            // Mock update function
            await new Promise(resolve => setTimeout(resolve, 500));
            return { success: true, data };
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['resume', variables.id]);
            queryClient.invalidateQueries(['resumes']);
        },
        onError: (error) => {
            console.error('Failed to update resume:', error);
        },
    });
};

export const useDeleteResume = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            // Mock delete function
            await new Promise(resolve => setTimeout(resolve, 300));
            return { success: true };
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['resumes']);
        },
        onError: (error) => {
            console.error('Failed to delete resume:', error);
        },
    });
};