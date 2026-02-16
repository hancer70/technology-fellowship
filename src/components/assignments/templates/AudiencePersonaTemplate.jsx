import React from 'react';
import SubmissionChecklist from '../SubmissionChecklist';

const AudiencePersonaTemplate = ({ data }) => {
    const topic = data?.topics?.length > 0 ? data.topics[0] : '[Target Brand]';
    const courseCode = data?.courseDetails?.courseCode || 'HFT 3505';

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-neutral-200 print:shadow-none print:border-none">
            {/* Academic Header */}
            <div className="border-b-4 border-ucf-gold pb-6 mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-display font-bold text-ucf-black mb-1">Audience Persona Brief</h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm">{courseCode} • Customer Profiling</p>
                </div>
                <div className="text-right hidden md:block">
                    <div className="text-ucf-gold font-display font-bold text-xl">Rosen College</div>
                    <div className="text-xs text-neutral-400">University of Central Florida</div>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-8 font-serif text-neutral-800 leading-relaxed">
                <section>
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">1. Objective</h2>
                    <p>
                        Move beyond demographics. Based on the social media engagement data for <strong>{topic}</strong>,
                        construct a detailed "Avatar" of their typical digital advocate.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">2. Steps</h2>
                    <ul className="list-disc list-inside space-y-3 pl-4">
                        <li>
                            <strong>Content Audit:</strong> Review the top 5 most engaged posts for {topic} using the Inspector tool.
                        </li>
                        <li>
                            <strong>Sentiment Check:</strong> Read through comments to understand the tone of the community.
                        </li>
                        <li>
                            <strong>Draft the Persona:</strong> Create a fictional profile including:
                            <ul className="list-circle list-inside ml-6 mt-2 text-sm text-neutral-600">
                                <li>Name & Age</li>
                                <li>Job Title / Income Level</li>
                                <li>Key Pain Points (what frustrates them?)</li>
                                <li>Digital Habits (where do they hang out online?)</li>
                            </ul>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">3. Strategic Application</h2>
                    <p>
                        Write a short paragraph explaining how understanding this specific persona would change
                        <strong>{topic}'s</strong> marketing strategy for the upcoming season.
                    </p>
                </section>
            </div>

            <SubmissionChecklist data={data} />

            <div className="mt-16 pt-8 border-t border-neutral-200 text-center text-xs text-neutral-400 font-sans">
                &copy; {new Date().getFullYear()} Rosen College of Hospitality Management.
            </div>
        </div>
    );
};

export default AudiencePersonaTemplate;
