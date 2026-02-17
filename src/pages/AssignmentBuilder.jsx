import React, { useState, useEffect } from 'react';
import { useWizard } from '../context/WizardContext';
import { FileText, TrendingUp, Users, Printer, ArrowLeft, Search } from 'lucide-react';
import AssignmentCard from '../components/assignments/AssignmentCard';
import SocialAuditTemplate from '../components/assignments/templates/SocialAuditTemplate';
import TrendAnalysisTemplate from '../components/assignments/templates/TrendAnalysisTemplate';
import AudiencePersonaTemplate from '../components/assignments/templates/AudiencePersonaTemplate';
import TemplateLibrary from '../components/assignments/TemplateLibrary';
import CourseSelector from '../components/wizard/CourseSelector';

const AssignmentBuilder = () => {
    const { state, updateCourseDetails } = useWizard();
    const [activeTab, setActiveTab] = useState('generator'); // 'generator' or 'library'
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    useEffect(() => {
        document.title = 'Assignment Builder | SMA Toolkit';
    }, []);

    // Local state for "tweaking" context, initialized from official DB if available
    const [customContext, setCustomContext] = useState({
        courseName: state.courseDetails.courseCode || 'HFT 3505',
        courseDescription: state.courseContext?.description || state.courseDetails.courseDescription || 'This course focuses on digital marketing strategies for the hospitality and tourism industry.'
    });

    // Update local context if state changes (e.g. if updated in prior wizard step)
    useEffect(() => {
        setCustomContext({
            courseName: state.courseDetails.courseCode,
            courseDescription: state.courseContext?.description || state.courseDetails.courseDescription
        });
    }, [state.courseDetails.courseCode, state.courseContext, state.courseDetails.courseDescription]);

    const handleContextChange = (e) => {
        const { name, value } = e.target;
        setCustomContext(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const templates = [
        {
            id: 'audit',
            title: 'Social Media Audit',
            description: 'A comprehensive evaluation of a brand\'s current digital presence and performance.',
            icon: FileText
        },
        {
            id: 'trends',
            title: 'Competitive Trend Analysis',
            description: 'Compare search interest and market momentum against key competitors.',
            icon: TrendingUp
        },
        {
            id: 'persona',
            title: 'Audience Persona Builder',
            description: 'Develop data-driven customer avatars based on demographic insights.',
            icon: Users
        }
    ];

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-neutral-50 pb-12">
            {/* Header / Tabs */}
            <div className="bg-white border-b border-neutral-200 print:hidden">
                <div className="container mx-auto px-6 pt-8">
                    <h1 className="text-2xl md:text-4xl font-display font-bold text-ucf-black mb-6">Assignment Builder</h1>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                        <button
                            onClick={() => { setActiveTab('generator'); setSelectedTemplate(null); }}
                            className={`pb-4 text-sm font-bold border-b-2 transition-colors text-left sm:text-center ${activeTab === 'generator' ? 'border-ucf-gold text-ucf-black' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}
                        >
                            Assignment Generator
                        </button>
                        <button
                            onClick={() => setActiveTab('library')}
                            className={`pb-4 text-sm font-bold border-b-2 transition-colors text-left sm:text-center ${activeTab === 'library' ? 'border-ucf-gold text-ucf-black' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}
                        >
                            Template Library
                        </button>
                    </div>
                </div>
            </div>

            {activeTab === 'library' ? (
                <div className="container mx-auto px-6 py-8">
                    <TemplateLibrary />
                </div>
            ) : (
                <>
                    {!selectedTemplate ? (
                        // Template Selection View
                        <div className="container mx-auto px-6 py-12">
                            {/* Context Configuration */}
                            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm mb-8">
                                <h2 className="text-lg font-bold text-ucf-black mb-4 flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-ucf-gold" />
                                    Course Context
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="input-label">Course Name / Code</label>
                                        <CourseSelector
                                            register={() => ({})} // Mock register since we aren't using hook-form here
                                            defaultValue={customContext.courseName}
                                            onSelect={(course) => {
                                                setCustomContext({
                                                    courseName: course.code,
                                                    courseDescription: course.description
                                                });
                                                updateCourseDetails({ courseCode: course.code, courseName: course.title }, course);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="input-label">Course Focus (1-2 Sentences)</label>
                                        <textarea
                                            name="courseDescription"
                                            value={customContext.courseDescription}
                                            onChange={handleContextChange}
                                            className="input-field resize-none h-[100px] md:h-[50px]"
                                            placeholder="Briefly describe what this course is about..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <p className="text-neutral-600 mb-8 max-w-2xl">
                                Select a template below. The generator will use your **Course Context** above to customize the assignment brief.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {templates.map(template => (
                                    <AssignmentCard
                                        key={template.id}
                                        {...template}
                                        onClick={() => setSelectedTemplate(template.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        // Assignment Preview View
                        <div className="container mx-auto px-6 py-8">
                            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 print:hidden">
                                <button
                                    onClick={() => setSelectedTemplate(null)}
                                    className="flex items-center text-neutral-500 hover:text-ucf-gold transition-colors font-bold w-full sm:w-auto justify-center sm:justify-start"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Templates
                                </button>
                                <button
                                    onClick={handlePrint}
                                    className="flex items-center bg-ucf-black text-white px-4 py-3 rounded-lg font-bold hover:bg-ucf-gold hover:text-ucf-black transition-colors w-full sm:w-auto justify-center"
                                >
                                    <Printer className="w-4 h-4 mr-2" /> Print / Save PDF
                                </button>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[800px]">
                                {/* Dynamic Template Rendering */}
                                {selectedTemplate === 'audit' && <SocialAuditTemplate data={state} customContext={customContext} />}
                                {selectedTemplate === 'trends' && <TrendAnalysisTemplate data={state} customContext={customContext} />}
                                {selectedTemplate === 'persona' && <AudiencePersonaTemplate data={state} customContext={customContext} />}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AssignmentBuilder;
