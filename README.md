# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# Real-Time Chat Room Frontend

This is the frontend for a real-time multi-room chat application built using React. It connects to a Node.js + Socket.io backend to enable real-time messaging with JWT authentication.

---

## 🚀 Features

- User Login UI
- JWT-based authentication (stored in localStorage)
- Protected routes (Auth Guard)
- Room selection interface
- Real-time chat using Socket.io
- Live message updates
- Clean socket connection handling (connect/disconnect)
- Responsive UI

---

## 🛠️ Tech Stack

- React.js
- React Router
- Socket.io Client
- Axios (for API calls)
- CSS / Tailwind (optional)

---

## 📂 Project Structure
frontend/
│── src/
│ ├── components/
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── Rooms.jsx
│ │ └── Chat.jsx
│ ├── services/
│ │ └── api.js
│ ├── socket/
│ │ └── socket.js
│ ├── utils/
│ │ └── auth.js
│ ├── App.jsx
│ └── main.jsx
│── package.json



---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd frontend

Install dependencies:
npm install

Start the development server:
npm run dev


npm run dev     # Start development server
npm run build   # Production build
