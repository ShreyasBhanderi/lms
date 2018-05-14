import Sequelize from 'sequelize';

const db = new Sequelize('d1u8044050it0', 'jgarhrcfoklwkd', '6824b008531d48a91dc245fde414d6f38ae0eee958c3208e30e37ce8a4ecd624', {
    host: 'ec2-50-19-224-165.compute-1.amazonaws.com',
    dialect: 'postgres',
    port:'5432',
    pool: {
        min: 0,
        max: 5,
    }
})

db.sync()
    .then(() => console.log("Databatse has been synced"))
    .catch((err) => console.error("Error creating database"))


export default db;