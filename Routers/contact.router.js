import express from 'express';
import { sendContactEmail } from '../Controllers/contact.controller.js';

const router = express.Router();

router.post('/', sendContactEmail);

export default router;