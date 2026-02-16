import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, TrendingUp, Users, FileText, ArrowRight } from 'lucide-react';

const ToolkitGuide = ({ isOpen, onClose }) => {
    const [internalIsVisible, setInternalIsVisible] = useState(true);
    const [step, setStep] = useState(0);

    // Determine visibility: use prop if provided, otherwise internal state
    const isVisible = isOpen !== undefined ? isOpen : internalIsVisible;

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            setInternalIsVisible(false);
        }
        // Reset step when closing so it starts fresh next time
        setTimeout(() => setStep(0), 300);
    };

    const steps = [
        {
            title: "Welcome to Your Toolkit",
            description: "This dashboard gives you real-time access to market data. Use it to complete your weekly assignments.",
            icon: TrendingUp,
            action: "Start Tour"
        },
        {
            title: "Step 1: Analyze Trends",
            description: "Use the Google Trends widgets to see what people are searching for right now.",
            icon: TrendingUp,
            action: "Next"
        },
        {
            title: "Step 2: Check Competitors",
            description: "Compare engagement metrics across different brands using the Social Blade tracker.",
            icon: Users,
            action: "Next"
        },
        {
            title: "Step 3: Submit Your Report",
            description: "Download the findings and upload them to Webcourses before the deadline.",
            icon: FileText,
            action: "Get Started"
        }
    ];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            handleClose();
        }
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    key={step}
                    className="bg-white max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden relative"
                >
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 h-1 bg-neutral-100 w-full">
                        <motion.div
                            className="h-full bg-ucf-gold"
                            initial={{ width: `${(step / steps.length) * 100}%` }}
                            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        />
                    </div>

                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-ucf-gold/10 text-ucf-gold rounded-full flex items-center justify-center mx-auto mb-6">
                            {React.createElement(steps[step].icon, { size: 32 })}
                        </div>

                        <h2 className="text-2xl font-bold text-ucf-black mb-3 font-display">
                            {steps[step].title}
                        </h2>
                        <p className="text-neutral-600 mb-8 leading-relaxed">
                            {steps[step].description}
                        </p>

                        <button
                            onClick={handleNext}
                            className="bg-ucf-black text-white px-8 py-3 rounded-lg font-bold hover:bg-neutral-800 transition-colors inline-flex items-center group"
                        >
                            {steps[step].action}
                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ToolkitGuide;
