import React from 'react';
import Header from '../components/common/Header';
import { FileText, Download, CheckCircle, Target, Users } from 'lucide-react';

const ProposalPage = () => {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-ucf-gold selection:text-ucf-black">
            <Header />

            {/* Hero Section */}
            <section className="bg-neutral-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/rosen-hero.png')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent"></div>
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center space-x-2 bg-ucf-gold/20 text-ucf-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm border border-ucf-gold/30">
                        <CheckCircle size={14} />
                        <span>Funded Proposal</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
                        Faculty Technology Fellowship
                    </h1>
                    <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
                        Enhancing hospitality curriculum through real-time social media analytics and data-driven decision making.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold text-ucf-black mb-4 flex items-center">
                                <FileText className="text-ucf-gold mr-3" />
                                Abstract
                            </h2>
                            <p className="text-neutral-600 leading-relaxed mb-6">
                                This project aims to develop a comprehensive teaching toolkit focused on social media and digital analytics within the hospitality and tourism industry. The toolkit leverages free, accessible platforms like <strong>Google Trends</strong> and <strong>Social Blade</strong> to help students track brand visibility, customer engagement, and emerging online behaviors.
                            </p>
                            <p className="text-neutral-600 leading-relaxed">
                                The goal is to bridge the gap between theory and practical application through hands-on analytics, empowering students to make evidence-based decisions in a rapidly evolving digital landscape.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-ucf-black mb-4 flex items-center">
                                <Target className="text-ucf-gold mr-3" />
                                Key Objectives
                            </h2>
                            <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100">
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <span className="bg-ucf-gold text-ucf-black w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs mt-1 mr-3 flex-shrink-0">1</span>
                                        <span className="text-neutral-700"><strong>Develop a Teaching Toolkit:</strong> Create a modular suite including lecture slides, step-by-step instructions, and real-world examples.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-ucf-gold text-ucf-black w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs mt-1 mr-3 flex-shrink-0">2</span>
                                        <span className="text-neutral-700"><strong>Comparative Analysis:</strong> Enable students to evaluate hospitality brands and identify regional or global digital patterns.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-ucf-gold text-ucf-black w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs mt-1 mr-3 flex-shrink-0">3</span>
                                        <span className="text-neutral-700"><strong>Lab Integration:</strong> Incorporate the toolkit into Rosen's technology labs and facilitate engagement with emerging AI tools.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-ucf-gold text-ucf-black w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs mt-1 mr-3 flex-shrink-0">4</span>
                                        <span className="text-neutral-700"><strong>Practical Application:</strong> Provide scalable assignment templates that can be easily adapted by faculty across different courses.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-ucf-black mb-4 flex items-center">
                                <Users className="text-ucf-gold mr-3" />
                                Strategic Impact
                            </h2>
                            <p className="text-neutral-600 leading-relaxed mb-4">
                                <strong>Student Readiness:</strong> Strengthens digital literacy and equips graduates with the analytical skills demanded by a technology-driven workforce.
                            </p>
                            <p className="text-neutral-600 leading-relaxed mb-4">
                                <strong>Faculty Support:</strong> Provides reusable, adaptable content that enhances teaching across various hospitality programs without requiring significant new resources.
                            </p>
                            <p className="text-neutral-600 leading-relaxed">
                                <strong>Institutional Leadership:</strong> Positions Rosen College as a leader in digital innovation by showcasing the practical application of industry-standard tools in the classroom.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-ucf-gold">
                            <h3 className="font-bold text-lg mb-2">Project Details</h3>
                            <div className="space-y-3 text-sm border-t border-neutral-100 pt-3">
                                <div className="flex justify-between">
                                    <span className="text-neutral-500">Principal Investigator</span>
                                    <span className="font-semibold text-ucf-black">Dr. Murat Hancer</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-neutral-500">Submission</span>
                                    <span className="font-semibold text-ucf-black">August 2025</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-neutral-500">Status</span>
                                    <span className="font-semibold text-green-600">Funded</span>
                                </div>
                            </div>

                            <a
                                href="/RCHM Tech Fellowship Proposal MH.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full mt-6 bg-ucf-black text-white py-3 px-4 rounded-lg font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center group"
                            >
                                <Download className="w-4 h-4 mr-2 group-hover:text-ucf-gold transition-colors" />
                                Download Full PDF
                            </a>
                            <p className="text-xs text-center text-neutral-400 mt-2">
                                PDF Document
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer (Simplified) */}
            <footer className="bg-ucf-black text-white py-8 border-t-8 border-ucf-gold text-center text-sm">
                <p className="text-neutral-400">© {new Date().getFullYear()} University of Central Florida. Rosen College of Hospitality Management.</p>
            </footer>
        </div>
    );
};

export default ProposalPage;
