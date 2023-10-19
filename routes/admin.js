import express from "express";
import adminController from "../controllers/admin.js";

const router = express.Router();

// /admin/add=> GET
router.get('/add',adminController.getAddProduct);

// /admin/add => POST
router.post('/add', adminController.postAddProduct);

// /admin/products => GET
router.get('/edit/:productId', adminController.getEditProduct);

router.get('/products', adminController.getProducts);

const adminRoutes = router;
export default adminRoutes;