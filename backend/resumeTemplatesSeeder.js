// server/seeders/resumeTemplatesSeeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ResumeTemplate = require('./models/ResumeTemplate');

dotenv.config();

const templates = [
    {
        templateName: "Modern Professional",
        previewImage: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        htmlStructure: `
      <div class="modern-resume">
        <header class="resume-header">
          <div class="header-content">
            <div class="personal-info">
              <h1>{{personalInfo.fullName}}</h1>
              <h2>{{personalInfo.jobTitle}}</h2>
              <p class="summary">{{personalInfo.summary}}</p>
            </div>
            <div class="contact-info">
              <p><i class="icon email"></i> {{contactInfo.email}}</p>
              <p><i class="icon phone"></i> {{contactInfo.phone}}</p>
              <p><i class="icon location"></i> {{contactInfo.address}}</p>
            </div>
          </div>
        </header>
        
        <div class="resume-body">
          <div class="left-column">
            <section class="education">
              <h3><i class="section-icon"></i> Education</h3>
              {{#each education}}
              <div class="education-item">
                <h4>{{degree}}</h4>
                <p class="institution">{{institution}}</p>
                <p class="duration">{{startDate}} - {{endDate}}</p>
                <p class="description">{{description}}</p>
              </div>
              {{/each}}
            </section>
            
            <section class="skills">
              <h3><i class="section-icon"></i> Skills</h3>
              <div class="skills-grid">
                {{#each skills}}
                <div class="skill-item">
                  <span class="skill-name">{{name}}</span>
                  <div class="skill-level">
                    {{#for 0 5 1}}
                      <span class="dot {{#if (lt @index level)}}filled{{/if}}"></span>
                    {{/for}}
                  </div>
                </div>
                {{/each}}
              </div>
            </section>
          </div>
          
          <div class="right-column">
            <section class="experience">
              <h3><i class="section-icon"></i> Work Experience</h3>
              {{#each workExperience}}
              <div class="experience-item">
                <h4>{{position}}</h4>
                <p class="company">{{company}}</p>
                <p class="duration">{{startDate}} - {{endDate}}</p>
                <p class="description">{{description}}</p>
                {{#if achievements}}
                <ul class="achievements">
                  {{#each achievements}}
                  <li>{{this}}</li>
                  {{/each}}
                </ul>
                {{/if}}
              </div>
              {{/each}}
            </section>
          </div>
        </div>
      </div>
    `,
        cssStyles: `
      .modern-resume {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 210mm;
        margin: 0 auto;
        background: #ffffff;
        color: #333333;
      }
      
      .resume-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 40px;
        border-radius: 8px 8px 0 0;
      }
      
      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      
      .personal-info h1 {
        font-size: 36px;
        margin: 0 0 10px 0;
        font-weight: 700;
      }
      
      .personal-info h2 {
        font-size: 20px;
        margin: 0 0 20px 0;
        font-weight: 400;
        opacity: 0.9;
      }
      
      .summary {
        font-size: 16px;
        line-height: 1.6;
        max-width: 600px;
      }
      
      .contact-info p {
        margin: 8px 0;
        display: flex;
        align-items: center;
      }
      
      .icon {
        margin-right: 10px;
      }
      
      .resume-body {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 40px;
        padding: 40px;
      }
      
      section {
        margin-bottom: 30px;
      }
      
      h3 {
        font-size: 20px;
        color: #667eea;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #667eea;
        display: flex;
        align-items: center;
      }
      
      .education-item, .experience-item {
        margin-bottom: 25px;
      }
      
      .education-item h4, .experience-item h4 {
        font-size: 18px;
        margin: 0 0 5px 0;
        color: #333;
      }
      
      .institution, .company {
        font-weight: 600;
        color: #667eea;
        margin: 5px 0;
      }
      
      .duration {
        color: #666;
        font-size: 14px;
        margin: 5px 0;
      }
      
      .description {
        line-height: 1.6;
        margin: 10px 0;
      }
      
      .skills-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
      }
      
      .skill-item {
        margin-bottom: 15px;
      }
      
      .skill-name {
        display: block;
        margin-bottom: 5px;
        font-weight: 600;
      }
      
      .skill-level {
        display: flex;
        gap: 4px;
      }
      
      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #ddd;
      }
      
      .dot.filled {
        background: #667eea;
      }
      
      .achievements {
        margin: 10px 0;
        padding-left: 20px;
      }
      
      .achievements li {
        margin-bottom: 5px;
        line-height: 1.5;
      }
      
      @media print {
        .modern-resume {
          max-width: 100%;
          padding: 0;
        }
        
        .resume-header {
          background: #667eea !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
        themeColors: {
            primary: "#667eea",
            secondary: "#764ba2",
            background: "#ffffff",
            text: "#333333",
            accent: "#4c51bf"
        },
        sections: [
            {
                name: "Personal Information",
                type: "personal",
                required: true,
                maxItems: 1,
                order: 1
            },
            {
                name: "Education",
                type: "education",
                required: false,
                maxItems: 10,
                order: 3
            },
            {
                name: "Work Experience",
                type: "experience",
                required: false,
                maxItems: 15,
                order: 4
            },
            {
                name: "Skills",
                type: "skills",
                required: false,
                maxItems: 20,
                order: 5
            }
        ],
        isActive: true,
        version: "1.0"
    },
    {
        templateName: "Classic Executive",
        previewImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        htmlStructure: `
      <div class="classic-resume">
        <div class="resume-container">
          <div class="sidebar">
            <div class="profile-section">
              {{#if personalInfo.avatar}}
              <img src="{{personalInfo.avatar}}" alt="{{personalInfo.fullName}}" class="profile-image">
              {{/if}}
              <h1>{{personalInfo.fullName}}</h1>
              <h2>{{personalInfo.jobTitle}}</h2>
            </div>
            
            <div class="contact-details">
              <h3>Contact</h3>
              <div class="contact-item">
                <i class="icon email"></i>
                <span>{{contactInfo.email}}</span>
              </div>
              <div class="contact-item">
                <i class="icon phone"></i>
                <span>{{contactInfo.phone}}</span>
              </div>
              <div class="contact-item">
                <i class="icon location"></i>
                <span>{{contactInfo.address}}</span>
              </div>
              {{#if contactInfo.website}}
              <div class="contact-item">
                <i class="icon website"></i>
                <span>{{contactInfo.website}}</span>
              </div>
              {{/if}}
            </div>
            
            <div class="skills-section">
              <h3>Skills</h3>
              {{#each skills}}
              <div class="skill-item">
                <span class="skill-name">{{name}}</span>
                <div class="skill-bar">
                  <div class="skill-level" style="width: {{multiply level 20}}%"></div>
                </div>
              </div>
              {{/each}}
            </div>
            
            {{#if languages.length}}
            <div class="languages-section">
              <h3>Languages</h3>
              {{#each languages}}
              <div class="language-item">
                <span class="language-name">{{name}}</span>
                <span class="language-level">{{proficiency}}</span>
              </div>
              {{/each}}
            </div>
            {{/if}}
          </div>
          
          <div class="main-content">
            <div class="summary-section">
              <h3>Professional Summary</h3>
              <p>{{personalInfo.summary}}</p>
            </div>
            
            <div class="experience-section">
              <h3>Work Experience</h3>
              {{#each workExperience}}
              <div class="experience-item">
                <div class="experience-header">
                  <h4>{{position}}</h4>
                  <span class="company">{{company}}</span>
                  <span class="duration">{{startDate}} - {{endDate}}</span>
                </div>
                <p class="experience-description">{{description}}</p>
                {{#if achievements.length}}
                <ul class="achievements">
                  {{#each achievements}}
                  <li>{{this}}</li>
                  {{/each}}
                </ul>
                {{/if}}
              </div>
              {{/each}}
            </div>
            
            <div class="education-section">
              <h3>Education</h3>
              {{#each education}}
              <div class="education-item">
                <h4>{{degree}}</h4>
                <p class="institution">{{institution}}</p>
                <p class="education-duration">{{startDate}} - {{endDate}}</p>
                {{#if description}}
                <p class="education-description">{{description}}</p>
                {{/if}}
              </div>
              {{/each}}
            </div>
            
            {{#if certifications.length}}
            <div class="certifications-section">
              <h3>Certifications</h3>
              {{#each certifications}}
              <div class="certification-item">
                <h4>{{name}}</h4>
                <p class="issuer">{{issuer}} • {{formatDate date "YYYY"}}</p>
              </div>
              {{/each}}
            </div>
            {{/if}}
          </div>
        </div>
      </div>
    `,
        cssStyles: `
      .classic-resume {
        font-family: 'Georgia', 'Times New Roman', serif;
        max-width: 210mm;
        margin: 0 auto;
        background: #ffffff;
        color: #2c3e50;
        display: flex;
      }
      
      .resume-container {
        display: flex;
        width: 100%;
      }
      
      .sidebar {
        width: 35%;
        background: #2c3e50;
        color: #ecf0f1;
        padding: 40px 30px;
      }
      
      .main-content {
        width: 65%;
        padding: 40px;
      }
      
      .profile-section {
        text-align: center;
        margin-bottom: 40px;
      }
      
      .profile-image {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 20px;
        border: 4px solid #3498db;
      }
      
      .profile-section h1 {
        font-size: 28px;
        margin: 10px 0;
        font-weight: 700;
        color: #ffffff;
      }
      
      .profile-section h2 {
        font-size: 18px;
        margin: 0;
        color: #3498db;
        font-weight: 400;
      }
      
      h3 {
        font-size: 18px;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin: 30px 0 20px 0;
        padding-bottom: 10px;
        border-bottom: 2px solid #3498db;
        color: #3498db;
      }
      
      .sidebar h3 {
        color: #ffffff;
        border-bottom: 2px solid #3498db;
      }
      
      .contact-item {
        margin: 15px 0;
        display: flex;
        align-items: center;
      }
      
      .contact-item i {
        margin-right: 10px;
        width: 20px;
        color: #3498db;
      }
      
      .skills-section {
        margin-top: 30px;
      }
      
      .skill-item {
        margin: 15px 0;
      }
      
      .skill-name {
        display: block;
        margin-bottom: 5px;
        font-size: 14px;
      }
      
      .skill-bar {
        height: 6px;
        background: #34495e;
        border-radius: 3px;
        overflow: hidden;
      }
      
      .skill-level {
        height: 100%;
        background: #3498db;
        border-radius: 3px;
      }
      
      .language-item {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        font-size: 14px;
      }
      
      .summary-section p {
        line-height: 1.8;
        font-size: 16px;
        margin: 20px 0;
      }
      
      .experience-item, .education-item, .certification-item {
        margin: 25px 0;
      }
      
      .experience-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        flex-wrap: wrap;
      }
      
      .experience-header h4 {
        font-size: 18px;
        margin: 0;
        color: #2c3e50;
        font-weight: 600;
      }
      
      .company {
        color: #3498db;
        font-weight: 600;
      }
      
      .duration {
        color: #7f8c8d;
        font-size: 14px;
      }
      
      .experience-description {
        line-height: 1.6;
        margin: 10px 0;
      }
      
      .achievements {
        margin: 10px 0;
        padding-left: 20px;
      }
      
      .achievements li {
        margin: 5px 0;
        line-height: 1.5;
      }
      
      .education-item h4 {
        font-size: 16px;
        margin: 0 0 5px 0;
        color: #2c3e50;
      }
      
      .institution {
        color: #3498db;
        font-weight: 600;
        margin: 5px 0;
      }
      
      .education-duration {
        color: #7f8c8d;
        font-size: 14px;
        margin: 5px 0;
      }
      
      .certification-item h4 {
        font-size: 16px;
        margin: 0 0 5px 0;
        color: #2c3e50;
      }
      
      .issuer {
        color: #7f8c8d;
        font-size: 14px;
      }
      
      @media print {
        .classic-resume {
          max-width: 100%;
        }
        
        .sidebar {
          background: #2c3e50 !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
        themeColors: {
            primary: "#2c3e50",
            secondary: "#3498db",
            background: "#ffffff",
            text: "#2c3e50",
            accent: "#2980b9"
        },
        sections: [
            {
                name: "Personal Information",
                type: "personal",
                required: true,
                maxItems: 1,
                order: 1
            },
            {
                name: "Professional Summary",
                type: "summary",
                required: true,
                maxItems: 1,
                order: 3
            },
            {
                name: "Work Experience",
                type: "experience",
                required: false,
                maxItems: 10,
                order: 4
            },
            {
                name: "Education",
                type: "education",
                required: false,
                maxItems: 10,
                order: 5
            },
            {
                name: "Skills",
                type: "skills",
                required: false,
                maxItems: 15,
                order: 6
            },
            {
                name: "Languages",
                type: "languages",
                required: false,
                maxItems: 8,
                order: 7
            },
            {
                name: "Certifications",
                type: "certifications",
                required: false,
                maxItems: 10,
                order: 8
            }
        ],
        isActive: true,
        version: "1.0"
    },
    {
        templateName: "Creative Portfolio",
        previewImage: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        htmlStructure: `
      <div class="creative-resume">
        <div class="creative-header">
          <div class="header-background"></div>
          <div class="header-content">
            <div class="profile-card">
              {{#if personalInfo.avatar}}
              <img src="{{personalInfo.avatar}}" alt="{{personalInfo.fullName}}" class="profile-avatar">
              {{/if}}
              <div class="profile-info">
                <h1>{{personalInfo.fullName}}</h1>
                <h2>{{personalInfo.jobTitle}}</h2>
                <div class="tags">
                  {{#each skills.slice(0, 5)}}
                  <span class="tag">{{name}}</span>
                  {{/each}}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="creative-body">
          <div class="left-panel">
            <section class="contact-section">
              <h3><i class="icon contact"></i> Contact</h3>
              <div class="contact-grid">
                <div class="contact-item">
                  <i class="icon email"></i>
                  <div>
                    <div class="contact-label">Email</div>
                    <div class="contact-value">{{contactInfo.email}}</div>
                  </div>
                </div>
                <div class="contact-item">
                  <i class="icon phone"></i>
                  <div>
                    <div class="contact-label">Phone</div>
                    <div class="contact-value">{{contactInfo.phone}}</div>
                  </div>
                </div>
                <div class="contact-item">
                  <i class="icon location"></i>
                  <div>
                    <div class="contact-label">Location</div>
                    <div class="contact-value">{{contactInfo.address}}</div>
                  </div>
                </div>
                {{#if contactInfo.website}}
                <div class="contact-item">
                  <i class="icon website"></i>
                  <div>
                    <div class="contact-label">Website</div>
                    <div class="contact-value">{{contactInfo.website}}</div>
                  </div>
                </div>
                {{/if}}
              </div>
            </section>
            
            <section class="education-section">
              <h3><i class="icon education"></i> Education</h3>
              {{#each education}}
              <div class="education-card">
                <div class="education-header">
                  <h4>{{degree}}</h4>
                  <span class="education-date">{{formatDate startDate "YYYY"}} - {{formatDate endDate "YYYY"}}</span>
                </div>
                <p class="institution">{{institution}}</p>
                {{#if description}}
                <p class="education-desc">{{description}}</p>
                {{/if}}
              </div>
              {{/each}}
            </section>
            
            <section class="languages-section">
              <h3><i class="icon language"></i> Languages</h3>
              {{#each languages}}
              <div class="language-item">
                <span class="language-name">{{name}}</span>
                <div class="language-dots">
                  {{#for 0 5 1}}
                    <span class="dot {{#if (lte @index proficiencyLevel)}}active{{/if}}"></span>
                  {{/for}}
                </div>
              </div>
              {{/each}}
            </section>
          </div>
          
          <div class="right-panel">
            <section class="about-section">
              <h3><i class="icon about"></i> About Me</h3>
              <p class="summary">{{personalInfo.summary}}</p>
            </section>
            
            <section class="experience-section">
              <h3><i class="icon experience"></i> Experience</h3>
              {{#each workExperience}}
              <div class="experience-timeline">
                <div class="timeline-item">
                  <div class="timeline-date">{{formatDate startDate "MMM YYYY"}} - {{#if isCurrent}}Present{{else}}{{formatDate endDate "MMM YYYY"}}{{/if}}</div>
                  <div class="timeline-content">
                    <h4>{{position}}</h4>
                    <p class="company">{{company}}</p>
                    <p class="experience-desc">{{description}}</p>
                    {{#if achievements.length}}
                    <ul class="achievements">
                      {{#each achievements}}
                      <li>{{this}}</li>
                      {{/each}}
                    </ul>
                    {{/if}}
                  </div>
                </div>
              </div>
              {{/each}}
            </section>
            
            <section class="skills-section">
              <h3><i class="icon skills"></i> Skills</h3>
              <div class="skills-cloud">
                {{#each skills}}
                <span class="skill-cloud-item" style="font-size: {{multiply level 0.2}}em">{{name}}</span>
                {{/each}}
              </div>
            </section>
            
            {{#if projects.length}}
            <section class="projects-section">
              <h3><i class="icon projects"></i> Projects</h3>
              <div class="projects-grid">
                {{#each projects}}
                <div class="project-card">
                  <h4>{{title}}</h4>
                  <p class="project-desc">{{description}}</p>
                  {{#if technologies.length}}
                  <div class="project-tech">
                    {{#each technologies}}
                    <span class="tech-tag">{{this}}</span>
                    {{/each}}
                  </div>
                  {{/if}}
                </div>
                {{/each}}
              </div>
            </section>
            {{/if}}
          </div>
        </div>
      </div>
    `,
        cssStyles: `
      .creative-resume {
        font-family: 'Poppins', 'Segoe UI', sans-serif;
        max-width: 210mm;
        margin: 0 auto;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0,0,0,0.1);
      }
      
      .creative-header {
        position: relative;
        padding: 60px 40px 40px;
        color: white;
      }
      
      .header-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, #667eea, #764ba2);
        opacity: 0.9;
      }
      
      .header-content {
        position: relative;
        z-index: 2;
      }
      
      .profile-card {
        display: flex;
        align-items: center;
        gap: 30px;
        flex-wrap: wrap;
      }
      
      .profile-avatar {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
        border: 5px solid rgba(255,255,255,0.2);
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      }
      
      .profile-info h1 {
        font-size: 42px;
        margin: 0 0 10px 0;
        font-weight: 700;
        text-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }
      
      .profile-info h2 {
        font-size: 22px;
        margin: 0 0 20px 0;
        font-weight: 400;
        opacity: 0.9;
      }
      
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      
      .tag {
        background: rgba(255,255,255,0.2);
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        backdrop-filter: blur(10px);
      }
      
      .creative-body {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 0;
        background: white;
      }
      
      .left-panel {
        background: #f8f9fa;
        padding: 40px;
      }
      
      .right-panel {
        background: white;
        padding: 40px;
      }
      
      section {
        margin-bottom: 40px;
      }
      
      h3 {
        font-size: 20px;
        color: #667eea;
        margin: 0 0 25px 0;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      h3 .icon {
        font-size: 24px;
      }
      
      .contact-grid {
        display: grid;
        gap: 20px;
      }
      
      .contact-item {
        display: flex;
        align-items: center;
        gap: 15px;
      }
      
      .contact-item .icon {
        width: 40px;
        height: 40px;
        background: #667eea;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 18px;
      }
      
      .contact-label {
        font-size: 12px;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 4px;
      }
      
      .contact-value {
        font-weight: 600;
        color: #333;
      }
      
      .education-card {
        background: white;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 20px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.05);
      }
      
      .education-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
      
      .education-card h4 {
        margin: 0;
        color: #333;
        font-size: 16px;
      }
      
      .education-date {
        font-size: 12px;
        color: #667eea;
        font-weight: 600;
      }
      
      .institution {
        color: #667eea;
        font-weight: 600;
        margin: 5px 0;
      }
      
      .education-desc {
        color: #666;
        font-size: 14px;
        line-height: 1.5;
        margin: 10px 0 0 0;
      }
      
      .language-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }
      
      .language-dots {
        display: flex;
        gap: 5px;
      }
      
      .language-dots .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #ddd;
      }
      
      .language-dots .dot.active {
        background: #667eea;
      }
      
      .summary {
        line-height: 1.8;
        color: #555;
        font-size: 16px;
      }
      
      .experience-timeline {
        position: relative;
        padding-left: 30px;
      }
      
      .experience-timeline::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        background: #667eea;
      }
      
      .timeline-item {
        position: relative;
        margin-bottom: 30px;
      }
      
      .timeline-item::before {
        content: '';
        position: absolute;
        left: -36px;
        top: 5px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #667eea;
        border: 3px solid white;
        box-shadow: 0 0 0 3px #667eea;
      }
      
      .timeline-date {
        font-size: 14px;
        color: #667eea;
        font-weight: 600;
        margin-bottom: 10px;
      }
      
      .timeline-content h4 {
        margin: 0 0 5px 0;
        color: #333;
        font-size: 18px;
      }
      
      .company {
        color: #667eea;
        font-weight: 600;
        margin: 5px 0;
      }
      
      .experience-desc {
        color: #666;
        line-height: 1.6;
        margin: 10px 0;
      }
      
      .achievements {
        margin: 10px 0;
        padding-left: 20px;
      }
      
      .achievements li {
        margin: 5px 0;
        color: #666;
      }
      
      .skills-cloud {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
      }
      
      .skill-cloud-item {
        background: #f0f2ff;
        color: #667eea;
        padding: 10px 20px;
        border-radius: 20px;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      
      .skill-cloud-item:hover {
        background: #667eea;
        color: white;
        transform: translateY(-2px);
      }
      
      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
      }
      
      .project-card {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid #eaeaea;
      }
      
      .project-card h4 {
        margin: 0 0 10px 0;
        color: #333;
      }
      
      .project-desc {
        color: #666;
        font-size: 14px;
        line-height: 1.5;
        margin: 0 0 15px 0;
      }
      
      .project-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      
      .tech-tag {
        background: #667eea;
        color: white;
        padding: 4px 12px;
        border-radius: 15px;
        font-size: 12px;
      }
      
      @media print {
        .creative-resume {
          max-width: 100%;
          border-radius: 0;
          box-shadow: none;
        }
        
        .creative-header {
          background: #667eea !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        .tag, .tech-tag {
          background: #667eea !important;
          color: white !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
        themeColors: {
            primary: "#667eea",
            secondary: "#764ba2",
            background: "#ffffff",
            text: "#333333",
            accent: "#4c51bf"
        },
        sections: [
            {
                name: "Personal Information",
                type: "personal",
                required: true,
                maxItems: 1,
                order: 1
            },
            {
                name: "Professional Summary",
                type: "summary",
                required: true,
                maxItems: 1,
                order: 3
            },
            {
                name: "Work Experience",
                type: "experience",
                required: false,
                maxItems: 10,
                order: 4
            },
            {
                name: "Education",
                type: "education",
                required: false,
                maxItems: 10,
                order: 5
            },
            {
                name: "Skills",
                type: "skills",
                required: false,
                maxItems: 20,
                order: 6
            },
            {
                name: "Languages",
                type: "languages",
                required: false,
                maxItems: 8,
                order: 7
            },
            {
                name: "Projects",
                type: "projects",
                required: false,
                maxItems: 10,
                order: 8
            }
        ],
        isActive: true,
        version: "1.0"
    },
    {
        templateName: "Minimal Clean",
        previewImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        htmlStructure: `
      <div class="minimal-resume">
        <header class="minimal-header">
          <div class="header-main">
            <h1>{{personalInfo.fullName}}</h1>
            <h2>{{personalInfo.jobTitle}}</h2>
          </div>
          <div class="header-contact">
            <p><strong>Email:</strong> {{contactInfo.email}}</p>
            <p><strong>Phone:</strong> {{contactInfo.phone}}</p>
            <p><strong>Location:</strong> {{contactInfo.address}}</p>
            {{#if contactInfo.website}}<p><strong>Website:</strong> {{contactInfo.website}}</p>{{/if}}
          </div>
        </header>
        
        <div class="minimal-body">
          {{#if personalInfo.summary}}
          <section class="summary-section">
            <h3>Summary</h3>
            <p>{{personalInfo.summary}}</p>
          </section>
          {{/if}}
          
          {{#if workExperience.length}}
          <section class="experience-section">
            <h3>Experience</h3>
            {{#each workExperience}}
            <div class="experience-item">
              <div class="experience-title">
                <h4>{{position}}</h4>
                <span class="experience-date">{{formatDate startDate "MMM YYYY"}} - {{#if isCurrent}}Present{{else}}{{formatDate endDate "MMM YYYY"}}{{/if}}</span>
              </div>
              <p class="experience-company">{{company}}</p>
              <p class="experience-description">{{description}}</p>
            </div>
            {{/each}}
          </section>
          {{/if}}
          
          {{#if education.length}}
          <section class="education-section">
            <h3>Education</h3>
            {{#each education}}
            <div class="education-item">
              <div class="education-title">
                <h4>{{degree}}</h4>
                <span class="education-date">{{formatDate startDate "YYYY"}} - {{formatDate endDate "YYYY"}}</span>
              </div>
              <p class="education-institution">{{institution}}</p>
              {{#if description}}
              <p class="education-description">{{description}}</p>
              {{/if}}
            </div>
            {{/each}}
          </section>
          {{/if}}
          
          {{#if skills.length}}
          <section class="skills-section">
            <h3>Skills</h3>
            <div class="skills-list">
              {{#each skills}}
              <span class="skill-item">{{name}}</span>
              {{/each}}
            </div>
          </section>
          {{/if}}
        </div>
      </div>
    `,
        cssStyles: `
      .minimal-resume {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        max-width: 210mm;
        margin: 0 auto;
        background: #ffffff;
        color: #333333;
        line-height: 1.6;
      }
      
      .minimal-header {
        padding: 40px;
        border-bottom: 2px solid #e8e8e8;
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 40px;
      }
      
      .header-main h1 {
        font-size: 36px;
        margin: 0 0 10px 0;
        font-weight: 300;
        letter-spacing: -0.5px;
        color: #222;
      }
      
      .header-main h2 {
        font-size: 18px;
        margin: 0;
        font-weight: 400;
        color: #666;
      }
      
      .header-contact {
        font-size: 14px;
      }
      
      .header-contact p {
        margin: 8px 0;
      }
      
      .header-contact strong {
        font-weight: 600;
        color: #222;
      }
      
      .minimal-body {
        padding: 40px;
      }
      
      section {
        margin-bottom: 40px;
      }
      
      h3 {
        font-size: 18px;
        font-weight: 600;
        color: #222;
        margin: 0 0 20px 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #e8e8e8;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .summary-section p {
        font-size: 16px;
        line-height: 1.8;
        color: #444;
        margin: 0;
      }
      
      .experience-item, .education-item {
        margin-bottom: 25px;
      }
      
      .experience-title, .education-title {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 5px;
      }
      
      .experience-item h4, .education-item h4 {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
        color: #222;
      }
      
      .experience-date, .education-date {
        font-size: 14px;
        color: #666;
        font-weight: 400;
      }
      
      .experience-company, .education-institution {
        font-size: 15px;
        color: #444;
        margin: 5px 0;
        font-weight: 500;
      }
      
      .experience-description, .education-description {
        font-size: 15px;
        color: #666;
        margin: 10px 0 0 0;
        line-height: 1.6;
      }
      
      .skills-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      
      .skill-item {
        background: #f5f5f5;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
        color: #444;
      }
      
      @media print {
        .minimal-resume {
          max-width: 100%;
          padding: 0;
        }
        
        .minimal-header {
          border-bottom: 2px solid #e8e8e8;
        }
        
        h3 {
          border-bottom: 1px solid #e8e8e8;
        }
      }
    `,
        themeColors: {
            primary: "#333333",
            secondary: "#666666",
            background: "#ffffff",
            text: "#333333",
            accent: "#555555"
        },
        sections: [
            {
                name: "Personal Information",
                type: "personal",
                required: true,
                maxItems: 1,
                order: 1
            },
            {
                name: "Professional Summary",
                type: "summary",
                required: false,
                maxItems: 1,
                order: 3
            },
            {
                name: "Work Experience",
                type: "experience",
                required: false,
                maxItems: 10,
                order: 4
            },
            {
                name: "Education",
                type: "education",
                required: false,
                maxItems: 10,
                order: 5
            },
            {
                name: "Skills",
                type: "skills",
                required: false,
                maxItems: 15,
                order: 6
            }
        ],
        isActive: true,
        version: "1.0"
    }
];

const seedTemplates = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/torobchedb');

        console.log('✅ Connected to MongoDB');

        // Clear existing templates
        await ResumeTemplate.deleteMany({});
        console.log('🗑️  Cleared existing templates');

        // Insert new templates
        const createdTemplates = await ResumeTemplate.insertMany(templates);
        console.log(`✅ Seeded ${createdTemplates.length} resume templates`);

        // Display created templates
        createdTemplates.forEach((template, index) => {
            console.log(`${index + 1}. ${template.templateName}`);
            console.log(`   Sections: ${template.sections.length}`);
            console.log(`   Theme: ${Object.values(template.themeColors).join(', ')}`);
            console.log('---');
        });

        console.log('🎉 Seeding completed successfully!');

        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedTemplates();