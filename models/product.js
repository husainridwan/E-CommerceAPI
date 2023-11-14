import db from '../util/database.js';
import Cart from './cart.js';

class Product{
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
       return db.execute(
        'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
        [this.title, this.price, this.imageUrl, this.description]
       );
      }
    
    static deleteById(id){
        
    }  

    static fetchAll() {
      return db.execute('SELECT * FROM products');
    }

    static findById(id, cb) {
      return db.execute('SELECT * FROM products WHERE product.id == ?', [id])  
    }
}

export default Product;