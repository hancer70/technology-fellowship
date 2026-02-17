import React from 'react';
import { CheckSquare } from 'lucide-react';

const SubmissionChecklist = ({ data }) => {
    // Default items that are always required
    const checklistItems = [
        "PDF Report (Max 2 Pages)",
        "Strategic Commentary / Analysis",
    ];

    // Conditional items based on modules
    const selectedModules = data?.selectedModules || [];

    if (selectedModules.includes('google-trends')) {
        checklistItems.push("Google Trends Graph (Screenshot)");
        checklistItems.push("Keyword Comparison Analysis");
    }

    if (selectedModules.includes('social-blade')) {
        checklistItems.push("Social Blade Growth Chart (Screenshot)");
        checklistItems.push("Engagement Rate Calculation");
        checklistItems.push("Social Blade Login Verification (Prerequisite)");
    }

    // Attempt to guess if SWOT is needed based on template type (passed via data or context)
    // For now, hardcode SWOT as it's in the text of the Social Audit
    checklistItems.push("SWOT Analysis (2 Strengths, 2 Weaknesses)");

    return (
        <div className="mt-8 border-t-2 border-neutral-100 pt-8 break-inside-avoid">
            <h2 className="text-xl font-sans font-bold text-ucf-black mb-4 flex items-center">
                <CheckSquare className="w-5 h-5 mr-2 text-ucf-gold" />
                Submission Checklist
            </h2>
            <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                <p className="text-sm text-neutral-500 mb-4 italic">
                    Please ensure the following items are included in your final submission:
                </p>
                <ul className="space-y-3">
                    {checklistItems.map((item, index) => (
                        <li key={index} className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id={`checklist-item-${index}`}
                                    type="checkbox"
                                    className="focus:ring-ucf-gold h-4 w-4 text-ucf-gold border-gray-300 rounded"
                                />
                            </div>
                            <label htmlFor={`checklist-item-${index}`} className="ml-3 text-sm font-medium text-neutral-700">
                                {item}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SubmissionChecklist;
