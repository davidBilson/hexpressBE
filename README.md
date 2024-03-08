# HexpressBE - Backend for Hexpress Delivery Application

Welcome to HexpressBE, the backend repository for the Hexpress Delivery application! This project serves as the backend server for handling user authentication, user data, and other backend functionalities for the Hexpress Delivery logistics website.

## Overview

HexpressBE is built using Node.js and Express.js framework, with MongoDB as the database using Mongoose for ORM. It provides RESTful APIs for user authentication, user management, and other necessary functionalities required for the Hexpress Delivery application.

## Features

- **User Authentication**: Implements user signup and signin functionalities using bcrypt for password hashing and JWT for session management.
- **User Management**: Provides endpoints for retrieving user data, updating user information, and managing user accounts.
- **Cross-Origin Resource Sharing (CORS)**: Configured to allow requests from specified origins for frontend integration.
- **Session Management**: Utilizes express-session and MongoStore for session management and storage.

## Technologies Used

- **Node.js**: JavaScript runtime environment for building server-side applications.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data and application information.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **bcrypt**: Library for hashing passwords securely.
- **JWT (JSON Web Tokens)**: For managing user sessions securely.
- **cors**: Middleware for handling Cross-Origin Resource Sharing.
- **express-session**: Session middleware for Express.js.
- **dotenv**: Loads environment variables from a .env file.

## Getting Started

1. Clone this repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Set up environment variables: Create a `.env` file in the root directory and define the required environment variables (see `.env.example` for reference).
4. Start the server in development mode: `npm run dev`
5. The server will start running at `http://localhost:5000`

## API Endpoints

- **POST /auth/signup**: Register a new user.
- **POST /auth/signin**: Authenticate a user and generate a JWT token.
- **GET /user/:id**: Retrieve user data by ID.
- **PUT /user/:id**: Update user data by ID.

## Deployment

The backend server can be deployed to any hosting platform. Make sure to set up the environment variables accordingly for production deployment.

## License

This project is licensed under the [ISC License](LICENSE).

