---
title: "Chat Room"
difficulty: "medium"
duration: "60 min"
description: "A multi-room chat application with usernames, message history, and typing indicators"
---

# Chat Room

Build a multi-room chat application where users can pick a username, join different rooms, send and receive messages in real time, and see typing indicators.

## Requirements

### Core Features (Must Have)
1. **Username Entry**: A simple join screen where the user enters a display name before accessing the chat — no authentication required
2. **Multiple Rooms**: Users can create named rooms and switch between them; each room maintains its own message history
3. **Real-Time Messaging**: Messages appear for all participants in the same room without manual refresh, using WebSockets, polling, or any real-time mechanism
4. **Message History**: When a user joins or switches to a room, the most recent messages (at least 50) are loaded and displayed
5. **Typing Indicator**: Show a "User is typing..." indicator when another participant in the room is actively composing a message

### UI Requirements
- A sidebar or panel listing available rooms with an option to create a new room
- A main chat area with messages showing username, timestamp, and content
- An input area at the bottom with the typing indicator displayed above it
- Visual distinction between the current user's messages and others' messages

## Technical Notes
- You may use any tech stack
- You may use any libraries
- Focus on functionality first, then polish
