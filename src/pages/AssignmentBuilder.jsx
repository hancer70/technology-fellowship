import React, { useState } from 'react';
import { useWizard } from '../context/WizardContext';
import { FileText, TrendingUp, Users, Printer, ArrowLeft } from 'lucide-react';
import AssignmentCard from '../components/assignments/AssignmentCard';
import SocialAuditTemplate from '../components/assignments/templates/SocialAuditTemplate';
import TrendAnalysisTemplate from '../components/assignments/templates/TrendAnalysisTemplate';
import AudiencePersonaTemplate from '../components/assignments/templates/AudiencePersonaTemplate';
import TemplateLibrary from '../components/assignments/TemplateLibrary';

const AssignmentBuilder = () => {
    const { state } = useWizard();
    const [activeTab, setActiveTab] = useState('generator'); // 'generator' or 'library'
    const [selectedTemplate, setSelectedTemplate] = useState(null);

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
            <div className="bg-white border-b border-neutral-200">
                <div className="container mx-auto px-6 pt-8">
                    <h1 className="text-4xl font-display font-bold text-ucf-black mb-6">Assignment Builder</h1>
                    <div className="flex space-x-6">
                        <button
                            onClick={() => { setActiveTab('generator'); setSelectedTemplate(null); }}
                            className={`pb-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'generator' ? 'border-ucf-gold text-ucf-black' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}
                        >
                            Assignment Generator
                        </button>
                        <button
                            onClick={() => setActiveTab('library')}
                            className={`pb-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'library' ? 'border-ucf-gold text-ucf-black' : 'border-transparent text-neutral-500 hover:text-neutral-700'}`}
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
                            <p className="text-neutral-600 mb-12 max-w-2xl">
                                Select a template below to automatically generate an assignment brief tailored to your course and tracked topics.
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
                            <div className="mb-6 flex justify-between items-center print:hidden">
                                <button
                                    onClick={() => setSelectedTemplate(null)}
                                    className="flex items-center text-neutral-500 hover:text-ucf-gold transition-colors font-bold"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Templates
                                </button>
                                <button
                                    onClick={handlePrint}
                                    className="flex items-center bg-ucf-black text-white px-4 py-2 rounded-lg font-bold hover:bg-ucf-gold hover:text-ucf-black transition-colors"
                                >
                                    <Printer className="w-4 h-4 mr-2" /> Print / Save PDF
                                </button>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[800px]">
                                {/* Dynamic Template Rendering */}
                                {selectedTemplate === 'audit' && <SocialAuditTemplate data={state} />}
                                {selectedTemplate === 'trends' && <TrendAnalysisTemplate data={state} />}
                                {selectedTemplate === 'persona' && <AudiencePersonaTemplate data={state} />}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AssignmentBuilder;
