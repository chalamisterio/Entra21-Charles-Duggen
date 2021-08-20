const { body, param, validationResult } = require("express-validator");

function checkValidations(req, res, next) {
const errors = validationResult(req);

 if (!errors.isEmpty()) {
return res.status(400).json({ errors: errors.array() });
}

 next();
}

module.exports = {
get: [
param("id")
.isUUID()
.withMessage("O Id precisa estar no formato UUID"),
checkValidations
],
post: [
body("nome")
.isLength({ min: 4 })
.withMessage("Nome inválido"),
body("email")
.isEmail()
.withMessage("E-mail inválido"),
body("senha")
.isStrongPassword()
.withMessage("Senha inválida"),
body().custom(body => {
const keys = ['nome', 'email', 'senha'];
return Object.keys(body).every(key => keys.includes(key));
}).withMessage('Parâmetros extras enviados'),
checkValidations
],
put: [
param("id")
.isUUID()
.withMessage("Id precisa ser um UUID"),
body("nome")
.isLength({ min: 4 })
.withMessage("Nome inválido"),
body("senha")
.isStrongPassword()
.withMessage("Senha inválida"),
body().custom(body => {
const keys = ['nome', 'senha'];
return Object.keys(body).every(key => keys.includes(key));
}).withMessage('Parâmetros extras enviados'),
checkValidations
],
}