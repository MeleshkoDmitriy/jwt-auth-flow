# JWT Authentication Flow Project

A comprehensive full-stack authentication system featuring a Node.js backend, React Native mobile app (Expo), and React web application with JWT-based authentication, role-based access control, and secure token management.

## 🚀 Project Overview

This project demonstrates a complete authentication flow implementation with three interconnected applications:

- **Backend API** - Node.js/Express server with JWT authentication
- **Mobile App** - React Native (Expo) with secure token storage
- **Web App** - React SPA with protected routes and authentication

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌──────────────────┐ 
│   Mobile App    │    │   Web App       │    │   Backend API    │
│ (React Native)  │    │   (React)       │    │    (Node.js)     │
│                 │    │                 │    │                  │
│ • JWT Auth      │    │ • JWT Auth      │    │ • JWT Generation │
│ • Secure Store  │    │ • Local Storage │    │ • Token Refresh  │
│ • Role Guards   │    │ • Protected     │    │ • Role Middleware│
│ • Tab Navigation│    │   Routes        │    │ • User Database  │
└─────────────────┘    └─────────────────┘    └──────────────────┘
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js with ES modules
- **Framework**: Express.js 5.x
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt/bcryptjs
- **Database**: NeDB (lightweight NoSQL)
- **CORS**: Cross-origin resource sharing
- **Development**: Nodemon for hot reloading

### Mobile App (Expo)
- **Framework**: React Native with Expo SDK 53
- **Navigation**: Expo Router v5
- **State Management**: Zustand
- **Secure Storage**: Expo SecureStore
- **HTTP Client**: Axios with interceptors
- **Icons**: Expo Vector Icons
- **Development**: TypeScript, ESLint, Prettier

### Web App
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Development**: TypeScript, ESLint

## 🔐 Authentication Features

### JWT Token System
- **Access Token**: Short-lived (15 minutes) for API requests
- **Refresh Token**: Long-lived for token renewal
- **Secure Storage**: Tokens stored in device secure storage (mobile) and local storage (web)
- **Automatic Refresh**: Seamless token renewal without user interaction

### User Management
- **Registration**: Email, password, and role selection (admin/moderator/member)
- **Login**: Secure credential verification
- **Logout**: Token invalidation and cleanup
- **Password Security**: bcrypt hashing with salt

### Role-Based Access Control (RBAC)
- **User Roles**: admin, moderator, member
- **Protected Routes**: Role-specific access control
- **Middleware**: Backend authorization middleware
- **Frontend Guards**: React components for route protection

## 📱 Mobile App Features

### Authentication Flow
- **Login Screen**: Email/password authentication
- **Registration Screen**: User registration with role selection
- **Token Management**: Automatic token refresh and storage
- **Secure Navigation**: Protected tab-based navigation

### Navigation Structure
```
(app)
├── (tabs)
│   ├── home.tsx          # Public dashboard
│   ├── admin.tsx         # Admin panel (role-protected)
│   ├── moderator.tsx     # Moderator panel (role-protected)
│   └── profile.tsx       # User profile
└── (auth)
    ├── login.tsx         # Login form
    └── register.tsx      # Registration form
```

### Security Features
- **RoleGuard Component**: Wraps protected screens
- **Access Denied Screen**: User-friendly permission denial
- **Loading States**: Proper loading indicators during auth checks
- **Error Handling**: Comprehensive error management

### API Integration
- **Axios Interceptors**: Automatic token handling
- **Request Interceptors**: Add authorization headers
- **Response Interceptors**: Handle 401 errors and token refresh
- **Error Recovery**: Automatic logout on authentication failure

## 🌐 Web App Features

### Authentication System
- **Login/Register Forms**: React Hook Form integration
- **Protected Routes**: Role-based route protection
- **Token Management**: Local storage token handling
- **Form Validation**: Client-side validation with error handling

### Routing & Navigation
- **Public Routes**: Login, registration, public pages
- **Protected Routes**: Role-specific access control
- **Redirect Logic**: Automatic navigation based on auth state
- **Route Guards**: Component-level access control

## 🔧 Backend API

### Server Configuration
- **Port**: 5001 (configurable)
- **CORS**: Cross-origin support for mobile and web apps
- **Middleware**: Authentication, authorization, and error handling
- **Database**: NeDB with automatic file creation

### API Endpoints

