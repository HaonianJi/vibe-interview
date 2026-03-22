---
title: "Real-Time Polling App"
difficulty: "medium"
duration: "60 min"
description: "Build a polling app with live results, powered by trending topics from a news API"
---

# Real-Time Polling App

Build a polling application with live-updating results, featuring auto-generated polls from trending news topics.

## Requirements

### Core Features (Must Have)
1. **Trending Topics**: Fetch trending news or topics from a free API (e.g., NewsAPI, GNews, or HackerNews) and auto-generate poll questions based on current headlines
2. **Create Poll**: Users can also create custom polls with a question and 2-5 answer options
3. **Vote**: Users can select one option and submit their vote
4. **Live Results**: After voting, show results as animated bar charts or progress bars with percentages
5. **Data Persistence**: Polls and votes must persist across page refreshes

### API Integration
- Use a **free news/trending API** to fetch current headlines or trending topics
- Auto-generate at least 3 polls from real trending topics on page load (e.g., "Will [Topic] trend continue this week? Yes / No / Undecided")
- Show the source headline/article link alongside each auto-generated poll
- Handle API errors and rate limits gracefully

### Voting Rules
- One vote per browser session per poll (use localStorage or cookies)
- Cannot change vote after submitting
- Show total vote count

### UI Requirements
- Visual distinction between trending-generated polls and user-created polls
- Animated result bars that update when new votes come in
- Mobile-friendly layout

## Technical Notes
- You may use any tech stack
- Suggested free APIs: NewsAPI (newsapi.org), GNews (gnews.io), HackerNews (hn.algolia.com)
- "Real-time" can be implemented with polling (setInterval), SSE, or WebSockets
