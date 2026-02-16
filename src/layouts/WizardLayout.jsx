import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWizard } from '../context/WizardContext';
import { Settings, BookOpen, Layout, CheckCircle } from 'lucide-react';

const steps = [
    { id: 1, label: 'Course Details', icon: BookOpen },
    { id: 2, label: 'Select Modules', icon: Layout },
    { id: 3, label: 'Topic Config', icon: Settings },
    { id: 4, label: 'Review', icon: CheckCircle },
];

const WizardLayout = ({ children }) => {
    const { state } = useWizard();
    const currentStep = state.step;

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
            {/* Minimal UCF Header for Focus */}
            <header className="bg-ucf-black text-white py-4 px-6 border-b-4 border-ucf-gold flex justify-between items-center shadow-lg sticky top-0 z-50">
                <div className="flex items-center space-x-3">
                    <span className="font-display font-bold text-xl tracking-wide uppercase">
                        Rosen College <span className="text-ucf-gold">Faculty Toolkit</span>
                    </span>
                </div>
                <div className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                    Toolkit Setup Wizard
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
                {/* Progress Bar */}
                <div className="mb-12 relative">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-neutral-200">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-ucf-gold"
                        ></motion.div>
                    </div>

                    <div className="flex justify-between">
                        {steps.map((step) => {
                            const isActive = currentStep >= step.id;
                            const isCurrent = currentStep === step.id;
                            return (
                                <div key={step.id} className={`flex flex-col items-center ${isActive ? 'text-ucf-black' : 'text-neutral-400'}`}>
                                    <div className={`
                                        w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 border-2
                                        ${isActive ? 'bg-ucf-black border-ucf-black text-ucf-gold' : 'bg-white border-neutral-300 text-neutral-300'}
                                        ${isCurrent ? 'ring-4 ring-ucf-gold/30' : ''}
                                    `}>
                                        <step.icon className="w-5 h-5" />
                                    </div>
                                    <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Form Content */}
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 md:p-12 relative overflow-hidden"
                >
                    {/* Decorative Academic Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-ucf-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    {children}
                </motion.div>
            </main>

            <footer className="py-6 text-center text-xs text-neutral-400 border-t border-neutral-200 mt-auto">
                © 2026 Rosen College of Hospitality Management • Faculty Technology Fellowship
            </footer>
        </div>
    );
};

export default WizardLayout;
