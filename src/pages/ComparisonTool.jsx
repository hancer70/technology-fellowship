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
                <div className="mb-6">
                    <h1 className="text-3xl font-display font-bold text-ucf-black mb-1">Case Study Comparison Tool</h1>
                    <p className="text-neutral-600 max-w-2xl text-sm">
                        Perform a side-by-side competitive analysis of two brands. Compare search trends and social media growth metrics in real-time.
                    </p>
                </div>

                {/* Main Content Area */}
                {!comparisonData ? (
                    <div className="mt-8">
                        <ComparisonInput onCompare={handleCompare} />

                        <div className="mt-12 text-center">
                            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Popular Comparisons</h3>
                            <div className="inline-flex gap-2">
                                <button onClick={() => handleCompare('Marriott', 'Hilton')} className="px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-xs text-neutral-600 hover:border-ucf-gold transition-colors">Marriott vs Hilton</button>
                                <button onClick={() => handleCompare('Disney', 'Universal')} className="px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-xs text-neutral-600 hover:border-ucf-gold transition-colors">Disney vs Universal</button>
                                <button onClick={() => handleCompare('Uber', 'Lyft')} className="px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-xs text-neutral-600 hover:border-ucf-gold transition-colors">Uber vs Lyft</button>
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
