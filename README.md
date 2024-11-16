
# Contact Management System

## Description

The **Contact Management System** is a feature of a CRM application that allows users to manage their contact list efficiently. It supports adding, viewing, editing, and deleting contacts while ensuring data validation and responsiveness. This system is built using the **MERN stack**:
- **Frontend**: React with Material UI.
- **Backend**: Node.js with Express.js for RESTful API services.
- **Database**: MongoDB for scalable and flexible data storage.

---

## Features

1. **CRUD Operations**: Add, View, Update, and Delete contacts.
2. **Sorting**: Allows sorting by `First Name`, `Last Name`, `Email`, etc.
3. **Pagination**: Easily navigate through large datasets.
4. **Validation**: Validates required fields and ensures proper formatting of email.
5. **Responsive Design**: Optimized for mobile and desktop devices.

---

## Setup Instructions

### Prerequisites
- **Node.js**: Version 16 or higher.
- **MongoDB**: A local or cloud MongoDB instance.
- **NPM**: Comes pre-installed with Node.js.

---

### Backend Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd contact-management-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
   PORT=5000
   ```

4. Start the backend server:
   ```
   npm run dev
   ```
   The server will start at `http://localhost:5000`.

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd ../contact-management-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React app:
   ```
   npm start
   ```
   The frontend will run at `http://localhost:3000`.

---

## Database Schema

- **Collection Name**: `contacts`
- **Schema**:
  ```
  {
      "firstName": "String",
      "lastName": "String",
      "email": "String (unique)",
      "phoneNumber": "String(unique)",
      "company": "String",
      "jobTitle": "String"
  }
  ```

---

## How It Works

### Frontend:
- **ContactForm**: Handles adding and editing contacts.
- **ContactTable**: Displays contacts with sorting and pagination features.
- **Axios**: Used for communication with the backend APIs.

### Backend:
- **Express.js** handles REST API routes:
  - `POST /contacts`: Adds a contact.
  - `GET /contacts`: Retrieves all contacts with pagination and sorting.
  - `PUT /contacts/:id`: Updates a specific contact.
  - `DELETE /contacts/:id`: Deletes a contact.

### Database:
- MongoDB stores contact details, with unique constraints on the email field to prevent duplicates.

---

## Challenges and Solutions

1. **Form Validation**:
   - **Problem**: Ensuring proper input validation.
   - **Solution**: Used `express-validator` for backend checks and Material UI validation for frontend input fields.

2. **Pagination and Sorting**:
   - **Problem**: Efficiently displaying large datasets.
   - **Solution**: Leveraged Mongoose’s `skip`, `limit`, and `sort` methods.

3. **Responsive Design**:
   - **Problem**: Adapting the app for different screen sizes.
   - **Solution**: Used Material UI’s Grid system to ensure a clean layout.

4. **Pre-Filled Edit Form**:
   - **Problem**: Pre-populating fields for editing.
   - **Solution**: React’s `useEffect` dynamically fills the form when `initialData` is provided.

---

## Major Technical Decisions

1. **Material UI**:
   - Chosen for its polished, responsive components.
2. **Axios**:
   - Used for its simplicity and flexibility in handling API requests.
3. **MongoDB**:
   - Ideal for storing contact details due to its schema flexibility.

---


## Conclusion

This **Contact Management System** is a fully functional MERN stack application with responsive design, validation, and efficient data handling. It is modular and can easily be extended to include additional features.
