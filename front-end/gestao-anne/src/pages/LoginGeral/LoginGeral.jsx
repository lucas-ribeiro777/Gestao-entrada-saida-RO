import './LoginGeral.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rodape from '../../components/Rodape/Rodape';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';
import CampoTexto from '../../components/CampoTexto/CampoTexto'; // import do seu componente

const LoginGeral = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const navigate = useNavigate();

 const handleLogin = async () => {
    if (!email || !senha) {
      setMensagem('Preencha todos os campos.');
      return;
    }

    try {
      const resposta = await fetch('http://10.90.146.27:5121/api/Usuarios/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          senha: senha 
        })
      });

      if (!resposta.ok) {
        throw new Error('Credenciais inválidas');
      }

      const dados = await resposta.json();
      setMensagem('Login realizado com sucesso!');
      setNomeUsuario(dados.nome ?? 'Usuário');

    } catch (erro) {
      console.error(erro);
      setMensagem('Email ou senha incorretos.');
      setNomeUsuario('');
    }
  };



  const irParaCadastro = () => {
    navigate('/cadastroaluno');
  };

  const irParaEsqueciSenha = () => {
    navigate('/esqueciminhasenha');
  };

  return (
    <>
      <MenuCadastro />

      <div className="login-wrapper">
        <h3 className="login-title">Preencha os dados para fazer login</h3>

        <div className="login-container">
          <CampoTexto
            id="email"
            label="E-mail"
            tipo="email"
            valor={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail..."
          />

          <CampoTexto
            id="senha"
            label="Senha"
            tipo="password"
            valor={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha..."
          />

          <div className="link-esqueci-senha">
            <a href="#" onClick={irParaEsqueciSenha}>Esqueci Minha Senha!</a>
          </div>

          {mensagem && (
            <div className="mensagem-login">{mensagem}</div>
          )}

          {nomeUsuario && (
            <div className="bem-vindo-login">
              Bem-vindo, <strong>{nomeUsuario}</strong>!
            </div>
          )}

          <div className="form-cadastro">
            <span>
              Não possui uma conta?{' '}
              <a href="#" onClick={irParaCadastro}>Faça seu Cadastro.</a>
            </span>
          </div>
        </div>

        <button className="btn-submit-login" onClick={handleLogin}>ENTRAR</button>
      </div>

      <Rodape />
    </>
  );
};

export default LoginGeral;
