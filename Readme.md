diff --git a/Readme.md b/Readme.md
index e69de29bb2d1d6434b8b29ae775ad8c2e48c5391..205b67e2b3128e625f99aac12d25244fdfa1d50e 100644
--- a/Readme.md
+++ b/Readme.md
@@ -0,0 +1,98 @@
+# ConnectKaro
+
+ConnectKaro is a full-stack video calling and chat application built with a Node.js/Express backend and a React (Vite) frontend. It integrates Stream for chat and video features, uses MongoDB for persistence, and provides authenticated user flows with JWT-based sessions and cookies.
+
+## Features
+- User authentication and authorization with JWT cookies.
+- 1:1 chat powered by Stream Chat.
+- Video calling with the Stream Video SDK.
+- React + Vite frontend with TailwindCSS/DaisyUI styling.
+- Express API with MongoDB persistence.
+
+## Tech Stack
+**Frontend**: React, Vite, TanStack Query, Zustand, Stream Chat/Video SDKs, TailwindCSS, DaisyUI
+
+**Backend**: Node.js, Express, MongoDB (Mongoose), Stream Chat server SDK, JWT
+
+## Project Structure
+```
+ConnectKaro/
+├── Backend/   # Express API server
+├── Frontend/  # React + Vite app
+├── Readme.md
+└── package.json
+```
+
+## Prerequisites
+- Node.js 18+
+- npm
+- MongoDB instance (local or hosted)
+- Stream account with Chat + Video enabled
+
+## Environment Variables
+Create the following files before running the app.
+
+### Backend (`Backend/.env`)
+```
+MONGOOSE_URL=your_mongodb_connection_string
+JWTSECRET_KEY=your_jwt_secret
+STREAM_API_KEY=your_stream_api_key
+STREAM_API_SECRET=your_stream_api_secret
+PORT=5001
+```
+
+### Frontend (`Frontend/.env`)
+```
+VITE_API_URL=http://localhost:5001
+VITE_STREAM_API_KEY=your_stream_api_key
+```
+
+## Install
+From the repo root:
+```
+npm run build
+```
+This installs dependencies for both `Backend` and `Frontend` and builds the frontend bundle.
+
+## Run (Development)
+Open two terminals.
+
+**Backend**
+```
+cd Backend
+npm install
+npm run dev
+```
+
+**Frontend**
+```
+cd Frontend
+npm install
+npm run dev
+```
+
+Frontend runs on `http://localhost:5173` and the backend defaults to `http://localhost:5001`.
+
+## Run (Production)
+Build the frontend and start the backend:
+```
+npm run build
+npm run start
+```
+
+## Scripts
+**Root**
+- `npm run build` - Install dependencies and build frontend
+- `npm run start` - Start backend server
+
+**Backend**
+- `npm run dev` - Start backend with nodemon
+- `npm run start` - Start backend
+
+**Frontend**
+- `npm run dev` - Start Vite dev server
+- `npm run build` - Build frontend
+- `npm run preview` - Preview build
+
+## License
+ISC
