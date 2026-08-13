import express from 'express'
import { registerUser, updateToken, testNotification } from '../controllers/firebase.controller.js'

const router = express.Router();

router.post('/register',registerUser);

router.patch('/updatetoken/:userId',updateToken);

router.post('/test',testNotification)

export default router;