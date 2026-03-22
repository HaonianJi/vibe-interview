---
title: "Real-Time Polling App"
difficulty: "medium"
duration: "60 min"
description: "Build a polling app where users can create polls, vote, and see live results"
---

# Real-Time Polling App

Build a polling application with live-updating results.

## Requirements

### Core Features (Must Have)
1. **Create Poll**: Form to create a poll with a question and 2-5 answer options
2. **Vote**: Users can select one option and submit their vote
3. **Live Results**: After voting, show results as a bar chart or progress bars with percentages
4. **Poll List**: Homepage showing all active polls
5. **Data Persistence**: Polls and votes must persist across page refreshes

### Voting Rules
- One vote per browser session per poll (use localStorage or cookies)
- Cannot change vote after submitting
- Show total vote count

### UI Requirements
- Animated result bars that update when new votes come in
- Clear visual feedback after voting
- Mobile-friendly layout

## Technical Notes
- You may use any tech stack
- "Real-time" can be implemented with polling (setInterval), SSE, or WebSockets
- Focus on a smooth voting and results experience
