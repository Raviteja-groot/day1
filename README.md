# Suchi Fashion Store

A full-stack e-commerce fashion store built with React and Node.js.

## Features

- User authentication (login/signup)
- Product browsing with categories and filters
- Wishlist functionality
- Shopping bag with quantity management
- Checkout process with payment options
- Responsive design

## Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- Supabase (Database)
- JWT Authentication
- bcryptjs for password hashing

## Quick Start

### Option 1: Use the batch file (Windows)
```bash
# Double-click start-dev.bat or run:
start-dev.bat
```

### Option 2: Manual setup

1. **Install dependencies:**
```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

2. **Start the servers:**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend (new terminal)
npm run dev
```

3. **Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5001

## Environment Setup

The backend `.env` file is already configured with Supabase credentials. If you need to change them:

```env
PORT=5001
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## Database Schema

The application uses Supabase with the following table:

**users table:**
- id (uuid, primary key)
- name (text)
- email (text, unique)
- password (text, hashed)
- created_at (timestamp)

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/protected` - Protected route (requires authentication)
- `GET /api/health` - Health check

## Troubleshooting

### Common Issues:

1. **Port already in use:**
   - Backend: Change PORT in `.env` file
   - Frontend: Vite will automatically suggest another port

2. **CORS errors:**
   - Ensure backend is running on port 5001
   - Check that frontend is making requests to correct backend URL

3. **Authentication issues:**
   - Clear localStorage: `localStorage.clear()`
   - Check JWT_SECRET in backend `.env`

4. **Database connection:**
   - Verify Supabase credentials in `.env`
   - Check if users table exists in Supabase

### Reset Application State:
```javascript
// In browser console:
localStorage.clear();
location.reload();
```

## Development Notes

- The app automatically checks for existing tokens on load
- Protected routes (wishlist, bag) require authentication
- Logout clears all user data and redirects to landing page
- SignUp automatically logs in the user after successful registration

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── utils/         # Utility functions
│   └── App.jsx        # Main app component
├── backend/
│   ├── config/        # Database configuration
│   ├── middleware/    # Auth middleware
│   ├── routes/        # API routes
│   └── server.js      # Express server
└── start-dev.bat      # Development startup script
```