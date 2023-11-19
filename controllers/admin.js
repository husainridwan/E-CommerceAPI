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
      
      Product.create({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
      }).then(result => {
        console.log('Created Product');
      }).catch(err => {
        console.log(err);
      })
    }, 

    getEditProduct: (req, res, next) => {
      const editMode = req.query.edit;
      if (!editMode) {
        return res.redirect('/');
      }
      const prodId = req.params.productId;
      Product.findByPk(prodId)
        .then(product => {
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
        .catch(err => console.log(err));
    },

    postEditProduct: (req, res, next) => {
      const prodId = req.body.productId;
      const updatedTitle = req.body.title;
      const updatedImageUrl = req.body.imageUrl;
      const updatedPrice = req.body.price;
      const updatedDesc = req.body.description;

      Product.findByPk(prodId) 
        .then(product => {
          product.title = updatedTitle;
          product.imageUrl = updatedImageUrl; 
          product.price = updatedPrice; 
          product.description = updatedDesc;

          return product.save();
          })
          .then(result => {
            console.log('Updated Product');
            res.redirect('/admin/products');
          })
          .catch(err => {
            console.log(err);
          });
    },

    postDeleteProduct: (req, res, next) => {
      const prodId = req.body.productId;
      Product.findByPk(prodId)
        .then(product => {
          return product.destroy();
        })
        .then(result => {
          console.log('Deleted Product');
          res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
    }, 

    getProducts: (req, res, next) => {
        Product.findAll()
          .then(products => {
          res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/',
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
};

export default adminController;
