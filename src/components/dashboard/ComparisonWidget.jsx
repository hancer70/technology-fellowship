import React, { useState } from 'react';
import ComparisonInput from '../comparison/ComparisonInput';
import DualWidgetView from '../comparison/DualWidgetView';
import { ArrowLeft, Users } from 'lucide-react';

const ComparisonWidget = ({ initialBrandA, initialBrandB }) => {
    const [comparisonData, setComparisonData] = useState(
        initialBrandA && initialBrandB ? { brandA: initialBrandA, brandB: initialBrandB } : null
    );

    const handleCompare = (brandA, brandB) => {
        setComparisonData({ brandA, brandB });
    };

    const handleReset = () => {
        setComparisonData(null);
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm mb-8">
            <div className="flex items-center space-x-2 mb-6">
                <Users className="w-5 h-5 text-ucf-gold" />
                <h2 className="text-xl font-display font-bold text-ucf-black">Competitor Benchmarking</h2>
            </div>

            {!comparisonData ? (
                <div>
                    <ComparisonInput onCompare={handleCompare} />
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
    );
};

export default ComparisonWidget;
