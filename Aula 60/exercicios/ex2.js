const db = require("./db");

(async () => {
  try {
 await pool.query(`
 CREATE TYPE pessoa AS ENUM ('Fisica','Juridica');
 CREATE TABLE IF NOT EXISTS clientes(
 id SERIAL PRIMARY KEY,
 endereco text NOT NULL,
 telefone text NOT NULL UNIQUE,
 cpf text NOT NULL UNIQUE,
 tipo_pessoa pessoa,
 pontos integer
);
 CREATE TABLE IF NOT EXISTS Livro (
 isbn integer PRIMARY KEY,
 nome_autor text NOT NULL,
 assunto text NOT NULL,
 quantidade integer NOT NULL,
 );
 CREATE TABLE IF NOT EXISTS Editora(
   id_codigo serial PRIMARY KEY,
   telefone text NOT NULL, 
   endereco text NOT NULL,
   nome_gerente text NOT NULL,

 )`);
 console.log("Tabelas criadas com sucesso!");
 } catch (error) {
console.log(error.message);
} finally {
 pool.end();}
})();