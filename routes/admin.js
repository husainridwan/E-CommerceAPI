import express from "express";
import adminController from "../controllers/admin.js";

const router = express.Router();

// /admin/add=> GET
router.get('/add',adminController.getAddProduct);

// /admin/add => POST
router.post('/add', adminController.postAddProduct);

// /admin/products => GET
router.get('/edit/:productId', adminController.getEditProduct);

// /admin/products => POST
router.post('/edit', adminController.postEditProduct);

// /admin/delete => POST
router.post('/delete', adminController.postDeleteProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

const adminRoutes = router;
export default adminRoutes;