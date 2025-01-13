Chat Application 🗨️

A fully functional, real-time chat application built with React, Node.js, Express, MongoDB, and Socket.io. This application allows users to communicate seamlessly in real-time with features like text messaging, image sharing, and user authentication.


🌟 Features

Real-Time Messaging: Powered by Socket.io for instantaneous communication.

Image Sharing: Send and view image attachments with a responsive modal.

User Authentication: Secure login and registration using JWT.

Responsive Design: Optimized for all screen sizes and devices.

Cloud Storage: Image uploads handled using Cloudinary.

Typing Indicator: Show when a user is typing (future scope).

📂 Project Structure

chat-application/

├── frontend/               # Frontend code (React)

│   ├── src/

│   │   ├── components/     # Reusable components

│   │   ├── pages/          # Application pages

│   │   ├── store/          # State management

│   │   ├── utils/          # Helper functions

│   │   └── App.jsx         # Main application file

│   └── public/             # Static assets

├── backend/                # Backend code (Node.js, Express)

│   ├── models/             # MongoDB schemas (Auth & Message)

│   ├── controllers/        # Auth Controller and Message Controller

│   ├── routes/             # API endpoints

│   ├── middleware/         # Authentication and error handling

│   └── index.js           # Entry point for the server

├── README.md               # Documentation

├── package.json            # Project metadata

└── .env                    # Environment variables

🛠️ Tech Stack

Frontend:

React.js: Component-based UI.

Tailwind CSS: Utility-first styling.

Axios: For API requests.

React Router: Navigation and routing.

Backend:

Node.js: Server runtime.

Express.js: Web framework.

Socket.io: Real-time communication.

MongoDB: NoSQL database for storing users and messages.

Mongoose: MongoDB object modeling.

Cloudinary: Image storage and management.

🚀 Getting Started

Prerequisites

Node.js: Installed on your system.

MongoDB: A running instance (local or Atlas).

Cloudinary Account: For image handling.

Installation

Clone the repository:

 ---- git clone https://github.com/Aqib1239/chat-application.git

Navigate to the project directory:

---- cd chat-application

Install dependencies:

For the backend:

---- cd backend

---- npm install

For the frontend:

---- cd frontend

---- npm install
