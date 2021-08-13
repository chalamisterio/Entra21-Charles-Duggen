



//Cria Tabelas e colunas Exemplo
//__________________________________
//const db = require("./db");

//(async () => {
//  try {
// await db.query(`

// DROP SCHEMA public CASCADE;
  //  CREATE SCHEMA public;
  //  GRANT ALL ON SCHEMA public TO postgres;

   // CREATE TYPE tipo_pessoa AS ENUM ('PF', 'PJ');

   // CREATE TABLE IF NOT EXISTS clientes (
   //     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
   //     nome text NOT NULL,
   //     email text NOT NULL UNIQUE,
    //    telefone text NOT NULL UNIQUE,
      //  numero_documento text NOT NULL,
      //  tipo_pessoa tipo_pessoa NOT NULL,
      //  pontos integer DEFAULT 0
   // );

   // CREATE TABLE IF NOT EXISTS enderecos (
     //   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      //  rua text NOT NULL,
      //  numero integer NOT NULL,
      //  cidade text NOT NULL,
      //  estado text NOT NULL,
      //  cep TEXT NOT NULL,
      //  id_cliente uuid NOT NULL REFERENCES clientes 
    //);    
    
    //CREATE TABLE IF NOT EXISTS editoras (
      //  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      //  nome_gerente text NOT NULL,
       // telefone text NOT NULL UNIQUE
    //);

   // CREATE TABLE IF NOT EXISTS livros (
     //   isbn uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      //  nome_autor text NOT NULL,
     //   assunto text NOT NULL,
     //   quantidade_estoque integer NOT NULL,
      //  preco numeric NOT NULL,
      //  id_editora uuid NOT NULL REFERENCES editoras
    //);

   // CREATE TABLE IF NOT EXISTS compras (
     //   id_cliente uuid REFERENCES clientes,
     //   id_livro uuid REFERENCES livros,
     //   data timestamp DEFAULT NOW(),
      //  valor numeric NOT NULL,
      //  PRIMARY KEY (id_cliente, id_livro, data)      
   // );
  // `);
 //console.log("Tabelas criadas com sucesso!");
 //} catch (error) {
//console.log(error.message);
//} finally {
// db.end();}
//})();
//____________________________________________

// Insere apenas UM objeto
//______________________________________________   
  // @ts-check
 // const db = require("./db");
  
  /**
   * Dados e endereço do cliente
   * @typedef {Object} Cliente 
   * @property {string} nome 
   * @property {string} email
   * @property {string} telefone
   * @property {string} numero_documento
   * @property {string} tipo_pessoa
   * @property {string} rua
   * @property {number} numero
   * @property {string} cidade
   * @property {string} estado
   * @property {string} cep
   */
  
  /**
   * Insere um cliente e o seu endereço no banco de dados
   * @param {Cliente} cliente 
   */
  //async function insereCliente(cliente) {
     // const dadosCliente = [
        //  cliente.nome, 
        //  cliente.email, 
        //  cliente.telefone, 
        //  cliente.numero_documento,
         // cliente.tipo_pessoa
     // ];
      
     // const enderecoCliente = [
       //   cliente.rua,
      //    cliente.numero,
       //   cliente.cidade,
        //  cliente.estado,
        //  cliente.cep
      //];
  
     // try {
        //  await db.query("BEGIN;");
  
         // const {rows} = await db.query(`            
          //    INSERT INTO 
           //       clientes (nome, email, telefone, numero_documento, tipo_pessoa)
            //  VALUES 
             //     ($1, $2, $3, $4, $5)
             // RETURNING id;`, dadosCliente);
          
          //await db.query(`
              //INSERT INTO 
                //  enderecos (rua, numero, cidade, estado, cep, id_cliente)
              //VALUES 
                //  ($1, $2, $3, $4, $5, $6);`, [...enderecoCliente, rows[0].id]);
  
          //await db.query(" COMMIT;");        
          //console.log("Cliente foi cadastrado com sucesso!");
      //} catch (error) {
        //  await db.query("ROLLBACK;")
         // console.log(error.message);
     // } finally {
         // db.end();
      //}
 // }
  
  ///** @type {Cliente} */
  //const cliente = {
    //  nome: "Pedro",
     // email: "pedro@email.com",
    //  telefone: "(47) 9 8444-3320",
    //  numero_documento: "123.123.123-12",
    //  tipo_pessoa: "PF",
    //  rua: "R. Duque de Caxias",
    //  numero: 830,
    //  cidade: "Timbó",
    //  estado: "SC",
    //  cep: "89120-000"
  //};
  
  //insereCliente(cliente);
//
//____________________________________________

const format = require("pg-format");
const db = require("./db");

async function insereClientes(clientes) {
    // Separando clientes
    const clientesVetor = [],
          enderecosVetor = [];
    
    clientes.forEach(cliente => {
        clientesVetor.push([
            cliente.nome, 
            cliente.email, 
            cliente.telefone, 
            cliente.numero_documento,
            cliente.tipo_pessoa
        ]);

        enderecosVetor.push([
            cliente.rua,
            cliente.numero,
            cliente.cidade,
            cliente.estado,
            cliente.cep
        ]);
    });

    try {
        await db.query("BEGIN;");

        const {rows} = await db.query(format(`            
            INSERT INTO 
                clientes (nome, email, telefone, numero_documento, tipo_pessoa)
            VALUES 
                %L
            RETURNING id;`, clientesVetor));
        

        // Adicionando os endereços
        for (let i = 0; i < enderecosVetor.length; i++) {
            enderecosVetor[i] = [...enderecosVetor[i], rows[i].id];
        }
        
        await db.query(format(`
            INSERT INTO 
                enderecos (rua, numero, cidade, estado, cep, id_cliente)
            VALUES 
                %L;`, enderecosVetor));

        await db.query(" COMMIT;");        
        console.log("Clientes foram cadastrados com sucesso!");
    } catch (error) {
        await db.query("ROLLBACK;")
        console.log(error.message);
    } finally {
        db.end();
    }
}

const clientes = [
    {
        nome: "Marcos",
        email: "marcos@email.com",
        telefone: "(47) 9 8344-3320",
        numero_documento: "113.123.123-12",
        tipo_pessoa: "PF",
        rua: "R. Duque de Caxias",
        numero: 833,
        cidade: "Timbó",
        estado: "SC",
        cep: "89122-000"
    },
    {
        nome: "Maria",
        email: "maria@email.com",
        telefone: "(47) 9 8412-3320",
        numero_documento: "144.123.123-12",
        tipo_pessoa: "PF",
        rua: "R. Duque de Caxias",
        numero: 838,
        cidade: "Timbó",
        estado: "SC",
        cep: "89130-000"
    },
    {
        nome: "João",
        email: "joao@email.com",
        telefone: "(47) 9 8809-3320",
        numero_documento: "123.123.000-12",
        tipo_pessoa: "PF",
        rua: "R. Duque de Caxias",
        numero: 830,
        cidade: "Timbó",
        estado: "SC",
        cep: "89300-000"
    },
    {
        nome: "Mateus",
        email: "mateus@email.com",
        telefone: "(47) 9 8777-3320",
        numero_documento: "18.843.707/0001-25",
        tipo_pessoa: "PJ",
        rua: "R. Duque de Caxias",
        numero: 850,
        cidade: "Timbó",
        estado: "SC",
        cep: "89281-000"
    }
];

insereClientes(clientes);