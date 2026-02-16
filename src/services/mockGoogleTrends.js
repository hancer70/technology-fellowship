
/**
 * Mock Google Trends Service
 * Generates deterministic "random" data based on the keyword so the same keyword
 * always produces the same graph, but different keywords look different.
 */

const SEED_SALT = 12345;

// Simple pseudo-random number generator based on a seed
const mulberry32 = (a) => {
    return () => {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
}

// Convert string to numeric seed
const stringToSeed = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) + SEED_SALT;
}

export const fetchInterestOverTime = async (keyword) => {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            const seed = stringToSeed(keyword.toLowerCase());
            const random = mulberry32(seed);

            const data = [];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            // Generate a trend line that looks somewhat realistic (not just pure noise)
            let currentValue = 20 + Math.floor(random() * 60); // Start between 20-80

            for (let i = 0; i < 12; i++) {
                // Random walk with momentum
                const change = (random() - 0.5) * 30;
                currentValue += change;

                // Clamp between 0 and 100
                currentValue = Math.max(5, Math.min(100, currentValue));

                data.push({
                    name: months[i],
                    value: Math.round(currentValue)
                });
            }

            resolve(data);
        }, 800); // 800ms delay
    });
};
