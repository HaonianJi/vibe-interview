---
title: "Chat Room"
difficulty: "medium"
duration: "60 min"
description: "A multi-room chat app with real-time translation powered by a free translation API"
---

# Chat Room

Build a multi-room chat application with built-in real-time message translation, so users speaking different languages can communicate seamlessly.

## Requirements

### Core Features (Must Have)
1. **Username Entry**: A join screen where the user enters a display name and selects their preferred language
2. **Multiple Rooms**: Users can create named rooms and switch between them; each room maintains its own message history
3. **Real-Time Messaging**: Messages appear for all participants without manual refresh, using WebSockets, polling, or any real-time mechanism
4. **Auto-Translation**: Each message is automatically translated into the reader's preferred language using a free translation API — show both original and translated text
5. **Message History**: When joining a room, load and display the most recent messages (at least 50)

### API Integration
- Use a **free translation API** (e.g., LibreTranslate, MyMemory, or Lingva)
- Detect the source language automatically or use the sender's declared language
- Translate messages on-the-fly for each reader based on their language preference
- Support at least 3 languages (e.g., English, Chinese, Spanish)
- Cache translations to avoid redundant API calls
- Handle API errors gracefully (show original text if translation fails)

### UI Requirements
- A sidebar listing available rooms with an option to create a new room
- Messages showing username, timestamp, original text, and translated text (collapsible)
- Language selector in the header or settings panel
- Visual distinction between the current user's messages and others'

## Technical Notes
- You may use any tech stack and libraries
- Suggested free APIs: LibreTranslate (libretranslate.com), MyMemory API, Lingva Translate
- Focus on functionality first, then polish
