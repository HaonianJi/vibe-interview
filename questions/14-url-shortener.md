---
title: "URL Shortener"
difficulty: "medium"
duration: "60 min"
description: "A URL shortener with rich link previews fetched from open metadata APIs"
---

# URL Shortener

Build a URL shortener that automatically fetches and displays rich previews (title, description, thumbnail) for each shortened link using open metadata APIs.

## Requirements

### Core Features (Must Have)
1. **Shorten URLs**: Accept a long URL and generate a unique short code — display the resulting short link with a copy-to-clipboard button
2. **Rich Link Preview**: When a URL is shortened, automatically fetch its metadata (page title, description, Open Graph image) using a free API or server-side scraping — display this preview card alongside the short link
3. **Custom Aliases**: Allow the user to specify a custom alias instead of a random code, with validation to prevent duplicates
4. **Click Analytics**: For each short link, display total click count and a time-series chart of clicks over the past 7 days
5. **Link Management Dashboard**: A table listing all short links with preview thumbnails, original URL, click count, and creation date

### API Integration
- Use a **free metadata/preview API** (e.g., jsonlink.io, microlink.io, or Open Graph scraping) to fetch page title, description, and thumbnail for each URL
- Display rich preview cards with the fetched metadata (image, title, description, domain)
- Fetch and update previews asynchronously — show a loading skeleton while fetching
- Handle URLs that have no Open Graph data gracefully (show domain + favicon fallback)
- Cache preview data to avoid redundant API calls

### UI Requirements
- A clean landing page with a prominent URL input field and shorten button
- Rich preview cards showing thumbnail, title, and description for each link
- A dashboard with sortable, searchable table
- Responsive layout for quick link creation on mobile

## Technical Notes
- You may use any tech stack and libraries
- Suggested free APIs: jsonlink.io, microlink.io, or server-side fetch + HTML parsing
- Focus on functionality first, then polish
