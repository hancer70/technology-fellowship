import React, { useState, useEffect } from 'react';
import { Zap, Search, RefreshCw, BarChart2, ExternalLink } from 'lucide-react';
import InfoTooltip from '../guides/InfoTooltip';
import { fetchSocialStats } from '../../services/mockSocialBlade';

const SocialBladeWidget = ({ username }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(username || '');

    const loadStats = async (term) => {
        setLoading(true);
        const data = await fetchSocialStats(term);
        setStats(data);
        setLoading(false);
    };

    useEffect(() => {
        if (username) {
            loadStats(username);
        }
    }, [username]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm) loadStats(searchTerm);
    };

    return (
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="flex items-center space-x-2 text-ucf-black mb-1">
                <Zap className="w-5 h-5 text-ucf-gold" />
                <h3 className="font-bold text-lg">Social Blade Analytics</h3>
                <InfoTooltip text="Social Blade tracks user statistics to help you better understand growth and trends." />
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 mb-3 flex items-start space-x-2">
                <div className="bg-blue-100 p-1 rounded text-blue-600 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                </div>
                <p className="text-[10px] leading-tight text-blue-800 font-medium italic">
                    <strong>Note:</strong> You must be logged into <strong>Social Blade</strong> (free) to view detailed statistics and historical reports.
                </p>
            </div>

            {/* Search / Header */}
            <form onSubmit={handleSearch} className="flex items-center mb-3">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter username..."
                    className="flex-grow p-1.5 bg-neutral-50 border border-neutral-200 rounded-l-lg focus:outline-none focus:border-ucf-gold text-sm"
                />
                <button
                    type="submit"
                    className="bg-ucf-black text-white p-1.5 rounded-r-lg hover:bg-neutral-800 transition-colors"
                >
                    <Search className="w-4 h-4" />
                </button>
            </form>

            {/* Content Area */}
            <div className="flex-grow">
                {loading ? (
                    <div className="flex flex-col items-center justify-center p-4 text-neutral-400">
                        <RefreshCw className="w-6 h-6 text-ucf-gold animate-spin mb-2" />
                        <span className="text-xs">Analyzing...</span>
                    </div>
                ) : stats ? (
                    <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-100">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h4 className="font-bold text-base text-ucf-black max-w-[140px] truncate">{searchTerm || 'Account'}</h4>
                                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">{stats.platform}</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] text-neutral-400 font-bold uppercase mb-0">Grade</span>
                                <div className={`text-xl font-black leading-none ${stats.grade.startsWith('A') ? 'text-green-500' : stats.grade.startsWith('B') ? 'text-blue-500' : 'text-neutral-500'}`}>
                                    {stats.grade}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="bg-white p-1.5 rounded shadow-sm">
                                <span className="block text-[9px] text-neutral-400 font-bold uppercase">Followers</span>
                                <span className="block text-sm font-bold text-ucf-black">{stats.followers}</span>
                            </div>
                            <div className="bg-white p-1.5 rounded shadow-sm">
                                <span className="block text-[9px] text-neutral-400 font-bold uppercase">Engagement</span>
                                <span className="block text-sm font-bold text-ucf-black">{stats.engagementRate}</span>
                            </div>
                            <div className="bg-white p-1.5 rounded shadow-sm">
                                <span className="block text-[9px] text-neutral-400 font-bold uppercase">Following</span>
                                <span className="block text-sm font-bold text-ucf-black">{stats.following}</span>
                            </div>
                            <div className="bg-white p-1.5 rounded shadow-sm">
                                <span className="block text-[9px] text-neutral-400 font-bold uppercase">Uploads</span>
                                <span className="block text-sm font-bold text-ucf-black">{stats.uploads}</span>
                            </div>
                        </div>

                        <a
                            href={`https://socialblade.com/instagram/user/${searchTerm}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full py-1.5 bg-ucf-gold text-ucf-black text-xs font-bold rounded hover:bg-ucf-gold-dark hover:text-white transition-colors"
                        >
                            View Real Report <ExternalLink className="w-3 h-3 ml-2" />
                        </a>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-neutral-400 text-center">
                        <BarChart2 className="w-8 h-8 mb-2 opacity-20" />
                        <p className="text-xs">Enter username to view stats</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default SocialBladeWidget;
