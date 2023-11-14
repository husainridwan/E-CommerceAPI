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
      
      const product = new Product(null, title, description, price, imageUrl);
      product.save()
        .then(() => {
          res.redirect('/');
        })
        .catch(err => console.log(err));
    }, 

    getEditProduct: (req, res, next) => {
      const editMode = req.query.edit;
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
          path: '/admin/edit',
          editing: editMode,
          product: product
        })
      })
    },

    postEditProduct: (req, res, next) => {
      const prodId = req.body.productId;
      const updatedTitle = req.body.title;
      const updatedImageUrl = req.body.imageUrl;
      const updatedPrice = req.body.price;
      const updatedDesc = req.body.description;

      Product.findById(prodId, product => {
        if (!product) {
          return res.redirect('/admin/products');
        }
        product.title = updatedTitle;
        product.imageUrl = updatedImageUrl; 
        product.price = updatedPrice; 
        product.description = updatedDesc;

        const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDesc);
        return updatedProduct.save()
          .then(result => {
            console.log('Updated Product!');
            res.redirect('/admin/products');
          })
          .catch(err => {
            console.log(err);
            res.redirect('/admin/products');
          });
      });
    },

    postDeleteProduct: (req, res, next) => {
      const prodId = req.body.productId;
      Product.deleteById(prodId);
        res.redirect('/admin/products');
    }, 

    getProducts: (req, res, next) => {
        Product.fetchAll(products => {
          res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/',
            });
        });
    }
};

export default adminController;
