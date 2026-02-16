import { ArrowRight, BarChart2 } from 'lucide-react';

const TopicCard = ({ topic }) => {
    return (
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between hover:border-ucf-gold transition-colors group cursor-pointer">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 group-hover:bg-ucf-gold group-hover:text-ucf-black transition-colors">
                    <BarChart2 className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-bold text-ucf-black">{topic}</h4>
                    <span className="text-xs text-neutral-500">Tracked Topic</span>
                </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-ucf-gold transition-colors" />
        </div>
    );
};

export default TopicCard;
