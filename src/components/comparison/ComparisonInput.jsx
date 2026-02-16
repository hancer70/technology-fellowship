import React, { useState } from 'react';
import { ArrowLeftRight, Search } from 'lucide-react';

const ComparisonInput = ({ onCompare }) => {
    const [brandA, setBrandA] = useState('');
    const [brandB, setBrandB] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (brandA.trim() && brandB.trim()) {
            onCompare(brandA.trim(), brandB.trim());
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl border border-neutral-200 shadow-lg text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-display font-bold text-ucf-black mb-6">Start Comparison</h2>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1 w-full">
                    <label className="block text-left text-xs font-bold text-neutral-500 uppercase mb-2 ml-1">Brand A</label>
                    <input
                        type="text"
                        value={brandA}
                        onChange={(e) => setBrandA(e.target.value)}
                        placeholder="e.g. Nike"
                        className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-ucf-gold text-lg font-medium"
                        required
                    />
                </div>

                <div className="flex-shrink-0 bg-neutral-100 rounded-full p-3 mt-6">
                    <ArrowLeftRight className="w-5 h-5 text-neutral-400" />
                </div>

                <div className="flex-1 w-full">
                    <label className="block text-left text-xs font-bold text-neutral-500 uppercase mb-2 ml-1">Brand B</label>
                    <input
                        type="text"
                        value={brandB}
                        onChange={(e) => setBrandB(e.target.value)}
                        placeholder="e.g. Adidas"
                        className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-ucf-gold text-lg font-medium"
                        required
                    />
                </div>
            </form>

            <button
                onClick={handleSubmit}
                disabled={!brandA.trim() || !brandB.trim()}
                className="mt-8 bg-ucf-gold hover:bg-ucf-gold-dark text-ucf-black font-bold py-3 px-8 rounded-lg transition-colors flex items-center mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Search className="w-5 h-5 mr-2" />
                Analyze Competitors
            </button>
        </div>
    );
};

export default ComparisonInput;
