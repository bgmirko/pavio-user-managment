import express from 'express';
import path from 'path';
import { sequelize } from "./database/sequelize";
import { ErrorController } from 'controllers/errorController';
import session from 'express-session';
import { authRoutes } from './routes/auth';
import { likesRoutes } from './routes/likes';
import csrf from 'csurf';
import flash from 'connect-flash';
import cookieParser from "cookie-parser";
import { setLocales } from 'middleware/setLocales';
import { authenticateToken } from 'middleware/authenticateToken';
import Session from '../src/models/sessionModel'

const app = express();

const PORT = process.env.PORT || 3000;

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../', 'public', 'views'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false }));
app.use(csrfProtection);
app.use(flash());
app.use(cookieParser());

app.use(setLocales)

app.use(authenticateToken);
app.get('/', (req, res) => { res.redirect('/most-liked'); })
app.use(authRoutes);
app.use(likesRoutes);
app.use(ErrorController.get404);

sequelize.sync()
    .then(async result => {
        app.listen(PORT, () => {
            console.log(`app running on port ${PORT}`)
        })
        // clear table data on server restart
        await Session.destroy({ truncate: true })
    })
    .catch(error => {
        console.log(error);
    });

