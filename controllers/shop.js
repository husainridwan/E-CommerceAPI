import Product from '../models/product.js';
import Cart from '../models/cart.js';

const shopController = {
  getProducts: (req, res, next) => {
    Product.findAll()
      .then(products => {
        res.render('shop/product-list', {
          prods: products,
          pageTitle: 'Shop',
          path: '/products',
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  getProduct: (req, res, next) => {
    const prodId = req.params.productId;
    Product.findAll({where: {id: prodId} })
      .then(products => {
        res.render('shop/product-detail', {
          product: products[0],
          pageTitle: products[0].title,
          path: '/products',
        });
      })
      .catch(err => console.log(err));
    },
  //   Product.findById(prodId)
  //     .then(product => {
  //       res.render('shop/product-detail', {
  //         product: product,
  //         pageTitle: product.title,
  //         path: '/products',
  //       });
  //     })
  //     .catch(err => console.log(err));
  // },

  getIndex: (req, res, next) => {
    Product.findAll()
      .then(products => {
        res.render('shop/index', {
          prods: products,
          pageTitle: 'Shop',
          path: '/',
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  getCart: (req, res, next) => {
    Cart.getCart(cart => {
      Product.findAll()
        .then(products => {
          const cartProducts = [];
          for (let product of products) {
            const cartProductData = cart.products.find(prod => prod.id === product.id);
            if (cartProductData) {
              cartProducts.push({ productData: product, qty: cartProductData.qty });
            }
          }
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: cartProducts
          });
        })
        .catch(err => console.log(err));
    })
  },

  postCart: (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId) 
      .then(product => {
        Cart.addProduct(prodId, product.price);
        res.redirect('/cart');
      })
      .catch(err => console.log(err));
  },

  postCartDeleteProduct: (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId) 
      .then(product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
      })
      .catch(err => console.log(err));
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