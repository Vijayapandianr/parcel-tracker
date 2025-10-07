# Parcel Tracker (Ready-to-deploy)

This repository contains a simple Parcel Tracking web application:
- backend/ — Node.js + Express + MongoDB
- frontend/ — React (create-react-app scripts)

Quick deploy steps:

1. MongoDB Atlas:
   - Create a free cluster and get the connection string.
   - Set MONGO_URI to that connection string.

2. Backend (Render / Render.com / Heroku alternative):
   - Push the backend/ folder to GitHub.
   - Create a Web Service on Render (or similar), set the build and start commands:
     - Build: `npm install`
     - Start: `npm start`
   - Set environment variable `MONGO_URI`.
   - The backend will expose endpoints at: `https://<your-backend>/api/parcels`

3. Frontend (Vercel / Netlify):
   - Push frontend/ to GitHub.
   - Deploy on Vercel or Netlify; set environment variable `REACT_APP_API_URL` to your backend base URL (e.g. https://<your-backend-url>)
   - Ensure the frontend's fetch calls point to `${process.env.REACT_APP_API_URL}/api/parcels`

4. Local run (development):
   - Backend:
     ```
     cd backend
     npm install
     npm start
     ```
   - Frontend:
     ```
     cd frontend
     npm install
     npm start
     ```

Notes:
- This is a minimal example meant for learning and quick proof-of-concept. For production, add validation, auth for admin, logging, rate-limiting, and better error handling.
