# HEALTH AI - Co-Creation & Innovation Platform

A secure, full-stack Next.js web application designed to connect healthcare professionals with engineers for innovative collaborations. Built for SENG 384 Software Project III.

## 🚀 Features
- **Role-Based Access Control:** Secure registration and routing for Admins, Healthcare Professionals, and Engineers.
- **Project Marketplace:** Create, edit, and filter collaboration posts based on domain and location.
- **Secure Meeting Workflows:** Request meetings, accept NDAs, and propose time slots securely.
- **GDPR & Admin Tools:** GDPR-compliant profile deletion, activity logging, and CSV log exports.

## 🛠 Tech Stack
- **Frontend:** Next.js 15 (App Router), React, Vanilla CSS (Glassmorphism design)
- **Backend:** Next.js Server Actions, Next.js Route Handlers
- **Database:** PostgreSQL 15, Prisma ORM v7
- **Security:** JWT session management (`jose`), password hashing (`bcryptjs`)
- **Infrastructure:** Docker & Docker Compose

## 📦 Local Setup & Execution

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
- (Optional) Node.js 20+ if you wish to run outside of Docker.

### Running with Docker (Recommended)
This project is fully containerized, meaning the application and PostgreSQL database will automatically spin up together.

1. Ensure Docker daemon is running on your machine.
2. Open your terminal in the project root directory (`health-ai-app`).
3. Run the following command:
   ```bash
   docker-compose up --build
   ```
4. Once the build is finished and the database is healthy, the app will automatically seed default data.
5. Open your browser and navigate to: **[http://localhost:3000](http://localhost:3000)**

### Default Seed Users (for testing)
- **Admin**: `admin@healthai.edu` | Password: `password123`
- **Doctor**: `dr.smith@med.edu` | Password: `password123`
- **Engineer**: `dev.jones@tech.edu` | Password: `password123`

---

*This application was developed as the final submission for the HEALTH AI project.*
