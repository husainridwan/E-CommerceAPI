import Product from '../models/product.js';

const shopController = {
  getProducts: (req, res, next) => {
    Product.fetchAll((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'Shop',
        path: '/products',
      });
    });
  },

  getProduct: (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, (product) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
      });
    });
  },

  getIndex: (req, res, next) => {
    Product.fetchAll((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
      });
    });
  },

  getCart: (req, res, next) => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart'
    });
  },

  postCart: (req, res, next) => {
    const prodId = req.body.productId;
    res.redirect('/cart');
  },

  getOrders: (req, res, next) => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders'
    });
  },

  getCheckout: (req, res, next) => {
    res.render('shop/checkout', {
      path: '/checkout',
      pageTitle: 'Checkout'
    });
  }
};

export default shopController;