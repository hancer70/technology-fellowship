import React, { useState, useEffect } from 'react';
import { TrendingUp, ExternalLink, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import InfoTooltip from '../guides/InfoTooltip';
import { fetchInterestOverTime } from '../../services/mockGoogleTrends';

const TrendsWidget = ({ topic }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // URL safe topic
    const query = encodeURIComponent(topic || 'Hospitality Industry');
    const trendsUrl = `https://trends.google.com/trends/explore?q=${query}&geo=US`;

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            setLoading(true);
            const trendData = await fetchInterestOverTime(topic || 'Hospitality');
            if (isMounted) {
                setData(trendData);
                setLoading(false);
            }
        };

        loadData();

        return () => { isMounted = false; };
    }, [topic]);

    return (
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2 text-ucf-black">
                    <TrendingUp className="w-5 h-5 text-ucf-gold" />
                    <h3 className="font-bold text-lg">Google Trends</h3>
                    <InfoTooltip text="Google Trends analyzes the popularity of top search queries in Google Search across various regions and languages." />
                </div>
                <a
                    href={trendsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-ucf-gold transition-colors"
                >
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>

            <div className="mb-4">
                <p className="text-sm text-neutral-500 mb-1">Interest over time (Last 12 Months):</p>
                <div className="font-bold text-2xl text-ucf-black capitalize truncate">{topic || 'General Hospitality'}</div>
            </div>

            {/* Dynamic Graph Area */}
            <div className="h-64 w-full relative border border-neutral-100 rounded-lg overflow-hidden bg-neutral-50">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <RefreshCw className="w-8 h-8 text-ucf-gold animate-spin" />
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FFC904" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#FFC904" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                                interval={2}
                            />
                            <YAxis
                                tick={{ fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#FFC904"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>

            <a
                href={trendsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full text-center py-2 rounded-lg bg-neutral-100 text-neutral-600 font-bold text-sm hover:bg-neutral-200 transition-colors"
            >
                View Live Report
            </a>
        </div>
    );
};

export default TrendsWidget;
