import React, { useState, useEffect } from 'react';
import { Zap, Search, RefreshCw, BarChart2 } from 'lucide-react';
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
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
            <div className="flex items-center space-x-2 text-ucf-black mb-4">
                <Zap className="w-5 h-5 text-ucf-gold" />
                <h3 className="font-bold text-lg">Social Blade Analytics</h3>
                <InfoTooltip text="Social Blade tracks user statistics to help you better understand growth and trends." />
            </div>

            {/* Search / Header */}
            <form onSubmit={handleSearch} className="flex items-center mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter username..."
                    className="flex-grow p-2 bg-neutral-50 border border-neutral-200 rounded-l-lg focus:outline-none focus:border-ucf-gold text-sm"
                />
                <button
                    type="submit"
                    className="bg-ucf-black text-white p-2 rounded-r-lg hover:bg-neutral-800 transition-colors"
                >
                    <Search className="w-4 h-4" />
                </button>
            </form>

            {/* Content Area */}
            <div className="flex-grow">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-48 text-neutral-400">
                        <RefreshCw className="w-8 h-8 text-ucf-gold animate-spin mb-2" />
                        <span className="text-sm">Analyzing Account...</span>
                    </div>
                ) : stats ? (
                    <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h4 className="font-bold text-xl text-ucf-black max-w-[150px] truncate">{searchTerm || 'Account'}</h4>
                                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{stats.platform}</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-xs text-neutral-400 font-bold uppercase mb-1">Total Grade</span>
                                <div className={`text-2xl font-black ${stats.grade.startsWith('A') ? 'text-green-500' : stats.grade.startsWith('B') ? 'text-blue-500' : 'text-neutral-500'}`}>
                                    {stats.grade}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded shadow-sm">
                                <span className="block text-xs text-neutral-400 font-bold uppercase mb-1">Followers</span>
                                <span className="block text-lg font-bold text-ucf-black">{stats.followers}</span>
                            </div>
                            <div className="bg-white p-3 rounded shadow-sm">
                                <span className="block text-xs text-neutral-400 font-bold uppercase mb-1">Engagement</span>
                                <span className="block text-lg font-bold text-ucf-black">{stats.engagementRate}</span>
                            </div>
                            <div className="bg-white p-3 rounded shadow-sm">
                                <span className="block text-xs text-neutral-400 font-bold uppercase mb-1">Following</span>
                                <span className="block text-lg font-bold text-ucf-black">{stats.following}</span>
                            </div>
                            <div className="bg-white p-3 rounded shadow-sm">
                                <span className="block text-xs text-neutral-400 font-bold uppercase mb-1">Uploads</span>
                                <span className="block text-lg font-bold text-ucf-black">{stats.uploads}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-48 text-neutral-400 text-center">
                        <BarChart2 className="w-12 h-12 mb-2 opacity-20" />
                        <p className="text-sm">Enter a username to view fake live stats</p>
                    </div>
                )}
            </div>

            {stats && (
                <a
                    href={`https://socialblade.com/instagram/user/${searchTerm}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block w-full text-center py-2 rounded-lg bg-ucf-black text-white font-bold text-sm hover:bg-neutral-800 transition-colors"
                >
                    View Real Report
                </a>
            )}
        </div>
    );
};

export default SocialBladeWidget;
