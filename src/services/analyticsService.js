
/**
 * Analytics Service
 * Handles local event logging and simulates class-wide metrics.
 */

const STORAGE_KEY = 'toolkit_analytics';

// Helper to get logs
const getLogs = () => {
    try {
        const logs = localStorage.getItem(STORAGE_KEY);
        return logs ? JSON.parse(logs) : [];
    } catch (e) {
        console.error('Failed to parse analytics logs', e);
        return [];
    }
};

// Log a student action
export const logEvent = (eventName, details = {}) => {
    const logs = getLogs();
    const newEvent = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        event: eventName,
        details: details
    };
    logs.push(newEvent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    // console.log(`[Analytics] ${eventName}`, details);
    return newEvent;
};

// Simulate aggregated class data (Mock)
export const getClassInsights = () => {
    // In a real app, this would fetch from an API.
    // Here we generate realistic checking numbers.
    const logs = getLogs();
    const myAssignments = logs.filter(l => l.event === 'GENERATE_ASSIGNMENT').length;

    return {
        activeStudents: 42,
        totalStudents: 45,
        classAverageEngagement: '87%',
        mostPopularTopic: 'Marriott',
        myContribution: {
            assignmentsGenerated: myAssignments,
            topicsResearched: logs.filter(l => l.event === 'VIEW_TOPIC').length
        }
    };
};
