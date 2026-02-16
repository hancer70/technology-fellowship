import React from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

const GuideOverlay = ({ steps, currentStep, onClose, onNext, onPrev }) => {
    const step = steps[currentStep];

    if (!step) return null;

    // Calculate position (simplified for now, ideally would specific element coordinates)
    // For this MVP, we'll use a fixed centered modal or sticky overlay approach 
    // to ensure reliability without complex DOM measurement libraries.

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-ucf-black/50 pointer-events-auto" onClick={onClose}></div>

            {/* Guide Card */}
            <div className="bg-white w-full max-w-lg mx-4 mb-8 sm:mb-0 p-6 rounded-xl shadow-2xl border-t-4 border-ucf-gold pointer-events-auto relative animate-slideUp">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-neutral-400 hover:text-ucf-black transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="mb-6">
                    <span className="text-xs font-bold text-ucf-gold uppercase tracking-widest">
                        Step {currentStep + 1} of {steps.length}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-ucf-black mt-1 mb-2">
                        {step.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                        {step.content}
                    </p>
                </div>

                <div className="flex justify-between items-center">
                    <button
                        onClick={onPrev}
                        disabled={currentStep === 0}
                        className={`flex items-center text-sm font-bold ${currentStep === 0
                                ? 'text-neutral-300 cursor-not-allowed'
                                : 'text-neutral-600 hover:text-ucf-black'
                            }`}
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                    </button>

                    <button
                        onClick={onNext}
                        className="bg-ucf-black text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-neutral-800 transition-colors flex items-center"
                    >
                        {currentStep === steps.length - 1 ? 'Finish Tour' : 'Next'}
                        {currentStep !== steps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GuideOverlay;
