# 💰 Hisab Kitab

**Hisab Kitab** is a smart group expense management system that simplifies shared spending and settlements.  
It helps users track group expenses, calculate individual shares, and clearly determine who owes whom — all in one place.

With accurate balance calculations, flexible split options, and minimal settlement suggestions, Hisab Kitab removes confusion from group finances.

---

## Demo Video & Live Hosting

- **🎥 Video Demo:** https://drive.google.com/file/d/16okQC_g3nQiC2LHAMpcC4VAmVlm8ImWl/view?usp=sharing  
- **🌐 Live App:** https://hisabkisab-meta.vercel.app/

---

## ✨ Key Features

### 👥 Group Management
- Create and manage multiple groups (trips, roommates, events, etc.)
- View group-level spending summaries and balances

---

### ➕ Expense Tracking
- Store details such as amount, description, payer, and participants
- Automatic recalculation of balances on every change

---

### 🔄 Multiple Split Modes
- Equal split
- Custom amount split 
- Consistent rounding to avoid calculation mismatches

---

### ⚖️ Balance & Settlement Engine
- Calculates net balance for each participant
- Identifies who owes money and who should receive it
- Generates minimal settlement paths to reduce the number of transactions


---
### Project Architecture
```
┌──────────────┐
│   Frontend   │  (React + Tailwind CSS)
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
---

### 🔐 Secure Authentication
- Google OAuth-based login and signup
- No password storage
- JWT-based secure API access

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express.js (ES6 Modules)  
- **Database:** MongoDB  
- **Authentication:** Google OAuth + JWT  
- **Architecture:** MERN Stack  

---

## 🎯 Highlights

- Real-world expense-splitting logic
- Deterministic balance calculations
- Minimal settlement algorithm
- Clean and scalable backend architecture
- Interview-ready project design

---
