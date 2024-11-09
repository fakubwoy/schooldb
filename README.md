# Running the SchoolDB Application

Follow these instructions to run the SchoolDB application locally.

## Prerequisites

Make sure you have the following installed:
- **Node.js** (with npm)
- **MySQL**
- **Git**

## Step 1: Clone the Repository

```bash
git clone https://github.com/fakubwoy/schooldb.git
cd schooldb
```
## Step 2: Setup the Backend
Navigate to the backend directory:
```bash
cd backend
```
Install the backend dependencies:
```bash
npm install
```
Create and set up the MySQL database:

1. Open your MySQL client and run the following SQL commands:

```sql
CREATE DATABASE school_db;
USE school_db;
-- Add all CREATE TABLE statements here (Students, Teachers, Courses, Enrollments)
```
2. Configure the MySQL connection by creating a .env file in the backend folder with the following content:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_db
```
3. Start the backend server:

```bash
npm start
```
The backend should now be running at http://localhost:5000.

## Step 3: Setup the Frontend

Navigate to the frontend directory:
```bash
cd ../frontend
```
Install the frontend dependencies:
```bash
npm install
```
Start the frontend development server:
```bash
npm run dev
```
The frontend should now be running at http://localhost:3000.

## Step 4: Run Both Backend and Frontend Concurrently

Install concurrently to run both the backend and frontend servers at the same time:
```bash
npm install concurrently --save-dev
```
Modify the package.json file (in the root directory) to include the following scripts:
```json
"scripts": {
    "dev": "concurrently \"npm run dev --prefix frontend\" \"npm start --prefix backend\""
}
```
Now, run both servers concurrently with the following command:
```bash
npm run dev
This will run the frontend on http://localhost:3000 and the backend on http://localhost:5000.
```
