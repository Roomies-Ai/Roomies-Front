# Roomies Frontend

A modern, high-performance frontend for the Roomies application, built with React, Vite, and TypeScript.

## 🚀 Features

- **Vite + React 19**: Lightning fast development and optimized production builds.
- **Glassmorphic UI**: A premium, modern design system using CSS variables and Framer Motion.
- **Nest.js Integration**: Pre-configured Vite proxy to connect seamlessly with the Nest.js backend on port 3000.
- **Health Checks**: Built-in backend connectivity monitoring.
- **Lucide Icons**: Beautiful, consistent iconography.

## 🛠 Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS with modern Design Tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **API Client**: [Axios](https://axios-http.com/)
- **Routing**: [React Router](https://reactrouter.com/)

## 🏁 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Backend Connectivity**:
   Ensure your Nest.js server is running on `http://localhost:3000`. The Vite proxy is configured to forward requests from `/api` to the backend.

## 📁 Project Structure

- `src/api`: Axios client and API services.
- `src/components`: Reusable UI components.
- `src/styles`: Global styles and design system tokens.
- `src/App.tsx`: Main application entry and layout.
