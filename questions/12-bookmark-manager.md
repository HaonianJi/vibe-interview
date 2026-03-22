---
title: "Bookmark Manager"
difficulty: "medium"
duration: "60 min"
description: "A bookmark organizer with tagging, folders, full-text search, and import/export"
---

# Bookmark Manager

Build a bookmark management application where users can save, tag, and organize bookmarks into folders, search across all saved links, and import or export their collection.

## Requirements

### Core Features (Must Have)
1. **Save Bookmarks**: Add a bookmark with a URL, title, optional description, and one or more tags — auto-fetch the page title if only a URL is provided
2. **Folder Organization**: Create a nested folder structure and move bookmarks between folders via drag-and-drop or a move dialog
3. **Tagging & Search**: Assign multiple tags to any bookmark and provide a search bar that filters by title, URL, description, or tag in real time
4. **Import/Export**: Import bookmarks from a JSON or HTML file (browser bookmark export format) and export the current collection in the same formats
5. **Bulk Actions**: Select multiple bookmarks and perform batch operations — delete, move to folder, or add/remove a tag

### UI Requirements
- A sidebar showing the folder tree and a tag cloud or tag list for quick filtering
- A main area displaying bookmarks as cards or list rows with title, URL snippet, and tags
- A modal or inline form for adding and editing bookmarks
- Visual indication of the active folder and any applied tag filters

## Technical Notes
- You may use any tech stack
- You may use any libraries
- Focus on functionality first, then polish
