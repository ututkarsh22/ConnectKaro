# ConnectKaro

ConnectKaro is a full-stack video calling and chat platform. It combines a Node.js/Express API, a React + Vite frontend, MongoDB for persistence, and Stream’s Chat/Video SDKs for real‑time communication.

## Features
- Secure authentication with JWT cookies.
- Real‑time 1:1 chat with Stream Chat.
- Video calling with Stream Video SDK.
- Modern React UI using Vite, TailwindCSS, and DaisyUI.
- Express REST API backed by MongoDB.

## Tech Stack
**Frontend**
- React, Vite
- TanStack Query, Zustand
- Stream Chat & Video SDKs
- TailwindCSS, DaisyUI

**Backend**
- Node.js, Express
- MongoDB (Mongoose)
- Stream Chat Server SDK
- JWT Authentication

## Project Structure
```
ConnectKaro/
├── Backend/   # Express API server
├── Frontend/  # React + Vite application
├── Readme.md
└── package.json
```

##  Prerequisites
- Node.js 18+
- npm
- MongoDB instance (local or hosted)
- Stream account with Chat + Video enabled

## Environment Variables
Create environment files for backend and frontend.

### Backend (`Backend/.env`)
```
MONGOOSE_URL=your_mongodb_connection_string
JWTSECRET_KEY=your_jwt_secret
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
PORT=5001
```

### Frontend (`Frontend/.env`)
```
VITE_API_URL=http://localhost:5001
VITE_STREAM_API_KEY=your_stream_api_key
```

## Install
From the repo root:
```
npm run build
```
This installs dependencies in both `Backend` and `Frontend` and builds the frontend.

## Run (Development)
Open two terminals.

**Backend**
```
cd Backend
npm install
npm run dev
```

**Frontend**
```
cd Frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and the backend defaults to `http://localhost:5001`.

## Run (Production)
```
npm run build
npm run start
```

## Scripts
**Root**
- `npm run build` — install dependencies + build frontend
- `npm run start` — start backend server

**Backend**
- `npm run dev` — start backend with nodemon
- `npm run start` — start backend

**Frontend**
 `npm run dev` — start Vite dev server
- `npm run build` — build frontend
- `npm run preview` — preview build
