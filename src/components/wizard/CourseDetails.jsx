import { useForm } from 'react-hook-form';
import { useWizard } from '../../context/WizardContext';
import { ArrowRight } from 'lucide-react';

const CourseDetails = () => {
    const { nextStep, updateCourseDetails, state } = useWizard();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: state.courseDetails
    });

    const onSubmit = (data) => {
        updateCourseDetails(data);
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <h2 className="heading-2">Course Information</h2>
                <p className="text-neutral-600 mb-8">Enter the details for the course where you'll be using this toolkit.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="input-label">Course Code</label>
                    <input
                        {...register('courseCode', { required: 'Course Code is required' })}
                        className="input-field"
                        placeholder="e.g. HFT 3505"
                    />
                    {errors.courseCode && <span className="text-red-500 text-xs mt-1">{errors.courseCode.message}</span>}
                </div>

                <div>
                    <label className="input-label">Semester</label>
                    <select
                        {...register('semester', { required: 'Semester is required' })}
                        className="input-field"
                    >
                        <option value="">Select Semester</option>
                        <option value="Spring 2026">Spring 2026</option>
                        <option value="Summer 2026">Summer 2026</option>
                        <option value="Fall 2026">Fall 2026</option>
                    </select>
                    {errors.semester && <span className="text-red-500 text-xs mt-1">{errors.semester.message}</span>}
                </div>

                <div className="md:col-span-2">
                    <label className="input-label">Course Name</label>
                    <input
                        {...register('courseName', { required: 'Course Name is required' })}
                        className="input-field"
                        placeholder="e.g. Social Media & Digital Trends in Hospitality"
                    />
                    {errors.courseName && <span className="text-red-500 text-xs mt-1">{errors.courseName.message}</span>}
                </div>

                <div>
                    <label className="input-label">Estimated Student Count</label>
                    <input
                        type="number"
                        {...register('studentCount', { required: 'Student count is required', min: 1 })}
                        className="input-field"
                        placeholder="e.g. 45"
                    />
                    {errors.studentCount && <span className="text-red-500 text-xs mt-1">{errors.studentCount.message}</span>}
                </div>
            </div>

            <div className="flex justify-end pt-8">
                <button type="submit" className="btn-ucf-primary flex items-center">
                    Next Step <ArrowRight className="w-4 h-4 ml-2" />
                </button>
            </div>
        </form>
    );
};

export default CourseDetails;
