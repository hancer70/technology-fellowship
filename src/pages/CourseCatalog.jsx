import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';
import { Search, BookOpen, ArrowRight, Filter } from 'lucide-react';
import { useWizard } from '../context/WizardContext';
import Header from '../components/common/Header';

const CourseCatalog = () => {
    const navigate = useNavigate();
    const { updateCourseDetails } = useWizard();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCourses, setFilteredCourses] = useState(courses);
    const [levelFilter, setLevelFilter] = useState('All');

    useEffect(() => {
        document.title = 'Course Catalog | SMA Toolkit';
    }, []);

    useEffect(() => {
        const results = courses.filter(course => {
            const matchesSearch = (course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.title.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesLevel = levelFilter === 'All' || course.level === levelFilter;
            return matchesSearch && matchesLevel;
        });
        setFilteredCourses(results);
    }, [searchTerm, levelFilter]);

    const handleCreateToolkit = (course) => {
        // Pre-fill the wizard state with the selected course
        updateCourseDetails({
            courseCode: course.code,
            courseName: course.title,
            studentCount: '', // Let them fill this
            semester: '',      // Let them fill this
            dueDate: ''        // Let them fill this
        });
        navigate('/create');
    };

    return (
        <div className="min-h-screen bg-neutral-50 font-sans selection:bg-ucf-gold selection:text-ucf-black">
            <Header />

            <div className="bg-ucf-black text-white py-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Course Catalog <span className="text-ucf-gold text-2xl md:text-3xl">(2024-2025)</span></h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light">
                        Browse all available Rosen College courses supported by the Social Media Analytics Toolkit.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Search and Filter Bar */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 mb-10 -mt-16 relative z-10 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-grow w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by course code (e.g., HFT 3505) or title..."
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-neutral-300 focus:border-ucf-gold focus:ring-2 focus:ring-ucf-gold/20 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative w-full md:w-48">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                            <select
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutral-300 focus:border-ucf-gold focus:ring-2 focus:ring-ucf-gold/20 outline-none appearance-none bg-white cursor-pointer"
                                value={levelFilter}
                                onChange={(e) => setLevelFilter(e.target.value)}
                            >
                                <option value="All">All Levels</option>
                                <option value="Undergraduate">Undergraduate</option>
                                <option value="Graduate">Graduate</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6 text-neutral-500 font-medium">
                    Showing {filteredCourses.length} courses
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map(course => (
                        <div key={course.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group overflow-hidden">
                            <div className="p-6 flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-neutral-100 text-ucf-black font-bold px-3 py-1 rounded text-xs tracking-wide uppercase group-hover:bg-ucf-gold group-hover:text-ucf-black transition-colors">
                                        {course.code}
                                    </span>
                                    <span className="text-xs text-neutral-500 border border-neutral-200 px-2 py-0.5 rounded-full">
                                        {course.credits} Credits
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-ucf-black mb-3 font-display leading-tight group-hover:text-ucf-primary transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-neutral-600 text-sm line-clamp-3 mb-4">
                                    {course.description}
                                </p>
                                <div className="text-xs text-neutral-400 flex items-center">
                                    <BookOpen className="w-3 h-3 mr-1" />
                                    {course.department}
                                </div>
                            </div>
                            <div className="p-4 border-t border-neutral-100 bg-neutral-50/50">
                                <button
                                    onClick={() => handleCreateToolkit(course)}
                                    className="w-full border-2 border-neutral-300 bg-white text-ucf-black font-bold uppercase tracking-wide hover:bg-ucf-black hover:text-ucf-gold hover:border-ucf-black flex items-center justify-center py-2 text-sm transition-colors rounded-lg"
                                >
                                    Create Toolkit <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-xl border border-neutral-200 border-dashed">
                        <div className="bg-neutral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                            <Search className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-ucf-black mb-2">No courses found</h3>
                        <p className="text-neutral-600 max-w-md mx-auto">
                            We couldn't find any courses matching "{searchTerm}". Try searching for a different keyword or course code.
                        </p>
                        <button
                            onClick={() => { setSearchTerm(''); setLevelFilter('All'); }}
                            className="mt-6 text-ucf-gold font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseCatalog;
