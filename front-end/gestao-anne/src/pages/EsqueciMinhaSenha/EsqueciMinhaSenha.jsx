import './EsqueciMinhaSenha.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook
import Rodape from '../../components/Rodape/Rodape';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';

const EsqueciMinhaSenha = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const navigate = useNavigate(); 

  const usuarioMock = {
    email: 'usuario@teste.com',
    senha: '12345678',
    confirmar: '12345678'
  };

  const handleLogin = () => {
    if (email === usuarioMock.email && senha === usuarioMock.senha && confirmar === usuarioMock.confirmar) {
      setMensagem('Sua senha foi redefinida!');
      // Redirecionar para outra página, se quiser
      // navigate('/dashboard');
    } else {
      setMensagem('Dados errados.');
    }
  };

  return (
    <>
      <MenuCadastro />

  <div className="esqueci-wrapper">
        <h3 className="esqueci-title">Preencha os dados para redefinir sua senha</h3>

        <div className="esqueci-container">
          <div className="esqueci-row">
            <label htmlFor="email" className="esqueci-label">E-mail</label>
            <input id="email" type="email" placeholder="Digite seu e-mail..." className="input-full-esqueci" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="esqueci-row">
            <label htmlFor="senha" className="esqueci-label">Senha</label>
            <input id="senha" type="password" placeholder="Digite sua senha..." className="input-half-esqueci" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </div>

	        <div className="esqueci-row">
            <label htmlFor="confirmar" className="esqueci-label">Confirmar Senha</label>
            <input id="confirmarSenha" type="password" placeholder="Confirme sua senha..." className="input-head-esqueci" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} />
            <p>Enviaremos um código de verificação para redefinição de senha ao e-mail cadastrado em sua conta.</p>
          </div>

        </div>

        <button className="btn-submit-esqueci" onClick={handleLogin}>ENVIAR CÓDIGO</button>
      </div>

      <Rodape />
    </>
  );
};

export default EsqueciMinhaSenha;