import React from 'react';
import SubmissionChecklist from '../SubmissionChecklist';

const SocialAuditTemplate = ({ data, customContext }) => {
    // Determine the subject topic
    const subject = data?.topics?.length > 0 ? data.topics[0] : '[Selected Brand]';
    const courseCode = customContext?.courseName || data?.courseDetails?.courseCode || 'HFT 3505';

    // Context Injection Helper
    const contextBlurb = customContext?.courseDescription
        ? `<br/><br/><em><strong>Course Context:</strong> ${customContext.courseDescription}</em>`
        : '';

    // Define variations
    const variations = [
        {
            id: 'general',
            title: 'Comprehensive Social Media Audit',
            subtitle: 'Performance & Strategy Review',
            overview: `In this assignment, you will conduct a comprehensive social media audit for **${subject}**. Using the analytics tools provided in this course, you will assess the brand's current performance, audience engagement, and content strategy across key platforms.${contextBlurb}`,
            objectives: [
                `Evaluate qualitative and quantitative metrics for ${subject}.`,
                `Identify high-performing content types using Google Trends data.`,
                `Formulate strategic recommendations based on data-driven insights.`
            ],
            instructions: [
                `<strong>Data Collection:</strong> Access the <span class="text-ucf-gold-dark font-bold">Social Blade</span> module linked in your dashboard. <span class="text-rose-600 font-bold underline">Ensure you are logged into your free Social Blade account</span> to view growth charts and detailed metrics. Record the follower growth rate and engagement rate for ${subject} over the last 30 days.`,
                `<strong>Trend Analysis:</strong> Use <span class="text-ucf-gold-dark font-bold">Google Trends</span> to compare search interest for ${subject} against a primary competitor (e.g., Hilton vs. Marriott) over a 12-month period.`,
                `<strong>SWOT Analysis:</strong> Based on your findings, draft a SWOT analysis highlighting at least two Strengths and two Weaknesses in their digital strategy.`
            ]
        },
        {
            id: 'visual',
            title: 'Visual Identity & Creative Audit',
            subtitle: 'Aesthetic & Brand Consistency',
            overview: `Focus specifically on the visual storytelling of **${subject}**. You will analyze their color palette, imagery style, and video production quality to determine if they are effectively communicating their brand values through design.\${contextBlurb}`,
            objectives: [
                `Critique the visual consistency across Instagram and TikTok.`,
                `Analyze the use of video vs. static imagery in driving engagement.`,
                `Recommend visual improvements to align with luxury/hospitality standards.`
            ],
            instructions: [
                `<strong>Visual Inventory:</strong> Take screenshots of the last 9 posts on Instagram. Identify the dominant color palette and recurring visual themes.`,
                `<strong>Format Analysis:</strong> Compare the engagement rates of Reels/Videos versus static photos. Which format is performing better for ${subject}?`,
                `<strong>Competitor Benchmarking:</strong> Find one competitor with a stronger visual identity. What are they doing differently creatively?`
            ]
        },
        {
            id: 'community',
            title: 'Community Engagement Audit',
            subtitle: 'Response Strategy & Sentiment',
            overview: `Digital hospitality is about how you treat your guests online. For **${subject}**, you will audit their "Community Management" strategy—how they reply to comments, handle complaints, and foster conversation.\${contextBlurb}`,
            objectives: [
                `Measure the average response time and tone of brand replies.`,
                `Analyze user sentiment in the comment sections.`,
                `Propose a "Community Guideline" strategy for better engagement.`
            ],
            instructions: [
                `<strong>Response Check:</strong> Review the last 10 posts. How many comments did the brand reply to? fast was the response?`,
                `<strong>Sentiment Sampling:</strong> Read 20 random user comments. Categorize them as Positive, Neutral, or Negative.`,
                `<strong>Crisis Stress Test:</strong> Find one negative comment (if available) and evaluate how well (or poorly) the brand handled it.`
            ]
        }
    ];

    // Select a random variation on mount
    const variation = React.useMemo(() => {
        const randomIndex = Math.floor(Math.random() * variations.length);
        return variations[randomIndex];
    }, []);

    // State for editing
    const [content, setContent] = React.useState(null);
    const [isEditing, setIsEditing] = React.useState(false);

    // Initialize content from variation
    React.useEffect(() => {
        if (variation) {
            setContent(variation);
        }
    }, [variation]);

    if (!content) return null;

    const handleUpdate = (field, value) => {
        setContent(prev => ({ ...prev, [field]: value }));
    };

    const handleListUpdate = (section, index, value) => {
        setContent(prev => {
            const newList = [...prev[section]];
            newList[index] = value;
            return { ...prev, [section]: newList };
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-neutral-200 print:shadow-none print:border-none relative" id="printable-area">
            {/* Edit Toggle (Hidden in Print) */}
            <button
                onClick={() => setIsEditing(!isEditing)}
                className="absolute top-8 right-8 print:hidden p-2 text-neutral-400 hover:text-ucf-gold transition-colors"
                title={isEditing ? "Save Changes" : "Edit Assignment"}
            >
                {isEditing ? (
                    <div className="flex items-center text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full border border-green-200">
                        <span className="mr-2">Save Changes</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                    </div>
                ) : (
                    <div className="flex items-center text-neutral-400 hover:text-ucf-gold text-sm">
                        <span className="mr-2">Edit Mode</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </div>
                )}
            </button>

            {/* Academic Header */}
            <div className="border-b-4 border-ucf-gold pb-6 mb-8 flex justify-between items-end">
                <div className="w-full mr-12">
                    {isEditing ? (
                        <input
                            type="text"
                            value={content.title}
                            onChange={(e) => handleUpdate('title', e.target.value)}
                            className="w-full text-3xl font-display font-bold text-ucf-black mb-1 bg-yellow-50 border-b border-yellow-200 focus:outline-none"
                        />
                    ) : (
                        <h1 className="text-3xl font-display font-bold text-ucf-black mb-1">{content.title}</h1>
                    )}

                    {isEditing ? (
                        <input
                            type="text"
                            value={content.subtitle}
                            onChange={(e) => handleUpdate('subtitle', e.target.value)}
                            className="w-full text-sm font-bold uppercase tracking-widest text-neutral-500 bg-yellow-50 border-b border-yellow-200 focus:outline-none"
                        />
                    ) : (
                        <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm">{courseCode} • {content.subtitle}</p>
                    )}
                </div>
                <div className="text-right hidden md:block shrink-0">
                    <div className="text-ucf-gold font-display font-bold text-xl">Rosen College</div>
                    <div className="text-xs text-neutral-400">University of Central Florida</div>
                </div>
            </div>

            {/* Assignment Details */}
            <div className="space-y-8 font-serif text-neutral-800 leading-relaxed">
                <section>
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">1. Overview</h2>
                    {isEditing ? (
                        <textarea
                            value={content.overview.replace(/<br\/>/g, '\n').replace(/<\/?em>/g, '').replace(/<\/?strong>/g, '')}
                            onChange={(e) => handleUpdate('overview', e.target.value)}
                            className="w-full h-32 p-3 bg-yellow-50 border border-yellow-200 rounded-lg focus:outline-none resize-y text-sm font-mono"
                        />
                    ) : (
                        <p dangerouslySetInnerHTML={{ __html: content.overview }}></p>
                    )}
                </section>

                <section>
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">2. Learning Objectives</h2>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                        {content.objectives.map((obj, i) => (
                            <li key={i}>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={obj}
                                        onChange={(e) => handleListUpdate('objectives', i, e.target.value)}
                                        className="w-full bg-yellow-50 border-b border-yellow-200 focus:outline-none"
                                    />
                                ) : (
                                    <span>{obj}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">3. Instructions</h2>
                    <ol className="list-decimal list-inside space-y-3 pl-4">
                        {content.instructions.map((inst, i) => (
                            <li key={i}>
                                {isEditing ? (
                                    <textarea
                                        value={inst.replace(/<\/?span[^>]*>/g, '').replace(/<\/?strong>/g, '')}
                                        onChange={(e) => handleListUpdate('instructions', i, e.target.value)}
                                        className="w-full p-2 bg-yellow-50 border border-yellow-200 rounded focus:outline-none h-20 text-sm"
                                    />
                                ) : (
                                    <span dangerouslySetInnerHTML={{ __html: inst }}></span>
                                )}
                            </li>
                        ))}
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
