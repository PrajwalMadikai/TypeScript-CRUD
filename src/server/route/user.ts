import express from 'express';
import userController from '../controller/userController';
const router = express.Router();
 
router.get('/', userController.logGet);
router.post('/', userController.logPost);

router.get('/signup',userController.signupGet)
router.post('/signup',userController.signupPost)

router.get('/student',userController.studentGet)

router.get('/logout',userController.logOut)

export default router;
