---
title: "Expense Splitter"
difficulty: "medium"
duration: "60 min"
description: "A group expense splitting app to track shared costs, balances, and settlements"
---

# Expense Splitter

Build a group expense splitting application (similar to Splitwise) where users can create groups, log shared expenses, see who owes whom, and record settlements.

## Requirements

### Core Features (Must Have)
1. **Group Management**: Create expense groups with a name and add members by name — no authentication required, just named participants
2. **Add Expenses**: Log an expense with a description, amount, who paid, and how it is split (equally among all members or custom amounts per person)
3. **Balance Summary**: Display a clear summary showing each member's net balance — positive means they are owed money, negative means they owe money
4. **Settlement Suggestions**: Calculate and display a simplified list of payments needed to settle all debts with the minimum number of transactions
5. **Expense History**: A chronological list of all expenses in the group with details and the ability to edit or delete an entry

### UI Requirements
- A group list view with the ability to create a new group and select an existing one
- An expense entry form with payer selection, split mode toggle, and per-person amount fields
- A balance dashboard with color-coded positive/negative amounts per member
- A settlement view showing directed payment suggestions (e.g., "Alice pays Bob $12.50")

## Technical Notes
- You may use any tech stack
- You may use any libraries
- Focus on functionality first, then polish
