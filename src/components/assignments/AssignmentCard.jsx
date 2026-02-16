import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AssignmentCard = ({ title, description, icon: Icon, onClick }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-ucf-gold transition-all cursor-pointer group"
            onClick={onClick}
        >
            <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-ucf-black mb-4 group-hover:bg-ucf-gold transition-colors">
                {Icon ? <Icon className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
            </div>
            <h3 className="text-lg font-display font-bold text-ucf-black mb-2 group-hover:text-ucf-gold-dark transition-colors">{title}</h3>
            <p className="text-sm text-neutral-500 mb-6">{description}</p>
            <div className="flex items-center text-sm font-bold text-ucf-black group-hover:underline">
                Generate Brief <ArrowRight className="w-4 h-4 ml-2" />
            </div>
        </motion.div>
    );
};

export default AssignmentCard;
