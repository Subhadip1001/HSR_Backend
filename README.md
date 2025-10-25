# HRS Backend

Backend server application for HRS Tech.

## Project Structure

```
├── Config/
│   └── db.js          # Database configuration
├── Controllers/
│   ├── contact.controller.js
│   └── user.controller.js
├── Models/
│   └── user.model.js
├── Routers/
│   ├── contact.router.js
│   └── user.router.js
├── .env               # Environment variables
├── .gitignore
├── package.json
└── server.js          # Main application entry
```

## Setup

1. Clone the repository:
```sh
git clone https://github.com/Subhadip1001/HSR_Backend.git
cd HSR_Backend
```
2. Install dependencies:
```sh
npm install
```
3. Configure environment variables in `.env`:
```env
PORT=4500
MONGODB_URI=mongodb://localhost:27017/HRS_Tech
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

## Running the Application

Start the server:
```sh
npm start
```

The server will run on `http://localhost:4500`

## Features

- User authentication and authorization
- Contact management
- Email functionality
- MongoDB database integration
- JWT token-based security

## API Routes

- POST: `/api/user/register` - Register a new user
- POST: `/api/user/login` - Login existing user
- POST: `/api/contact/ ` - Send email to the predefined mail

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)
- Nodemailer

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port number |
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT |
| EMAIL_USER | Email service username |
| EMAIL_PASS | Email service password |

## License

MIT