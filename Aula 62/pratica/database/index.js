require("dotenv").config();
const {Sequelize} = require("sequelize");
const dbConfig = require("../config/database");

const sequelize = new Sequelize(dbConfig);


module.exports = sequelize;
//Testado Conexão
//(async () =>{
//try{
  //  await sequelize.authenticate();
    //console.log('Conexão bem sucediada');

//}catch(erro){
 //   console.error('Conexão falhou!',erro);
//}finally{
 //   sequelize.close();
//}
//})();
