import React from 'react';
import { Download, Table } from 'lucide-react';

const ContentCalendarPreview = () => {
    // structured data for 4 weeks of content
    const calendarData = [
        { week: 1, theme: 'Brand Awareness', monday: 'Behind the Scenes Reel', wednesday: 'Staff Spotlight', friday: 'Weekly Recap Carousel' },
        { week: 2, theme: 'Product Education', monday: 'How-To Video', wednesday: 'User Testimonial', friday: 'Feature Deep Dive' },
        { week: 3, theme: 'Community', monday: 'UGC Share', wednesday: 'Poll/Question', friday: 'Community Highlight' },
        { week: 4, theme: 'Promotion', monday: 'Upcoming Event Teaser', wednesday: 'Partner Collaboration', friday: 'Weekend Sale/Offer' },
    ];

    const handleDownloadCSV = () => {
        const headers = ['Week', 'Theme', 'Monday', 'Wednesday', 'Friday'];
        const rows = calendarData.map(row => [row.week, row.theme, row.monday, row.wednesday, row.friday]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "social_media_content_calendar.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start">
                <Table className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                    <h4 className="font-bold text-blue-900 text-sm">How to use this calendar</h4>
                    <p className="text-blue-800 text-xs mt-1">
                        This template provides a 4-week rotation structure. Students should map their specific content pillars to these broad categories.
                        Download the CSV to open in Excel or Google Sheets.
                    </p>
                </div>
            </div>

            <div className="border rounded-lg overflow-hidden text-sm">
                <table className="w-full text-left">
                    <thead className="bg-neutral-100 border-b border-neutral-200">
                        <tr>
                            <th className="p-3 font-bold text-neutral-600">Week</th>
                            <th className="p-3 font-bold text-neutral-600">Theme</th>
                            <th className="p-3 font-bold text-neutral-600">Monday</th>
                            <th className="p-3 font-bold text-neutral-600">Wednesday</th>
                            <th className="p-3 font-bold text-neutral-600">Friday</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {calendarData.map((row) => (
                            <tr key={row.week} className="hover:bg-neutral-50 transition-colors">
                                <td className="p-3 font-medium text-neutral-900">Week {row.week}</td>
                                <td className="p-3 text-neutral-600 bg-neutral-50/50">{row.theme}</td>
                                <td className="p-3 text-neutral-600">{row.monday}</td>
                                <td className="p-3 text-neutral-600">{row.wednesday}</td>
                                <td className="p-3 text-neutral-600">{row.friday}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleDownloadCSV}
                    className="flex items-center px-4 py-2 bg-ucf-gold text-ucf-black font-bold rounded-lg hover:bg-ucf-gold-dark hover:text-white transition-colors"
                >
                    <Download className="w-4 h-4 mr-2" /> Download .CSV
                </button>
            </div>
        </div>
    );
};

export default ContentCalendarPreview;
