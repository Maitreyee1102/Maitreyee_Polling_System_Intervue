# 📊 LecturePoll – Resilient Live Polling System

A professional, real-time polling platform designed for live classroom environments. This system allows teachers to create instant questions and students to respond with sub-second latency, featuring robust state recovery and data persistence.



---

## 🚀 Key Features

### 👨‍🏫 Teacher Persona
- **Dynamic Poll Creation**: Build questions with multiple options and designate correct answers.
- **Synchronized Timers**: Set duration (30s–90s) with server-authoritative clock syncing.
- **Live Analytics**: Visualized progress bars that update instantly as votes come in.
- **Moderation Tools**: View active participants and "Kick" disruptive users in real-time.
- **History Access**: Review past session data retrieved directly from MongoDB.

### 🎓 Student Persona
- **Persistent Identity**: Session-based IDs ensure you stay "logged in" even after a tab refresh.
- **Real-time Participation**: Instant notification when a poll starts.
- **Interactive Voting**: Feedback-driven UI for submitting answers and viewing final results.

### 💬 Engagement
- **Live Classroom Chat**: A floating chat widget for real-time Q&A during polls.
- **Resilient Connection**: Automatic re-syncing of poll state if the internet drops.

---

## 🛠️ Tech Stack

- **Client**: React 19, TypeScript, Vite, Socket.io-client.
- **Seerver**: Node.js, Express, Socket.io.
- **Database**: MongoDB Atlas via Mongoose ODM.
- **State Management**: React Context API (Provider Pattern) for high-performance data flow.