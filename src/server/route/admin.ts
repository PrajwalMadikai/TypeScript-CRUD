import express from 'express';
import adminController from '../controller/adminController';
const router = express.Router();
 
 router.get('/login',adminController.getLogin)
 router.post('/login',adminController.LoginPost)

router.get('/dashboard',adminController.dashboard)
 

export default router;

