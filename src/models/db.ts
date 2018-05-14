import Sequelize from 'sequelize';

const db = new Sequelize('lms', 'jarvis', 'ultron', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
    }
})

db.sync()
    .then(() => console.log("Databatse has been synced"))
    .catch((err) => console.error("Error creating database"))


export default db;