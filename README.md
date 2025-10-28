Full-Stack Task Manager (Backend Internship Assignment)

Overview

This project is a full-stack web application featuring a Node.js/Express backend API and a React/TypeScript frontend. It allows users to register, verify their email, log in, and manage their tasks (create, read, update, delete). The application includes role-based access control (user vs. admin) and is containerized using Docker for easy setup and deployment.

Features

Backend (Node.js / Express / MongoDB):

User Authentication: Secure registration with password hashing (bcryptjs) and JWT-based login [cite: spacewhale-zion/backendinternshipassignment/BackendInternshipAssignment-a13d85ed93242322a8b7210e7394cb061ec50ea0/backend/models/User.js, spacewhale-zion/backendinternshipassignment/BackendInternshipAssignment-a13d85ed93242322a8b7210e7394cb061ec50ea0/backend/controllers/authController.js].

Email Verification: New users receive a verification email (nodemailer) and must verify their account before logging in.

Role-Based Access: Supports 'user' and 'admin' roles. Admins can be created using a secret key during registration [cite: spacewhale-zion/backendinternshipassignment/BackendInternshipAssignment-a13d85ed93242322a8b7210e7394cb061ec50ea0/backend/controllers/authController.js]. (Admin-specific features like viewing all tasks are implemented in the API [cite: spacewhale-zion/backendinternshipassignment/BackendInternshipAssignment-a13d85ed93242322a8b7210e7394cb061ec50ea0/backend/routes/api/tasks.js]).

Task Management: Full CRUD API endpoints for managing tasks associated with users [cite: spacewhale-zion/backendinternshipassignment/BackendInternshipAssignment-a13d85ed93242322a8b7210e7394cb061ec50ea0/backend/routes/api/tasks.js].

Security: Input validation and sanitization (express-validator) implemented for API routes [cite: spacewhale-zion/backendinternshipassignment/BackendInternshipAssignment-a13d85ed93242322a8b7210e7394cb061ec50ea0/backend/middleware/validation.js].

Structure: Modular design separating models, routes, controllers, middleware, and utilities for scalability.

Frontend (React / TypeScript / Vite / Tailwind):

User Interface: Clean forms for registration and login, styled with Tailwind CSS [cite: spacewhale-zion/backendinternshipassignment/BackendInternshipAssignment-a13d85ed93242322a8b7210e7394cb061ec50ea0/frontend/src/components/auth/Register.tsx, spacewhale-zion/backendinternshipassignment/BackendInternshipAssignment-a13d85ed93242322a8b7210e7394cb061ec50ea0/frontend/src/components/auth/Login.tsx].

State Management: Global authentication state managed via React Context (AuthContext) [cite: spacewhale-zion/backendinternshipassignment/BackendInternshipAssignment-a13d85ed93242322a8b7210e7394cb061ec50ea0/frontend/src/context/AuthContext.tsx].

Routing: Protected routes using React Router DOM and a custom PrivateRoute component [cite: spacewhale-zion/backendinternshipassignment/BackendInternshipAssignment-a13d85ed93242322a8b7210e7394cb061ec50ea0/frontend/src/components/common/PrivateRoute.tsx, spacewhale-zion/backendinternshipassignment/BackendInternshipAssignment-a13d85ed93242322a8b7210e7394cb061ec50ea0/frontend/src/App.tsx].

Task Dashboard: Displays user tasks with options to create, edit (inline), and delete tasks [cite: spacewhale-zion/backendinternshipassignment/BackendInternshipAssignment-a13d85ed93242322a8b7210e7394cb061ec50ea0/frontend/src/components/auth/Dashboard.tsx].

API Interaction: Uses Axios for making requests to the backend API [cite: spacewhale-zion/backendinternshipassignment/BackendInternshipAssignment-a13d85ed93242322a8b7210e7394cb061ec50ea0/frontend/src/utils/api.ts].

Containerization:

Docker: Dockerfiles provided for both backend and frontend (Vite dev server setup).

Docker Compose: docker-compose.yml orchestrates the backend, frontend, and MongoDB services for easy setup.

Tech Stack

Backend: Node.js, Express, MongoDB, Mongoose, JWT, Nodemailer, Bcryptjs, Express-validator

Frontend: React, TypeScript, Vite, Tailwind CSS, Axios, React Router

Database: MongoDB

Containerization: Docker, Docker Compose

Prerequisites

Node.js (v20+ recommended)

npm (or yarn/pnpm)

Docker & Docker Compose

Git

An email account configured for SMTP (e.g., Gmail with an App Password) for email verification.

Running the Application (Docker - Recommended)

Clone the Repository:

git clone <your-repo-url>
cd <project-folder-name>


Configure Backend Environment Variables:

Navigate to the backend directory: cd backend

Create a .env file (you can copy .env.example if you create one).

Update the following variables:

PORT=5000
MONGO_URI=mongodb://mongo:27017/intern-project # Connects to the Docker MongoDB service
JWT_SECRET=YOUR_STRONG_JWT_SECRET
ADMIN_SECRET_KEY=YOUR_STRONG_ADMIN_SECRET_FOR_REGISTRATION

# Email Settings (Update with your credentials)
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
EMAIL_FROM="Your App Name <your_email@example.com>"


Return to the project root directory: cd ..

Configure Frontend Environment Variables:

Navigate to the frontend directory: cd frontend

Create a .env file.

Add the backend API URL (accessible from the host machine):

VITE_API_BaseURL=http://localhost:5000/api/v1


Return to the project root directory: cd ..

Build and Run with Docker Compose:

Make sure Docker Desktop (or Docker Engine with Compose) is running.

From the project root directory (where docker-compose.yml is), run:

docker-compose up --build


(Use docker-compose up --build -d to run in the background)

Access the Application:

Frontend: Open your browser to http://localhost:5173

Backend API: Available at http://localhost:5000

Stopping the Application (Docker)

If running in the foreground, press Ctrl+C in the terminal where docker-compose up is running.

If running in detached mode (-d), run docker-compose down from the project root directory. Use docker-compose down -v to also remove the database volume.

(Local setup instructions could be added here as an alternative if needed)