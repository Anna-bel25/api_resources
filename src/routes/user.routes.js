import { Router } from "express";
import { loginUser, newUser,getUsers,updateUsers,deleteusers } from "../controllers/user.js";

const router = Router();

router.post('/users', newUser);
router.post('/login', loginUser);
router.get('/datausers',getUsers);
router.post('/updateusers',updateUsers);
router.delete('/deleteusers/:id',deleteusers);

export default router;
