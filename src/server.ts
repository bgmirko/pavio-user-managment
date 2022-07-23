import express, { Request, Response } from 'express';
import { authRoutes } from './routes/auth';
import path from 'path';
import { sequelize } from "./database/sequelize";


const app = express();

const PORT = process.env.PORT || 3000;

console.log(__dirname);

app.set('view engine', 'ejs');
// were to find ejs templates
app.set('views', path.join(__dirname, '../', 'public', 'views'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(authRoutes);

app.get('/', (req, res) => {
    res.send('home page')
})

app.use((req, res) => {
    res.status(404).render('404', { pageTitle: "Page Not Found", path: '/404' });
})

sequelize.sync()
    .then(result => {
        app.listen(PORT, () => {
            console.log(`app running on port ${PORT}`)
        })
    })
    .catch(error => {
        console.log(error);
    });

