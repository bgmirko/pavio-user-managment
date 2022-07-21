import express, { Request, Response } from 'express'
import db from 'db'
import { loginRoutes } from './routes/login'


const PORT = process.env.PORT || 3000

const app = express()

const bodyParser = require('body-parser')

app.use(loginRoutes);

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req: Request, res: Response) => {
    res.send('home page')
})

app.use((req, res) => {
    res.status(404).send("<h1>Page not found</h1>")
})

app.listen(PORT, () => {
    console.log(`app runnin on port ${PORT}`)
    db.runMigrations()
})