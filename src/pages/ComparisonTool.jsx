import React, { useState, useEffect } from 'react';
import ComparisonInput from '../components/comparison/ComparisonInput';
import DualWidgetView from '../components/comparison/DualWidgetView';
import { ArrowLeft } from 'lucide-react';

const ComparisonTool = () => {
    const [comparisonData, setComparisonData] = useState(null);

    useEffect(() => {
        document.title = 'Comparison Tool | SMA Toolkit';
    }, []);

    const handleCompare = (brandA, brandB) => {
        setComparisonData({ brandA, brandB });
    };

    const handleReset = () => {
        setComparisonData(null);
    };

    return (
        <div className="min-h-screen bg-neutral-50 pb-8">
            <div className="container mx-auto px-6 py-6">

                {/* Header */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-neutral-200 shadow-sm">
                    <h2 className="text-xl md:text-2xl font-display font-bold text-ucf-black mb-4 text-center md:text-left">External Resource Library</h2>
                    <p className="text-neutral-600 mb-8 max-w-3xl text-sm md:text-base text-center md:text-left">
                        These are standard templates used in the industry. Click <strong>"Access Tool"</strong> to open an interactive version where you can generate, copy, or download the files for your students.
                    </p>
                </div>

                {/* Main Content Area */}
                {!comparisonData ? (
                    <div className="mt-8">
                        <ComparisonInput onCompare={handleCompare} />

                        <div className="mt-12 text-center">
                            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Popular Comparisons</h3>
                            <div className="flex flex-wrap justify-center gap-2">
                                <button onClick={() => handleCompare('Marriott', 'Hilton')} className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-xs text-neutral-600 hover:border-ucf-gold transition-colors whitespace-nowrap">Marriott vs Hilton</button>
                                <button onClick={() => handleCompare('Disney', 'Universal')} className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-xs text-neutral-600 hover:border-ucf-gold transition-colors whitespace-nowrap">Disney vs Universal</button>
                                <button onClick={() => handleCompare('Uber', 'Lyft')} className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-xs text-neutral-600 hover:border-ucf-gold transition-colors whitespace-nowrap">Uber vs Lyft</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button
                            onClick={handleReset}
                            className="flex items-center text-neutral-500 hover:text-ucf-gold mb-4 font-bold transition-colors text-sm"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Start New Comparison
                        </button>

                        <DualWidgetView
                            brandA={comparisonData.brandA}
                            brandB={comparisonData.brandB}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComparisonTool;
