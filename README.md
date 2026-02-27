🚀 AI Fullstack Journey – Backend API

A clean, production-style REST API built with Node.js and Express following layered architecture principles.

📌 **Project Overview**

This project demonstrates:

    1. Clean layered architecture (Route → Controller → Service)

    2. Centralized error handling

    3. Custom API error class

    4. Catch-all 404 handling

    5. Separation of concerns

    6. Scalable backend folder structure

🏗 **Architecture**

The project follows a layered architecture pattern:

                Client
                  ↓
                Routes
                  ↓
                Controllers
                  ↓
                Services
                  ↓
                Data Source

**Why This Architecture?**

    1. Routes handle HTTP wiring only

    2. Controllers handle request/response logic

    3. Services contain business logic

    4. Centralized middleware handles errors

    5. Easy to scale and test
