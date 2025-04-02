# 🚀 Job Management API

## 📌 Project Overview
This is a **RESTful API** built with **Node.js and Express** that provides **CRUD operations** for job listings. It includes **JWT authentication** for secure access, structured error handling, and follows best practices in API development.

## 📂 Project Structure
```
Job-Management-API/
│── controllers/              # Handles API logic
│   ├── auth.js               # Authentication controller
│   ├── jobs.js               # Job management controller
│
│── errors/                   # Custom error handling
│   ├── bad-request.js        # Bad request error
│   ├── custom-error.js       # Base custom error class
│   ├── index.js              # Exports error modules
│   ├── not-found.js          # 404 error handler
│   ├── unauthenticated.js    # Unauthorized access error
│
│── middleware/               # Express middleware
│   ├── authentication.js     # JWT authentication middleware
│   ├── errorHandler.js       # Global error handler
│   ├── notFound.js           # 404 route handler
│
│── models/                   # Database models
│   ├── Job.js                # Job schema/model
│   ├── User.js               # User schema/model
│
│── routes/                   # API routes
│   ├── auth.js               # Authentication routes
│   ├── jobs.js               # Job-related routes
│
│── app.js                    # Main application file
│── README.md                 # Project documentation
│── package.json              # Dependencies and scripts
│── .env                      # Environment variables
```

## 🛠️ Installation & Setup
1. **Clone the Repository**
   ```bash
   git clone https://github.com/alematlop/jobs-api.git
   cd jobs-api
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**
   Create a `.env` file and add:
   ```env
   PORT=3000
   DB_HOST
   DB_USER
   DB_PASSWORD
   DB_NAME
   DB_PORT
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   JWT_EXPIRES=30d
   ```
4. **Start the Server**
   ```bash
   npm start
   ```

## 🚀 API Endpoints

### **🔑 Authentication Routes** (`/api/v1/auth`)
- **POST** `/register` → Register a new user
- **POST** `/login` → Authenticate user & return JWT

### **📌 Job Routes** (`/api/v1/jobs`)
- **GET** `/` → Get all jobs (requires auth)
- **POST** `/` → Create a new job (requires auth)
- **GET** `/:id` → Get a specific job by ID (requires auth)
- **PATCH** `/:id` → Update a job (requires auth)
- **DELETE** `/:id` → Remove a job (requires auth)

## 🔒 Authentication & Security
- **JWT Authentication** protects job-related routes.
- **Middleware** ensures only authorized users access protected resources.
- **Error Handling** provides structured responses for better debugging.

## 🎯 Future Enhancements
- Implement role-based access control (RBAC).
- Add pagination & filtering for job listings.
- Integrate rate-limiting for security.

## CREDITS
This was implemented following a course from freeCodeCamp.org on Node.js/Express on YT.

## 📝 License
This project is open-source and available under the MIT License.

---
Made with ❤️ by Alexandros Matinopoulos-Lopez (https://github.com/alematlop)

