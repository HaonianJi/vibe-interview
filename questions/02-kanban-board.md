---
title: "Kanban Board"
difficulty: "medium"
duration: "60 min"
description: "Build an interactive Kanban board with drag-and-drop, synced with GitHub Issues via API"
---

# Kanban Board

Build an interactive Kanban board that syncs with a real GitHub repository's issues.

## Requirements

### Core Features (Must Have)
1. **GitHub Integration**: Connect to GitHub's public API to fetch issues from any public repository — display them as task cards on the board
2. **Columns**: At least 3 columns — "Open", "In Progress", "Closed" — mapped to GitHub issue labels or state
3. **Drag & Drop**: Move task cards between columns by dragging; update issue state/labels via the API when possible
4. **Real-Time Sync**: Fetch latest issues on page load and provide a refresh button; show loading states during API calls
5. **Data Persistence**: Board layout and any local customizations persist across page refreshes

### API Integration
- Use the **GitHub REST API** (`api.github.com`) — no authentication needed for public repos
- Fetch issues, labels, and assignees for a user-specified repository
- Display issue metadata: title, labels, assignee avatar, creation date, comment count
- Handle API rate limiting gracefully (show a message when limit is reached)

### UI Requirements
- Visual priority indicators (color-coded by label)
- Smooth drag-and-drop interaction
- Assignee avatars from GitHub
- Responsive layout

## Technical Notes
- You may use any tech stack
- Drag-and-drop can use any library (dnd-kit, react-beautiful-dnd, etc.) or native HTML5 drag
- GitHub API docs: https://docs.github.com/en/rest/issues
- Focus on a smooth, intuitive user experience
