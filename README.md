# HSR Backend

Backend server application for the HSR Technology website, providing user authentication and contact form handling.

## Project Structure

```

HSR\_Backend/
├── Config/
│   └── db.js                 \# Database connection configuration
├── Controllers/
│   ├── contact.controller.js \# Logic for handling contact form submissions
│   └── user.controller.js    \# Logic for user registration and login
├── Middleware/              \# (To Be Created)
│   └── authMiddleware.js     \# Middleware to protect routes (JWT verification)
├── Models/
│   └── user.model.js         \# Mongoose schema for User
├── Routers/
│   ├── contact.router.js     \# Routes for contact form API
│   └── user.router.js        \# Routes for user authentication API
├── .env                      \# Environment variables (needs to be created)
├── .gitignore
├── package.json
└── server.js                 \# Main application entry point

````

## Technologies Used

* **Node.js**: JavaScript runtime environment
* **Express.js**: Web application framework for Node.js
* **MongoDB**: NoSQL database for storing user data
* **Mongoose**: ODM (Object Data Modeler) for MongoDB
* **JSON Web Tokens (JWT)**: For generating secure authentication tokens (`jsonwebtoken` library)
* **bcrypt**: For secure password hashing
* **Nodemailer**: For sending emails via the contact form
* **dotenv**: For managing environment variables
* **cors**: For enabling Cross-Origin Resource Sharing to allow requests from the frontend
* **nodemon**: For automatic server restarts during development

## Setup

1.  Clone the repository:
    ```sh
    git clone [https://github.com/Subhadip1001/HSR_Backend.git](https://github.com/Subhadip1001/HSR_Backend.git)
    cd HSR_Backend
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Create a `.env` file in the root directory and configure the environment variables. See the **Environment Variables** section below for details. Example:
    ```env
    PORT=4500
    MONGODB_URI=mongodb://localhost:27017/HRS_Tech
    JWT_SECRET=your_very_strong_secret_key_here
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_gmail_app_password
    ```

## Running the Application

Start the development server (using nodemon for auto-restarts):
```sh
npm start
````

The server will run on the port specified in your `.env` file (defaulting to 4500). Check the console logs for confirmation of database connection and the server URL (e.g., `http://localhost:4500`).

## API Routes

### Authentication (`/api/user`)

  * `POST /register`: **(Public)** Registers a new user.
      * Request Body: `{ "email": "...", "password": "...", "confirmPassword": "..." }`
      * Response: `{ "message": "...", "user": { "email": "...", "id": "..." }, "token": "..." }`
  * `POST /login`: **(Public)** Logs in an existing user.
      * Request Body: `{ "email": "...", "password": "..." }`
      * Response: `{ "message": "...", "user": { "email": "...", "id": "..." }, "token": "..." }`

### Contact Form (`/api/contact`)

  * `POST /`: **(Protected - Requires Auth)** Submits the contact form. Sends an email to the configured address.
      * Request Body: `{ "name": "...", "email": "...", "subject": "...", "message": "..." }`
      * Requires: Valid JWT in `Authorization: Bearer <token>` header.
      * Response: `{ "message": "Message sent successfully!" }` or error message.

### Future Protected Routes (To Be Implemented)

  * Content API endpoints (e.g., `/api/articles`, `/api/careers`).
  * Additional Form submission endpoints (e.g., `/api/forms/demo-request`).
  * These routes will require a valid JWT token in the `Authorization: Bearer <token>` header, verified by the `authMiddleware`.

## Security

  * **Password Hashing**: User passwords are securely hashed using `bcrypt` before being stored in the database.
  * **Authentication**: User sessions are managed using JSON Web Tokens (JWTs), signed with a secret key stored in the `.env` file.
  * **Authorization (Route Protection)**:
      * Public routes (`/api/user/login`, `/api/user/register`) are accessible without authentication.
      * **(To Be Implemented)** Sensitive routes (like contact form submission, content management, etc.) *must* be protected using an authentication middleware (`authMiddleware.js`). This middleware should verify the JWT sent in the `Authorization` header before allowing access to the route controller. The `/api/contact` route needs this protection added.

## Environment Variables

These variables must be set in a `.env` file in the project root.

| Variable      | Description                                                    | Example                                  | Required |
|---------------|----------------------------------------------------------------|------------------------------------------|----------|
| `PORT`        | Port number the server will listen on                          | `4500`                                   | Optional (Defaults to 3000) |
| `MONGODB_URI` | Connection string for your MongoDB database                    | `mongodb://localhost:27017/HRS_Tech`     | **Yes** |
| `JWT_SECRET`  | Secret key used for signing and verifying JWTs (make it long\!) | `MakeThisAVeryLongAndRandomSecretString` | **Yes** |
| `EMAIL_USER`  | Username/email address for the email account sending emails    | `your_email@gmail.com`                   | **Yes** |
| `EMAIL_PASS`  | App-specific password for the email account (use Gmail App Password if applicable) | `abcd efgh ijkl mnop`                    | **Yes** |

## License

MIT

```