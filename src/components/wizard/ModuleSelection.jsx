import { useWizard } from '../../context/WizardContext';
import { TrendingUp, Zap, Users, ArrowRight, ArrowLeft } from 'lucide-react';

const ModuleSelection = () => {
    const { nextStep, prevStep, toggleModule, state } = useWizard();
    const { selectedModules } = state;

    const modules = [
        {
            id: 'google-trends',
            title: 'Google Trends Integration',
            description: 'Enable students to visualize search interest over time for hospitality keywords.',
            icon: TrendingUp
        },
        {
            id: 'social-blade',
            title: 'Social Blade Analytics',
            description: 'Track follower growth and engagement rates for Instagram, TikTok, and YouTube.',
            icon: Zap
        },
        {
            id: 'brand-comparison',
            title: 'Competitor Benchmarking',
            description: 'Side-by-side comparison tools for major hotel and tourism brands.',
            icon: Users
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation: Ensure at least one module is selected? Or allow skip?
        // For now, let's allow skip, but typically we'd want at least one.
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <h2 className="heading-2">Select Analytics Modules</h2>
                <p className="text-neutral-600">Choose the tools you want to enable for your students.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {modules.map((module) => {
                    const isSelected = selectedModules.includes(module.id);
                    return (
                        <div
                            key={module.id}
                            onClick={() => toggleModule(module.id)}
                            className={`
                                cursor-pointer border rounded-xl p-6 flex items-start space-x-6 transition-all duration-200
                                ${isSelected ? 'border-ucf-gold ring-2 ring-ucf-gold/20 bg-ucf-gold/5' : 'border-neutral-200 hover:border-ucf-gold hover:shadow-md'}
                            `}
                        >
                            <div className={`p-3 rounded-lg ${isSelected ? 'bg-ucf-black text-ucf-gold' : 'bg-neutral-100 text-neutral-500'}`}>
                                <module.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className={`font-bold text-lg ${isSelected ? 'text-ucf-black' : 'text-neutral-900'}`}>{module.title}</h3>
                                    {isSelected && <span className="text-xs font-bold text-ucf-black bg-ucf-gold px-2 py-1 rounded uppercase">Selected</span>}
                                </div>
                                <p className="text-sm text-neutral-600 leading-relaxed">{module.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-between pt-8 border-t border-neutral-100">
                <button type="button" onClick={prevStep} className="btn-ucf-secondary flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>
                <button type="submit" className="btn-ucf-primary flex items-center">
                    Next Step <ArrowRight className="w-4 h-4 ml-2" />
                </button>
            </div>
        </form>
    );
};

export default ModuleSelection;
