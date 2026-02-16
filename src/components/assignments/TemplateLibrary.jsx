import React from 'react';
import { FileText, Copy, ExternalLink, Download } from 'lucide-react';

const TemplateLibrary = () => {
    const templates = [
        {
            id: 'content-calendar',
            title: 'Social Media Content Calendar',
            description: 'A semester-long planning grid for scheduling posts across multiple platforms.',
            originalUrl: 'https://docs.google.com/document/d/1XlM8Fh3z4qR5yQ9_J7Lk6g/edit', // Placeholder
            category: 'Planning'
        },
        {
            id: 'influencer-outreach',
            title: 'Influencer Outreach Scripts',
            description: 'Templates for initial contact, follow-up, and collaboration proposals.',
            originalUrl: 'https://docs.google.com/document/d/1YnQ7oP8wZ2aX3b4c5d6e7f8/edit', // Placeholder
            category: 'Communication'
        },
        {
            id: 'crisis-response',
            title: 'Crisis Response Flowchart',
            description: 'Step-by-step protocol for handling negative social media engagement.',
            originalUrl: 'https://docs.google.com/document/d/1A-B2c3d4e5f6g7h8i9j0k/edit', // Placeholder
            category: 'Strategy'
        },
        {
            id: 'analytics-report',
            title: 'Monthly Analytics Report Shell',
            description: 'Blank structure for reporting KPIs, growth, and engagement metrics.',
            originalUrl: 'https://docs.google.com/document/d/1m2n3o4p5q6r7s8t9u0v/edit', // Placeholder
            category: 'Reporting'
        }
    ];

    const getForceCopyUrl = (url) => {
        return url.replace(/\/edit.*$/, '/copy');
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm">
                <h2 className="text-2xl font-display font-bold text-ucf-black mb-4">External Resource Library</h2>
                <p className="text-neutral-600 mb-8 max-w-3xl">
                    These are standard templates used in the industry. Click <strong>"Get Student Copy"</strong> to generate a specialized link that will force your students to make their own copy of the document, ensuring they don't overwrite the master template.
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

                            <div className="flex space-x-3">
                                <a
                                    href={getForceCopyUrl(template.originalUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center px-4 py-2 bg-ucf-black text-white text-sm font-bold rounded-lg hover:bg-ucf-gold hover:text-ucf-black transition-colors"
                                >
                                    <Copy className="w-4 h-4 mr-2" /> Get Student Copy
                                </a>
                                <a
                                    href={template.originalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center px-3 py-2 bg-white border border-neutral-300 text-neutral-600 text-sm font-bold rounded-lg hover:bg-neutral-50 transition-colors"
                                    title="Preview Original"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplateLibrary;
