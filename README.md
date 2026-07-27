# 🚀 API Gateway & Analytics Platform

<div align="center">






\

**A production-inspired API Gateway built with Node.js, Express, MongoDB Atlas, Upstash Redis, and React that enables developers to securely expose APIs through proxy endpoints while providing authentication, caching, rate limiting, and real-time analytics.**

Inspired by **AWS API Gateway**, **Kong**, and **Google Apigee**.

</div>

---

# 📌 Overview

API Gateway & Analytics Platform is a full-stack developer platform designed to manage, secure, and monitor external APIs.

Instead of exposing APIs directly to clients, this platform generates secure proxy endpoints and API keys. Every request passes through the gateway where it is authenticated, rate-limited, cached, analyzed, and finally forwarded to the original API.

The platform also provides a modern analytics dashboard that helps developers understand traffic, latency, cache performance, blocked requests, and overall API health.

---

# ✨ Features

## 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Password Encryption using bcrypt

---

## 🌐 API Gateway

* Register External APIs
* Generate Proxy URLs
* Generate Secure API Keys
* API Key Validation
* Reverse Proxy Forwarding
* Secure API Access

---

## 🚦 Rate Limiting

Implemented using **Upstash Redis**

Supports:

* Configurable Request Limits
* Configurable Time Windows
* Automatic Blocking
* Redis-based Distributed Counters

Example:

* 100 Requests
* Per Minute
* Per User/API Key

---

## 💾 Redis Response Caching

Implemented using **Upstash Redis**

Features:

* Response Caching
* Configurable TTL
* Faster Responses
* Reduced Backend Load
* Cache Hit Tracking

---

## 📊 Analytics Dashboard

Tracks:

* Total Requests
* Successful Requests
* Failed Requests
* Blocked Requests
* Cache Hits
* API Calls
* Cache Hit Ratio
* Average Latency
* Request History
* Status Codes
* Request Timeline
* Client IP
* API Usage Statistics

---

# 🏗️ Architecture

```text
                Client
                   │
                   ▼
        JWT Authentication
                   │
                   ▼
          API Gateway Server
                   │
     ┌─────────────┼─────────────┐
     │             │             │
     ▼             ▼             ▼
 API Key      Rate Limiter     Cache
Validation      (Redis)        (Redis)
     │             │             │
     └─────────────┼─────────────┘
                   ▼
           Reverse Proxy Engine
                   │
                   ▼
           External APIs
                   │
                   ▼
          Analytics Service
                   │
                   ▼
            MongoDB Atlas
```

---

# 🛠️ Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Upstash Redis
* JWT
* bcrypt
* Axios

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios

## Database

* MongoDB Atlas

## Cache

* Upstash Redis

## Authentication

* JWT
* bcrypt

## Development Tools

* Git
* GitHub
* Postman
* VS Code

---

# 📂 Project Structure

```
API-Gateway/

├── Backend/
│
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── services/
│   │   ├── config/
│   │   └── utils/
│
│   └── package.json
│
├── FrontEnd/
│
│   ├── src/
│   │
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── context/
│   ├── hooks/
│   └── App.jsx
│
└── README.md
```

---

# 📊 Analytics Captured

* Total APIs
* Total Requests
* Successful Requests
* Failed Requests
* Blocked Requests
* Cache Hits
* API Calls
* Average Latency
* Cache Hit Ratio
* Request History
* Status Codes
* Client IP
* Request Timestamp

---

# 🔒 Security

* JWT Authentication
* Password Hashing
* API Key Authentication
* Protected Routes
* Redis Rate Limiting
* Secure Proxy URLs
* Input Validation

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/API-Gateway-Analytics-Platform.git
```

---

## Backend

```bash
cd Backend
npm install
npm run dev
```

---

## Frontend

```bash
cd FrontEnd
npm install
npm run dev
```

---

# 🔑 Environment Variables

Backend `.env`

```env
PORT=5000

MONGODB_URI=

JWT_SECRET=

UPSTASH_REDIS_REST_URL=

UPSTASH_REDIS_REST_TOKEN=
```

---

# 🎯 Future Improvements

* Graph-based Analytics
* API Versioning
* Webhooks
* API Usage Billing
* Team Collaboration
* Role-Based Access Control (RBAC)
* API Documentation Generator
* Docker Support
* Kubernetes Deployment
* CI/CD Pipeline
* Email Notifications
* Monitoring & Alerts

---

# 💡 Learning Outcomes

This project demonstrates practical experience with:

* Backend Architecture
* REST API Design
* Reverse Proxy Implementation
* JWT Authentication
* Redis Caching
* Distributed Rate Limiting
* MongoDB Data Modeling
* API Security
* Analytics Systems
* React Dashboard Development
* Full-Stack Application Development

---

# 👨‍💻 Author

**Umesh Jhurke**

Computer Engineering (Artificial Intelligence & Machine Learning)

Full Stack Developer | Backend Developer | Data Analytics Enthusiast

---

⭐ If you found this project helpful, consider giving it a star.
