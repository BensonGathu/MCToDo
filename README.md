# TaskIT - Task Management Application

TaskIT is a task management application built with Node.js, TypeScript, Vite, and React. It allows users to create, manage, and track their tasks.

## Features

- User registration and login with JWT authentication.
- Task list displaying task title, description, status, and creation date.
- Ability to add new tasks.
- Ability to mark tasks as completed.
- Task details page with the option to edit and delete tasks.
- Clean and responsive design for desktop and mobile devices.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: [Download and Install Node.js](https://nodejs.org/).
- MongoDB: [Download and Install MongoDB](https://www.mongodb.com/try/download/community).

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/BensonGathu/MCToDo.git

2. Navigate Project folder

   ```bash
   cd MCToDo

3. Navigate to TodoApp
    cd TodoApp
    npm install

4. Navigate to TodoApis
    cd TodoApis
    npm install

5. Create a .env file in the TodoApis directory and provide the following environment variables:
    PORT=4000
    JWT_TOKEN=your-secret-key
    JWT_EXPIRES_IN=15d
    DATABASE_URL=your-mongodb-connection-string


6. Start both Server

    cd TodoApis
    npm run start

    cd TodoApp
    npm run dev


The application should now be running on http://localhost:4000.
