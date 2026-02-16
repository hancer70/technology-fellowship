import React, { useState } from 'react';
import { Info } from 'lucide-react';

const InfoTooltip = ({ text }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative inline-flex items-center ml-2"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <Info className="w-4 h-4 text-neutral-400 hover:text-ucf-gold cursor-help transition-colors" />

            {isVisible && (
                <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-ucf-black text-white text-xs rounded-lg shadow-xl pointer-events-none animate-fadeIn">
                    {text}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-ucf-black"></div>
                </div>
            )}
        </div>
    );
};

export default InfoTooltip;
