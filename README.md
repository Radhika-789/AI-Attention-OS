#  AI Attention OS

AI Attention OS is a productivity-focused web application built using **React (Frontend)** and **FastAPI (Backend)**.  
It combines task management, Pomodoro focus rooms, intelligent notifications, and email reminders into a single productivity operating system.

---

## Features

###  Task Management
- Create and manage daily tasks
- Track completion status
- View recent tasks (limited view)
- Priority-based task system

### Pomodoro Focus Rooms
- Create shared Pomodoro rooms
- Join existing rooms using room code
- Real-time synchronized timer
- Manual start control
- Shared participants tracking

###  Notification System
-  Morning schedule summary
-  Guilt reminders for incomplete tasks
- Dashboard in-app notifications
- Optional email notifications

###  Email Integration
- Daily schedule email
- Pending task reminders
- SMTP-based email service
- HTML email support

---

##  Tech Stack

### Frontend
- React.js
- React Router
- Fetch API

### Backend
- FastAPI
- APScheduler (for scheduled jobs)
- SMTP (Email service)
- In-memory room state (can upgrade to Redis)

##  System Architecture

AI Attention OS follows a **Client–Server Architecture**.

### Client (Frontend – React)
The client handles:
- User interface rendering
- User interactions
- API requests to backend
- Displaying notifications
- Pomodoro room UI updates

The frontend communicates with the backend using REST APIs over HTTP.

---

###  Server (Backend – FastAPI)

The server is responsible for:
- Handling API requests
- Managing task data
- Running Pomodoro room logic
- Scheduling notifications
- Sending emails
- Executing business logic via service layer

The backend exposes REST endpoints that the frontend consumes.

---

 Example Request Flow (Notifications)

1. Scheduler triggers at 8 AM
2. NotificationService fetches today’s tasks
3. EmailService sends summary email
4. User receives schedule reminder

---
## Application Flow

1. User logs in
2. User creates tasks
3. Tasks stored and prioritized
4. Morning scheduler triggers daily summary
5. Evening scheduler checks incomplete tasks
6. Pomodoro rooms sync users via backend state

---
## Future Enhancements

- WebSocket-based real-time sync
- Redis for distributed room management
- Push notifications (Firebase)
- AI-generated productivity insights
- Weekly performance analytics dashboard
- Streak tracking & gamification system


