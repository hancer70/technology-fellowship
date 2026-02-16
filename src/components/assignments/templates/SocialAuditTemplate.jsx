import React from 'react';
import SubmissionChecklist from '../SubmissionChecklist';

const SocialAuditTemplate = ({ data }) => {
    // Debug logging
    console.log('SocialAuditTemplate data:', data);

    // Determine the subject topic
    const subject = data?.topics?.length > 0 ? data.topics[0] : '[Selected Brand]';
    const courseCode = data?.courseDetails?.courseCode || 'HFT 3505';

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-neutral-200 print:shadow-none print:border-none" id="printable-area">
            {/* Academic Header */}
            <div className="border-b-4 border-ucf-gold pb-6 mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-display font-bold text-ucf-black mb-1">Assignment Brief</h1>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm">{courseCode} • Social Media Audit</p>
                </div>
                <div className="text-right hidden md:block">
                    <div className="text-ucf-gold font-display font-bold text-xl">Rosen College</div>
                    <div className="text-xs text-neutral-400">University of Central Florida</div>
                </div>
            </div>

            {/* Assignment Details */}
            <div className="space-y-8 font-serif text-neutral-800 leading-relaxed">
                <section>
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">1. Overview</h2>
                    <p>
                        In this assignment, you will conduct a comprehensive social media audit for <strong>{subject}</strong>.
                        Using the analytics tools provided in this course, you will assess the brand's current performance,
                        audience engagement, and content strategy across key platforms.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">2. Learning Objectives</h2>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                        <li>Evaluate qualitative and quantitative metrics for {subject}.</li>
                        <li>Identify high-performing content types using Google Trends data.</li>
                        <li>Formulate strategic recommendations based on data-driven insights.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">3. Instructions</h2>
                    <ol className="list-decimal list-inside space-y-3 pl-4">
                        <li>
                            <strong>Data Collection:</strong> Access the <span className="text-ucf-gold-dark font-bold">Social Blade</span> module linked in your dashboard.
                            Record the follower growth rate and engagement rate for {subject} over the last 30 days.
                        </li>
                        <li>
                            <strong>Trend Analysis:</strong> Use <span className="text-ucf-gold-dark font-bold">Google Trends</span> to compare search interest for {subject} against a primary competitor (e.g., Hilton vs. Marriott) over a 12-month period.
                        </li>
                        <li>
                            <strong>SWOT Analysis:</strong> Based on your findings, draft a SWOT analysis highlighting at least two Strengths and two Weaknesses in their digital strategy.
                        </li>
                    </ol>
                </section>

                <section>
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">4. Deliverables</h2>
                    <p>Submit a PDF report (max 2 pages) including screenshots of your data visualizations and your strategic commentary.</p>
                </section>
            </div>

            {/* Dynamic Checklist */}
            <SubmissionChecklist data={data} />

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-neutral-200 text-center text-xs text-neutral-400 font-sans">
                &copy; {new Date().getFullYear()} Rosen College of Hospitality Management. Generated via Faculty Toolkit.
            </div>
        </div>
    );
};

export default SocialAuditTemplate;
