import React, { useState } from 'react';
import { useWizard } from '../context/WizardContext';
import { motion } from 'framer-motion';
import { BookOpen, Share2, Download, CircleHelp, LayoutDashboard, Users, ArrowRight, Calendar, Flag, TrendingUp } from 'lucide-react';
import GuideOverlay from '../components/guides/GuideOverlay';
import TopicCard from '../components/dashboard/TopicCard';
import TrendsWidget from '../components/dashboard/TrendsWidget';
import SocialBladeWidget from '../components/dashboard/SocialBladeWidget';

import { generatePDF } from '../utils/documentGenerators';

const FacultyDashboard = () => {
    const { state } = useWizard();
    const [tourActive, setTourActive] = useState(false);
    const [tourStep, setTourStep] = useState(0);

    // Defensive check
    if (!state) return <div>Loading Wizard State...</div>;

    const { courseDetails, selectedModules, topics } = state;
    const courseCode = courseDetails?.courseCode || 'HFT 3505';
    const semester = courseDetails?.semester || 'Summer 2026';
    const courseName = courseDetails?.courseName || 'Social Media Analytics';
    const studentCount = courseDetails?.studentCount || 45;

    const displayModules = selectedModules?.length > 0 ? selectedModules : ['google-trends', 'social-blade'];
    const displayTopics = topics?.length > 0 ? topics : ['Disney World', 'Marriott', 'Hilton'];

    const handleDownloadAssignment = () => {
        generatePDF(courseCode, courseName, displayTopics);
    };

    const tourSteps = [
        {
            title: "Welcome to Your Analytics Dashboard",
            content: "This tailored dashboard aggregates real-time data specifically for your tracked brands. Use it to monitor performance and spot trends."
        },
        {
            title: "Tracked Topics",
            content: "These are the specific brands or keywords your professor has configured for this course. Click on any card for detailed info.",
        },
        {
            title: "Google Trends Data",
            content: "Analyze search volume history to understand consumer interest over time. Look for seasonal spikes or viral moments.",
        },
        {
            title: "Social Performance",
            content: "Use the Social Blade tool to lookup specific influencer accounts and audit their engagement rates.",
        },
        {
            title: "Assignment Builder",
            content: "Ready to work? Navigate here to generate your customized assignment brief based on this data.",
        }
    ];

    const startTour = () => {
        setTourStep(0);
        setTourActive(true);
    };

    const nextStep = () => {
        if (tourStep < tourSteps.length - 1) {
            setTourStep(prev => prev + 1);
        } else {
            setTourActive(false);
        }
    };

    const prevStep = () => {
        if (tourStep > 0) {
            setTourStep(prev => prev - 1);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 font-sans">
            {/* Dashboard Header */}
            <header className="bg-ucf-black text-white pt-8 pb-12 px-6 border-b-4 border-ucf-gold relative overflow-hidden">
                <div className="relative z-10 container mx-auto flex flex-col md:flex-row justify-between items-end">
                    <div>
                        <div className="flex items-center space-x-2 text-ucf-gold mb-2 uppercase tracking-widest text-xs font-bold">
                            <BookOpen className="w-4 h-4" />
                            <span>{semester} • {courseCode}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-display font-black leading-tight text-white mb-2">
                            {courseName}
                        </h1>
                        <p className="text-neutral-400 max-w-xl">
                            Digital toolkit active for {studentCount} students.
                        </p>
                    </div>

                    <div className="flex space-x-3 mt-6 md:mt-0">
                        <button
                            onClick={startTour}
                            className="flex items-center px-4 py-2 bg-neutral-800 rounded-lg text-sm font-bold hover:bg-neutral-700 transition-colors text-white"
                        >
                            <CircleHelp className="w-4 h-4 mr-2" /> Tour
                        </button>
                        <button className="flex items-center px-4 py-2 bg-neutral-800 rounded-lg text-sm font-bold hover:bg-neutral-700 transition-colors">
                            <Share2 className="w-4 h-4 mr-2" /> Share
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="flex items-center px-4 py-2 bg-ucf-gold text-ucf-black rounded-lg text-sm font-bold hover:bg-ucf-gold-dark hover:text-white transition-colors print:hidden"
                        >
                            <Download className="w-4 h-4 mr-2" /> Export Report
                        </button>
                    </div>
                </div>
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>
            </header>

            <main className="container mx-auto px-6 py-8 -mt-8 relative z-20">
                {/* Introduction / Next Steps Banner */}
                <div className="bg-white rounded-xl p-8 mb-8 shadow-xl border-l-8 border-ucf-gold relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold font-display text-ucf-black mb-4">Toolkit Generated Successfully! What's Next?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-ucf-black text-white flex items-center justify-center font-bold mr-4 shrink-0">1</div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Share with Students</h3>
                                    <p className="text-neutral-600 text-sm mb-2">Copy the link below to your Webcourses module.</p>
                                    <div className="flex items-center bg-neutral-100 rounded p-2 border border-neutral-200">
                                        <code className="text-xs text-neutral-600 truncate flex-1">https://rosen.ucf.edu/toolkit/{courseCode.replace(/\s+/g, '-').toLowerCase()}</code>
                                        <button className="ml-2 text-ucf-gold hover:text-ucf-black font-bold text-xs uppercase" onClick={() => navigator.clipboard.writeText(`https://rosen.ucf.edu/toolkit/${courseCode.replace(/\s+/g, '-').toLowerCase()}`)}>Copy</button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-ucf-black text-white flex items-center justify-center font-bold mr-4 shrink-0">2</div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Assign the Worksheet</h3>
                                    <p className="text-neutral-600 text-sm">Download the PDF assignment brief to distribute to your class.</p>
                                    <button
                                        onClick={handleDownloadAssignment}
                                        className="mt-2 text-ucf-gold font-bold text-sm flex items-center hover:underline"
                                    >
                                        <Download className="w-4 h-4 mr-1" /> Download Assignment PDF
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-ucf-black text-white flex items-center justify-center font-bold mr-4 shrink-0">3</div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Monitor & Grade</h3>
                                    <p className="text-neutral-600 text-sm">Use the dashboard below to track engagement and grade submissions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Topic Ticker / Quick Access */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {displayTopics.map((topic, index) => (
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

                {/* Widgets Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Analytics Columnment */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center space-x-2 mb-2">
                            <LayoutDashboard className="w-5 h-5 text-ucf-gold" />
                            <h2 className="text-xl font-display font-bold text-ucf-black">Live Analytics</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {displayModules.includes('google-trends') && (
                                <>
                                    {displayTopics.slice(0, 2).map((topic, idx) => (
                                        <TrendsWidget key={idx} topic={topic} />
                                    ))}
                                    {displayTopics.length === 0 && <TrendsWidget topic="Hospitality" />}
                                </>
                            )}
                        </div>
                    </div>


                    {/* Sidebar / Tools */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2 mb-2">
                            <Users className="w-5 h-5 text-ucf-gold" />
                            <h2 className="text-xl font-display font-bold text-ucf-black">Tools & Resources</h2>
                        </div>

                        {/* Class Engagement Widget (New) */}
                        <div className="bg-ucf-black text-white p-6 rounded-xl border border-ucf-gold shadow-sm relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg mb-4 flex items-center">
                                    <TrendingUp className="w-5 h-5 mr-2 text-ucf-gold" />
                                    Class Engagement
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end border-b border-neutral-800 pb-2">
                                        <span className="text-sm text-neutral-400">Active Students</span>
                                        <span className="text-2xl font-black text-ucf-gold">42<span className="text-sm text-white font-normal">/45</span></span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-neutral-800 pb-2">
                                        <span className="text-sm text-neutral-400">Your Activity</span>
                                        <span className="text-2xl font-black text-white">High</span>
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-xs text-neutral-400 italic">
                                            "You are in the top 10% of engaged students this week."
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Bg decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-ucf-gold/10 rounded-full blur-2xl translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>
                        </div>

                        {displayModules.includes('social-blade') && <SocialBladeWidget />}

                        {/* Tools Navigation */}
                        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                            <h3 className="font-bold text-ucf-black mb-4 flex items-center">
                                <BookOpen className="w-4 h-4 mr-2 text-ucf-gold" />
                                Faculty Tools
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="/assignments" className="block p-3 rounded-lg bg-neutral-50 hover:bg-ucf-gold/10 text-neutral-700 hover:text-ucf-gold-dark font-medium transition-colors border border-transparent hover:border-ucf-gold flex justify-between items-center group">
                                        <span>Assignment Builder</span>
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                                <li>
                                    <a href="/comparison" className="block p-3 rounded-lg bg-neutral-50 hover:bg-ucf-gold/10 text-neutral-700 hover:text-ucf-gold-dark font-medium transition-colors border border-transparent hover:border-ucf-gold flex justify-between items-center group">
                                        <span>Case Study Comparison</span>
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                                <li>
                                    <a href="/create" className="block p-3 rounded-lg bg-neutral-50 hover:bg-ucf-gold/10 text-neutral-700 hover:text-ucf-gold-dark font-medium transition-colors border border-transparent hover:border-ucf-gold flex justify-between items-center group">
                                        <span>Edit Configuration</span>
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                                <li>
                                    <a href="/toolkit/demo" target="_blank" className="block p-3 rounded-lg bg-neutral-50 hover:bg-ucf-gold/10 text-neutral-700 hover:text-ucf-gold-dark font-medium transition-colors border border-transparent hover:border-ucf-gold flex justify-between items-center group">
                                        <span>Student View (Preview)</span>
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Recent Activity / Updates Placeholder */}
                        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                            <h3 className="font-bold text-ucf-black mb-4 flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-neutral-400" />
                                Upcoming Deadlines
                            </h3>
                            <ul className="space-y-4">
                                <li className="text-sm border-l-2 border-ucf-gold pl-3 py-1">
                                    <span className="block font-bold text-neutral-800">Trend Analysis Report</span>
                                    <span className="text-neutral-500 text-xs">Due Feb 28, 2026</span>
                                </li>
                                <li className="text-sm border-l-2 border-neutral-200 pl-3 py-1">
                                    <span className="block font-bold text-neutral-800">Competitor Benchmarking</span>
                                    <span className="text-neutral-500 text-xs">Due Mar 15, 2026</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            {tourActive && (
                <GuideOverlay
                    steps={tourSteps}
                    currentStep={tourStep}
                    onClose={() => setTourActive(false)}
                    onNext={nextStep}
                    onPrev={prevStep}
                />
            )}
        </div>
    );
};

export default FacultyDashboard;
