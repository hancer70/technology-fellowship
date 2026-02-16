
/**
 * Mock Social Blade Service
 * Generates deterministic "random" stats based on the brand name.
 */

const SEED_SALT = 67890;

// Simple pseudo-random number generator
const mulberry32 = (a) => {
    return () => {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
}

const stringToSeed = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash) + SEED_SALT;
}

const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

export const fetchSocialStats = async (brand) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const seed = stringToSeed(brand.toLowerCase());
            const random = mulberry32(seed);

            // Generate deterministic stats
            const followers = Math.floor(random() * 5000000) + 10000; // 10k to 5M
            const following = Math.floor(random() * 1000);
            const engagementRate = (random() * 5).toFixed(2); // 0% to 5%
            const uploads = Math.floor(random() * 5000) + 50;

            // Generate a grade based on followers
            let grade = 'C';
            if (followers > 3000000) grade = 'A+';
            else if (followers > 1000000) grade = 'A';
            else if (followers > 500000) grade = 'B+';
            else if (followers > 100000) grade = 'B';
            else if (followers > 50000) grade = 'C+';

            resolve({
                followers: formatNumber(followers),
                following: formatNumber(following),
                engagementRate: engagementRate + '%',
                uploads: formatNumber(uploads),
                grade: grade,
                platform: 'Instagram' // defaulting to IG for this mock
            });
        }, 600);
    });
};
