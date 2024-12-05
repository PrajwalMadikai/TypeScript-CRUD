import express from 'express';
import adminController from '../controller/adminController';
const router = express.Router();
 


 router.get('/login',adminController.getLogin)
 router.post('/login',adminController.LoginPost)

router.get('/dashboard',adminController.dashboard)

router.post('/edit/:id',adminController.editUser)

router.delete('/delete/:id',adminController.deleteUser)
 

export default router;

