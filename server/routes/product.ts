import { Router } from "express";
import { decodeUserFromToken, checkAuth } from "../middleware/auth";
import productController from "../controllers/product";

const router = Router();

router.use(decodeUserFromToken);

router.get("/", checkAuth, productController.getProducts);
router.get("/:id", checkAuth, productController.getProduct);
router.post("/", checkAuth, productController.createProduct);
router.put("/:id", checkAuth, productController.updateProduct);
router.delete("/:id", checkAuth, productController.deleteProduct);

export default router;
