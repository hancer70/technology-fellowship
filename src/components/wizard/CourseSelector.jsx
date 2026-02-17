import React, { useState, useEffect, useRef } from 'react';
import { courses } from '../../data/courses';
import { Search, ChevronDown, Plus } from 'lucide-react';

const CourseSelector = ({ onSelect, defaultValue = '', register, error }) => {
    const [query, setQuery] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.length > 1) {
            const filtered = courses.filter(c =>
                c.code.toLowerCase().includes(query.toLowerCase()) ||
                c.title.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 10);
            setFilteredCourses(filtered);
            setIsOpen(true);
        } else {
            setFilteredCourses([]);
            setIsOpen(false);
        }
    }, [query]);

    const handleSelect = (course) => {
        setQuery(course.code);
        setIsOpen(false);
        onSelect(course);
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        // If register is provided, it handles the form state.
        // If not, we still update the local query for the dropdown.
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <div className="relative">
                <input
                    {...register('courseCode', {
                        required: 'Course Code is required'
                    })}
                    value={query}
                    onChange={(e) => {
                        handleInputChange(e);
                        if (register('courseCode').onChange) register('courseCode').onChange(e);
                    }}
                    className="input-field pl-10"
                    placeholder="Search HFT/HMG courses or type manually..."
                    autoComplete="off"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            </div>

            {isOpen && filteredCourses.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-xl max-h-60 overflow-auto">
                    {filteredCourses.map(course => (
                        <button
                            key={course.id}
                            type="button"
                            onClick={() => handleSelect(course)}
                            className="w-full text-left px-4 py-3 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0"
                        >
                            <div className="font-bold text-ucf-black">{course.code}</div>
                            <div className="text-sm text-neutral-600 line-clamp-1">{course.title}</div>
                        </button>
                    ))}
                </div>
            )}

            {isOpen && query.length > 2 && filteredCourses.length === 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-xl p-4 text-center">
                    <div className="text-sm text-neutral-500 mb-2 italic">Course not found in database</div>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="text-xs font-bold text-ucf-primary flex items-center justify-center mx-auto hover:underline"
                    >
                        <Plus className="w-3 h-3 mr-1" /> Continue with manual entry
                    </button>
                </div>
            )}
        </div>
    );
};

export default CourseSelector;
