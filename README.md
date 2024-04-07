# Sports Management System

Welcome to the Sports Management System project repository! This project is designed to provide a comprehensive sports management solution using React for the frontend and PHP for the backend.

## Technologies Used and Relevant Skills

### Frontend

- **React**: Developed the frontend using React to create reusable components, manage state efficiently with hooks, and implement routing using React Router.
- **CSS**: Designed and styled the user interface using CSS, focusing on responsive design and incorporating CSS animations for enhanced user experience.

### Backend

- **PHP**: Implemented server-side logic and RESTful API endpoints using PHP for backend functionality and database interactions.
- **MySQL**: Utilized MySQL for database management, including designing schemas, writing SQL queries, and implementing CRUD operations.

## Getting Started

When you first open this project, you will find a login screen. Access to any functionality requires authentication. New users must sign up before they can log in and access the system.

### User Roles

There are two types of users:

- **Normal User**: After signing up, users have basic access to view past events and player details.
- **Operator**: Users with special privileges can edit data, add new players, and manage live events.

### Validators

- Registration forms include validators to ensure accurate and complete data entry.
- Error messages guide users to correct any input issues before submission.

## Features

### Past Events

Users can view details of past events in which the organization (IIITG) participated. Navigate through events directly from the homepage or the events section. Player details can be sorted by roll number, sport, or player name. Search by roll number or player name is also available.

### Sports Section

Enjoy interactive animations and detailed information about various sports. Learn about event participation history for each sport. The footer provides convenient navigation between related events.

### Registration

Users can register for ongoing live events. Registration details are stored securely in the database.

### Operator Privileges

Operators have the ability to:
- Edit player details
- Add new players
- Manage live events (remove events from registration)

## ER Diagram

The project's database structure is illustrated in the ER diagram. Key tables include `player`, `sport`, and `tournament`, with connecting tables (`plays`, `included`, `participated`) maintaining relationships.

## Thank You!

Thank you for exploring this Sports Management System project. For any inquiries or feedback, please feel free to reach out. Enjoy using the system!

---
