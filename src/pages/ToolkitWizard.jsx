import React, { useState } from 'react';
import { useWizard } from '../context/WizardContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, Search, Plus, X, GraduationCap, Layout, Sparkles } from 'lucide-react';

const ToolkitWizard = () => {
    const { state, nextStep, prevStep, updateCourseDetails, toggleModule, addTopic, removeTopic } = useWizard();
    const navigate = useNavigate();
    const [newTopic, setNewTopic] = useState('');

    const handleCourseChange = (e) => {
        const { name, value } = e.target;
        updateCourseDetails({ [name]: value });
    };

    const handleAddTopic = (e) => {
        e.preventDefault();
        if (newTopic.trim()) {
            addTopic(newTopic.trim());
            setNewTopic('');
        }
    };

    const handleComplete = () => {
        // In a real app, this would save to a backend
        navigate('/dashboard');
    };

    const steps = [
        { id: 1, title: 'Course Details', icon: GraduationCap },
        { id: 2, title: 'Select Modules', icon: Layout },
        { id: 3, title: 'Tracked Topics', icon: Search },
        { id: 4, title: 'Review & Launch', icon: Sparkles }
    ];

    return (
        <div className="min-h-screen bg-neutral-900 text-white flex">
            {/* Sidebar / Progress */}
            <div className="w-1/3 bg-ucf-black border-r border-neutral-800 p-12 hidden md:flex flex-col justify-between">
                <div>
                    <h1 className="font-display font-bold text-3xl mb-2 text-white">Toolkit Configuration</h1>
                    <p className="text-neutral-400 mb-12">Set up your custom analytics environment.</p>

                    <div className="space-y-8">
                        {steps.map((s) => {
                            const isActive = state.step === s.id;
                            const isCompleted = state.step > s.id;

                            return (
                                <div key={s.id} className="flex items-center space-x-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors ${isActive ? 'bg-ucf-gold border-ucf-gold text-ucf-black' :
                                        isCompleted ? 'bg-ucf-green border-ucf-green text-ucf-black' :
                                            'border-neutral-700 text-neutral-500'
                                        }`}>
                                        {isCompleted ? <CheckCircle className="w-5 h-5" /> : s.id}
                                    </div>
                                    <div>
                                        <h3 className={`font-bold ${isActive ? 'text-white' : 'text-neutral-500'}`}>{s.title}</h3>
                                        {isActive && <p className="text-xs text-ucf-gold mt-1">Current Step</p>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="text-xs text-neutral-600">
                    Faculty Technology Fellowship • 2026
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-neutral-900 p-12 flex flex-col justify-center max-w-3xl mx-auto">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={state.step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                    >
                        {/* Step 1: Course Details */}
                        {state.step === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-3xl font-display font-bold mb-6">Course Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-neutral-400 mb-2">Course Name</label>
                                        <input
                                            type="text"
                                            name="courseName"
                                            value={state.courseDetails.courseName}
                                            onChange={handleCourseChange}
                                            placeholder="e.g. Social Media Analytics"
                                            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-4 text-white focus:outline-none focus:border-ucf-gold focus:ring-1 focus:ring-ucf-gold transition-all"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-neutral-400 mb-2">Course Code</label>
                                            <input
                                                type="text"
                                                name="courseCode"
                                                value={state.courseDetails.courseCode}
                                                onChange={handleCourseChange}
                                                placeholder="e.g. HFT 3505"
                                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-4 text-white focus:outline-none focus:border-ucf-gold transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-neutral-400 mb-2">Student Count</label>
                                            <input
                                                type="number"
                                                name="studentCount"
                                                value={state.courseDetails.studentCount}
                                                onChange={handleCourseChange}
                                                placeholder="45"
                                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-4 text-white focus:outline-none focus:border-ucf-gold transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-neutral-400 mb-2">Semester</label>
                                            <input
                                                type="text"
                                                name="semester"
                                                value={state.courseDetails.semester}
                                                onChange={handleCourseChange}
                                                placeholder="e.g. Fall 2026"
                                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-4 text-white focus:outline-none focus:border-ucf-gold transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-neutral-400 mb-2">Assignment Due Date</label>
                                            <input
                                                type="date"
                                                name="dueDate"
                                                value={state.courseDetails.dueDate || ''}
                                                onChange={handleCourseChange}
                                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-4 text-white focus:outline-none focus:border-ucf-gold transition-all [color-scheme:dark]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Modules */}
                        {state.step === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-3xl font-display font-bold mb-6">Select Analytics Modules</h2>
                                <p className="text-neutral-400 mb-8">Choose which tools to enable for this course toolkit.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { id: 'google-trends', title: 'Google Trends', desc: 'Real-time search interest data.' },
                                        { id: 'social-blade', title: 'Social Blade', desc: 'Influencer growth & engagement stats.' },
                                        { id: 'competitor', title: 'Competitor Comparison', desc: 'Side-by-side brand analysis.' }
                                    ].map(module => (
                                        <div
                                            key={module.id}
                                            onClick={() => toggleModule(module.id)}
                                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${state.selectedModules.includes(module.id)
                                                ? 'bg-ucf-gold/10 border-ucf-gold'
                                                : 'bg-neutral-800 border-transparent hover:border-neutral-600'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="font-bold text-lg">{module.title}</h3>
                                                {state.selectedModules.includes(module.id) && <CheckCircle className="text-ucf-gold w-6 h-6" />}
                                            </div>
                                            <p className="text-neutral-400 text-sm">{module.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Topics */}
                        {state.step === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-3xl font-display font-bold mb-6">Tracked Topics</h2>
                                <p className="text-neutral-400 mb-8">Add brands, locations, or keywords for students to analyze.</p>

                                <form onSubmit={handleAddTopic} className="flex gap-4 mb-8">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
                                        <input
                                            type="text"
                                            value={newTopic}
                                            onChange={(e) => setNewTopic(e.target.value)}
                                            placeholder="Enter a keyword (e.g. Disney World)"
                                            className="w-full bg-neutral-800 border border-neutral-700 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-ucf-gold"
                                        />
                                    </div>
                                    <button type="submit" className="bg-ucf-gold text-ucf-black rounded-full p-3 font-bold hover:bg-white transition-colors">
                                        <Plus className="w-6 h-6" />
                                    </button>
                                </form>

                                <div className="flex flex-wrap gap-3">
                                    {state.topics.map((topic, i) => (
                                        <span key={i} className="bg-neutral-800 text-white px-4 py-2 rounded-full flex items-center space-x-2 border border-neutral-700">
                                            <span>{topic}</span>
                                            <button onClick={() => removeTopic(topic)} className="text-neutral-400 hover:text-red-500">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </span>
                                    ))}
                                    {state.topics.length === 0 && (
                                        <p className="text-neutral-500 italic">No topics added yet.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 4: Review */}
                        {state.step === 4 && (
                            <div className="space-y-6">
                                <h2 className="text-3xl font-display font-bold mb-6">Review Configuration</h2>
                                <div className="bg-neutral-800 rounded-xl p-6 space-y-6">
                                    <div>
                                        <h4 className="text-xs font-bold text-ucf-gold uppercase tracking-widest mb-2">Course</h4>
                                        <p className="text-xl font-bold">{state.courseDetails.courseCode || 'N/A'}: {state.courseDetails.courseName || 'Untitled Course'}</p>
                                        <p className="text-neutral-400">{state.courseDetails.semester} • {state.courseDetails.studentCount} Students</p>
                                    </div>
                                    <div className="h-px bg-neutral-700"></div>
                                    <div>
                                        <h4 className="text-xs font-bold text-ucf-gold uppercase tracking-widest mb-2">Active Modules</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {state.selectedModules.length > 0 ? state.selectedModules.map(m => (
                                                <span key={m} className="bg-neutral-900 px-3 py-1 rounded text-sm text-neutral-300">{m}</span>
                                            )) : <span className="text-neutral-500 italic">None selected</span>}
                                        </div>
                                    </div>
                                    <div className="h-px bg-neutral-700"></div>
                                    <div>
                                        <h4 className="text-xs font-bold text-ucf-gold uppercase tracking-widest mb-2">Topics</h4>
                                        <p className="text-neutral-300">{state.topics.join(', ') || 'None configured'}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Footer Navigation */}
                <div className="mt-12 flex justify-between">
                    {state.step > 1 ? (
                        <button onClick={prevStep} className="flex items-center text-neutral-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5 mr-2" /> Back
                        </button>
                    ) : <div></div>}

                    {state.step < 4 ? (
                        <button
                            onClick={nextStep}
                            className="bg-ucf-gold text-ucf-black px-8 py-3 rounded-full font-bold hover:bg-white transition-colors flex items-center shadow-lg shadow-ucf-gold/20"
                        >
                            Next Step <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    ) : (
                        <button
                            onClick={handleComplete}
                            className="bg-ucf-green text-ucf-black px-8 py-3 rounded-full font-bold hover:bg-white transition-colors flex items-center shadow-lg shadow-ucf-green/20"
                        >
                            Launch Toolkit <Sparkles className="w-5 h-5 ml-2" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ToolkitWizard;
