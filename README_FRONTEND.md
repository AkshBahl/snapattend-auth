# Face Recognition Attendance - Frontend

A modern React frontend for the Face Recognition Attendance System with webcam integration and beautiful UI.

## 🚀 Features

- **User Signup** with face capture
- **Dual Login Methods** (Email/Password + Face Recognition)
- **Attendance Marking** with webcam
- **Dashboard** with attendance history
- **JWT Authentication** with protected routes
- **Responsive Design** with TailwindCSS
- **Modern UI** with glassmorphism effects

## 📦 Tech Stack

- React 18 + TypeScript
- Vite
- TailwindCSS
- Shadcn UI Components
- Axios for API calls
- React Router for navigation

## 🛠️ Installation

```bash
# Install dependencies
npm install
```

## ⚙️ Configuration

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
```

Update this URL to your deployed FastAPI backend URL when deploying.

## 🏃 Running Locally

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── WebcamCapture.tsx   # Reusable webcam component
│   └── ProtectedRoute.tsx  # Auth wrapper for protected routes
├── contexts/
│   └── AuthContext.tsx     # Authentication state management
├── lib/
│   ├── api.ts              # API service layer
│   └── utils.ts            # Utility functions
├── pages/
│   ├── Index.tsx           # Landing page
│   ├── Signup.tsx          # User registration
│   ├── Login.tsx           # Login (email + face)
│   ├── Dashboard.tsx       # Main dashboard
│   └── Attendance.tsx      # Mark attendance
└── App.tsx                 # Main app with routing
```

## 🔌 API Integration

The frontend expects the following API endpoints:

### Auth Endpoints
- `POST /auth/signup` - Register new user with face
- `POST /auth/login` - Email/password login
- `POST /auth/login-face` - Face recognition login

### Attendance Endpoints
- `POST /attendance/mark` - Mark attendance (requires auth)
- `GET /attendance/all` - Get all attendance records (requires auth)

## 📱 Pages

1. **Landing Page** (`/`)
   - Feature showcase
   - Links to signup/login

2. **Signup** (`/signup`)
   - Form fields: name, email, password
   - Webcam face capture
   - Sends data to backend

3. **Login** (`/login`)
   - Tab 1: Email/Password
   - Tab 2: Face Recognition
   - JWT stored in localStorage

4. **Dashboard** (`/dashboard`) - Protected
   - Stats cards (total attendance, unique users)
   - Attendance history table
   - Quick action button

5. **Attendance** (`/attendance`) - Protected
   - Webcam capture interface
   - Face recognition for marking
   - Success confirmation

## 🎨 Design System

The app uses a professional blue/indigo theme:

- **Primary**: Blue (#3B82F6) - Trust & Technology
- **Accent**: Teal (#14B8A6) - Success states
- **Background**: Light gray gradient
- **Cards**: Glassmorphism with backdrop blur

## 🔒 Authentication Flow

1. User signs up with face image
2. Login with email/password or face
3. JWT token stored in localStorage
4. Token automatically attached to all API requests
5. Protected routes redirect to login if not authenticated

## 📸 Webcam Integration

The `WebcamCapture` component:
- Requests camera permission
- Captures still frames
- Converts to base64 JPEG
- Passes to parent component
- Auto-stops camera after capture

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# Deploy dist/ folder
```

### Environment Variables

Remember to set `VITE_API_URL` in your deployment platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables

## 🔧 Backend Requirements

Your FastAPI backend must:

1. Accept base64 encoded images (JPEG)
2. Return JWT tokens in format: `{ "access_token": "...", "user": {...} }`
3. Enable CORS for your frontend domain
4. Implement all required endpoints

Example backend response format:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## 📝 Notes

- Camera access requires HTTPS in production
- Face images are base64 encoded JPEG
- JWT tokens expire based on backend settings
- Attendance records show all users (admin view)

## 🐛 Troubleshooting

**Camera not working?**
- Check browser permissions
- Ensure HTTPS in production
- Try different browser

**API errors?**
- Verify `VITE_API_URL` is correct
- Check CORS settings on backend
- Ensure backend is running

**Login issues?**
- Clear localStorage
- Check JWT token format
- Verify backend auth logic

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
