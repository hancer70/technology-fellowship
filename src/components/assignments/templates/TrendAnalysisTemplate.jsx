import React from 'react';
import SubmissionChecklist from '../SubmissionChecklist';

const TrendAnalysisTemplate = ({ data, customContext }) => {
    const topic = data?.topics?.length > 0 ? data.topics[0] : '[Selected Topic]';
    const courseCode = customContext?.courseName || data?.courseDetails?.courseCode || 'HFT 3505';

    // Dynamic dates for "Last 12 Months"
    const today = new Date();
    const lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);
    const dateRange = `${lastYear.toLocaleString('default', { month: 'short', year: 'numeric' })} - ${today.toLocaleString('default', { month: 'short', year: 'numeric' })}`;

    // Context Injection Helper
    const contextBlurb = customContext?.courseDescription
        ? `<br/><br/><em><strong>Course Context:</strong> ${customContext.courseDescription}</em>`
        : '';

    // Define variations
    const variations = [
        {
            id: 'competitor',
            title: 'Head-to-Head Competitive Battle',
            subtitle: 'Market Share Comparison',
            scenario: `You are a digital marketing consultant for **${topic}**. Executives need to understand how their brand interest has fluctuated over the past year compared to key competitors. Your task is to visualize this data and explain the "why" behind the trends.${contextBlurb}`,
            tasks: [
                `<strong>Select Competitors:</strong> Identify 2 direct competitors to <strong>${topic}</strong>.`,
                `<strong>Generate Trends Graph:</strong> Use the course toolkit to generate a comparison graph for <strong>${dateRange}</strong>.`,
                `<strong>Identify Peaks & Valleys:</strong> Pinpoint the highest and lowest interest points for ${topic}.`,
                `<strong>Contextual Research:</strong> Research news events or marketing campaigns that correlate with these peaks.`
            ],
            questions: [
                `Which brand is leading in overall search volume during ${dateRange}?`,
                `Did any specific event cause a viral spike for the winner?`,
                `How does ${topic}'s curve compare? Is it growing or declining?`
            ]
        },
        {
            id: 'seasonality',
            title: 'Seasonal Demand Analysis',
            subtitle: 'Forecasting & Timing',
            scenario: `Timing is everything in hospitality. For **${topic}**, you need to determine their "Peak Season" based on digital interest. Are they a summer destination, a winter retreat, or a year-round player? Use Google Trends to prove your hypothesis.\${contextBlurb}`,
            tasks: [
                `<strong>Timeframe Expansion:</strong> Set your Google Trends tool to look at the "Past 5 Years" to see recurring patterns.`,
                `<strong>Pattern Recognition:</strong> Identify which month *consistently* has the highest search volume every year.`,
                `<strong>Anomaly Check:</strong> Find one year that didn't follow the pattern. What happened then (e.g., COVID, Hurricane, etc.)?`,
                `<strong>Campaign Planning:</strong> Based on this, when should they launch their biggest ad campaign?`
            ],
            questions: [
                `What is the specific peak month for ${topic}?`,
                `How many months in advance does interest start to climb before the peak?`,
                `Is the overall trend line moving UP or DOWN year-over-year?`
            ]
        },
        {
            id: 'reputation',
            title: 'Reputation & Crisis Correlation',
            subtitle: 'News Cycle Impact',
            scenario: `Public perception changes fast. In this assignment, you will overlay "News Events" onto the "Search Volume" for **${topic}**. Did a scandal cause a spike? Did a Super Bowl ad caus a lift? You are the detective connecting real-world events to digital data.\${contextBlurb}`,
            tasks: [
                `<strong>Spike Identification:</strong> Find the single highest point on the graph in the last 12 months.`,
                `<strong>News Research:</strong> Search Google News for that specific week. What was happening with ${topic}?`,
                `<strong>Sentiment Analysis:</strong> Was this spike "Good Attention" (Viral hit) or "Bad Attention" (Crisis)?`,
                `<strong>Recovery/Sustainment:</strong> Did the interest drop back to normal immediately, or did it stay elevated?`
            ],
            questions: [
                `What real-world event triggered the biggest search spike?`,
                `Does "Bad News" drive more search volume than "Good News" for this brand?`,
                `How long is the average "viral lifecycle" for ${topic} (days/weeks)?`
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
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-neutral-200 print:shadow-none print:border-none relative">
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

            {/* Content */}
            <div className="space-y-8 font-serif text-neutral-800 leading-relaxed">
                <section>
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">1. Scenario</h2>
                    {isEditing ? (
                        <textarea
                            value={content.scenario.replace(/<br\/>/g, '\n').replace(/<\/?em>/g, '').replace(/<\/?strong>/g, '')}
                            onChange={(e) => handleUpdate('scenario', e.target.value)}
                            className="w-full h-32 p-3 bg-yellow-50 border border-yellow-200 rounded-lg focus:outline-none resize-y text-sm font-mono"
                        />
                    ) : (
                        <p dangerouslySetInnerHTML={{ __html: content.scenario }}></p>
                    )}
                </section>

                <section>
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">2. Required Tasks</h2>
                    <ol className="list-decimal list-inside space-y-3 pl-4">
                        {content.tasks.map((task, i) => (
                            <li key={i}>
                                {isEditing ? (
                                    <textarea
                                        value={task.replace(/<\/?span[^>]*>/g, '').replace(/<\/?strong>/g, '')}
                                        onChange={(e) => handleListUpdate('tasks', i, e.target.value)}
                                        className="w-full p-2 bg-yellow-50 border border-yellow-200 rounded focus:outline-none h-20 text-sm"
                                    />
                                ) : (
                                    <span dangerouslySetInnerHTML={{ __html: task }}></span>
                                )}
                            </li>
                        ))}
                    </ol>
                </section>

                <section>
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">3. Analysis Questions</h2>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        {content.questions.map((q, i) => (
                            <li key={i}>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={q}
                                        onChange={(e) => handleListUpdate('questions', i, e.target.value)}
                                        className="w-full bg-yellow-50 border-b border-yellow-200 focus:outline-none"
                                    />
                                ) : (
                                    <span>{q}</span>
                                )}
                            </li>
                        ))}
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
