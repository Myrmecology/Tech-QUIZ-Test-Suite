import db from '../config/connection.js';
import { Question } from '../models/index.js';
import cleanDB from './cleanDb.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Set up __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the JSON file directly instead of using import assertion
const questionData = JSON.parse(
  fs.readFileSync(path.join(__dirname, './pythonQuestions.json'), 'utf8')
);

try {
  await db();
  await cleanDB();

  // bulk create each model
  await Question.insertMany(questionData);

  console.log('Seeding completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}