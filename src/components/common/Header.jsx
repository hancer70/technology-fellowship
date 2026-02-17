import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Menu, X } from 'lucide-react';

const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const menuVariants = {
        closed: { opacity: 0, x: "100%" },
        open: { opacity: 1, x: 0 }
    };

    return (
        <>
            {/* 1. UCF Universal Header */}
            <header className="ucf-header-bar bg-black text-white py-2 text-xs">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6">
                    <div className="flex items-center space-x-4">
                        <a href="https://www.ucf.edu" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 group" aria-label="University of Central Florida Home">
                            <div className="w-8 h-8 rounded-full bg-ucf-gold flex items-center justify-center text-ucf-black font-black text-xs group-hover:bg-white transition-colors">
                                <BookOpen size={16} />
                            </div>
                            <span className="hidden md:inline font-bold tracking-wide hover:underline cursor-pointer font-display">University of Central Florida</span>
                        </a>
                    </div>
                    <div className="flex items-center space-x-6 text-neutral-400 font-medium">
                        {isSearchOpen ? (
                            <form onSubmit={(e) => { e.preventDefault(); window.open(`https://search.ucf.edu/?q=${encodeURIComponent(searchQuery)}`, '_blank'); }} className="flex items-center">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search UCF..."
                                    className="bg-neutral-800 text-white px-3 py-1 rounded-l-md focus:outline-none focus:ring-1 focus:ring-ucf-gold text-sm w-48"
                                    autoFocus
                                />
                                <button type="submit" className="bg-ucf-gold text-ucf-black px-3 py-1 rounded-r-md font-bold text-sm hover:bg-white transition-colors">
                                    Go
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsSearchOpen(false)}
                                    className="ml-2 text-neutral-400 hover:text-white transition-colors"
                                    aria-label="Close search"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </form>
                        ) : (
                            <>
                                <a href="https://www.ucf.edu/admissions/" target="_blank" rel="noopener noreferrer" className="hover:text-ucf-gold transition-colors">Apply</a>
                                <a href="https://foundation.ucf.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-ucf-gold transition-colors">Give</a>
                                <a href="https://my.ucf.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-ucf-gold transition-colors">MyUCF</a>
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    aria-label="Search"
                                    className="hover:text-white cursor-pointer transition-colors"
                                >
                                    <Search className="w-4 h-4" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* 2. College Branding Bar */}
            <div className="college-branding-bar sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                    <Link to="/" className="flex flex-col group" aria-label="Rosen College of Hospitality Management Home">
                        <h1 className="text-2xl md:text-3xl font-display font-bold uppercase leading-none tracking-tight text-ucf-black group-hover:text-ucf-gold transition-colors">
                            Rosen College
                        </h1>
                        <span className="text-sm md:text-base font-medium text-neutral-600 tracking-wide uppercase group-hover:text-ucf-black transition-colors">
                            of Hospitality Management
                        </span>
                    </Link>

                    {/* Desktop Utility Nav */}
                    <nav className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-wide text-ucf-black">
                        <Link to="/proposal" className="hover:text-ucf-gold transition-colors relative group">
                            Fellowship Proposal
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ucf-gold transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/courses" className="hover:text-ucf-gold transition-colors relative group">
                            Courses
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ucf-gold transition-all group-hover:w-full"></span>
                        </Link>
                        <a href="https://hospitality.ucf.edu/degree-programs/" target="_blank" rel="noopener noreferrer" className="hover:text-ucf-gold transition-colors relative group">
                            Academics
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ucf-gold transition-all group-hover:w-full"></span>
                        </a>
                        <a href="https://hospitality.ucf.edu/research/" target="_blank" rel="noopener noreferrer" className="hover:text-ucf-gold transition-colors relative group">
                            Research
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ucf-gold transition-all group-hover:w-full"></span>
                        </a>
                        <button
                            onClick={() => navigate('/create')}
                            className="btn-ucf-primary py-2 px-6 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                            aria-label="Open Toolkit Portal"
                        >
                            Toolkit Portal
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-ucf-black p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-white md:hidden pt-48 px-6 flex flex-col space-y-6 shadow-2xl"
                    >
                        <Link to="/proposal" onClick={toggleMenu} className="text-2xl font-display font-bold text-ucf-black hover:text-ucf-gold transition-colors">Fellowship Proposal</Link>
                        <Link to="/courses" onClick={toggleMenu} className="text-2xl font-display font-bold text-ucf-black hover:text-ucf-gold transition-colors">Courses</Link>
                        <a href="https://hospitality.ucf.edu/degree-programs/" target="_blank" rel="noopener noreferrer" className="text-2xl font-display font-bold text-ucf-black hover:text-ucf-gold transition-colors">Academics</a>
                        <a href="https://hospitality.ucf.edu/research/" target="_blank" rel="noopener noreferrer" className="text-2xl font-display font-bold text-ucf-black hover:text-ucf-gold transition-colors">Research</a>
                        <hr className="border-neutral-200" />
                        <button
                            onClick={() => {
                                navigate('/create');
                                setIsMenuOpen(false);
                            }}
                            className="btn-ucf-primary py-4 text-center text-lg w-full shadow-lg"
                        >
                            Access Toolkit Portal
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
