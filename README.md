🚀 API Gateway & Analytics Platform

A production-inspired API Gateway & Analytics Platform that enables developers to securely expose external APIs through generated proxy endpoints while providing authentication, API key management, intelligent caching, configurable rate limiting, and real-time analytics. The platform is designed to simplify API management and monitoring, drawing inspiration from enterprise solutions such as AWS API Gateway, Kong, and Google Apigee.

✨ Key Features
🔐 JWT Authentication & Authorization
Secure user registration and login
Protected routes using JWT-based authentication
🌐 API Registration & Proxy Management
Register external REST APIs
Automatically generate unique proxy URLs
Generate secure API keys for controlled access
⚡ Reverse Proxy Engine
Forwards client requests to registered APIs
Hides original API endpoints behind secure proxy URLs
Measures request latency for performance analysis
🚦 Dynamic Rate Limiting
Configurable request limits per API
Supports custom time windows (seconds, minutes, hours)
Implemented using Upstash Redis for distributed rate limiting
Automatically blocks requests exceeding configured limits
💾 Redis Response Caching
Intelligent response caching using Upstash Redis
Reduces latency and minimizes unnecessary API calls
Tracks cache hits and cache miss statistics
📊 Real-Time Analytics
Total API requests
Successful requests
Failed requests
Blocked requests
Cache hit count
Average API latency
API call history
Request timeline
Performance monitoring dashboard
📈 Developer Dashboard
Interactive analytics dashboard
API usage overview
Request trends
Latency visualization
Cache performance monitoring
Rate limit monitoring
🏗️ Tech Stack
Backend
Node.js
Express.js
MongoDB Atlas
Mongoose
Upstash Redis
JWT Authentication
Axios
bcrypt
Frontend
React.js (Vite)
Tailwind CSS
React Router
Axios
Tools
Postman
Git & GitHub
⚙️ Core Backend Architecture
Client
   │
   ▼
JWT Authentication
   │
   ▼
API Gateway
   │
   ├── API Key Validation
   ├── Rate Limiting (Redis)
   ├── Cache Lookup (Redis)
   ├── Reverse Proxy
   ├── Latency Tracking
   └── Analytics Logging
            │
            ▼
      MongoDB Atlas
📊 Analytics Collected
Total Requests
Successful Requests
Failed Requests
Blocked Requests
Cache Hits
API Calls
Average Latency
Cache Hit Ratio
Status Codes
Request History
Request Timestamp
Client IP Tracking
🔒 Security Features
JWT Authentication
API Key Authentication
Password Hashing with bcrypt
Protected API Endpoints
Configurable Rate Limiting
Secure Proxy URLs
Request Validation
📌 Project Highlights
Built a production-style API Gateway capable of managing and securing third-party APIs.
Implemented Redis-powered distributed rate limiting to prevent API abuse.
Reduced response time using Redis response caching while tracking cache performance.
Designed a real-time analytics system for monitoring API traffic, latency, cache usage, and blocked requests.
Developed a scalable backend architecture following RESTful API design principles with a modern React frontend.
