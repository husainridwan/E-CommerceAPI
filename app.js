import express from "express";
import bodyParser from "body-parser";
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import path from "path";
import rootDir from "./util/path.js";
import { getErrorPage } from "./controllers/error.js";
import sequelize from "./util/database.js";



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(getErrorPage);

const port = 3000;

sequelize.sync()
  .then(result => {
        // console.log(result);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}.`);
        })
    })
  .catch(err => {
        console.log(err);
    });
