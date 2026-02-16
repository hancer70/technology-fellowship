import { useState } from 'react';
import { useWizard } from '../../context/WizardContext';
import { ArrowRight, ArrowLeft, Plus, X } from 'lucide-react';

const TopicConfiguration = () => {
    const { nextStep, prevStep, addTopic, removeTopic, state } = useWizard();
    const { topics } = state;
    const [inputValue, setInputValue] = useState('');

    const handleAdd = () => {
        if (inputValue.trim()) {
            addTopic(inputValue.trim());
            setInputValue('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <h2 className="heading-2">Topic Configuration</h2>
                <p className="text-neutral-600">
                    Pre-populate your toolkit with specific brands or topics for students to analyze (optional).
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex space-x-2">
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add a separate topic (e.g. Disney World, Marriott, AirBnb)"
                        className="input-field flex-grow"
                    />
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="bg-ucf-black text-white px-4 rounded-lg font-bold hover:bg-neutral-800 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[100px] bg-neutral-50 rounded-xl p-4 border border-neutral-200 border-dashed">
                    {topics.length === 0 && (
                        <p className="text-neutral-400 text-sm italic w-full text-center py-8">
                            No topics added yet. Students will start with a blank dashboard.
                        </p>
                    )}
                    {topics.map((topic, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-sm text-sm font-medium text-ucf-black">
                            {topic}
                            <button
                                type="button"
                                onClick={() => removeTopic(topic)}
                                className="ml-2 text-neutral-400 hover:text-red-500"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex justify-between pt-8 border-t border-neutral-100">
                <button type="button" onClick={prevStep} className="btn-ucf-secondary flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>
                <button type="submit" className="btn-ucf-primary flex items-center">
                    Review Toolkit <ArrowRight className="w-4 h-4 ml-2" />
                </button>
            </div>
        </form>
    );
};

export default TopicConfiguration;