#### Authentication Routes (`/api/v1/auth`)
- `POST /login` - User authentication
- `POST /register` - User registration
- `POST /refresh-token` - Token renewal
- `GET /logout` - User logout

#### Role Management (`/api/v1/roles`)
- `GET /admin` - Admin access verification
- `GET /moderator` - Moderator access verification

#### User Management (`/api/v1/users`)
- `GET /me` - Current user information

### Security Features
- **JWT Verification**: Middleware for protected routes
- **Role Authorization**: Role-based access control
- **Password Hashing**: Secure password storage
- **Token Invalidation**: Proper logout handling

### Database Schema
- **Users**: id, email, password (hashed), name, role
- **Refresh Tokens**: token, userId, expiry
- **Invalid Tokens**: Blacklisted tokens for security

## 🔒 Security Implementation

### Token Security
- **Access Token Expiry**: 15 minutes for security
- **Refresh Token Rotation**: New refresh token on each use
- **Token Blacklisting**: Invalidated tokens stored securely
- **Secure Storage**: Device-specific secure storage (mobile)

### API Security
- **CORS Configuration**: Proper cross-origin handling
- **Authorization Headers**: Bearer token authentication
- **Input Validation**: Request data validation
- **Error Handling**: Secure error responses

### Frontend Security
- **Route Protection**: Component-level access control
- **Token Validation**: Automatic token verification
- **Secure Storage**: Encrypted local storage (mobile)
- **Session Management**: Proper logout and cleanup

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI (for mobile development)
- React Native development environment

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Mobile App Setup
```bash
cd mobile-expo
npm install
expo start
```

### Web App Setup
```bash
cd web-react
npm install
npm run dev
```

### Environment Configuration
- Backend runs on port 5001 by default
- Mobile app configured for network access (not localhost)
- CORS enabled for cross-origin requests

## 📁 Project Structure

```
jwt-auth-flow/
├── backend/                 # Node.js API server
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth & authorization
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic
│   ├── database/           # NeDB database files
│   └── server.js           # Main server file
├── mobile-expo/            # React Native mobile app
│   ├── app/                # Expo Router screens
│   ├── components/         # Reusable components
│   ├── store/              # Zustand state management
│   ├── services/           # API services
│   └── lib/                # Utilities and configs
├── web-react/              # React web application
│   ├── src/                # Source code
│   ├── components/         # React components
│   └── pages/              # Application pages
└── README.md               # This file
```

## 🔄 Development Workflow

### Backend Development
- **Hot Reload**: Nodemon for automatic server restart
- **Database**: NeDB files for development data
- **Logging**: Comprehensive request/response logging
- **Error Handling**: Detailed error messages and logging

### Mobile Development
- **Expo Development**: Hot reload and live updates
- **TypeScript**: Full type safety and IntelliSense
- **State Management**: Centralized auth state with Zustand
- **Navigation**: File-based routing with Expo Router

### Web Development
- **Vite Dev Server**: Fast development with HMR
- **TypeScript**: Type-safe development
- **React Router**: Client-side routing
- **Form Handling**: React Hook Form for form management

## 🧪 Testing & Quality

### Code Quality
- **ESLint**: Code linting and style enforcement
- **Prettier**: Code formatting
- **TypeScript**: Type checking and validation
- **Import Sorting**: Organized import statements

### Development Tools
- **Hot Reload**: Automatic refresh on code changes
- **Error Boundaries**: React error handling
- **Console Logging**: Comprehensive debugging information
- **Type Safety**: Full TypeScript coverage

## 🚧 Known Issues & Limitations

### Current Limitations
- **Database**: NeDB for development (not production-ready)
- **Token Storage**: Local storage for web (consider httpOnly cookies)
- **Error Handling**: Basic error handling (could be enhanced)
- **Validation**: Client-side validation only

### Future Improvements
- **Database**: Migrate to PostgreSQL/MongoDB
- **Redis**: Add Redis for token blacklisting
- **Testing**: Add unit and integration tests
- **CI/CD**: Implement automated deployment
- **Monitoring**: Add application monitoring and logging

## 🙏 Acknowledgments

Built with modern web technologies and best practices for authentication and authorization in full-stack applications.

---

**Note**: This project is designed for educational and development purposes. For production use, additional security measures, testing, and infrastructure considerations should be implemented.
