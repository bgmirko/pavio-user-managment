import express from 'express';
import path from 'path';
import { ErrorController } from 'controllers/errorController';
import session from 'express-session';
import { authRoutes } from './routes/auth';
import { likesRoutes } from './routes/likes';
import flash from 'connect-flash';
import cookieParser from "cookie-parser";
import { setLocales } from 'middleware/setLocales';
import { authenticateToken } from 'middleware/authenticateToken';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../', 'public', 'views'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false }));
app.use(flash());
app.use(cookieParser());

app.use(setLocales)

app.use(authenticateToken);
app.get('/', (req, res) => { res.redirect('/most-liked'); })
app.use(authRoutes);
app.use(likesRoutes);
app.use(ErrorController.get404);

export { app }