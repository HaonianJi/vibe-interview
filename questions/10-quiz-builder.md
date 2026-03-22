---
title: "Quiz Builder"
difficulty: "medium"
duration: "60 min"
description: "A quiz app that imports questions from Open Trivia DB API, with custom creation, scoring, and review"
---

# Quiz Builder

Build a quiz application that can import real trivia questions from a free API, as well as create custom quizzes, with full scoring and answer review.

## Requirements

### Core Features (Must Have)
1. **Import from API**: Fetch questions from the **Open Trivia Database API** — users select category, difficulty, and number of questions to import into a new quiz
2. **Custom Quiz Creation**: Also support creating quizzes manually with a title, description, and custom questions — support multiple-choice, true/false, and short-answer types
3. **Quiz Taking**: Present one question at a time with appropriate input controls; show progress and allow navigation between questions
4. **Scoring & Results**: After submission, calculate and display total score, percentage, and per-question result
5. **Answer Review**: Review screen showing each question with the user's answer alongside the correct answer, with visual indicators

### API Integration
- Use the **Open Trivia Database API** (opentdb.com/api.php) to fetch real trivia questions
- Let users browse available categories from the API (fetch category list dynamically)
- Support filtering by difficulty (easy/medium/hard) and question type (multiple choice / true-false)
- Decode HTML entities in API responses properly
- Handle API errors and empty responses gracefully

### UI Requirements
- A quiz list page showing all quizzes (imported and custom) with title, question count, and source indicator
- An import wizard: select category → difficulty → count → preview → confirm
- A step-by-step quiz-taking interface with clear progress indication
- Clean form layout for the quiz editor

## Technical Notes
- You may use any tech stack and libraries
- Open Trivia DB docs: https://opentdb.com/api_config.php
- Focus on functionality first, then polish
