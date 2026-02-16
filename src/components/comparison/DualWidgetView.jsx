import React from 'react';
import TrendsWidget from '../dashboard/TrendsWidget';
import SocialBladeWidget from '../dashboard/SocialBladeWidget';

const DualWidgetView = ({ brandA, brandB }) => {
    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                {/* Brand A Column */}
                <div className="space-y-6">
                    <div className="text-center border-b-4 border-ucf-gold pb-2 mb-4">
                        <h3 className="font-display font-bold text-2xl text-ucf-black">{brandA}</h3>
                    </div>
                    <TrendsWidget topic={brandA} />
                    <SocialBladeWidget username={brandA} />
                </div>

                {/* Divider (Desktop Only) */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-200 -ml-px"></div>

                {/* Brand B Column */}
                <div className="space-y-6">
                    <div className="text-center border-b-4 border-neutral-300 pb-2 mb-4">
                        <h3 className="font-display font-bold text-2xl text-neutral-600">{brandB}</h3>
                    </div>
                    <TrendsWidget topic={brandB} />
                    <SocialBladeWidget username={brandB} />
                </div>
            </div>
        </div>
    );
};

export default DualWidgetView;
