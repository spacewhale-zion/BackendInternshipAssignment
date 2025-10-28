# 🚀 Full-Stack Task Manager

*A sophisticated task management application built with modern web technologies*

![Full-Stack Application](https://img.shields.io/badge/Full--Stack-React%20%2B%20Node.js-blue)
![Docker Ready](https://img.shields.io/badge/Docker-Ready-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-blue)

## ✨ Overview

Welcome to the **Full-Stack Task Manager** - a comprehensive web application that combines a robust Node.js/Express backend with an elegant React/TypeScript frontend. This application provides seamless user registration, email verification, secure authentication, and intuitive task management with role-based access control. Containerized with Docker for effortless deployment and scalability.

## 🌟 Key Features

### 🔐 Backend Excellence (Node.js / Express / MongoDB)

- **Secure Authentication** - Password hashing with bcryptjs and JWT-based login system
- **Email Verification** - Complete registration flow with nodemailer integration
- **Role-Based Access Control** - Dual-role system ('user' & 'admin') with secure admin registration
- **Full CRUD Operations** - Comprehensive task management API endpoints
- **Enterprise Security** - Input validation and sanitization using express-validator
- **Modular Architecture** - Scalable, maintainable codebase with clear separation of concerns

### 🎨 Frontend Sophistication (React / TypeScript / Vite)

- **Modern UI/UX** - Beautiful, responsive interfaces styled with Tailwind CSS
- **Type-Safe Development** - Full TypeScript implementation for robust code
- **Smart State Management** - Global authentication state with React Context
- **Protected Routing** - Secure navigation with custom private route components
- **Interactive Dashboard** - Dynamic task management with inline editing capabilities
- **Seamless API Integration** - Efficient backend communication using Axios

### 🐳 Containerization & Deployment

- **Docker Optimized** - Individual Dockerfiles for backend and frontend
- **Docker Compose** - Simplified multi-service orchestration
- **Development Ready** - Hot-reload enabled Vite dev server setup
- **Production Prepared** - Easy deployment and scaling capabilities

## 📈 Scalability Notes

While the current monolithic structure is perfectly suitable for smaller to medium-sized applications, here are the strategic pathways for scaling this application to enterprise levels:

### 🏗 **Microservices Architecture**
- **Service Decomposition**: Break down the backend into smaller, independent services (AuthService, TaskService, NotificationService)
- **Inter-Service Communication**: Implement API gateways and message queues (RabbitMQ, AWS SQS) for seamless service interaction
- **Independent Scaling**: Deploy and scale each service based on its specific load requirements

### ⚖️ **Load Balancing & Distribution**
- **Traffic Management**: Deploy load balancers (Nginx, AWS ALB) to distribute incoming traffic across multiple backend instances
- **Horizontal Scaling**: Run multiple instances of backend services behind load balancers
- **Geographic Distribution**: Implement CDN and multi-region deployment for global users

### 💾 **Caching Strategies**
- **Redis Integration**: Implement Redis caching layer for frequently accessed data (user profiles, task lists)
- **CDN Caching**: Cache static assets and API responses at edge locations
- **Database Query Optimization**: Reduce redundant database calls through intelligent caching

### 🗄 **Database Scaling**
- **Read Replicas**: Deploy MongoDB read replicas for read-heavy workloads
- **Database Sharding**: Implement horizontal partitioning for very large datasets
- **Connection Pooling**: Optimize database connections for high concurrent users

### 🎯 **Container Orchestration**
- **Kubernetes Deployment**: Use Kubernetes for automated scaling, self-healing, and service discovery
- **Auto-scaling Policies**: Implement HPA (Horizontal Pod Autoscaling) based on CPU/memory usage
- **Service Mesh**: Deploy Istio or Linkerd for advanced traffic management and observability

### 🔍 **Monitoring & Observability**
- **Centralized Logging**: Implement ELK stack or similar for log aggregation
- **Application Metrics**: Deploy Prometheus and Grafana for real-time monitoring
- **Distributed Tracing**: Use Jaeger or Zipkin for request tracing across microservices

## 🛠 Tech Stack

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT Tokens
- **Email**: Nodemailer
- **Security**: Bcryptjs, Express-validator
- **Validation**: Comprehensive input sanitization

### **Frontend**
- **Library**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **State Management**: React Context API

### **Infrastructure**
- **Database**: MongoDB
- **Containerization**: Docker & Docker Compose
- **Development**: Hot-reload, TypeScript compilation

## 📋 Prerequisites

Before diving in, ensure you have:

- **Node.js** (v20+ recommended for optimal performance)
- **npm**, **yarn**, or **pnpm** (your package manager of choice)
- **Docker** & **Docker Compose** (for containerized deployment)
- **Git** (for version control)
- **Email Account** (Gmail recommended with App Password for SMTP)

## 🚀 Quick Start with Docker (Recommended)

### 1. 📥 Clone the Repository

```bash
git clone <your-repository-url>
cd <project-directory-name>
```

### 2. ⚙️ Backend Configuration

Navigate to the backend directory and set up your environment:

```bash
cd backend
```

Create a `.env` file with the following configuration:

```env
# Server Configuration
PORT=5000

# Database Connection (Docker service name)
MONGO_URI=mongodb://mongo:27017/intern-project

# Security Keys (Generate strong, unique keys)
JWT_SECRET=your_super_secure_jwt_secret_key_here
ADMIN_SECRET_KEY=your_exclusive_admin_registration_key

# Email Service Configuration (Gmail Example)
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM="Task Manager <your_email@gmail.com>"
```

🔒 **Security Note**: Replace placeholder values with your actual credentials and generate strong secret keys.

Return to project root:
```bash
cd ..
```

### 3. 🎨 Frontend Configuration

Navigate to the frontend directory:

```bash
cd frontend
```

Create a `.env` file:

```env
# Backend API Configuration
VITE_API_BaseURL=http://localhost:5000/api/v1
```

Return to project root:
```bash
cd ..
```

### 4. 🐳 Launch with Docker Compose

Ensure Docker Desktop is running, then execute:

```bash
docker-compose up --build
```

For background operation:
```bash
docker-compose up --build -d
```

### 5. 🌐 Access Your Application

- **Frontend Application**: 🌍 [http://localhost:5173](http://localhost:5173)
- **Backend API**: 🔧 [http://localhost:5000](http://localhost:5000)

## 🛑 Stopping the Application

### Foreground Mode
Press `Ctrl+C` in the terminal where `docker-compose up` is running.

### Background Mode
```bash
docker-compose down
```

To completely remove database volumes:
```bash
docker-compose down -v
```

## 🎯 Getting Started

1. **Register** a new account using the registration form
2. **Verify** your email address through the verification link sent to your inbox
3. **Login** with your verified credentials
4. **Create** and manage your tasks through the intuitive dashboard
5. **Explore** admin features by registering with the admin secret key

## 🔧 Development

For local development without Docker, refer to the individual `README.md` files in the `backend` and `frontend` directories for detailed setup instructions.

---

**Built with ❤️ using modern full-stack technologies**

*Experience the future of task management with this scalable, secure, and beautifully designed application.*