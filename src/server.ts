import express, { Request, Response } from 'express';
import db from 'db';
import { loginRoutes } from './routes/login';
import path from 'path';
import { sequelize } from "./database/sequelize";


const PORT = process.env.PORT || 3000;

const app = express();

const bodyParser = require('body-parser');

console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));
app.use(loginRoutes);

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('home page')
})

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../', 'public', 'views', '404-page.html'));
})

sequelize.sync({ force: true })
    .then(result => {
        console.log(result)
        app.listen(PORT, () => {
            console.log(`app runnin on port ${PORT}`)
            // db.runMigrations()
        })
    })
    .catch(error => {
        console.log(error);
    });

