import React, { useRef } from 'react';
import { Download, Printer, AlertTriangle, ArrowDown } from 'lucide-react';

const CrisisFlowchartPreview = () => {
    const printRef = useRef();

    const handlePrint = () => {
        // Create a hidden iframe to print just the content
        // For simplicity in this preview, we'll try window.print() but note that it prints the whole page usually.
        // A better approach for a specific component is opening a new window.
        const content = printRef.current.innerHTML;
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Crisis Response Flowchart</title>');
        // Add Tailwind via CDN for the print window to keep styles
        printWindow.document.write('<script src="https://cdn.tailwindcss.com"></script>');
        printWindow.document.write('</head><body class="p-8">');
        printWindow.document.write(content);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="space-y-6">
            <div className="bg-red-50 border border-red-100 p-4 rounded-lg flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                    <h4 className="font-bold text-red-900 text-sm">Escalation Protocol</h4>
                    <p className="text-red-800 text-xs mt-1">
                        This flowchart is designed to help student teams react quickly to negative engagement. Key principle: Never delete negative comments unless they violate platform terms (hate speech, spam).
                    </p>
                </div>
            </div>

            {/* Flowchart Content */}
            <div ref={printRef} className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm flex flex-col items-center space-y-4">
                <h2 className="text-xl font-bold font-display text-ucf-black mb-6 text-center">Social Media Crisis Response Decision Tree</h2>

                {/* Node 1 */}
                <div className="bg-neutral-800 text-white px-6 py-3 rounded-full font-bold shadow-md">
                    Negative Comment / Post Detected
                </div>
                <ArrowDown className="text-neutral-400" />

                {/* Node 2 */}
                <div className="bg-white border-2 border-ucf-gold px-6 py-3 rounded-lg font-bold shadow-sm max-w-md text-center">
                    Is it a legitimate customer complaint?
                </div>

                <div className="grid grid-cols-2 gap-16 w-full max-w-lg mt-2">
                    <div className="flex flex-col items-center">
                        <div className="h-8 border-l-2 border-dashed border-neutral-300"></div>
                        <span className="bg-white px-2 text-xs font-bold text-neutral-500 -mt-2 mb-2">YES</span>
                        <div className="bg-blue-100 text-blue-900 px-4 py-2 rounded border border-blue-200 text-sm font-medium text-center">
                            Respond Publicly w/ Empathy
                            <br /><span className="text-xs opacity-75">("We're sorry to hear this...")</span>
                        </div>
                        <ArrowDown className="text-neutral-400 my-2" />
                        <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded border border-blue-100 text-sm font-medium text-center">
                            Move to DM / Private Channel
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="h-8 border-l-2 border-dashed border-neutral-300"></div>
                        <span className="bg-white px-2 text-xs font-bold text-neutral-500 -mt-2 mb-2">NO (Troll/Spam)</span>
                        <div className="bg-red-100 text-red-900 px-4 py-2 rounded border border-red-200 text-sm font-medium text-center">
                            Does it violate community guidelines?
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-2 w-full">
                            <div className="flex flex-col items-center">
                                <ArrowDown className="text-neutral-400 my-1" />
                                <span className="text-[10px] font-bold text-neutral-400 mb-1">YES</span>
                                <div className="bg-neutral-200 text-neutral-600 px-2 py-1 rounded text-xs font-bold">Block / Report</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <ArrowDown className="text-neutral-400 my-1" />
                                <span className="text-[10px] font-bold text-neutral-400 mb-1">NO</span>
                                <div className="bg-neutral-200 text-neutral-600 px-2 py-1 rounded text-xs font-bold">Monitor / Ignore</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handlePrint}
                    className="flex items-center px-4 py-2 bg-ucf-black text-white font-bold rounded-lg hover:bg-ucf-gold hover:text-ucf-black transition-colors"
                >
                    <Printer className="w-4 h-4 mr-2" /> Print / Save PDF
                </button>
            </div>
        </div>
    );
};

export default CrisisFlowchartPreview;
