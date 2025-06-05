import './LoginGeral.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rodape from '../../components/Rodape/Rodape';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';

const LoginGeral = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const usuarioMock = {
    email: 'usuario@teste.com',
    senha: '123456'
  };

  const handleLogin = () => {
    if (email === usuarioMock.email && senha === usuarioMock.senha) {
      setMensagem('Login realizado com sucesso!');
      // navigate('/dashboard');
    } else {
      setMensagem('Email ou senha incorretos.');
    }
  };

  const irParaCadastro = () => {
    navigate('/#');
  };

  const irParaEsqueciSenha = () => {
  navigate('/esqueciminhasenha');
  };


  return (
    <>
      <MenuCadastro />

      <div className="login-wrapper">
  
  <div className="login-content">
    <h3 className="login-title">Preencha os dados para fazer login</h3>

    <div className="login-container">
      <div className="login-row">
        <label htmlFor="email" className="login-label">E-mail</label>
        <input id="email" type="email" placeholder="Digite seu e-mail..." className="input-full-login" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="login-row">
        <label htmlFor="senha" className="login-label">Senha</label>
        <input id="senha" type="password" placeholder="Digite sua senha..." className="input-half-login" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <div className="link-esqueci-senha">
          <a href="#" onClick={irParaEsqueciSenha}>Esqueci Minha Senha!</a>
        </div>
      </div>

      {mensagem && (
        <div className="mensagem-login">
          {mensagem}
        </div>
      )}

      <div className="form-cadastro">
        <span>
          Não possui uma conta?{' '}
          <a href="#" onClick={irParaCadastro}>Faça seu Cadastro.</a>
        </span>
      </div>
    </div>
  </div>

  <button className="btn-submit-login" onClick={handleLogin}>ENTRAR</button>
</div>


      <Rodape />
    </>
  );
};

export default LoginGeral;