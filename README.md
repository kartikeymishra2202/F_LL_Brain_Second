🧠 Second Brain
Your personal digital archive for saving and managing important online content — starting with YouTube and Twitter links. Think of it as your Second Brain: a fast, intuitive, and expandable platform for organizing digital knowledge and resources.

🌐 Live Demo
🔗 https://f-ll-brain-second.vercel.app/ 

🚀 What is Second Brain?
Second Brain is a full-stack application that helps you store, categorize, and retrieve important URLs — currently focusing on YouTube and Twitter links, with future plans for full browser extension support and bookmarking any kind of content.

Designed with scalability and user productivity in mind, the app is built using the MERN stack (MongoDB, Express.js, React, Node.js) with TypeScript for type safety and Tailwind CSS for modern styling.

🔑 Key Features
🔗 Save YouTube & Twitter Links: Paste a link and store it with metadata (title, source, etc.).

📚 Organized by Type & Tags: Classify saved links for easy filtering and navigation.

🔍 Search & Filter: Quickly find previously saved content.

👤 Authentication: Secure user login/signup using JWT.

☁️ Fully Deployed: Live backend and frontend deployments.

🔧 Built for Extension: Future-ready backend designed to support a browser extension for capturing any URL.

🎯 Built with TypeScript: Ensures better maintainability and developer experience.

🛠️ Tech Stack
Frontend	Backend	Database	Styling	Language	Deployment
React + Vite	Node.js + Express	MongoDB	Tailwind CSS	TypeScript	Vercel + Render

📁 Project Structure
🔙 Backend (second-brain-backend)

second-brain-backend/
├── src/
│   ├── db/               # MongoDB connection setup
│   ├── middleware/       # Auth middleware, error handling
│   ├── model/            # Mongoose models for links and users
│   ├── routes/           # API routes for links and auth
│   ├── utils.ts          # Utility functions (validation, etc.)
│   └── index.ts          # Entry point (Express app config)
├── render.yaml           # Render deployment config
├── tsconfig.json         # TypeScript config
├── vercel.json           # For frontend/backend combined deploys
├── package.json
🧠 Frontend (second-brain-frontend/brainly-frontend)

brainly-frontend/
├── public/
├── src/
│   ├── api/              # Axios functions for backend communication
│   ├── assets/           # Images, logos, etc.
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── icons/            # Icon components or SVGs
│   ├── pages/            # App pages (Home, Dashboard, Auth, etc.)
│   ├── config.ts         # API base URL and environment variables
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Vite entry point
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
├── vercel.json           # Vercel deployment config
⚙️ Getting Started
🧩 Prerequisites
Node.js v16+

Yarn or npm

MongoDB Atlas (or local MongoDB)

📦 Backend Setup

cd second-brain-backend
npm install
# or yarn

# Create a `.env` file
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000

npm run dev
💻 Frontend Setup

cd second-brain-frontend/brainly-frontend
npm install
# or yarn

# Create a `.env` file
VITE_API_BASE_URL=http://localhost:5000

npm run dev
Then open: http://localhost:5173

🔒 Authentication
JWT-based login/signup.

Secure API routes using middleware in the backend.

🛣️ Roadmap
 Save YouTube and Twitter links

 JWT Authentication

 Tailwind styling

 Hosted on Render (backend) and Vercel (frontend)

 Add Browser Extension

 Support for saving any kind of URL

 Categorization via tags and folders

 Full-text search

 Note/description editor for each link

🧑‍💻 Developer Notes
Built with modular architecture to allow easy feature expansion.

All frontend state management is component-local or via custom hooks; scalable to Redux or Zustand if needed.



🤝 Contributing
PRs and issues are welcome! If you have ideas for new features or improvements, feel free to fork and submit.
