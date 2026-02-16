import { useNavigate } from 'react-router-dom';
import { useWizard } from '../../context/WizardContext';
import { CheckCircle, ArrowLeft, Loader2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const ReviewStep = () => {
    const { prevStep, state } = useWizard();
    const navigate = useNavigate();
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        // Simulate API call
        setTimeout(() => {
            console.log('Toolkit Generated:', state);
            setIsGenerating(false);
            // Navigate to dashboard or success page (placeholder for now)
            alert('Toolkit Generated! (Console has details)');
            navigate('/dashboard');
        }, 2000);
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <div className="w-16 h-16 bg-ucf-gold rounded-full flex items-center justify-center mx-auto mb-6 text-ucf-black">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="heading-2">Review Your Toolkit</h2>
                <p className="text-neutral-600">Ready to generate your custom analytics dashboard.</p>
            </div>

            <div className="bg-neutral-50 rounded-xl border border-neutral-200 overflow-hidden divide-y divide-neutral-200">
                <div className="p-6">
                    <h3 className="text-xs font-bold text-ucf-black uppercase tracking-widest mb-4">Course Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="block text-xs text-neutral-500 uppercase">Code</span>
                            <span className="font-bold text-ucf-black">{state?.courseDetails?.courseCode || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-neutral-500 uppercase">Semester</span>
                            <span className="font-bold text-ucf-black">{state?.courseDetails?.semester || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-neutral-500 uppercase">Students</span>
                            <span className="font-bold text-ucf-black">{state?.courseDetails?.studentCount || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-neutral-500 uppercase">Due Date</span>
                            <span className="font-bold text-ucf-black">{state?.courseDetails?.dueDate || 'None'}</span>
                        </div>
                        <div className="col-span-2">
                            <span className="block text-xs text-neutral-500 uppercase">Name</span>
                            <span className="font-bold text-ucf-black">{state?.courseDetails?.courseName || 'N/A'}</span>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-xs font-bold text-ucf-black uppercase tracking-widest mb-4">Selected Modules</h3>
                    <div className="flex flex-wrap gap-2">
                        {state?.selectedModules?.length > 0 ? (
                            state.selectedModules.map(m => (
                                <span key={m} className="px-3 py-1 bg-white border border-neutral-200 rounded-lg text-sm font-medium capitalize">
                                    {m.replace('-', ' ')}
                                </span>
                            ))
                        ) : (
                            <span className="text-neutral-400 text-sm italic">No modules selected</span>
                        )}
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-xs font-bold text-ucf-black uppercase tracking-widest mb-4">Configured Topics</h3>
                    <div className="flex flex-wrap gap-2">
                        {state?.topics?.length > 0 ? (
                            state.topics.map(t => (
                                <span key={t} className="px-3 py-1 bg-white border border-neutral-200 rounded-lg text-sm font-medium">
                                    {t}
                                </span>
                            ))
                        ) : (
                            <span className="text-neutral-400 text-sm italic">No configured topics</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-8 border-t border-neutral-100">
                <button type="button" onClick={prevStep} className="btn-ucf-secondary flex items-center" disabled={isGenerating}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>
                <button
                    onClick={handleGenerate}
                    className="btn-ucf-primary flex items-center w-full md:w-auto justify-center"
                    disabled={isGenerating}
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...
                        </>
                    ) : (
                        <>Generate Dashboard <ArrowRight className="w-4 h-4 ml-2" /></>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ReviewStep;
