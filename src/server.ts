import express from 'express';
import { authRoutes } from './routes/auth';
import path from 'path';
import { sequelize } from "./database/sequelize";
import { ErrorController } from 'controllers/errorController';
import session from 'express-session';

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../', 'public', 'views'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false }))

app.get('/', (req, res) => {
    res.send('home page')
})
app.use(authRoutes);
app.use(ErrorController.get404);

sequelize.sync()
    .then(result => {
        app.listen(PORT, () => {
            console.log(`app running on port ${PORT}`)
        })
    })
    .catch(error => {
        console.log(error);
    });

