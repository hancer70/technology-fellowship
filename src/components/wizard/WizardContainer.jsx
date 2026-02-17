import React, { useEffect } from 'react';
import { useWizard } from '../../context/WizardContext';
import WizardLayout from '../../layouts/WizardLayout';
import CourseDetails from './CourseDetails';
import ModuleSelection from './ModuleSelection';
import TopicConfiguration from './TopicConfiguration';
import ReviewStep from './ReviewStep';

const WizardFlow = () => {
    const { state } = useWizard();

    switch (state.step) {
        case 1: return <CourseDetails />;
        case 2: return <ModuleSelection />;
        case 3: return <TopicConfiguration />;
        case 4: return <ReviewStep />;
        default: return <CourseDetails />;
    }
};

const WizardContainer = () => {
    useEffect(() => {
        document.title = 'Create Toolkit | SMA Toolkit';
    }, []);

    return (
        <WizardLayout>
            <WizardFlow />
        </WizardLayout>
    );
};

export default WizardContainer;
