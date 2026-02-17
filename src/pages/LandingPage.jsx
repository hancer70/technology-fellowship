import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Users, Sparkles, MonitorPlay } from 'lucide-react';
import Header from '../components/common/Header';
import ToolkitGuide from '../components/common/ToolkitGuide';

const LandingPage = () => {
    const navigate = useNavigate();
    const [showGuide, setShowGuide] = useState(false);

    useEffect(() => {
        document.title = 'SMA Toolkit | Faculty Fellowship';
    }, []);

    const exampleToolkits = [
        {
            id: 1,
            course: 'HFT 3505',
            title: 'Social Media & Digital Trends',
            instructor: 'Dr. Murat Hancer',
            students: 45
        },
        {
            id: 2,
            course: 'HFT 3444',
            title: 'Hospitality Information Systems',
            instructor: 'Dr. Ahmet Ozturk',
            students: 38
        },
        {
            id: 3,
            course: 'HFT 4464',
            title: 'Hospitality Industry Finance',
            instructor: 'Dr. Mehmet Altin',
            students: 32
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-ucf-gold selection:text-ucf-black overflow-x-hidden">
            <ToolkitGuide isOpen={showGuide} onClose={() => setShowGuide(false)} />
            <Header />

            {/* 3. Hero Section (Solid, Authoritative) */}
            <section className="relative bg-neutral-900 py-32 md:py-48 overflow-hidden">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/40 z-10"></div>
                    <div className="w-full h-full bg-[url('/rosen-hero.png')] bg-cover bg-center opacity-60 grayscale hover:grayscale-0 transition-all duration-[2s] transform scale-105 hover:scale-110"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-block px-4 py-1 mb-6 bg-ucf-gold text-ucf-black font-bold uppercase text-xs tracking-widest shadow-md">
                            Faculty Technology Fellowship
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-tight max-w-4xl drop-shadow-2xl">
                            Social Media Analytics <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ucf-gold to-yellow-200">Teaching Toolkit</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-300 mb-10 max-w-2xl leading-relaxed font-light">
                            Empowering Rosen College faculty to integrate <span className="text-white font-semibold">live data analytics</span> into hospitality curriculum using Google Trends and Social Blade.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <motion.button
                                onClick={() => navigate('/create')}
                                className="btn-ucf-primary text-lg px-8 py-4 shadow-ucf-gold/20 shadow-xl"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{ boxShadow: ["0px 0px 0px rgba(255,201,4,0)", "0px 0px 20px rgba(255,201,4,0.3)", "0px 0px 0px rgba(255,201,4,0)"] }}
                                transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                                aria-label="Access Toolkit"
                            >
                                Access Toolkit
                            </motion.button>

                            <button
                                onClick={() => setShowGuide(true)}
                                className="btn-ucf-secondary border border-neutral-700 hover:bg-neutral-800 text-lg px-8 py-4 bg-transparent text-white text-center flex items-center justify-center"
                            >
                                <MonitorPlay className="w-5 h-5 mr-2 text-ucf-gold" />
                                Student Guide
                            </button>

                            <a href="#features" className="btn-ucf-secondary border border-neutral-700 hover:bg-neutral-800 text-lg px-8 py-4 bg-transparent text-white text-center" aria-label="View Faculty Guide Section">
                                Faculty Guide
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 4. Faculty Guide Section */}
            <section id="features" className="py-24 bg-white relative scroll-mt-20">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ucf-gold via-ucf-black to-ucf-gold opacity-20"></div>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16">
                        <div className="w-20 h-1 bg-ucf-gold mb-6"></div>
                        <h2 className="heading-2 text-4xl mb-4">Faculty Guide: How to Integrate</h2>
                        <p className="text-xl text-neutral-600 max-w-3xl font-light">
                            A turnkey solution for bringing live data analytics into your classroom without the technical headache.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20 relative">
                        {/* Connecting Line for Desktop */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-neutral-200 -z-10"></div>

                        {[
                            {
                                step: "01",
                                title: "Select a Module",
                                description: "Choose from pre-built templates aligned with HFT course learning outcomes.",
                                icon: Sparkles
                            },
                            {
                                step: "02",
                                title: "Customize Topics",
                                description: "Input specific brands, competitors, or keywords for your weekly lesson.",
                                icon: Zap
                            },
                            {
                                step: "03",
                                title: "Share with Students",
                                description: "Generate a simple link or QR code to post directly on Webcourses.",
                                icon: Users
                            },
                            {
                                step: "04",
                                title: "Analyze & Grade",
                                description: "Receive standardized PDF reports and PPTX presentations for easy grading.",
                                icon: TrendingUp
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300 relative group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-6 text-6xl font-black text-neutral-100 -z-10 group-hover:text-ucf-gold/10 transition-colors">
                                    {item.step}
                                </div>
                                <div className="w-12 h-12 bg-ucf-black text-ucf-gold rounded-full flex items-center justify-center mb-6 text-xl font-bold shadow-md group-hover:bg-ucf-gold group-hover:text-ucf-black transition-colors">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-ucf-black font-display">{item.title}</h3>
                                <p className="text-sm text-neutral-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Benefits Subsection */}
                    <div className="bg-neutral-50 p-8 md:p-12 border border-neutral-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                                <h4 className="text-ucf-gold font-bold uppercase tracking-widest text-sm mb-2">Zero Cost</h4>
                                <p className="text-neutral-700 font-medium">No textbook fees or software subscriptions required for students.</p>
                            </div>
                            <div className="md:border-l md:border-r border-neutral-200 px-4">
                                <h4 className="text-ucf-gold font-bold uppercase tracking-widest text-sm mb-2">Live Data</h4>
                                <p className="text-neutral-700 font-medium">Real-time market relevance vs. outdated textbook case studies.</p>
                            </div>
                            <div>
                                <h4 className="text-ucf-gold font-bold uppercase tracking-widest text-sm mb-2">Turnkey</h4>
                                <p className="text-neutral-700 font-medium">Ready-to-use assignments with standardized grading rubrics.</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA for Faculty */}
                    <div className="mt-16 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="inline-block"
                        >
                            <h3 className="text-2xl font-bold mb-6 text-ucf-black font-display">Ready to modernize your curriculum?</h3>
                            <button
                                onClick={() => navigate('/create')}
                                className="btn-ucf-primary text-xl px-10 py-5 shadow-ucf-gold/30 shadow-2xl hover:scale-105 transition-transform duration-300"
                            >
                                Start Building Your Toolkit
                            </button>
                            <p className="mt-4 text-neutral-500 text-sm">Takes less than 2 minutes to set up.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 5. Courses Section (Simple & Official) */}
            <section className="py-24 bg-neutral-50 border-t border-neutral-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                        <div>
                            <h2 className="heading-2 text-4xl mb-4">Sample Course Integrations</h2>
                            <p className="text-lg text-neutral-600 font-light">Can easily be deployed in the following HFT modules.</p>
                        </div>
                        <a href="https://hospitality.ucf.edu/degree-programs/" target="_blank" rel="noopener noreferrer" className="mt-4 md:mt-0 text-ucf-black font-bold uppercase text-sm border-b-2 border-ucf-gold hover:text-ucf-gold hover:border-ucf-black transition-colors pb-1">
                            View All Degree Programs
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {exampleToolkits.map((toolkit) => (
                            <div
                                key={toolkit.id}
                                onClick={() => navigate(`/toolkit/${toolkit.course.replace(/\s+/g, '-').toLowerCase()}`)}
                                className="bg-white border-l-4 border-ucf-black p-8 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
                            >
                                <div className="text-xs font-bold text-ucf-gold uppercase tracking-widest mb-2 group-hover:text-ucf-black transition-colors">
                                    {toolkit.course}
                                </div>
                                <h3 className="text-xl font-bold text-ucf-black mb-2 leading-tight font-display">
                                    {toolkit.title}
                                </h3>
                                <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between text-sm text-neutral-500">
                                    <span className="font-medium text-ucf-black">{toolkit.instructor}</span>
                                    <span className="flex items-center text-ucf-gold font-bold bg-neutral-100 px-2 py-1 rounded group-hover:bg-ucf-black group-hover:text-white transition-colors">
                                        <Users className="w-3 h-3 mr-1" />
                                        View Toolkit
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Institutional Footer */}
            <footer className="bg-ucf-black text-white pt-16 pb-8 border-t-8 border-ucf-gold">
                <div className="max-w-7xl mx-auto px-6 items-start">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <a href="https://www.ucf.edu" target="_blank" rel="noopener noreferrer" className="inline-block group" aria-label="University of Central Florida Home">
                                <h3 className="font-display font-bold text-2xl mb-6 uppercase tracking-wider group-hover:text-ucf-gold transition-colors">
                                    University of Central Florida
                                </h3>
                            </a>
                            <p className="text-neutral-400 max-w-md mb-6 leading-relaxed text-sm">
                                9907 Universal Blvd. <br />
                                Orlando, Florida 32819 <br />
                                407.903.8000
                            </p>
                            <div className="flex space-x-4">
                                <a href="https://www.facebook.com/UCF" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-neutral-800 rounded flex items-center justify-center hover:bg-ucf-gold hover:text-ucf-black transition-colors cursor-pointer font-bold" aria-label="UCF Facebook">FB</a>
                                <a href="https://twitter.com/UCF" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-neutral-800 rounded flex items-center justify-center hover:bg-ucf-gold hover:text-ucf-black transition-colors cursor-pointer font-bold" aria-label="UCF Twitter">X</a>
                                <a href="https://www.instagram.com/ucf.edu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-neutral-800 rounded flex items-center justify-center hover:bg-ucf-gold hover:text-ucf-black transition-colors cursor-pointer font-bold" aria-label="UCF Instagram">IG</a>
                                <a href="https://www.linkedin.com/school/university-of-central-florida/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-neutral-800 rounded flex items-center justify-center hover:bg-ucf-gold hover:text-ucf-black transition-colors cursor-pointer font-bold" aria-label="UCF LinkedIn">LI</a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-ucf-gold uppercase tracking-widest text-sm mb-6">Colleges</h4>
                            <ul className="space-y-3 text-sm text-neutral-300">
                                <li><a href="https://cah.ucf.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Arts and Humanities</a></li>
                                <li><a href="https://business.ucf.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Business</a></li>
                                <li><a href="https://ccie.ucf.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Education</a></li>
                                <li><a href="https://www.cecs.ucf.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Engineering & Computer Science</a></li>
                                <li><a href="https://hospitality.ucf.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-white underline decoration-ucf-gold decoration-2 underline-offset-4">Rosen College of Hospitality Management</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-ucf-gold uppercase tracking-widest text-sm mb-6">Resources</h4>
                            <ul className="space-y-3 text-sm text-neutral-300">
                                <li><a href="https://hospitality.ucf.edu/about/our-people/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Faculty Resources</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Technology Fellowship</a></li>
                                <li><a href="https://webcourses.ucf.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Webcourses@UCF</a></li>
                                <li><a href="https://library.ucf.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Library</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500">
                        <p>© {new Date().getFullYear()} University of Central Florida. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="https://www.ucf.edu/internet-privacy-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="https://www.ucf.edu/accessibility/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Accessibility</a>
                            <a href="https://www.ucf.edu/public-records/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Public Records</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;