# EPICAL LAYOUTS - HR Management System

A modern, secure HR Management System built with Next.js, NextAuth, and MongoDB.

## Features

### 🔐 Authentication
- Google OAuth integration
- Domain-restricted access (@citchennai.net only)
- Role-based access control (Admin/Employee)
- Automatic user creation on first login

### 👨‍💼 Admin Dashboard
- Complete employee management (CRUD operations)
- Employee statistics and analytics
- Department management
- User role management

### 👩‍💻 Employee Dashboard
- Personal profile management
- Contact information updates
- Profile completion tracking
- Professional information display

### 🛡️ Security
- Protected routes with middleware
- Session-based authentication
- Role-based authorization
- Secure API endpoints

### 🎨 Modern UI/UX
- Glass morphism design
- Responsive layout
- Smooth animations
- Professional branding

## Tech Stack

- **Frontend**: Next.js 13, React 18, Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: MongoDB with Mongoose
- **UI Components**: Radix UI, Lucide React
- **Styling**: Tailwind CSS with custom animations

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   ```
   GOOGLE_ID=your_google_oauth_client_id
   GOOGLE_SECRET=your_google_oauth_client_secret
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```
4. Run the development server: `npm run dev`

## Environment Setup

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

### MongoDB Setup
1. Create a MongoDB database
2. Get your connection string
3. Add it to your environment variables

## Admin Access

The admin role is automatically assigned to: `ravikrishnaj25@gmail.com`

All other @citchennai.net domain users will have employee access.

## License

© 2025 EPICAL LAYOUTS PVT LTD. All rights reserved.