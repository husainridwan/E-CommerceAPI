import express from "express";
import adminController from "../controllers/admin.js";

const router = express.Router();

// /admin/add=> GET
router.get('/add',adminController.getAddProduct);

// /admin/add => POST
router.post('/add', adminController.postAddProduct);

router.get('/products', adminController.getProducts);

const adminRoutes = router;
export default adminRoutes;