// client/src/context/ResumeContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'react-hot-toast';

const ResumeContext = createContext();

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState(() => {
        try {
            const savedData = localStorage.getItem('resumeData');
            return savedData ? JSON.parse(savedData) : getInitialData();
        } catch (error) {
            console.error('Error loading resume data:', error);
            return getInitialData();
        }
    });

    const [resumesList, setResumesList] = useState(() => {
        try {
            const savedList = localStorage.getItem('resumesList');
            return savedList ? JSON.parse(savedList) : [];
        } catch (error) {
            console.error('Error loading resumes list:', error);
            return [];
        }
    });

    function getInitialData() {
        return {
            templateId: 'modern',
            personalInfo: {
                fullName: '',
                title: '',
                email: '',
                phone: '',
                address: {
                    street: '',
                    city: '',
                    state: '',
                    country: '',
                    postalCode: ''
                },
                about: '',
                website: '',
                linkedin: '',
                github: ''
            },
            experience: [],
            education: [],
            skills: [],
            projects: [],
            languages: [],
            certifications: [],
            references: []
        };
    }

    // ذخیره resumeData در localStorage
    useEffect(() => {
        try {
            localStorage.setItem('resumeData', JSON.stringify(resumeData));
        } catch (error) {
            console.error('Error saving resume data:', error);
        }
    }, [resumeData]);

    // ذخیره resumesList در localStorage
    useEffect(() => {
        try {
            localStorage.setItem('resumesList', JSON.stringify(resumesList));
        } catch (error) {
            console.error('Error saving resumes list:', error);
        }
    }, [resumesList]);

    // =============== تابع saveResume اصلاح شده ===============
    const saveResume = useCallback(async (resumeName = 'رزومه جدید') => {
        try {
            console.log('🚀 شروع عملیات ذخیره رزومه:', resumeName);

            // 1. اعتبارسنجی داده‌های ضروری
            if (!resumeData || !resumeData.personalInfo?.fullName) {
                toast.error('لطفا ابتدا اطلاعات شخصی را تکمیل کنید');
                return null;
            }

            // 2. ایجاد ID منحصر بفرد برای ذخیره محلی
            const localResumeId = `resume_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            // 3. ساختار داده‌ها برای ارسال به سرور
            const requestData = {
                templateId: resumeData.templateId || 'modern',
                personalInfo: {
                    fullName: resumeData.personalInfo?.fullName || '',
                    title: resumeData.personalInfo?.title || '',
                    email: resumeData.personalInfo?.email || 'no-email@example.com',
                    phone: resumeData.personalInfo?.phone || '',
                    about: resumeData.personalInfo?.about || '',
                    website: resumeData.personalInfo?.website || '',
                    linkedin: resumeData.personalInfo?.linkedin || '',
                    github: resumeData.personalInfo?.github || ''
                },
                experience: (resumeData.experience || []).map(exp => ({
                    jobTitle: exp.jobTitle || '',
                    company: exp.company || '',
                    startDate: exp.startDate || '',
                    endDate: exp.endDate || '',
                    description: exp.description || '',
                    current: exp.current || false
                })),
                education: (resumeData.education || []).map(edu => ({
                    degree: edu.degree || '',
                    field: edu.field || '',
                    institution: edu.institution || '',
                    startDate: edu.startDate || '',
                    endDate: edu.endDate || '',
                    description: edu.description || ''
                })),
                skills: (resumeData.skills || []).map(skill => {
                    if (typeof skill === 'object') {
                        return {
                            name: skill.name || '',
                            level: skill.level || 50
                        };
                    }
                    return { name: skill, level: 50 };
                }),
                projects: (resumeData.projects || []).map(proj => ({
                    name: proj.name || '',
                    description: proj.description || '',
                    link: proj.link || ''
                })),
                languages: resumeData.languages || [],
                certifications: resumeData.certifications || []
            };

            console.log('📤 داده‌های آماده برای ارسال به سرور:', requestData);

            // 4. ذخیره محلی همیشه انجام می‌شود
            const newLocalResume = {
                id: localResumeId,
                name: resumeName,
                data: JSON.parse(JSON.stringify(resumeData)),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                status: 'draft',
                savedLocally: true
            };

            // به‌روزرسانی لیست رزومه‌های محلی
            setResumesList(prev => {
                const newList = [newLocalResume, ...prev.filter(r => r.id !== localResumeId)];
                return newList.slice(0, 20); // حداکثر 20 رزومه
            });

            // 5. تلاش برای ذخیره در سرور
            let serverResult = null;
            let serverError = null;

            try {
                console.log('📡 تلاش برای اتصال به سرور...');

                // آدرس‌های سرور برای امتحان
                const apiUrls = [
                    'http://localhost:5000/api/resumes', // endpoint اصلی
                    'http://localhost:5000/api/resumes/save' // endpoint جایگزین
                ];

                for (const apiUrl of apiUrls) {
                    try {
                        console.log(`🔗 ارسال به: ${apiUrl}`);

                        // ایجاد timeout برای جلوگیری از انتظار طولانی
                        const controller = new AbortController();
                        const timeoutId = setTimeout(() => controller.abort(), 5000);

                        const response = await fetch(apiUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify(requestData),
                            signal: controller.signal,
                            mode: 'cors',
                            credentials: 'omit'
                        });

                        clearTimeout(timeoutId);

                        console.log(`📥 وضعیت پاسخ از ${apiUrl}:`, response.status);

                        if (response.ok) {
                            const result = await response.json();
                            console.log(`✅ پاسخ موفق از ${apiUrl}:`, result);

                            serverResult = {
                                localId: localResumeId,
                                serverId: result.data?.resumeId || result.data?._id,
                                resumeUrl: result.data?.resumeUrl || `http://localhost:5000/resume/${result.data?.resumeId || localResumeId}`,
                                editUrl: result.data?.editUrl || `http://localhost:5000/edit/${result.data?.resumeId || localResumeId}`,
                                synced: true,
                                syncedAt: new Date().toISOString(),
                                serverData: result.data
                            };

                            // به‌روزرسانی رزومه محلی با اطلاعات سرور
                            const updatedResume = {
                                ...newLocalResume,
                                ...serverResult
                            };

                            setResumesList(prev =>
                                prev.map(resume =>
                                    resume.id === localResumeId ? updatedResume : resume
                                )
                            );

                            toast.success('✅ رزومه در سرور ذخیره شد!', {
                                icon: '💾',
                                duration: 4000,
                                style: {
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    color: 'white',
                                    borderRadius: '10px'
                                }
                            });

                            break; // اگر موفق شدیم، حلقه را قطع کن

                        } else if (response.status === 404) {
                            console.log(`⚠️ Endpoint ${apiUrl} یافت نشد`);
                            continue; // endpoint بعدی را امتحان کن
                        } else {
                            serverError = new Error(`سرور خطا داد: ${response.status} ${response.statusText}`);
                            console.warn(`⚠️ خطای سرور از ${apiUrl}:`, response.status);
                            continue;
                        }

                    } catch (fetchError) {
                        serverError = fetchError;
                        console.warn(`❌ خطای شبکه برای ${apiUrl}:`, fetchError.message);
                        continue; // endpoint بعدی را امتحان کن
                    }
                }

                // اگر هیچکدام از endpointها جواب نداد
                if (!serverResult && serverError) {
                    throw serverError;
                }

            } catch (serverError) {
                console.warn('⚠️ خطا در ارتباط با سرور، ذخیره آفلاین:', serverError.message);

                // 6. ذخیره آفلاین در IndexedDB
                try {
                    await saveToIndexedDB(newLocalResume);
                    console.log('💾 ذخیره در IndexedDB موفق بود');
                } catch (dbError) {
                    console.warn('⚠️ خطا در ذخیره IndexedDB:', dbError);
                }

                serverResult = {
                    localId: localResumeId,
                    offline: true,
                    message: 'رزومه در حالت آفلاین ذخیره شد'
                };

                toast.success('📱 رزومه در مرورگر ذخیره شد (آفلاین)', {
                    icon: '📂',
                    duration: 4000,
                    style: {
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: 'white',
                        borderRadius: '10px'
                    }
                });
            }

            console.log('🎉 عملیات ذخیره کامل شد:', serverResult);
            return serverResult || { localId: localResumeId, message: 'ذخیره انجام شد' };

        } catch (error) {
            console.error('🔥 خطای کلی در ذخیره رزومه:', error);

            toast.error(`❌ خطا در ذخیره رزومه: ${error.message}`, {
                icon: '⚠️',
                duration: 5000,
                style: {
                    background: '#ef4444',
                    color: 'white',
                    borderRadius: '10px'
                }
            });

            return null;
        }
    }, [resumeData]);

    // تابع کمکی برای ذخیره در IndexedDB
    const saveToIndexedDB = useCallback(async (resume) => {
        return new Promise((resolve, reject) => {
            // بررسی پشتیبانی مرورگر از IndexedDB
            if (!('indexedDB' in window)) {
                console.log('⚠️ IndexedDB در این مرورگر پشتیبانی نمی‌شود');
                resolve();
                return;
            }

            const request = indexedDB.open('ResumeBuilderDB', 1);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('resumes')) {
                    db.createObjectStore('resumes', { keyPath: 'id' });
                    console.log('✅ ایجاد object store برای رزومه‌ها');
                }
            };

            request.onsuccess = (event) => {
                const db = event.target.result;

                // بررسی اینکه آیا object store وجود دارد
                if (!db.objectStoreNames.contains('resumes')) {
                    reject(new Error('object store وجود ندارد'));
                    return;
                }

                const transaction = db.transaction('resumes', 'readwrite');
                const store = transaction.objectStore('resumes');

                const putRequest = store.put(resume);

                putRequest.onsuccess = () => {
                    console.log('✅ ذخیره در IndexedDB موفق:', resume.id);
                    resolve();
                };

                putRequest.onerror = (error) => {
                    console.error('❌ خطا در ذخیره IndexedDB:', error);
                    reject(error);
                };

                transaction.oncomplete = () => {
                    db.close();
                };
            };

            request.onerror = (error) => {
                console.error('❌ خطا در باز کردن IndexedDB:', error);
                reject(error);
            };
        });
    }, []);

    // =============== تابع دانلود PDF ===============
    const downloadResume = useCallback(async (customTemplateId = null) => {
        try {
            console.log('🚀 شروع ایجاد PDF...');

            // نمایش پیام در حال پردازش
            const loadingToast = toast.loading('در حال ایجاد PDF... لطفا صبر کنید');

            // ایجاد HTML ایمن برای PDF
            const safeHtml = createSafeHtmlForPdf(resumeData);

            // ایجاد یک عنصر موقت
            const tempDiv = document.createElement('div');
            tempDiv.style.cssText = `
                position: fixed;
                left: -9999px;
                top: -9999px;
                width: 210mm;
                min-height: 297mm;
                background-color: #ffffff;
                color: #000000;
                padding: 20mm;
                font-family: 'Vazirmatn', Arial, sans-serif;
                direction: rtl;
                z-index: -9999;
                line-height: 1.6;
            `;
            tempDiv.innerHTML = safeHtml;

            document.body.appendChild(tempDiv);

            // صبر برای رندر شدن
            await new Promise(resolve => setTimeout(resolve, 500));

            // گرفتن عکس از عنصر
            const canvas = await html2canvas(tempDiv, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                allowTaint: false,
                onclone: (clonedDoc) => {
                    // اطمینان از رندر صحیح در clone
                    const clonedElement = clonedDoc.querySelector('div');
                    if (clonedElement) {
                        clonedElement.style.fontFamily = "'Vazirmatn', Arial, sans-serif";
                    }
                }
            });

            // حذف عنصر موقت
            document.body.removeChild(tempDiv);

            // ایجاد PDF
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 190; // عرض با حاشیه
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            const imgData = canvas.toDataURL('image/png', 1.0);
            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

            // نام فایل
            const name = resumeData.personalInfo?.fullName?.replace(/\s+/g, '_') || 'رزومه';
            const date = new Date().toLocaleDateString('fa-IR').replace(/\//g, '-');
            const template = customTemplateId || resumeData.templateId || 'modern';
            const fileName = `${name}_${template}_${date}.pdf`;

            // ذخیره PDF
            pdf.save(fileName);

            // بستن toast لودینگ
            toast.dismiss(loadingToast);

            console.log('✅ PDF با موفقیت ایجاد شد:', fileName);

            toast.success('✅ PDF با موفقیت دانلود شد!', {
                icon: '📥',
                duration: 3000,
                style: {
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    borderRadius: '10px'
                }
            });

            return true;

        } catch (error) {
            console.error('❌ خطا در ایجاد PDF:', error);

            toast.error('❌ خطا در ایجاد PDF. لطفا دوباره تلاش کنید.', {
                duration: 4000,
                icon: '⚠️',
                style: {
                    background: '#ef4444',
                    color: 'white'
                }
            });

            throw error;
        }
    }, [resumeData]);

    // =============== تابع برای ایجاد HTML ایمن برای PDF ===============
    const createSafeHtmlForPdf = (data) => {
        // تابع کمکی برای فرار کردن HTML
        const escapeHtml = (text) => {
            if (!text) return '';
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        };

        return `
<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>رزومه - ${escapeHtml(data.personalInfo?.fullName || 'من')}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Vazirmatn', sans-serif;
        }
        
        body {
            padding: 15mm;
            background-color: #ffffff;
            color: #000000;
            direction: rtl;
            width: 210mm;
            min-height: 297mm;
            font-size: 12pt;
            line-height: 1.6;
        }
        
        .resume-container {
            max-width: 100%;
        }
        
        .header {
            text-align: center;
            margin-bottom: 25px;
            border-bottom: 3px solid #1e40af;
            padding-bottom: 20px;
        }
        
        .header h1 {
            color: #1e40af;
            font-size: 28pt;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .header h2 {
            color: #374151;
            font-size: 18pt;
            margin-bottom: 15px;
            font-weight: 500;
        }
        
        .contact-info {
            color: #6b7280;
            font-size: 11pt;
            line-height: 1.8;
        }
        
        .contact-info div {
            margin-bottom: 5px;
        }
        
        .section {
            margin-bottom: 20px;
            page-break-inside: avoid;
        }
        
        .section-title {
            color: #1e40af;
            font-size: 16pt;
            border-bottom: 2px solid #d1d5db;
            padding-bottom: 8px;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .item {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px dashed #e5e7eb;
        }
        
        .item-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            align-items: flex-start;
        }
        
        .item-title {
            color: #111827;
            font-weight: 600;
            font-size: 13pt;
        }
        
        .item-date {
            color: #6b7280;
            font-size: 11pt;
            white-space: nowrap;
        }
        
        .item-subtitle {
            color: #374151;
            margin-bottom: 5px;
            font-size: 12pt;
        }
        
        .item-description {
            color: #6b7280;
            font-size: 11pt;
            line-height: 1.6;
            margin-top: 8px;
        }
        
        .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
        }
        
        .skill-tag {
            background-color: #e0e7ff;
            color: #3730a3;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 11pt;
            display: inline-block;
        }
        
        .about-text {
            max-width: 600px;
            margin: 15px auto 0;
            line-height: 1.6;
            text-align: center;
            font-size: 11pt;
            color: #4b5563;
        }
        
        .page-break {
            page-break-before: always;
        }
        
        /* برای چاپ */
        @media print {
            body {
                padding: 0;
                margin: 0;
            }
            
            .no-print {
                display: none !important;
            }
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <!-- بخش اطلاعات شخصی -->
        <div class="header">
            <h1>${escapeHtml(data.personalInfo?.fullName || '')}</h1>
            ${data.personalInfo?.title ? `<h2>${escapeHtml(data.personalInfo.title)}</h2>` : ''}
            <div class="contact-info">
                ${data.personalInfo?.email ? `<div>📧 ${escapeHtml(data.personalInfo.email)}</div>` : ''}
                ${data.personalInfo?.phone ? `<div>📱 ${escapeHtml(data.personalInfo.phone)}</div>` : ''}
                ${data.personalInfo?.about ? `<div class="about-text">${escapeHtml(data.personalInfo.about)}</div>` : ''}
            </div>
        </div>
        
        <!-- بخش تجربیات -->
        ${data.experience?.length > 0 ? `
            <div class="section">
                <h3 class="section-title">سوابق کاری</h3>
                ${data.experience.map(exp => `
                    <div class="item">
                        <div class="item-header">
                            <span class="item-title">${escapeHtml(exp.jobTitle || '')}</span>
                            <span class="item-date">${escapeHtml(exp.startDate || '')} - ${escapeHtml(exp.current ? 'اکنون' : (exp.endDate || ''))}</span>
                        </div>
                        ${exp.company ? `<div class="item-subtitle">${escapeHtml(exp.company)}</div>` : ''}
                        ${exp.description ? `<div class="item-description">${escapeHtml(exp.description)}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        <!-- بخش مهارت‌ها -->
        ${data.skills?.length > 0 ? `
            <div class="section">
                <h3 class="section-title">مهارت‌ها</h3>
                <div class="skills-container">
                    ${data.skills.map(skill => {
            const skillName = typeof skill === 'object' ? skill.name : skill;
            return `<span class="skill-tag">${escapeHtml(skillName)}</span>`;
        }).join('')}
                </div>
            </div>
        ` : ''}
        
        <!-- بخش تحصیلات -->
        ${data.education?.length > 0 ? `
            <div class="section">
                <h3 class="section-title">تحصیلات</h3>
                ${data.education.map(edu => `
                    <div class="item">
                        <div class="item-header">
                            <span class="item-title">${escapeHtml(edu.degree || '')} ${edu.field ? `در ${escapeHtml(edu.field)}` : ''}</span>
                            <span class="item-date">${escapeHtml(edu.startDate || '')} - ${escapeHtml(edu.endDate || '')}</span>
                        </div>
                        ${edu.institution ? `<div class="item-subtitle">${escapeHtml(edu.institution)}</div>` : ''}
                        ${edu.description ? `<div class="item-description">${escapeHtml(edu.description)}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        <!-- بخش پروژه‌ها -->
        ${data.projects?.length > 0 ? `
            <div class="section">
                <h3 class="section-title">پروژه‌ها</h3>
                ${data.projects.map(project => `
                    <div class="item">
                        <div class="item-header">
                            <span class="item-title">${escapeHtml(project.name || '')}</span>
                        </div>
                        ${project.description ? `<div class="item-description">${escapeHtml(project.description)}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        <!-- بخش زبان‌ها -->
        ${data.languages?.length > 0 ? `
            <div class="section">
                <h3 class="section-title">زبان‌ها</h3>
                <div class="skills-container">
                    ${data.languages.map(lang => {
            const langName = typeof lang === 'object' ? lang.name || lang.language : lang;
            return `<span class="skill-tag">${escapeHtml(langName)}</span>`;
        }).join('')}
                </div>
            </div>
        ` : ''}
    </div>
</body>
</html>`;
    };

    // =============== سایر توابع context ===============

    const updateResumeData = useCallback((section, data) => {
        setResumeData(prev => ({
            ...prev,
            [section]: data
        }));
    }, []);

    const updateNestedResumeData = useCallback((section, subSection, data) => {
        setResumeData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [subSection]: data
            }
        }));
    }, []);

    const addItem = useCallback((section, item) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...(prev[section] || []), item]
        }));
    }, []);

    const updateItem = useCallback((section, index, updatedItem) => {
        setResumeData(prev => {
            const newArray = [...(prev[section] || [])];
            if (index >= 0 && index < newArray.length) {
                newArray[index] = updatedItem;
            }
            return {
                ...prev,
                [section]: newArray
            };
        });
    }, []);

    const removeItem = useCallback((section, index) => {
        setResumeData(prev => ({
            ...prev,
            [section]: (prev[section] || []).filter((_, i) => i !== index)
        }));
    }, []);

    const clearResumeData = useCallback(() => {
        setResumeData(getInitialData());
        toast.success('رزومه پاک شد');
    }, []);

    const loadResume = useCallback((resumeId) => {
        try {
            // جستجو در لیست محلی
            const resume = resumesList.find(r => r.id === resumeId);
            if (resume) {
                setResumeData(resume.data);
                toast.success('📂 رزومه با موفقیت بارگذاری شد', {
                    icon: '📂',
                    duration: 3000
                });
                return true;
            }

            // جستجو در localStorage
            const savedResumes = JSON.parse(localStorage.getItem('resumesList') || '[]');
            const localResume = savedResumes.find(r => r.id === resumeId);
            if (localResume) {
                setResumeData(localResume.data);
                toast.success('📂 رزومه از ذخیره محلی بارگذاری شد', {
                    duration: 3000
                });
                return true;
            }

            toast.error('❌ رزومه یافت نشد', {
                duration: 3000
            });
            return false;

        } catch (error) {
            console.error('خطا در بارگذاری رزومه:', error);
            toast.error('❌ خطا در بارگذاری رزومه');
            return false;
        }
    }, [resumesList]);

    const deleteResume = useCallback((resumeId) => {
        try {
            // حذف از state
            setResumesList(prev => prev.filter(r => r.id !== resumeId));

            // حذف از localStorage
            const savedResumes = JSON.parse(localStorage.getItem('resumesList') || '[]');
            const filteredResumes = savedResumes.filter(r => r.id !== resumeId);
            localStorage.setItem('resumesList', JSON.stringify(filteredResumes));

            toast.success('🗑️ رزومه حذف شد', {
                icon: '🗑️',
                duration: 3000
            });
        } catch (error) {
            console.error('خطا در حذف رزومه:', error);
            toast.error('❌ خطا در حذف رزومه');
        }
    }, []);

    const duplicateResume = useCallback((resumeId) => {
        try {
            const originalResume = resumesList.find(r => r.id === resumeId);
            if (!originalResume) {
                toast.error('رزومه مورد نظر یافت نشد');
                return null;
            }

            const newResumeId = `resume_${Date.now()}_copy_${Math.random().toString(36).substr(2, 5)}`;
            const duplicatedResume = {
                ...originalResume,
                id: newResumeId,
                name: `${originalResume.name} (کپی)`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                serverId: undefined,
                synced: false,
                offline: true
            };

            // اضافه کردن به لیست
            setResumesList(prev => [duplicatedResume, ...prev]);

            // ذخیره در localStorage
            const savedResumes = JSON.parse(localStorage.getItem('resumesList') || '[]');
            savedResumes.unshift(duplicatedResume);
            localStorage.setItem('resumesList', JSON.stringify(savedResumes.slice(0, 20)));

            toast.success('📋 رزومه با موفقیت کپی شد', {
                icon: '📋',
                duration: 3000
            });

            return newResumeId;
        } catch (error) {
            console.error('خطا در کپی رزومه:', error);
            toast.error('❌ خطا در کپی رزومه');
            return null;
        }
    }, [resumesList]);

    // ذخیره خودکار
    const autoSaveResume = useCallback(async () => {
        if (resumeData.personalInfo?.fullName) {
            try {
                const autoSaveName = `ذخیره خودکار: ${resumeData.personalInfo.fullName}`;
                await saveResume(autoSaveName);
                console.log('💾 ذخیره خودکار انجام شد');
            } catch (error) {
                console.warn('⚠️ خطا در ذخیره خودکار:', error);
            }
        }
    }, [resumeData, saveResume]);

    // فعال کردن ذخیره خودکار هر 5 دقیقه
    useEffect(() => {
        if (resumeData.personalInfo?.fullName) {
            const autoSaveInterval = setInterval(autoSaveResume, 5 * 60 * 1000);
            return () => clearInterval(autoSaveInterval);
        }
    }, [resumeData, autoSaveResume]);

    // مقدار context
    const value = {
        resumeData,
        setResumeData,
        resumesList,
        updateResumeData,
        updateNestedResumeData,
        addItem,
        updateItem,
        removeItem,
        clearResumeData,
        saveResume,
        loadResume,
        deleteResume,
        duplicateResume,
        downloadResume,
        autoSaveResume
    };

    return (
        <ResumeContext.Provider value={value}>
            {children}
        </ResumeContext.Provider>
    );
};