import React, { useState } from 'react';
import { FileText, Copy, ExternalLink, X, PlayCircle } from 'lucide-react';
import ContentCalendarPreview from './resources/ContentCalendarPreview';
import OutreachScriptsPreview from './resources/OutreachScriptsPreview';
import CrisisFlowchartPreview from './resources/CrisisFlowchartPreview';
import AnalyticsReportPreview from './resources/AnalyticsReportPreview';

const TemplateLibrary = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const templates = [
        {
            id: 'content-calendar',
            title: 'Social Media Content Calendar',
            description: 'A semester-long planning grid for scheduling posts across multiple platforms.',
            component: <ContentCalendarPreview />,
            category: 'Planning'
        },
        {
            id: 'influencer-outreach',
            title: 'Influencer Outreach Scripts',
            description: 'Templates for initial contact, follow-up, and collaboration proposals.',
            component: <OutreachScriptsPreview />,
            category: 'Communication'
        },
        {
            id: 'crisis-response',
            title: 'Crisis Response Flowchart',
            description: 'Step-by-step protocol for handling negative social media engagement.',
            component: <CrisisFlowchartPreview />,
            category: 'Strategy'
        },
        {
            id: 'analytics-report',
            title: 'Monthly Analytics Report Shell',
            description: 'Blank structure for reporting KPIs, growth, and engagement metrics.',
            component: <AnalyticsReportPreview />,
            category: 'Reporting'
        }
    ];

    const openTemplate = (template) => {
        setSelectedTemplate(template);
    };

    const closeTemplate = () => {
        setSelectedTemplate(null);
    };

    return (
        <div className="space-y-8 relative">
            <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm">
                <h2 className="text-2xl font-display font-bold text-ucf-black mb-4">External Resource Library</h2>
                <p className="text-neutral-600 mb-8 max-w-3xl">
                    These are standard templates used in the industry. Click <strong>"Access Tool"</strong> to open an interactive version where you can generate, copy, or download the files for your students.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {templates.map(template => (
                        <div key={template.id} className="border border-neutral-200 rounded-lg p-6 hover:border-ucf-gold transition-colors group bg-neutral-50">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow text-ucf-gold">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 bg-neutral-200 px-2 py-1 rounded">
                                    {template.category}
                                </span>
                            </div>

                            <h3 className="font-bold text-lg text-ucf-black mb-2">{template.title}</h3>
                            <p className="text-sm text-neutral-600 mb-6 min-h-[40px]">{template.description}</p>

                            <button
                                onClick={() => openTemplate(template)}
                                className="w-full flex items-center justify-center px-4 py-2 bg-ucf-black text-white text-sm font-bold rounded-lg hover:bg-ucf-gold hover:text-ucf-black transition-colors"
                            >
                                <PlayCircle className="w-4 h-4 mr-2" /> Access Tool
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Overlay */}
            {selectedTemplate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-neutral-100 flex justify-between items-center bg-neutral-50">
                            <div>
                                <h3 className="text-xl font-bold font-display text-ucf-black">{selectedTemplate.title}</h3>
                                <p className="text-sm text-neutral-500">{selectedTemplate.category} Module</p>
                            </div>
                            <button
                                onClick={closeTemplate}
                                className="p-2 hover:bg-neutral-200 rounded-full transition-colors text-neutral-500"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto bg-white flex-1">
                            {selectedTemplate.component}
                        </div>

                        <div className="p-4 bg-neutral-50 border-t border-neutral-100 text-right text-xs text-neutral-400">
                            Press ESC to close
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TemplateLibrary;
