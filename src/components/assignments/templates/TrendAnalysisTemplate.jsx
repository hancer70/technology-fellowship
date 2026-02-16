import React from 'react';
import SubmissionChecklist from '../SubmissionChecklist';

const TrendAnalysisTemplate = ({ data }) => {
    const topic = data?.topics?.length > 0 ? data.topics[0] : '[Selected Topic]';
    const courseCode = data?.courseDetails?.courseCode || 'HFT 3505';

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-neutral-200 print:shadow-none print:border-none">
            {/* Academic Header */}
            <div className="border-b-4 border-ucf-gold pb-6 mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-display font-bold text-ucf-black mb-1">Trend Analysis Brief</h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm">{courseCode} • Competitive Analysis</p>
                </div>
                <div className="text-right hidden md:block">
                    <div className="text-ucf-gold font-display font-bold text-xl">Rosen College</div>
                    <div className="text-xs text-neutral-400">University of Central Florida</div>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-8 font-serif text-neutral-800 leading-relaxed">
                <section>
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">1. Scenario</h2>
                    <p>
                        You are a digital marketing consultant for <strong>{topic}</strong>.
                        Execuives need to understand how their brand interest has fluctuated over the past year compared to key competitors.
                        Your task is to visualize this data and explain the "why" behind the trends.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">2. Required Tasks</h2>
                    <ol className="list-decimal list-inside space-y-3 pl-4">
                        <li>
                            <strong>Select Competitors:</strong> Identify 2 direct competitors to <strong>{topic}</strong>.
                        </li>
                        <li>
                            <strong>Generate Trends Graph:</strong> Use the course toolkit to generating a 12-month comparison graph.
                        </li>
                        <li>
                            <strong>Identify Peaks & Valleys:</strong> Pinpoint the highest and lowest interest points for {topic}.
                        </li>
                        <li>
                            <strong>Contextual Research:</strong> Research news events or marketing campaigns that correlate with these peaks.
                        </li>
                    </ol>
                </section>

                <section>
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">3. Analysis Questions</h2>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li>Which brand is leading in overall search volume?</li>
                        <li>Is the interest seasonal (e.g., higher in summer/winter)?</li>
                        <li>Did any specific event cause a viral spike?</li>
                    </ul>
                </section>
            </div>

            <SubmissionChecklist data={data} />

            <div className="mt-16 pt-8 border-t border-neutral-200 text-center text-xs text-neutral-400 font-sans">
                &copy; {new Date().getFullYear()} Rosen College of Hospitality Management.
            </div>
        </div>
    );
};

export default TrendAnalysisTemplate;
