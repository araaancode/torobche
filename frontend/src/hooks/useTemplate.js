// client/src/hooks/useTemplate.js
import { useQuery } from '@tanstack/react-query';

// Mock data for development
const mockTemplates = [
    {
        _id: '1',
        name: 'Modern Professional',
        description: 'A clean, modern template perfect for professionals in any industry',
        previewImage: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=800&auto=format&fit=crop',
        designType: 'modern',
        category: 'professional',
        isPremium: false,
        rating: 4.8,
        downloads: 1250,
        activeSections: ['about', 'experience', 'education', 'skills', 'projects', 'languages'],
        theme: {
            primaryColor: '#2563eb',
            secondaryColor: '#64748b',
            backgroundColor: '#ffffff',
            textColor: '#1e293b',
            fontFamily: 'Inter'
        }
    },
    {
        _id: '2',
        name: 'Classic Executive',
        description: 'Traditional two-column layout for executives and senior professionals',
        previewImage: 'https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?w=800&auto=format&fit=crop',
        designType: 'classic',
        category: 'professional',
        isPremium: false,
        rating: 4.6,
        downloads: 890,
        activeSections: ['about', 'experience', 'education', 'skills', 'certifications', 'references'],
        theme: {
            primaryColor: '#1e293b',
            secondaryColor: '#475569',
            backgroundColor: '#f8fafc',
            textColor: '#334155',
            fontFamily: 'Georgia'
        }
    },
    {
        _id: '3',
        name: 'Minimal Creative',
        description: 'Simple and elegant design for creative professionals',
        previewImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop',
        designType: 'minimal',
        category: 'creative',
        isPremium: false,
        rating: 4.7,
        downloads: 1120,
        activeSections: ['about', 'experience', 'projects', 'skills'],
        theme: {
            primaryColor: '#10b981',
            secondaryColor: '#6b7280',
            backgroundColor: '#ffffff',
            textColor: '#374151',
            fontFamily: 'Helvetica Neue'
        }
    },
    {
        _id: '4',
        name: 'Tech Specialist',
        description: 'Designed for developers and technical professionals',
        previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
        designType: 'modern',
        category: 'technical',
        isPremium: true,
        price: 9.99,
        rating: 4.9,
        downloads: 540,
        activeSections: ['about', 'experience', 'projects', 'skills', 'certifications', 'languages'],
        theme: {
            primaryColor: '#8b5cf6',
            secondaryColor: '#a78bfa',
            backgroundColor: '#0f172a',
            textColor: '#f1f5f9',
            fontFamily: 'Fira Code'
        }
    }
];

const mockGetTemplates = async (category) => {
    await new Promise(resolve => setTimeout(resolve, 300));

    let filtered = mockTemplates;
    if (category) {
        filtered = mockTemplates.filter(t => t.category === category);
    }

    return {
        success: true,
        data: filtered,
        count: filtered.length
    };
};

const mockGetTemplateById = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));

    const template = mockTemplates.find(t => t._id === id) || mockTemplates[0];

    return {
        success: true,
        data: template
    };
};

const mockGetPopularTemplates = async () => {
    await new Promise(resolve => setTimeout(resolve, 250));

    const popular = mockTemplates.slice(0, 3);

    return {
        success: true,
        data: popular
    };
};

export const useTemplate = (templateId) => {
    return useQuery({
        queryKey: ['template', templateId],
        queryFn: () => mockGetTemplateById(templateId),
        enabled: !!templateId,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useTemplates = (category) => {
    return useQuery({
        queryKey: ['templates', category],
        queryFn: () => mockGetTemplates(category),
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

export const usePopularTemplates = () => {
    return useQuery({
        queryKey: ['templates', 'popular'],
        queryFn: mockGetPopularTemplates,
        staleTime: 10 * 60 * 1000,
    });
};