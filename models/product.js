import fs from 'fs';
import path from 'path';
import Cart from './cart.js';

const p = path.join(path.dirname(process.argv[1]), 'data', 'products.json');
const getProductFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        }
        cb(JSON.parse(fileContent));
    });
};
class Product{
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        return new Promise((resolve, reject) => {
          getProductFromFile(products => {
            if (this.id) {
              const existingProductIndex = products.findIndex(prod => prod.id === this.id);
              const updatedProducts = [...products];
              updatedProducts[existingProductIndex] = this;
              fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (err) {
                  console.log(err);
                  reject(err);
                } else {
                  resolve(this);
                }
              });
            } else {
                this.id = Math.random().toString();
                getProductFromFile(products => {
                  products.push(this);
                  fs.writeFile(p, JSON.stringify(products), err => {
                    if (err) {
                      console.log(err);
                      reject(err);
                    } else {
                      resolve(this);
                    }
                  });
              });
            }
          });
        });
      }
    
    static deleteById(id){
        getProductFromFile(products => {
          const updatedProducts = products.filter(prod => prod.id !== id);
          const product = products.find(prod => prod.id === id);
          fs.writeFile(p, JSON.stringify(updatedProducts), err => {
            if (!err) {
              Cart.deleteProduct(id, product.price);
            }
          })
        })
    }  

    static fetchAll(cb) {
        getProductFromFile(cb);       
    }

    static findById(id, cb) {
        getProductFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}

export default Product;