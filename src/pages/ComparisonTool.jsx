import React, { useState } from 'react';
import ComparisonInput from '../components/comparison/ComparisonInput';
import DualWidgetView from '../components/comparison/DualWidgetView';
import { ArrowLeft } from 'lucide-react';

const ComparisonTool = () => {
    const [comparisonData, setComparisonData] = useState(null);

    const handleCompare = (brandA, brandB) => {
        setComparisonData({ brandA, brandB });
    };

    const handleReset = () => {
        setComparisonData(null);
    };

    return (
        <div className="min-h-screen bg-neutral-50 pb-12">
            <div className="container mx-auto px-6 py-12">

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-display font-bold text-ucf-black mb-2">Case Study Comparison Tool</h1>
                    <p className="text-neutral-600 max-w-2xl">
                        Perform a side-by-side competitive analysis of two brands. Compare search trends and social media growth metrics in real-time.
                    </p>
                </div>

                {/* Main Content Area */}
                {!comparisonData ? (
                    <div className="mt-12">
                        <ComparisonInput onCompare={handleCompare} />

                        <div className="mt-16 text-center">
                            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Popular Comparisons</h3>
                            <div className="inline-flex gap-3">
                                <button onClick={() => handleCompare('Marriott', 'Hilton')} className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm text-neutral-600 hover:border-ucf-gold transition-colors">Marriott vs Hilton</button>
                                <button onClick={() => handleCompare('Disney', 'Universal')} className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm text-neutral-600 hover:border-ucf-gold transition-colors">Disney vs Universal</button>
                                <button onClick={() => handleCompare('Uber', 'Lyft')} className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm text-neutral-600 hover:border-ucf-gold transition-colors">Uber vs Lyft</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button
                            onClick={handleReset}
                            className="flex items-center text-neutral-500 hover:text-ucf-gold mb-8 font-bold transition-colors"
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
