# Task Management App

A full‑stack task management application that helps users organize and manage tasks with a clean UI and robust backend.

## 🔍 Overview

This project is a full‑stack web application built using **React (frontend)**, **Laravel (backend)**, and **MySQL** for database management. It allows users to create, update, and manage tasks — a foundational tool for productivity and project organization.

## 🚀 Live Demo

👉 https://task-management-henna-five.vercel.app  (if deployed)

## 🛠️ Features

- User authentication and login (handled by Laravel & frontend)
- Create, update, delete, and view tasks
- Tasks stored and managed in a MySQL database
- RESTful APIs connecting frontend and backend
- Clean and responsive frontend UI

## 📦 Technologies Used

- **React** – Frontend user interface  
- **Laravel** – Backend API and business logic  
- **MySQL** – Database storage  
- **Vite** – Fast frontend tooling  
- **Tailwind CSS** – Styling and layout  
- **JavaScript & PHP** – Core development languages

## 💻 Project Structure

- /client – React frontend source
- /server – Laravel backend API
- README.md – Documentation


## 🔧 Setup Instructions

1. Clone the repository
   ```bash
   git clone https://github.com/JekenMaharjan/task-management.git
   ```
   
3. Backend (Laravel)
   - Go inside the backend folder
     ```bash
     cd server
     ```
     
   - Install dependencies
     ```bash
     composer install
     ```
     
   - Set up environment variables
     ```bash
     cp .env.example .env
     ```
     Update database credentials (DB_DATABASE, DB_USERNAME, DB_PASSWORD)
     
   - Run migrations
     ```bash
     php artisan migrate
     ```
     
   - Start the backend server
     ```bash
     php artisan serve
     ```
     
5. Frontend (React)
   - Go to the client folder
     ```bash
     cd client
     ```
     
   - Install dependencies
     ```bash
     npm install
     ```
     
   - Start the development server
     ```bash
     npm run dev
     ```

## 📌 How to Use

1. Register or log in to the app.
2. Create new tasks with titles and optional details.
3. Edit or delete tasks as needed.
4. View your list of tasks in a responsive UI.

## 🛠️ Future Enhancements

- Add task due dates and priority levels
- User profile management
- Task filtering and search
- Real‑time updates with WebSockets



