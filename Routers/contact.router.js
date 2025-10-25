import express from 'express';
import { sendContactEmail } from '../Controllers/contact.controller.js';
import protect from '../middleware/authMiddleware.js'; // Import the middleware

const router = express.Router();

// Apply the protect middleware BEFORE the controller
router.post('/', protect, sendContactEmail); 

export default router;