import React, { createContext, useContext, useReducer } from 'react';

// Initial State
const defaultState = {
    step: 1,
    courseDetails: {
        courseCode: '',
        courseName: '',
        semester: '',
        studentCount: '',
        dueDate: ''
    },
    selectedModules: [],
    topics: []
};

const getInitialState = () => {
    const saved = localStorage.getItem('wizardState');
    if (saved) {
        const parsed = JSON.parse(saved);
        // Deep merge to ensure new fields (like dueDate) are added to old states
        return {
            ...defaultState,
            ...parsed,
            courseDetails: {
                ...defaultState.courseDetails,
                ...parsed.courseDetails
            }
        };
    }
    return defaultState;
};

// Actions
const SET_STEP = 'SET_STEP';
const UPDATE_COURSE_DETAILS = 'UPDATE_COURSE_DETAILS';
const TOGGLE_MODULE = 'TOGGLE_MODULE';
const ADD_TOPIC = 'ADD_TOPIC';
const REMOVE_TOPIC = 'REMOVE_TOPIC';

// Reducer
const wizardReducer = (state, action) => {
    switch (action.type) {
        case SET_STEP:
            return { ...state, step: action.payload };
        case UPDATE_COURSE_DETAILS:
            return { ...state, courseDetails: { ...state.courseDetails, ...action.payload } };
        case TOGGLE_MODULE: {
            const moduleId = action.payload;
            const isSelected = state.selectedModules.includes(moduleId);
            return {
                ...state,
                selectedModules: isSelected
                    ? state.selectedModules.filter(id => id !== moduleId)
                    : [...state.selectedModules, moduleId]
            };
        }
        case ADD_TOPIC:
            return { ...state, topics: [...state.topics, action.payload] };
        case REMOVE_TOPIC:
            return { ...state, topics: state.topics.filter(t => t !== action.payload) };
        default:
            return state;
    }
};

// Context
const WizardContext = createContext();

// Provider
export const WizardProvider = ({ children }) => {
    const [state, dispatch] = useReducer(wizardReducer, defaultState, getInitialState);

    React.useEffect(() => {
        localStorage.setItem('wizardState', JSON.stringify(state));
    }, [state]);

    const nextStep = () => dispatch({ type: SET_STEP, payload: state.step + 1 });
    const prevStep = () => dispatch({ type: SET_STEP, payload: Math.max(1, state.step - 1) });
    const updateCourseDetails = (details) => dispatch({ type: UPDATE_COURSE_DETAILS, payload: details });
    const toggleModule = (moduleId) => dispatch({ type: TOGGLE_MODULE, payload: moduleId });
    const addTopic = (topic) => dispatch({ type: ADD_TOPIC, payload: topic });
    const removeTopic = (topic) => dispatch({ type: REMOVE_TOPIC, payload: topic });

    return (
        <WizardContext.Provider value={{
            state,
            nextStep,
            prevStep,
            updateCourseDetails,
            toggleModule,
            addTopic,
            removeTopic
        }}>
            {children}
        </WizardContext.Provider>
    );
};

// Hook
export const useWizard = () => {
    const context = useContext(WizardContext);
    if (!context) {
        throw new Error('useWizard must be used within a WizardProvider');
    }
    return context;
};
