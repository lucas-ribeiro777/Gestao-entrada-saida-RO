import './EsqueciMinhaSenha.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rodape from '../../components/Rodape/Rodape';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';

const EsqueciMinhaSenha = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  // Dados de exemplo (mock)
  const usuarioMock = {
    email: 'usuario@teste.com',
    senha: '12345678',
    confirmar: '12345678'
  };

  // Mock da API
  const enviarParaAPI = async (dados) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Dados enviados para API:', dados);
        resolve({ sucesso: true });
      }, 1000);
    });
  };

  const handleLogin = async () => {
    if (!email || !senha || !confirmar) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }

    if (email === usuarioMock.email && senha === usuarioMock.senha && confirmar === usuarioMock.confirmar) {
      setMensagem('Redefinindo senha...');
      const resposta = await enviarParaAPI({ email, senha });

      if (resposta.sucesso) {
        setMensagem('Sua senha foi redefinida com sucesso!');
        // Redirecionar se necessário
        // navigate('/login');
      }
    } else {
      setMensagem('Dados incorretos. Verifique as informações.');
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
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail..."
              className="input-full-esqueci"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="esqueci-row">
            <label htmlFor="senha" className="esqueci-label">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha..."
              className="input-half-esqueci"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="esqueci-row">
            <label htmlFor="confirmar" className="esqueci-label">Confirmar Senha</label>
            <input
              id="confirmarSenha"
              type="password"
              placeholder="Confirme sua senha..."
              className="input-head-esqueci"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
            />
            <p>Enviaremos um código de verificação para redefinição de senha ao e-mail cadastrado em sua conta.</p>
          </div>
          
          {mensagem && <p className="mensagem-esqueci">{mensagem}</p>}

        </div>

        <button className="btn-submit-esqueci" onClick={handleLogin}>
          ENVIAR CÓDIGO
        </button>
      </div>

      <Rodape />
    </>
  );
};

export default EsqueciMinhaSenha;