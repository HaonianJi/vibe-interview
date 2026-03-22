---
title: "URL Shortener"
difficulty: "medium"
duration: "60 min"
description: "A URL shortening service with custom aliases, click analytics, and a link management dashboard"
---

# URL Shortener

Build a URL shortener application where users can shorten long URLs, optionally set custom aliases, view click analytics with charts, and manage all their links from a dashboard.

## Requirements

### Core Features (Must Have)
1. **Shorten URLs**: Accept a long URL and generate a unique short code — display the resulting short link with a copy-to-clipboard button
2. **Custom Aliases**: Allow the user to specify a custom alias instead of a random code, with validation to prevent duplicates
3. **Redirect Handling**: Visiting a short URL redirects to the original long URL and records the click event with timestamp and basic metadata
4. **Click Analytics**: For each short link, display total click count, a time-series chart of clicks over the past 7 days, and referrer breakdown if available
5. **Link Management Dashboard**: A table listing all created short links with columns for short URL, original URL, creation date, and click count — with search and sort capabilities

### UI Requirements
- A clean landing page with a prominent URL input field and shorten button
- A dashboard view with a sortable, searchable table of all links
- An analytics detail page per link with at least one chart visualizing click data over time
- Responsive layout that works well on mobile for quick link creation

## Technical Notes
- You may use any tech stack
- You may use any libraries
- Focus on functionality first, then polish
