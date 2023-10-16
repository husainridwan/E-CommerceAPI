import Product from '../models/product.js';

const adminController = {
    getAddProduct: (req, res, next) => {
        res.render('admin/add', {
          pageTitle: 'Add Product',
          path: '/admin/add',
          formsCSS: true,
          productCSS: true,
          activeAddProduct: true
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
