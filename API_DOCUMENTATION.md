# Roadmap App - API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "default.jpg"
  }
}
```

---

### Login User
**POST** `/auth/login`

Login with existing credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "default.jpg"
  }
}
```

---

### Get Current User
**GET** `/auth/me`

Get the currently authenticated user's information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "default.jpg",
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}
```

---

### Update User Details
**PUT** `/auth/updatedetails`

Update user profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "avatar": "default.jpg"
  }
}
```

---

### Update Password
**PUT** `/auth/updatepassword`

Change user password.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Smith",
    "email": "johnsmith@example.com"
  }
}
```

---

## Project Endpoints

### Get All Projects
**GET** `/projects`

Get all projects for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): Filter by status (draft, active, completed, archived)
- `tags` (optional): Filter by tags (comma-separated)

**Example:**
```
GET /api/projects?status=active&tags=web,mobile
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "E-Commerce Platform",
      "description": "A modern e-commerce solution",
      "owner": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "collaborators": [],
      "currentStage": 3,
      "status": "active",
      "tags": ["web", "e-commerce"],
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-20T14:20:00.000Z"
    }
  ]
}
```

---

### Get Single Project
**GET** `/projects/:id`

Get a specific project by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "E-Commerce Platform",
    "description": "A modern e-commerce solution",
    "owner": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "collaborators": [],
    "currentStage": 3,
    "stages": {
      "ideation": {
        "ideas": []
      },
      "problemDefinition": {
        "problemStatement": "",
        "personas": [],
        "painPoints": [],
        "objectives": []
      }
      // ... other stages
    },
    "status": "active",
    "tags": ["web", "e-commerce"],
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-20T14:20:00.000Z"
  }
}
```

---

### Create Project
**POST** `/projects`

Create a new project.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "My New Project",
  "description": "Project description here",
  "tags": ["web", "mobile"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "My New Project",
    "description": "Project description here",
    "owner": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "collaborators": [],
    "currentStage": 1,
    "status": "draft",
    "tags": ["web", "mobile"],
    "createdAt": "2025-01-20T10:30:00.000Z",
    "updatedAt": "2025-01-20T10:30:00.000Z"
  }
}
```

---

### Update Project
**PUT** `/projects/:id`

Update project details.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Updated Project Name",
  "description": "Updated description",
  "status": "active",
  "currentStage": 4
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    // Updated project object
  }
}
```

---

### Delete Project
**DELETE** `/projects/:id`

Delete a project (owner only).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {}
}
```

---

### Update Project Stage
**PUT** `/projects/:id/stage/:stageName`

Update a specific stage of the project.

**Headers:**
```
Authorization: Bearer <token>
```

**Stage Names:**
- `ideation`
- `problemDefinition`
- `solutionDefinition`
- `audienceMarket`
- `technicalSpec`
- `databaseDesign`
- `wireframe`
- `development`
- `goToMarket`
- `domainHosting`

**Example Request Body (for ideation stage):**
```json
{
  "ideas": [
    {
      "title": "AI Recommendations",
      "description": "Use ML for product suggestions",
      "scores": {
        "feasibility": 8,
        "impact": 9,
        "innovation": 7
      },
      "notes": ["Research ML models"]
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    // Updated project object
  }
}
```

---

### Add Collaborator
**POST** `/projects/:id/collaborators`

Add a collaborator to the project (owner only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439013",
  "role": "editor"
}
```

**Roles:**
- `owner`: Full access
- `editor`: Can edit project
- `viewer`: Read-only access

**Response:**
```json
{
  "success": true,
  "data": {
    // Updated project with new collaborator
  }
}
```

---

### Remove Collaborator
**DELETE** `/projects/:id/collaborators/:userId`

Remove a collaborator from the project (owner only).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    // Updated project without the collaborator
  }
}
```

---

### Export Project
**GET** `/projects/:id/export`

Export project data (for PDF/CSV generation).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    // Complete project object with all stages
  }
}
```

---

### Get Project Analytics
**GET** `/projects/:id/analytics`

Get analytics and statistics for a project.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalIdeas": 5,
    "totalPersonas": 3,
    "totalFeatures": 12,
    "completedFeatures": 4,
    "totalTasks": 25,
    "completedTasks": 10,
    "totalBugs": 3,
    "openBugs": 1,
    "progressPercentage": 41.67,
    "collaboratorsCount": 2
  }
}
```

---

## User Endpoints

### Get User Profile
**GET** `/users/profile`

Get the current user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "default.jpg",
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}
```

---

### Search Users
**GET** `/users/search?query=john`

Search for users (for adding collaborators).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `query` (required): Search term

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "default.jpg"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Johnny Smith",
      "email": "johnny@example.com",
      "avatar": "default.jpg"
    }
  ]
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Validation error message",
  "errors": [
    {
      "field": "email",
      "message": "Please include a valid email"
    }
  ]
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "message": "Not authorized to perform this action"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## Rate Limiting

Currently, there are no rate limits implemented. For production, consider implementing rate limiting using packages like `express-rate-limit`.

---

## WebSocket Events (Socket.IO)

### Connection
```javascript
const socket = io('http://localhost:5000');
```

### Join Project Room
```javascript
socket.emit('joinProject', projectId);
```

### Real-time Updates
Listen for real-time project updates:
```javascript
socket.on('projectUpdate', (data) => {
  console.log('Project updated:', data);
});
```

---

## Testing the API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Get Projects:**
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Import the API endpoints into Postman
2. Set up an environment variable for the token
3. Use `{{token}}` in the Authorization header

---

## Notes

- All dates are in ISO 8601 format
- All IDs are MongoDB ObjectIds
- File uploads are not yet implemented
- Email notifications are not yet implemented
- Password reset via email is not yet implemented
