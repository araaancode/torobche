const mongoose = require('mongoose');
const ResumeTemplate = require('./models/ResumeTemplate');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Sample Resume Templates Data
const resumeTemplates = [
    {
        name: "Modern Professional",
        description: "Clean and contemporary design perfect for tech and business professionals. Features a balanced layout with QR code integration.",
        thumbnail: "modern-professional.jpg",
        structure: {
            sections: ["personalInfo", "summary", "experience", "education", "skills", "projects"],
            layout: "two-column",
            colors: {
                primary: "#3B82F6",
                secondary: "#6B7280",
                background: "#FFFFFF"
            },
            typography: {
                fontFamily: "Inter, sans-serif",
                fontSize: "14px"
            },
            qrCode: {
                position: "footer",
                size: "100px",
                showUrl: true
            }
        },
        isActive: true,
        tags: ["modern", "professional", "clean", "tech"]
    },
    {
        name: "Creative Designer",
        description: "Bold and artistic template ideal for designers, artists, and creatives. Features unique layout with visual appeal.",
        thumbnail: "creative-designer.jpg",
        structure: {
            sections: ["personalInfo", "portfolio", "skills", "experience", "education", "awards"],
            layout: "single-column",
            colors: {
                primary: "#8B5CF6",
                secondary: "#F59E0B",
                background: "#FEF3C7"
            },
            typography: {
                fontFamily: "Poppins, sans-serif",
                fontSize: "13px"
            },
            qrCode: {
                position: "sidebar",
                size: "120px",
                showUrl: false
            }
        },
        isActive: true,
        tags: ["creative", "design", "artistic", "colorful"]
    },
    {
        name: "Minimalist",
        description: "Simple and elegant template focusing on content. Perfect for executives and minimal design lovers.",
        thumbnail: "minimalist.jpg",
        structure: {
            sections: ["personalInfo", "experience", "education", "skills"],
            layout: "single-column",
            colors: {
                primary: "#111827",
                secondary: "#6B7280",
                background: "#FFFFFF"
            },
            typography: {
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: "12px"
            },
            qrCode: {
                position: "header",
                size: "80px",
                showUrl: true
            }
        },
        isActive: true,
        tags: ["minimal", "simple", "elegant", "executive"]
    },
    {
        name: "Academic",
        description: "Formal template designed for academics, researchers, and students. Emphasizes publications and education.",
        thumbnail: "academic.jpg",
        structure: {
            sections: ["personalInfo", "education", "publications", "research", "teaching", "awards"],
            layout: "two-column",
            colors: {
                primary: "#1E40AF",
                secondary: "#374151",
                background: "#F9FAFB"
            },
            typography: {
                fontFamily: "Times New Roman, serif",
                fontSize: "12px"
            },
            qrCode: {
                position: "footer",
                size: "90px",
                showUrl: true
            }
        },
        isActive: true,
        tags: ["academic", "formal", "research", "student"]
    },
    {
        name: "Executive",
        description: "Sophisticated template for executives and senior professionals. Emphasizes leadership and achievements.",
        thumbnail: "executive.jpg",
        structure: {
            sections: ["personalInfo", "summary", "experience", "leadership", "education", "skills"],
            layout: "single-column",
            colors: {
                primary: "#047857",
                secondary: "#0F766E",
                background: "#FFFFFF"
            },
            typography: {
                fontFamily: "Georgia, serif",
                fontSize: "13px"
            },
            qrCode: {
                position: "sidebar",
                size: "100px",
                showUrl: false
            }
        },
        isActive: true,
        tags: ["executive", "professional", "leadership", "corporate"]
    },
    {
        name: "Tech Developer",
        description: "Modern template specifically designed for software developers and engineers. Highlights projects and technical skills.",
        thumbnail: "tech-developer.jpg",
        structure: {
            sections: ["personalInfo", "summary", "skills", "projects", "experience", "education"],
            layout: "two-column",
            colors: {
                primary: "#DC2626",
                secondary: "#1E293B",
                background: "#0F172A"
            },
            typography: {
                fontFamily: "Fira Code, monospace",
                fontSize: "13px"
            },
            qrCode: {
                position: "sidebar",
                size: "110px",
                showUrl: true
            }
        },
        isActive: true,
        tags: ["tech", "developer", "programmer", "dark-mode"]
    },
    {
        name: "Fresh Graduate",
        description: "Friendly template perfect for recent graduates and entry-level professionals. Focuses on education and potential.",
        thumbnail: "fresh-graduate.jpg",
        structure: {
            sections: ["personalInfo", "education", "projects", "skills", "internships", "extracurricular"],
            layout: "single-column",
            colors: {
                primary: "#10B981",
                secondary: "#3B82F6",
                background: "#FFFFFF"
            },
            typography: {
                fontFamily: "Roboto, sans-serif",
                fontSize: "14px"
            },
            qrCode: {
                position: "footer",
                size: "100px",
                showUrl: true
            }
        },
        isActive: true,
        tags: ["graduate", "entry-level", "friendly", "modern"]
    },
    {
        name: "Creative Portfolio",
        description: "Visual template with portfolio focus for designers, photographers, and artists. Showcases work samples.",
        thumbnail: "creative-portfolio.jpg",
        structure: {
            sections: ["personalInfo", "portfolio", "skills", "experience", "education", "clients"],
            layout: "creative",
            colors: {
                primary: "#EC4899",
                secondary: "#8B5CF6",
                background: "#FDF2F8"
            },
            typography: {
                fontFamily: "Playfair Display, serif",
                fontSize: "14px"
            },
            qrCode: {
                position: "sidebar",
                size: "120px",
                showUrl: false
            }
        },
        isActive: true,
        tags: ["portfolio", "visual", "creative", "design"]
    }
];

// Connect to MongoDB
const seedTemplates = async () => {
    try {
        await connectDB();

        console.log('🌱 Starting template seeding...');

        // Clear existing templates
        await ResumeTemplate.deleteMany({});
        console.log('✅ Existing templates cleared');

        // Insert new templates
        const insertedTemplates = await ResumeTemplate.insertMany(resumeTemplates);

        console.log(`✅ Successfully seeded ${insertedTemplates.length} resume templates`);

        // Display seeded templates
        insertedTemplates.forEach(template => {
            console.log(`  📄 ${template.name} - ${template.description.substring(0, 50)}...`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding templates:', error);
        process.exit(1);
    }
};

// Run seeder
if (require.main === module) {
    seedTemplates();
}

module.exports = seedTemplates;