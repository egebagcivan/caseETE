import { Router } from "express";
import { decodeUserFromToken, checkAuth } from "../middleware/auth";
import userController from "../controllers/user";

const router = Router();

router.use(decodeUserFromToken);
router.get("/", checkAuth, userController.getUsers);

export default router;
