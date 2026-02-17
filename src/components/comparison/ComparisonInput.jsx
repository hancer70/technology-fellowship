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
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-lg text-center max-w-2xl mx-auto">
            <h2 className="text-xl font-display font-bold text-ucf-black mb-4">Start Comparison</h2>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-3">
                <div className="flex-1 w-full">
                    <label className="block text-left text-[10px] font-bold text-neutral-400 uppercase mb-1 ml-1">Brand A</label>
                    <input
                        type="text"
                        value={brandA}
                        onChange={(e) => setBrandA(e.target.value)}
                        placeholder="e.g. Nike"
                        className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-ucf-gold text-base font-medium"
                        required
                    />
                </div>

                <div className="flex-shrink-0 bg-neutral-100 rounded-full p-2 mt-5">
                    <ArrowLeftRight className="w-4 h-4 text-neutral-400" />
                </div>

                <div className="flex-1 w-full">
                    <label className="block text-left text-[10px] font-bold text-neutral-400 uppercase mb-1 ml-1">Brand B</label>
                    <input
                        type="text"
                        value={brandB}
                        onChange={(e) => setBrandB(e.target.value)}
                        placeholder="e.g. Adidas"
                        className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-ucf-gold text-base font-medium"
                        required
                    />
                </div>
            </form>

            <button
                onClick={handleSubmit}
                disabled={!brandA.trim() || !brandB.trim()}
                className="mt-6 bg-ucf-gold hover:bg-ucf-gold-dark text-ucf-black font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center mx-auto disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
                <Search className="w-4 h-4 mr-2" />
                Analyze Competitors
            </button>
        </div>
    );
};

export default ComparisonInput;
