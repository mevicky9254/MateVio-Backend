
# 🏡 Matevio

**Matevio** is a modern full-stack application that helps students find compatible roommates and available rooms seamlessly. It uses intelligent matchmaking algorithms to connect users based on preferences, habits, and lifestyle choices.

---

## 🚀 Features

- 🔐 Secure authentication & authorization (JWT-based)
- 🧑‍🤝‍🧑 Intelligent roommate matching (AI/ML compatible logic)
- 🏘️ Room listing and management
- 💬 Real-time messaging system
- 🔔 Notifications for matches, messages, and room updates
- 📄 Profile customization and preferences
- 📦 Modular codebase using Node.js, Express, MongoDB, and React

---

## 🧱 Tech Stack

| Layer     | Technology              |
|-----------|--------------------------|
| Frontend  | React.js, Tailwind CSS   |
| Backend   | Node.js, Express.js      |
| Database  | MongoDB, Mongoose        |
| Auth      | JWT, bcrypt              |
| AI Layer  | (Pluggable Recommendation Engine - coming soon) |
| Dev Tools | ESLint, Prettier, Nodemon, VSCode, Git |

---

## 📁 Folder Structure

```
matevio/
│
├── matevio-backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   ├── .env
│   └── server.js
│
├── .gitignore
├── README.md
└── package.json
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/matevio.git
cd matevio
```

### 2. Setup Environment

Create a `.env` file in the `/backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 3. Install Dependencies

```bash
# Backend
cd backend
npm install

# (Optional) Frontend
cd ../frontend
npm install
```

### 4. Run the Project

```bash
# Backend (Dev Mode)
cd backend
npm run dev

# Frontend
cd ../frontend
npm start
```

---

## 🔐 API Overview (Backend)

All routes are prefixed with `/api`

- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – User login
- `GET /api/users/:id` – Get user profile
- `PUT /api/users/:id` – Update profile
- `GET /api/rooms` – Fetch room listings
- `POST /api/matches` – Trigger match generation
- `GET /api/messages/:roomId` – Fetch chat messages
- `GET /api/notifications` – User notifications

---

## 🤖 AI Matching (Coming Soon)

Matevio's upcoming AI features will:
- Suggest ideal roommates using ML-based user profiling
- Rank room listings by user preferences
- Auto-flag incompatible matches

---

## 📸 Screenshots

_Will add soon._

---

## 🧪 Testing

```bash
# Add your test strategy here
# e.g., Jest for unit tests, Postman for API testing
```

---

## 🧑‍💻 Contributing

We welcome PRs and suggestions! Please open an issue first for significant changes.

---

## 📄 License

MIT License – © 2025 Matevio Team
