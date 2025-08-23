# Authentication Integration Documentation

## Overview
This document describes the integration between the Zoo Management System frontend and backend for user authentication (signup and signin).

## Features Implemented

### Backend Changes
1. **New Signup Endpoint**: Added `POST /api/auth/signup` endpoint
2. **Enhanced Auth Controller**: Added signup functionality with proper validation
3. **User Role Management**: Default role assignment for new users

### Frontend Changes
1. **API Client**: Created centralized API client with authentication handling
2. **Authentication Context**: Implemented React context for global auth state
3. **Protected Routes**: Added route protection based on user roles
4. **Enhanced Forms**: Updated signup and signin forms with proper validation
5. **Auth State Management**: Persistent authentication state using localStorage

## API Endpoints

### POST /api/auth/signup
Creates a new user account.

**Request Body:**
```json
{
  "name": "string",
  "email": "string", 
  "password": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "name": "string", 
    "email": "string",
    "role": "string"
  }
}
```

### POST /api/auth/login
Authenticates existing user.

**Request Body:**
```json
{
  "email": "string",
  "password": "string" 
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string", 
    "role": "string"
  }
}
```

## Frontend Architecture

### Authentication Context
- Global state management for authentication
- Persistent storage using localStorage
- Automatic token management

### Protected Routes
- Role-based access control
- Automatic redirects based on authentication status
- Loading states during authentication checks

### API Integration
- Centralized HTTP client with automatic token inclusion
- Error handling with user-friendly messages
- TypeScript interfaces for type safety

## Usage

### Starting the Application
```bash
# Install dependencies and start both services
./start.sh

# Or manually:
# Backend
cd backend && npm install && npm start

# Frontend  
cd frontend && npm install && npm run dev
```

### Environment Variables

**Backend (.env):**
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/zms
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## User Flow

### Signup Flow
1. User fills signup form with name, email, password
2. Frontend validates form data
3. API call to `/api/auth/signup`
4. On success: token stored, user redirected based on role
5. On error: display error message

### Signin Flow  
1. User fills signin form with email, password
2. Frontend validates form data
3. API call to `/api/auth/login`
4. On success: token stored, user redirected based on role
5. On error: display error message

### Role-based Redirection
- **Admin users**: Redirected to `/admin` dashboard
- **Staff users**: Redirected to `/` (landing page)

## Security Considerations

### Current Implementation
- JWT tokens for authentication
- Role-based access control
- Form validation on frontend and backend

### Production Recommendations
1. **Password Hashing**: Implement bcrypt for password hashing
2. **HTTPS**: Use HTTPS in production
3. **Token Refresh**: Implement refresh token mechanism
4. **Rate Limiting**: Add rate limiting for auth endpoints
5. **Input Sanitization**: Add comprehensive input sanitization
6. **CORS**: Configure CORS properly for production domains

## Testing

### Manual Testing
1. Start both frontend and backend services
2. Navigate to `/signup` to create new account
3. Verify successful account creation and redirect
4. Logout and navigate to `/signin`
5. Verify successful login and redirect
6. Test role-based access to admin routes

### API Testing
```bash
# Test signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Test login  
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure backend CORS is configured for frontend URL
2. **API Connection**: Verify `NEXT_PUBLIC_API_URL` is set correctly
3. **Token Issues**: Check browser localStorage for stored tokens
4. **Database Connection**: Ensure MongoDB is running and accessible

### Error Messages
- "User already exists": Email is already registered
- "Invalid credentials": Wrong email/password combination
- "Please fill in all fields": Form validation error
- API connection errors: Check backend service status
