# SplitMint 💸  
### Your Gateway to Karbon

SplitMint is a **full-stack MERN application** for managing **group expenses** and calculating **who owes whom** with **minimal settlements**.  
It supports **Google OAuth login**, smart expense splitting, and a deterministic balance engine.

---

## 🚀 Features

### 🔐 Authentication
- Google Sign-In (OAuth 2.0)
- Secure JWT-based session management
- Automatic signup for new users

### 👥 Groups
- Create and delete groups
- One primary user (owner) per group
- Up to 3 participants + owner
- Cascade deletion of participants and expenses

### 🧑 Participants
- Add participants to a group
- Optional color/avatar support
- Remove participants with safe handling

### 💸 Expenses
- Add expenses with:
  - Amount
  - Description
  - Date
  - Payer
  - Participants
- Supported split modes:
  - Equal split
  - Custom amount split
  - Percentage split
- Consistent rounding for uneven splits
- Edit and delete expenses

### ⚖️ Balance Engine
- Calculates net balance per participant
- Determines who owes whom
- Generates **minimal settlement transactions**
- Splitwise-style greedy settlement algorithm

### 📊 Visualizations
- Group-level total spending
- Balance summary
- Settlement breakdown
- Transaction history per group

### 🔍 Search & Filters
- Search expenses by description
- Filter by date range and amount
- Participant-based filtering

### 🤖 AI (Optional – MintSense)
- Natural language expense entry
- Auto-categorization of expenses
- Smart group summaries
- Intelligent settlement suggestions

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Context API

### Backend
- Node.js (ES6 modules)
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Google Identity Services

---
### Project Architecture
```
┌──────────────┐
│   Frontend   │  (React + Vite)
│──────────────│
│ Google Login │
│ UI / State   │
│ API Calls    │
└──────┬───────┘
       │ HTTPS (JWT)
       ▼
┌──────────────┐
│   Backend    │  (Node.js + Express)
│──────────────│
│ Auth Layer   │
│ Business     │
│ Logic        │
│ REST APIs    │
└──────┬───────┘
       │ Mongoose ODM
       ▼
┌──────────────┐
│   Database   │  (MongoDB)
│──────────────│
│ Users        │
│ Groups       │
│ Expenses     │
│ Participants │
└──────────────┘
```


