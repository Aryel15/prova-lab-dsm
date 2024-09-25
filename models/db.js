const Sequelize = require('sequelize')
const sequelize = new Sequelize("banco_prova", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate().then(() => {
    console.log('Conectado com sucesso!');
}).catch((err) => {
    console.error('Errona conexão com banco de dados', err);
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}