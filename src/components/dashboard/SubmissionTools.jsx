import React from 'react';
import { FileText, MonitorPlay, Download, CheckCircle } from 'lucide-react';
import { generatePDF, generatePPTX } from '../../utils/documentGenerators';

const SubmissionTools = ({ courseCode, courseName, topics }) => {

    const handleGeneratePDF = () => generatePDF(courseCode, courseName, topics);
    const handleGeneratePPTX = () => generatePPTX(courseCode, courseName, topics);

    return (
        <div className="bg-neutral-900 border-l-4 border-ucf-gold rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-white mb-4 flex items-center text-lg font-display">
                <Download className="w-5 h-5 mr-2 text-ucf-gold" />
                Submission Tools
            </h3>
            <p className="text-sm text-neutral-400 mb-4">
                Download a starter file to complete your assignment.
            </p>

            <div className="space-y-3">
                <button
                    onClick={handleGeneratePDF}
                    className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg transition-colors group text-left"
                >
                    <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-3 text-ucf-gold" />
                        <div>
                            <div className="font-bold text-sm">Download Worksheet</div>
                            <div className="text-xs text-neutral-400">PDF Template</div>
                        </div>
                    </div>
                    <Download className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <button
                    onClick={handleGeneratePPTX}
                    className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg transition-colors group text-left"
                >
                    <div className="flex items-center">
                        <MonitorPlay className="w-5 h-5 mr-3 text-ucf-gold" />
                        <div>
                            <div className="font-bold text-sm">Export Presentation</div>
                            <div className="text-xs text-neutral-400">PowerPoint Deck</div>
                        </div>
                    </div>
                    <Download className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            </div>
        </div>
    );
};

export default SubmissionTools;
