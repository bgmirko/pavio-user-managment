import express, { Request, Response } from 'express';
import { loginRoutes } from './routes/login';
import path from 'path';
import { sequelize } from "./database/sequelize";
import { engine } from 'express-handlebars';


const app = express();

const PORT = process.env.PORT || 3000;

console.log(__dirname);

app.engine('hbs', engine({ defaultLayout: false }));
app.set('view engine', 'hbs');
// were to find templates
app.set('views', path.join(__dirname, '../', 'public', 'views'));

const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(loginRoutes);

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('home page')
})

app.use((req, res) => {
    res.status(404).render('404', { pageTitle: "Page Not Found" });
})

sequelize.sync({ force: true })
    .then(result => {
        console.log(result)
        app.listen(PORT, () => {
            console.log(`app runnin on port ${PORT}`)
        })
    })
    .catch(error => {
        console.log(error);
    });

