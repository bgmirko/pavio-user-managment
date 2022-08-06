
import { app } from './app';
import db from "./models";

const PORT = process.env.PORT || 3000;

db.sequelize.sync()
    .then(async result => {
        app.listen(PORT, () => {
            console.log(`app running on port ${PORT}`)
        })
        // clear table data on server restart
        // await Session.destroy({ truncate: true })
    })
    .catch(error => {
        console.log(error);
    });

