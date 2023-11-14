import express from "express";
import bodyParser from "body-parser";
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import path from "path";
import rootDir from "./util/path.js";
import { getErrorPage } from "./controllers/error.js";
import db from "./util/database.js";



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

db.execute('SELECT * FROM products')
  .then(result => {
        console.log(result[0], result[1], result[2])})
  .catch(err => {
        console.log(err);
    });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(getErrorPage);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})
