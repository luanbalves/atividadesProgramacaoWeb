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

async function atualizarUsuario(req, res) {
    try {
      const novoNome = req.body.novoNome;
      const novaSenha = req.body.novaSenha;
      const novoEmail = req.body.novoEmail;
  
      console.log('Dados do formulário:', novoNome, novaSenha, novoEmail);
  
      const [numeroAtualizacoes, usuariosAtualizados] = await Usuario.update(
        {
          nome: novoNome,
          senha: novaSenha,
          email: novoEmail,
        },
        {
          where: {
            id: req.session.usuario.id,
          },
        }
      );
  
      console.log('Número de atualizações:', numeroAtualizacoes);
      console.log('Usuários atualizados:', usuariosAtualizados);
  
      if (numeroAtualizacoes > 0 || (usuariosAtualizados && usuariosAtualizados[0])) {
        res.redirect('/');
      } else {
        res.status(400).send('Nenhum usuário foi atualizado.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      res.status(500).send(`Erro ao atualizar o usuário: ${error.message}`);
    }
  }
  

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    atualizarUsuario,
}