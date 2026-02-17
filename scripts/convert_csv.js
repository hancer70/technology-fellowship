
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Input and Output paths
const CSV_PATH = 'c:/Users/hance/Downloads/rosen_hmg_hft_courses.csv';
const OUTPUT_PATH = path.join(__dirname, '../src/data/courses.js');

// Simple CSV Parser that handles quoted fields
function parseCSV(text) {
    const lines = text.split(/\r?\n/);
    const headers = parseLine(lines[0]);
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const values = parseLine(line);
        const entry = {};

        // Map headers to values
        headers.forEach((header, index) => {
            // Clean up header names
            const key = header.trim().toLowerCase().replace(/['"]/g, '');
            let value = values[index] ? values[index].trim() : '';

            // Remove surrounding quotes if present
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }

            // Double double-quotes become single double-quotes
            value = value.replace(/""/g, '"');

            entry[key] = value;
        });

        // Filter out empty rows or headers repeated
        if (entry.course_id && entry.course_id !== 'course_id') {
            result.push({
                id: entry.course_id,
                code: `${entry.prefix} ${entry.number}`,
                title: entry.title,
                description: entry.description_full || entry.description,
                credits: entry.credits,
                level: entry.level,
                department: entry.department
            });
        }
    }

    return result;
}

function parseLine(line) {
    const values = [];
    let currentValue = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            if (insideQuotes && line[i + 1] === '"') {
                currentValue += '"';
                i++; // Skip next quote
            } else {
                insideQuotes = !insideQuotes;
            }
        } else if (char === ',' && !insideQuotes) {
            values.push(currentValue);
            currentValue = '';
        } else {
            currentValue += char;
        }
    }
    values.push(currentValue);
    return values;
}

try {
    const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
    const courses = parseCSV(csvContent);

    const fileContent = `/**
 * Rosen College Cartography - Official Course Database
 * Auto-generated from CSV
 */

export const courses = ${JSON.stringify(courses, null, 2)};

export const searchCourses = (query) => {
    const lowerQuery = query.toLowerCase();
    return courses.filter(course => 
        course.code.toLowerCase().includes(lowerQuery) || 
        course.title.toLowerCase().includes(lowerQuery)
    );
};

export const getCourseByCode = (code) => {
    return courses.find(course => course.code === code);
};
`;

    fs.writeFileSync(OUTPUT_PATH, fileContent);
    console.log(`Successfully converted ${courses.length} courses to ${OUTPUT_PATH}`);
} catch (error) {
    console.error('Error processing CSV:', error);
}
