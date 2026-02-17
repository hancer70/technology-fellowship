import React, { useState } from 'react';
import { Download, FileText, Check, Copy, Hash } from 'lucide-react';

const AnalyticsReportPreview = () => {
    const [copied, setCopied] = useState(false);

    const reportMarkdown = `# Monthly Social Media Analytics Report
**Month:** [Month, Year]
**Brand:** [Brand Name]
**Prepared By:** [Your Name]

## 1. Executive Summary
*(Write 2-3 sentences summarizing the month's performance. Was it a growth month? Did a specific campaign drive results?)*

## 2. Key Performance Indicators (KPIs)

| Metric | Last Month | This Month | % Change |
| :--- | :--- | :--- | :--- |
| **Followers** | 0,000 | 0,000 | +0.0% |
| **Impressions** | 0,000 | 0,000 | +0.0% |
| **Engagement Rate** | 0.0% | 0.0% | +0.0% |
| **Website Clicks** | 000 | 000 | +0.0% |

## 3. Top Performing Content
### Post 1: [Title/Description]
- **Likes:** 000
- **Comments:** 00
- **Why it worked:** *(Analysis of why this resonated)*

### Post 2: [Title/Description]
- **Likes:** 000
- **Comments:** 00
- **Why it worked:** *(Analysis)*

## 4. Audience Insights
- **Demographics:** *(Any shift in age/gender/location?)*
- **Active Times:** *(When were followers most active?)*

## 5. Recommendations for Next Month
1. [Actionable Step 1]
2. [Actionable Step 2]
3. [Actionable Step 3]`;

    const handleCopy = () => {
        navigator.clipboard.writeText(reportMarkdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([reportMarkdown], { type: 'text/markdown' });
        element.href = URL.createObjectURL(file);
        element.download = `monthly_analytics_report_template.md`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="space-y-6">
            <div className="bg-green-50 border border-green-100 p-4 rounded-lg flex items-start">
                <Hash className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                    <h4 className="font-bold text-green-900 text-sm">Markdown Structure</h4>
                    <p className="text-green-800 text-xs mt-1">
                        This template uses Markdown, a lightweight formatting language. Students can copy this into any text editor, Notion, or GitHub Gist and it will format automatically.
                    </p>
                </div>
            </div>

            <div className="bg-neutral-900 text-neutral-300 p-6 rounded-lg font-mono text-xs md:text-sm overflow-x-auto shadow-inner leading-relaxed border border-neutral-700">
                <pre>{reportMarkdown}</pre>
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    onClick={handleCopy}
                    className="flex items-center px-4 py-2 bg-white border border-neutral-300 text-neutral-700 font-bold rounded-lg hover:bg-neutral-50 transition-colors"
                >
                    {copied ? <Check className="w-4 h-4 mr-2 text-green-600" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Copied!" : "Copy Markup"}
                </button>
                <button
                    onClick={handleDownload}
                    className="flex items-center px-4 py-2 bg-ucf-gold text-ucf-black font-bold rounded-lg hover:bg-ucf-gold-dark hover:text-white transition-colors"
                >
                    <Download className="w-4 h-4 mr-2" /> Download .MD
                </button>
            </div>
        </div>
    );
};

export default AnalyticsReportPreview;
