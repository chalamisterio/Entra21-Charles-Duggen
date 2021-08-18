const { sequelize, Usuario } = require("./db/models");
(async () => {

    try {
        await sequelize.sync({ force: true });

        await sequelize.authenticate();

        console.log("Conexão bem-sucedida");

        //Insrindo Usuario
        const pedro = await Usuario.create({
            nome: "Pedro",
            email: "pedre@email.com",
            senha: "123456"
        });
        console.log("Usuario criado com sucesso");

        //Inserindo um endereço
        await pedro.createEndereco({
            rua: "Rua 01",
            numero: 123
        });
        console.log("Endereço Criado com sucesso")

        pedro.createProjeto({
            nome: "Projeto 1",
            quantidadeHoras: 10
        })

        console.log("Projeto criado com sucesso")
    } catch (error) {
        console.log("Erron", error)
    } finally {
        sequelize.close()
    }
})();