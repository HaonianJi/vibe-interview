---
title: "Kanban Board"
difficulty: "medium"
duration: "90 min"
description: "Build an interactive Kanban board with drag-and-drop and task management"
---

# Kanban Board

Build an interactive Kanban board for project management.

## Requirements

### Core Features (Must Have)
1. **Columns**: At least 3 default columns — "To Do", "In Progress", "Done"
2. **Task Cards**: Create tasks with title, description, priority (low/medium/high), and optional due date
3. **Drag & Drop**: Move tasks between columns by dragging
4. **Edit & Delete**: Edit task details inline or via modal; delete with confirmation
5. **Data Persistence**: All board state must persist across page refreshes

### Additional Features (Nice to Have)
- Search/filter tasks by title or priority
- Column management (add/rename/delete columns)
- Task count per column

### UI Requirements
- Visual priority indicators (color-coded)
- Smooth drag-and-drop interaction
- Responsive layout

## Technical Notes
- You may use any tech stack
- Drag-and-drop can use any library (dnd-kit, react-beautiful-dnd, etc.) or native HTML5 drag
- Focus on a smooth, intuitive user experience
