import React from 'react';
import TrendsWidget from '../dashboard/TrendsWidget';
import SocialBladeWidget from '../dashboard/SocialBladeWidget';

const DualWidgetView = ({ brandA, brandB }) => {
    return (
        <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                {/* Brand A Column */}
                <div className="space-y-3">
                    <div className="text-center border-b-2 border-ucf-gold pb-1 mb-2">
                        <h3 className="font-display font-bold text-xl text-ucf-black">{brandA}</h3>
                    </div>
                    <TrendsWidget topic={brandA} />
                    <SocialBladeWidget username={brandA} />
                </div>

                {/* Divider (Desktop Only) */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-200 -ml-px"></div>

                {/* Brand B Column */}
                <div className="space-y-3">
                    <div className="text-center border-b-2 border-neutral-300 pb-1 mb-2">
                        <h3 className="font-display font-bold text-xl text-neutral-600">{brandB}</h3>
                    </div>
                    <TrendsWidget topic={brandB} />
                    <SocialBladeWidget username={brandB} />
                </div>
            </div>
        </div>
    );
};

export default DualWidgetView;
