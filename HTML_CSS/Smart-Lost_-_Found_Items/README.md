# Smart Lost and Found Portal

## Project Overview

The Smart Lost and Found Portal is a comprehensive web application designed to help users report and find lost items efficiently. The system provides an intuitive platform for users to report lost items, report found items, and search through existing reports. It features an intelligent matching system that connects lost and found items based on various attributes, helping reunite people with their belongings.

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                 Smart Lost & Found Portal               │
│                                                         │
└───────────────────────────┬─────────────────────────────┘
                            │
              ┌─────────────┼─────────────────┐
              │             │                 │
┌─────────────▼───────┐ ┌───▼───────────┐ ┌───▼───────────┐
│                     │ │               │ │               │
│  User Management    │ │ Report System │ │ Admin Panel   │
│                     │ │               │ │               │
└─────────────────────┘ └───────────────┘ └───────────────┘
```

## Features

### User Features
- User registration and authentication
- Report lost items with detailed descriptions and optional images
- Report found items with location and time information
- Search and filter reports by category, date, and keywords
- View potential matches for lost/found items
- Mark reports as resolved when items are claimed
- Manage personal reports (edit, delete, resolve)

### Admin Features
- Comprehensive dashboard with statistics
- Manage all reports (view, edit, delete, flag, resolve)
- User management
- System monitoring

### Core Functionality
- Intelligent matching algorithm to connect lost and found items
- Real-time notifications for potential matches
- Image upload for better item identification
- Responsive design for all devices

## System Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Client Browser ├────►│  Express Server ├────►│  MySQL Database │
│                 │     │                 │     │                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                        ┌────────┴────────┐
                        │                 │
                        │  File Storage   │
                        │  (Item Images)  │
                        │                 │
                        └─────────────────┘
```

### Frontend
- HTML5, CSS3 with Tailwind CSS framework
- Vanilla JavaScript for DOM manipulation and API calls
- Responsive design with mobile-first approach
- Font Awesome icons for enhanced UI

### Backend
- Node.js with Express.js framework
- RESTful API architecture
- JWT and session-based authentication
- Multer for file uploads

### Database
- MySQL for structured data storage
- Optimized schema for efficient queries

## User Flow Diagrams

### Lost Item Reporting Flow

```
┌─────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│         │     │             │     │             │     │             │     │             │
│  Login  ├────►│ Navigate to ├────►│  Fill Lost  ├────►│   Submit    ├────►│ View Potential│
│         │     │ Report Form │     │  Item Form │     │   Report    │     │   Matches   │
└─────────┘     └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Found Item Reporting Flow

```
┌─────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│         │     │             │     │             │     │             │     │             │
│  Login  ├────►│ Navigate to ├────►│  Fill Found ├────►│   Submit    ├────►│ View Potential│
│         │     │ Report Form │     │  Item Form │     │   Report    │     │   Matches   │
└─────────┘     └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Item Resolution Flow

```
┌─────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│         │     │             │     │             │     │             │
│  Login  ├────►│ My Reports  ├────►│ Select Report├────►│ Mark as     │
│         │     │             │     │             │     │ Resolved    │
└─────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

## Database Schema

```
┌────────────────────────┐       ┌────────────────────────┐
│         Users          │       │        Reports         │
├────────────────────────┤       ├────────────────────────┤
│ id (PK)                │       │ id (PK)                │
│ username               │       │ type                   │
│ email                  │◄──────┤ item_name              │
│ password               │       │ description            │
│ created_at             │       │ category               │
└────────────────────────┘       │ location               │
                                 │ date                   │
                                 │ image_url              │
                                 │ user_id (FK)           │
                                 │ status                 │
                                 │ created_at             │
                                 └────────────────────────┘
```

### Users Table
- id (VARCHAR): Primary key
- username (VARCHAR): Unique username
- email (VARCHAR): Unique email
- password (VARCHAR): Hashed password
- created_at (TIMESTAMP): Account creation timestamp

### Reports Table
- id (VARCHAR): Primary key
- type (ENUM): 'lost' or 'found'
- item_name (VARCHAR): Name of the item
- description (TEXT): Detailed description
- category (VARCHAR): Item category
- location (VARCHAR): Where the item was lost/found
- date (DATE): When the item was lost/found
- image_url (VARCHAR): Optional image of the item
- user_id (VARCHAR): Foreign key to users table
- status (ENUM): 'active', 'resolved', or 'flagged'
- created_at (TIMESTAMP): Report creation timestamp

## Matching Algorithm

The portal uses an intelligent matching algorithm to connect lost and found items:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Item Attributes├────►│ Similarity Score├────►│ Ranked Matches  │
│                 │     │  Calculation   │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

The matching algorithm considers:
- Item name similarity (highest weight)
- Category match
- Location proximity
- Description keyword matching
- Date proximity

## Technology Stack

- **Frontend**: HTML, CSS (Tailwind CSS), JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT, Express Session
- **File Storage**: Local file system with Multer
- **Development Tools**: Nodemon for auto-reload

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd lost-and-found-portal
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   SESSION_SECRET=your_session_secret
   JWT_SECRET=your_jwt_secret
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123

   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=lost_and_found
   ```

4. Initialize the database:
   ```
   npm run init-db
   ```

5. Start the application:
   ```
   npm start
   ```

6. For development with auto-reload:
   ```
   npm run dev
   ```

7. Access the application at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Reports
- `GET /reports` - Get all reports
- `GET /reports/:id` - Get report by ID
- `GET /reports/type/:type` - Get reports by type (lost or found)
- `GET /reports/user` - Get reports by current user
- `GET /reports/:id/matches` - Get potential matches for a report
- `POST /reports` - Create a new report
- `PUT /reports/:id` - Update a report
- `PUT /reports/:id/resolve` - Mark a report as resolved
- `DELETE /reports/:id` - Delete a report

### Admin
- `POST /admin/login` - Admin login
- `GET /admin/reports` - Get all reports (admin)
- `GET /admin/users` - Get all users (admin)
- `GET /admin/stats` - Get dashboard stats (admin)
- `PUT /admin/reports/:id/flag` - Flag a report (admin)
- `PUT /admin/reports/:id/resolve` - Resolve a report (admin)
- `DELETE /admin/reports/:id` - Delete a report (admin)

## Future Enhancements

1. **Mobile Application**: Develop native mobile apps for iOS and Android
2. **Advanced Search**: Implement full-text search and geolocation-based search
3. **AI-Powered Image Recognition**: Use machine learning to identify items from images
4. **Social Media Integration**: Share lost/found items on social platforms
5. **Real-time Chat**: Enable direct communication between users
6. **Email Notifications**: Send alerts for potential matches
7. **Public API**: Provide API access for third-party integrations

## License

ISC
