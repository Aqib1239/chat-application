# Chat Application

A real-time chat application built with Node.js, Express, MongoDB, and Socket.io. The app allows users to send text and image messages, and it updates in real-time for the recipient using WebSockets.

## Features

- **User Authentication**: Secure login and registration system.
- **Real-time Messaging**: Using Socket.io for real-time message updates.
- **Image Upload**: Send images as part of the chat messages using Cloudinary for storage.
- **Chat History**: View past messages with support for scrolling and auto-scrolling to the latest messages.
- **Responsive Design**: Designed for mobile and desktop users.

## Tech Stack

- **Frontend**: 
  - React.js
  - Tailwind CSS
  - Socket.io-client
  
- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB (with Mongoose for data modeling)
  - Socket.io (for real-time messaging)
  
- **Storage**: Cloudinary for image uploads.

## Installation

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (v14 or later)
- MongoDB (or use MongoDB Atlas for cloud-based storage)
- Cloudinary Account (for image storage)

### Steps to run the project

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Aqib1239/chat-application.git
   cd chat-application

2. **Install dependencies**:

    Install both backend and frontend dependencies:

   For the backend:

     ```bash
      cd backend
      npm install
    
  For the frontend:
   ````bash
     cd frontend
     npm install

