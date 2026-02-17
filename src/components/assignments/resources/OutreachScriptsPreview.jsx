import React, { useState } from 'react';
import { Copy, Download, Check, MessageSquare } from 'lucide-react';

const OutreachScriptsPreview = () => {
    const [activeTab, setActiveTab] = useState('initial');
    const [copied, setCopied] = useState(false);

    const scripts = {
        initial: {
            title: "Initial Outreach",
            subject: "Collaboration Opportunity with [Brand Name]",
            body: `Hi [Name],\n\nI've been following your content on [Platform] for a while, and I really love how you [Specific Compliment about their style/niche].\n\nMy name is [Your Name], and I manage social media for [Brand Name]. We're currently planning a campaign around [Campaign Theme] and thought your voice would be a perfect fit.\n\nWe aren't looking for a transactional ad—we'd love to co-create something that brings value to both our audiences. Do you have any availability this week to chat briefly?\n\nBest,\n[Your Name]`
        },
        followup: {
            title: "Follow-Up (3 Days Later)",
            subject: "Re: Collaboration Opportunity",
            body: `Hi [Name],\n\nJust bumping this to the top of your inbox in case it got buried!\n\nWe're finalizing our partners for the [Campaign Theme] launch next month and would still love to have you involved. No pressure at all, but let me know if you're open to discussing it.\n\nThanks,\n[Your Name]`
        },
        agreement: {
            title: "Agreement Confirmation",
            subject: "Collaboration Details: [Brand] + [Influencer]",
            body: `Hi [Name],\n\nSo glad you're on board! As discussed, here are the details for our upcoming collaboration:\n\n- Deliverables: [X Posts, X Stories]\n- Timeline: Draft due by [Date], Live by [Date]\n- Compensation: [Amount/Product]\n- Key Message: [1-2 sentences on what needs to be conveyed]\n\nPlease reply with a "Confirmed" to lock this in. Can't wait to see what you create!\n\nBest,\n[Your Name]`
        }
    };

    const currentScript = scripts[activeTab];

    const handleCopy = () => {
        const textToCopy = `Subject: ${currentScript.subject}\n\n${currentScript.body}`;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const textContent = `TEMPLATE: ${currentScript.title}\nSUBJECT: ${currentScript.subject}\n\n${currentScript.body}`;
        const element = document.createElement("a");
        const file = new Blob([textContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${activeTab}_outreach_script.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-100 p-4 rounded-lg flex items-start">
                <MessageSquare className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                    <h4 className="font-bold text-purple-900 text-sm">Professional Communication Standards</h4>
                    <p className="text-purple-800 text-xs mt-1">
                        Remind students that personalization is key. The bracketed sections [ ] must be customized for every single recipient to avoid looking like spam.
                    </p>
                </div>
            </div>

            <div className="flex border-b border-neutral-200">
                {Object.keys(scripts).map((key) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === key
                                ? 'border-ucf-gold text-ucf-black'
                                : 'border-transparent text-neutral-500 hover:text-neutral-700'
                            }`}
                    >
                        {scripts[key].title}
                    </button>
                ))}
            </div>

            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 font-mono text-sm text-neutral-700 whitespace-pre-wrap leading-relaxed shadow-inner">
                <div className="mb-4 pb-4 border-b border-neutral-200 text-neutral-500">
                    <span className="font-bold text-neutral-700">Subject:</span> {currentScript.subject}
                </div>
                {currentScript.body}
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    onClick={handleCopy}
                    className="flex items-center px-4 py-2 bg-white border border-neutral-300 text-neutral-700 font-bold rounded-lg hover:bg-neutral-50 transition-colors"
                >
                    {copied ? <Check className="w-4 h-4 mr-2 text-green-600" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Copied!" : "Copy to Clipboard"}
                </button>
                <button
                    onClick={handleDownload}
                    className="flex items-center px-4 py-2 bg-ucf-gold text-ucf-black font-bold rounded-lg hover:bg-ucf-gold-dark hover:text-white transition-colors"
                >
                    <Download className="w-4 h-4 mr-2" /> Download .TXT
                </button>
            </div>
        </div>
    );
};

export default OutreachScriptsPreview;
