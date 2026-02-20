import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWizard } from '../context/WizardContext';
import { BookOpen, LayoutDashboard, ExternalLink, Calendar } from 'lucide-react';
import TopicCard from '../components/dashboard/TopicCard';
import TrendsWidget from '../components/dashboard/TrendsWidget';
import SocialBladeWidget from '../components/dashboard/SocialBladeWidget';
import ToolkitGuide from '../components/common/ToolkitGuide';
import SubmissionTools from '../components/dashboard/SubmissionTools';
import ComparisonWidget from '../components/dashboard/ComparisonWidget';
import { motion } from 'framer-motion';

const ToolkitViewer = () => {
    const { toolkitId } = useParams();
    const { state } = useWizard();

    // Demo Presets
    const presets = {
        'hft-3505': {
            courseName: 'Social Media & Digital Trends',
            courseCode: 'HFT 3505',
            topics: ['Disney World', 'Universal Studios', 'SeaWorld'],
            modules: ['google-trends', 'social-blade']
        },
        'hft-3444': {
            courseName: 'Hospitality Information Systems',
            courseCode: 'HFT 3444',
            topics: ['Oracle Hospitality', 'Sabre', 'Amadeus'],
            modules: ['google-trends', 'brand-comparison']
        },
        'hft-4295': {
            courseName: 'Strategic Management in Hospitality',
            courseCode: 'HFT 4295',
            topics: ['Marriott International', 'Hilton Worldwide', 'Hyatt Hotels'],
            modules: ['google-trends']
        },
        'demo': {
            courseName: 'Social Media Analytics',
            courseCode: 'DEMO 101',
            topics: ['Disney World', 'Marriott', 'Hilton'],
            modules: ['google-trends', 'social-blade']
        }
    };

    const activePreset = presets[toolkitId];
    const [showGuide, setShowGuide] = useState(!activePreset);

    // Use preset if available, otherwise fallback to wizard state
    const courseName = activePreset ? activePreset.courseName : (state.courseDetails?.courseName || 'Social Media Analytics');
    const courseCode = activePreset ? activePreset.courseCode : (state.courseDetails?.courseCode || 'HFT 3505');
    const topics = activePreset ? activePreset.topics : (state.topics.length > 0 ? state.topics : ['Disney World', 'Marriott', 'Hilton']);
    const modules = activePreset ? activePreset.modules : (state.selectedModules.length > 0 ? state.selectedModules : ['google-trends', 'social-blade']);
    const dueDate = activePreset ? null : state.courseDetails?.dueDate;

    useEffect(() => {
        if (courseCode) {
            document.title = `${courseCode}: ${courseName} | SMA Toolkit`;
        } else {
            document.title = 'Student Toolkit | SMA Toolkit';
        }
    }, [courseCode]);

    return (
        <div className="min-h-screen bg-neutral-50 font-sans">
            <ToolkitGuide isOpen={showGuide} onClose={() => setShowGuide(false)} />

            {/* Student Header */}
            <header className="bg-ucf-black text-white py-6 px-6 border-b-4 border-ucf-gold">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-ucf-gold text-ucf-black rounded-full flex items-center justify-center font-bold">
                            {courseCode.split(' ')[0]}
                        </div>
                        <div>
                            <div className="text-xs text-ucf-gold uppercase tracking-widest font-bold">Student Toolkit</div>
                            <h1 className="text-xl font-bold">{courseName}</h1>
                        </div>
                    </div>
                    <div className="text-sm text-neutral-400">
                        Toolkit ID: <span className="font-mono text-white">{toolkitId || 'DEMO-123'}</span>
                        {dueDate && <span className="ml-4 text-ucf-gold font-bold">Due: {new Date(dueDate).toLocaleDateString()}</span>}
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                {/* Student Instructions Banner */}
                <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-neutral-200">
                    <h2 className="font-bold text-lg mb-4 flex items-center text-ucf-black">
                        <span className="bg-ucf-gold text-ucf-black w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 font-black">!</span>
                        Assignment Instructions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-neutral-600">
                        <div className="flex items-start">
                            <div className="bg-neutral-100 p-2 rounded mr-3 text-ucf-black font-bold">1</div>
                            <div>
                                <strong className="block text-ucf-black">Analyze Trends</strong>
                                Review the live data below for each topic. Look for peaks and patterns.
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="bg-neutral-100 p-2 rounded mr-3 text-ucf-black font-bold">2</div>
                            <div>
                                <strong className="block text-ucf-black">Complete Worksheet</strong>
                                Use the "Action Checklist" on the right to guide your analysis.
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="bg-neutral-100 p-2 rounded mr-3 text-ucf-black font-bold">3</div>
                            <div>
                                <strong className="block text-ucf-black">Submit to Canvas</strong>
                                Export your findings and upload them to the corresponding Webcourses assignment.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Topic Ticker */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {topics.map((topic, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <TopicCard topic={topic} />
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Analytics Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center space-x-2 mb-2">
                            <LayoutDashboard className="w-5 h-5 text-ucf-gold" />
                            <h2 className="text-xl font-display font-bold text-ucf-black">Live Market Data</h2>
                        </div>

                        {modules.includes('google-trends') && (
                            <div className="space-y-6">
                                {topics.slice(0, 2).map((topic, idx) => (
                                    <TrendsWidget key={idx} topic={topic} />
                                ))}
                            </div>
                        )}

                        {modules.includes('brand-comparison') && (
                            <ComparisonWidget />
                        )}
                    </div>

                    {/* Sidebar / Assignment Info */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border-l-4 border-ucf-gold shadow-sm">
                            <h3 className="font-bold text-ucf-black mb-4 flex items-center text-lg font-display">
                                <BookOpen className="w-5 h-5 mr-2 text-ucf-gold" />
                                Action Checklist
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <input type="checkbox" className="mt-1 mr-3 w-4 h-4 text-ucf-gold rounded border-gray-300 focus:ring-ucf-gold" />
                                    <span className="text-sm text-neutral-700 leading-tight">Review search volume trends for the past 90 days.</span>
                                </div>
                                <div className="flex items-start">
                                    <input type="checkbox" className="mt-1 mr-3 w-4 h-4 text-ucf-gold rounded border-gray-300 focus:ring-ucf-gold" />
                                    <span className="text-sm text-neutral-700 leading-tight">Identify peak interest periods for your assigned brand.</span>
                                </div>
                                <div className="flex items-start">
                                    <input type="checkbox" className="mt-1 mr-3 w-4 h-4 text-ucf-gold rounded border-gray-300 focus:ring-ucf-gold" />
                                    <span className="text-sm text-neutral-700 leading-tight">Compare engagement rates with at least one competitor.</span>
                                </div>
                                <div className="flex items-start">
                                    <input type="checkbox" className="mt-1 mr-3 w-4 h-4 text-ucf-gold rounded border-gray-300 focus:ring-ucf-gold" />
                                    <span className="text-sm text-neutral-700 leading-tight">Export your data and upload to Webcourses.</span>
                                </div>
                            </div>

                            {modules.includes('social-blade') && (
                                <div className="mt-6 pt-6 border-t border-neutral-100">
                                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Quick Lookup</h4>
                                    <SocialBladeWidget />
                                </div>
                            )}
                        </div>

                        {/* Submission Tools */}
                        <SubmissionTools
                            courseCode={courseCode}
                            courseName={courseName}
                            topics={topics}
                            dueDate={dueDate}
                        />

                        <div className="bg-neutral-800 text-white p-6 rounded-xl shadow-lg">
                            <h3 className="font-bold mb-4 flex items-center text-ucf-gold">
                                <Calendar className="w-4 h-4 mr-2" />
                                Due Dates
                            </h3>
                            <ul className="space-y-3 text-sm">
                                {dueDate ? (
                                    <li className="flex justify-between">
                                        <span>{courseName} Assignment</span>
                                        <span className="text-white font-bold">{new Date(dueDate).toLocaleDateString()}</span>
                                    </li>
                                ) : (
                                    <li className="text-neutral-400 italic">No due date assigned.</li>
                                )}
                            </ul>
                            <a
                                href="https://webcourses.ucf.edu/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center"
                            >
                                Open Canvas <ExternalLink className="w-3 h-3 ml-2" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ToolkitViewer;
