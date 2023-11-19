const Usuario = require('../models/usuarioModel');

function cadastrarUsuario(req, res) {
    let usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    }
    
    Usuario.create(usuario).then(()=>{
        let sucesso = true;
        res.render("login.html", {sucesso});
    }).catch((err)=>{
        console.log(err);
        let erro = true;
        res.render("cadastro.html", {erro});
    });

}

function listarUsuarios(req, res) {
    Usuario.findAll().then((usuarios)=>{
        res.json(usuarios);
    }).catch((err)=>{
        res.json(err);
    });
}

module.exports = {
    cadastrarUsuario,
    listarUsuarios
}