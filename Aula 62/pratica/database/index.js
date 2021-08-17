require("dotenv").config();
const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

const Usuario = require("../modes/Usuarios");
const Projeto = require("../modes/Projeto");
const Endereco = require("../modes/Endereco");

const sequelize = new Sequelize(dbConfig);

// Inicializando os models
Usuario.init(sequelize);
Projeto.init(sequelize);
Endereco.init(sequelize);

// Definindo as associações para os models
Usuario.associate(sequelize.models);
Projeto.associate(sequelize.models);
Endereco.associate(sequelize.models);

module.exports = sequelize;
// Testando conexão
// (async () => {
// try {
// await sequelize.authenticate();
// console.log('Conexão bem-sucedida!');
// } catch (error) {
// console.error('Conexão falhou!', error);
// } finally {
// sequelize.close();
// }
// })();