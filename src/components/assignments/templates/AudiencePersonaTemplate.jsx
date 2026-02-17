import React from 'react';
import SubmissionChecklist from '../SubmissionChecklist';

const AudiencePersonaTemplate = ({ data, customContext }) => {
    const topic = data?.topics?.length > 0 ? data.topics[0] : '[Target Brand]';
    const courseCode = customContext?.courseName || data?.courseDetails?.courseCode || 'HFT 3505';

    // Context Injection Helper
    const contextBlurb = customContext?.courseDescription
        ? `<br/><br/><em><strong>Course Context:</strong> ${customContext.courseDescription}</em>`
        : '';

    // Define variations
    const variations = [
        {
            id: 'advocate',
            title: 'The Superfan Persona',
            subtitle: 'Loyalty Optimization',
            objective: `Move beyond demographics. Based on the social media engagement data for **${topic}**, construct a detailed "Avatar" of their most loyal digital advocate—the person who likes, comments, and shares everything.${contextBlurb}`,
            steps: [
                `<strong>Content Audit:</strong> Review the top 5 most engaged posts. Who is commenting positively? Click on their profiles (public ones only).`,
                `<strong>Common Threads:</strong> What shared interests do these superfans have? (e.g., Foodies, Adventure Travelers, Parents?)`,
                `<strong>Draft the Persona:</strong> Create a fictional profile including:
                    <ul class="list-circle list-inside ml-6 mt-2 text-sm text-neutral-600">
                        <li>Name & Age</li>
                        <li>Job Title / Income Level</li>
                        <li>Key Motivations (Why do they love ${topic}?)</li>
                        <li>Favorite Content Formats (Reels, Stories, or Posts?)</li>
                    </ul>`
            ],
            application: `Write a short paragraph explaining how you would reward this "Superfan" to turn them into an official Brand Ambassador.`
        },
        {
            id: 'detractor',
            title: 'The Critic Persona (Service Recovery)',
            subtitle: 'Crisis Management',
            objective: `You can learn more from a complaint than a compliment. For this assignment, you will build a persona for the "Dissatisfied Information Seeker"—the customer who goes to **${topic}'s** social media specifically to complain or ask for help.\${contextBlurb}`,
            steps: [
                `<strong>Complaint Scan:</strong> Look for comments asking for refunds, help, or expressing disappointment on recent posts.`,
                `<strong>Pain Point Mapping:</strong> What is the #1 recurring complaint? (Price? Service? Cleanliness?)`,
                `<strong>Draft the Persona:</strong> Create a fictional profile including:
                    <ul class="list-circle list-inside ml-6 mt-2 text-sm text-neutral-600">
                        <li>Name & Stress Level</li>
                        <li>Immediate Need (What solution are they hunting for?)</li>
                        <li>Preferred Resolution Channel (DM, Public Comment, or Email?)</li>
                        <li>Emotional State (Frustrated, Confused, or Angry?)</li>
                    </ul>`
            ],
            application: `Draft three "Canned Responses" that the social media team could use to de-escalate this specific persona when they comment.`
        },
        {
            id: 'niche',
            title: 'The Niche Traveler Persona',
            subtitle: 'Targeted Marketing',
            objective: `Generic marketing is dead. **${topic}** wants to target a very specific micro-niche (e.g., "Digital Nomads," "Eco-Tourists," or "Pet Owners"). Your job is to find evidence of this niche in their current following.\${contextBlurb}`,
            steps: [
                `<strong>Visual Hunt:</strong> Look for user-generated content (tagged photos) related to a specific niche (e.g., dogs in the lobby, laptops at the bar).`,
                `<strong>Hashtag Analysis:</strong> What niche hashtags are followers using alongside #${topic.replace(/\s+/g, '')}?`,
                `<strong>Draft the Persona:</strong> Create a fictional profile including:
                    <ul class="list-circle list-inside ml-6 mt-2 text-sm text-neutral-600">
                        <li>Micro-Segment Name (e.g., "The WFH Warrior")</li>
                        <li>Must-Have Amenities (What feature matters most to them?)</li>
                        <li>Spending Habits (Do they splurge on food or room upgrades?)</li>
                        <li>Influences (Who do they follow for advice?)</li>
                    </ul>`
            ],
            application: `Propose one specific "Package" or "Special Offer" tailored exclusively to attract this Niche Persona.`
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
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">1. Objective</h2>
                    {isEditing ? (
                        <textarea
                            value={content.objective.replace(/<br\/>/g, '\n').replace(/<\/?em>/g, '').replace(/<\/?strong>/g, '')}
                            onChange={(e) => handleUpdate('objective', e.target.value)}
                            className="w-full h-32 p-3 bg-yellow-50 border border-yellow-200 rounded-lg focus:outline-none resize-y text-sm font-mono"
                        />
                    ) : (
                        <p dangerouslySetInnerHTML={{ __html: content.objective }}></p>
                    )}
                </section>

                <section>
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">2. Steps</h2>
                    <ul className="list-disc list-inside space-y-3 pl-4">
                        {content.steps.map((step, i) => (
                            <li key={i}>
                                {isEditing ? (
                                    <textarea
                                        value={step.replace(/<\/?span[^>]*>/g, '').replace(/<\/?strong>/g, '').replace(/<\/?ul[^>]*>/g, '').replace(/<\/?li[^>]*>/g, '')}
                                        onChange={(e) => handleListUpdate('steps', i, e.target.value)}
                                        className="w-full p-2 bg-yellow-50 border border-yellow-200 rounded focus:outline-none h-24 text-sm"
                                    />
                                ) : (
                                    <span dangerouslySetInnerHTML={{ __html: step }}></span>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-sans font-bold text-ucf-black mb-3 border-b border-neutral-100 pb-2">3. Strategic Application</h2>
                    {isEditing ? (
                        <textarea
                            value={content.application.replace(/<br\/>/g, '\n').replace(/<\/?em>/g, '').replace(/<\/?strong>/g, '')}
                            onChange={(e) => handleUpdate('application', e.target.value)}
                            className="w-full h-24 p-2 bg-yellow-50 border border-yellow-200 rounded focus:outline-none resize-y text-sm font-mono"
                        />
                    ) : (
                        <p dangerouslySetInnerHTML={{ __html: content.application }}></p>
                    )}
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
