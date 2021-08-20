const { Usuario } = require("../db/models");
const createError = require("http-errors");



async function getUsuarios() {
const usuarios = await Usuario.findAll();

 return usuarios;
};

async function getUsuario(id) {
const usuario = await Usuario.findOne({
    where: {
        id
    }
});

 if (!usuario) {
throw new createError(404, "Usuário não encontrado!");
}

 return usuario;
}
async function createUsuario(novoUsuario) {
    const [usuario, criadoAgora] = await Usuario.findOrCreate({
    where: { email: novoUsuario.email },
    defaults: novoUsuario
    });
    
     if (!criadoAgora) throw new createError(409, "Usuário já está cadastrado!");
    
     return usuario;
    }
// async function createUsuario(usuario) {

// }

// async function updateUsuario(usuarioAtualizado) {

// }

// async function removeUsuario(id) {

// }

async function removeUsuario(id) {
    const usuario = await Usuario.findOne({
    where: {
    id
    }
    });
    
     if (!usuario) throw new createError(404, "Usuário não existe!");
    
     await usuario.destroy();
    }

    async function updateUsuario(id, usuarioAtualizado) {
        const usuario = await Usuario.findOne({ where: { id } });
        
         if (!usuario) {
        throw new createError(404, "Usuário não existe!");
        }
        
        Object.assign(usuario, usuarioAtualizado);
        await usuario.save();
        return usuario;
        }


module.exports = {
getUsuarios,
getUsuario,
createUsuario,
updateUsuario,
 removeUsuario
}