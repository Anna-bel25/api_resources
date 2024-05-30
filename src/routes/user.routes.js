import { Router } from "express";
import { loginUser, newUser } from "../controllers/user.js";

const router = Router();

router.post('/users', newUser);
router.post('/login', loginUser);

export default router;
