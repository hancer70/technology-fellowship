import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-50">
            <div className="text-center">
                <Loader2 className="w-12 h-12 text-ucf-gold animate-spin mx-auto mb-4" />
                <p className="text-neutral-500 font-medium">Loading Toolkit...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
