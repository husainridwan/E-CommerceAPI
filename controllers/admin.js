import Product from '../models/product.js';

const adminController = {
    getAddProduct: (req, res, next) => {
        res.render('admin/edit', {
          pageTitle: 'Add Product',
          path: '/admin/edit',
          editing: false
        })
    },
    
    postAddProduct: (req, res, next) => {
      const title = req.body.title;
      const imageUrl = req.body.imageUrl;
      const price = req.body.price;
      const description = req.body.description;
      
      const product = new Product(title, description, price, imageUrl);
      product.save();
      res.redirect('/');
    }, 

    getEditProduct: (req, res, next) => {
      const editMode = req.query.editMode;
      if (!editMode) {
        return res.redirect('/');
      }
      const prodId = req.params.productId;
      Product.findById(prodId, product => {
        if (!product) {
          return res.redirect('/');
        }
      
        res.render('admin/edit', {
          pageTitle: 'Edit Product',
          path: '/admin/add',
          editing: editMode,
          product: product
        })
      })
  },

    getProducts: (req, res, next) => {
        Product.fetchAll(products => {
          res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            });
        });
    }
};

export default adminController;
