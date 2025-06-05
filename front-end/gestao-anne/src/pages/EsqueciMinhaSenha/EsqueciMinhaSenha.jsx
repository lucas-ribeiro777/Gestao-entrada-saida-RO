import './EsqueciMinhaSenha.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook
import Rodape from '../../components/Rodape/Rodape';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';
import ModalCodigoConfirmacao from '../../components/ModalCodigoConfirmacao/ModalCodigoConfirmacao';

const EsqueciMinhaSenha = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);

  const navigate = useNavigate(); 

  const [mensagem, setMensagem] = useState('');

  const handleLogin = async () => {
    if (!email) {
      setMensagem('Informe seu e-mail.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/alunos?email=${email}`);
      const data = await response.json();

      if (data.length === 0) {
        setMensagem('E-mail não encontrado.');
        return;
      }

      setUsuarioEncontrado(data[0]);
      setMostrarModal(true); // <-- abre o modal

    } catch (error) {
      console.error('Erro:', error);
      setMensagem('Erro ao verificar o e-mail.');
    }
  };

  const handleConfirmacaoCodigo = async () => {
    if (!senha || !confirmar) {
      setMensagem('Preencha a nova senha e confirmação.');
      return;
    }

    if (senha !== confirmar) {
      setMensagem('As senhas não coincidem.');
      return;
    }

    try {
      const updateResponse = await fetch(`http://localhost:3001/alunos/${usuarioEncontrado.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha })
      });

      if (!updateResponse.ok) {
        throw new Error('Erro ao atualizar a senha');
      }

      setMensagem('Senha redefinida com sucesso!');
      setMostrarModal(false);

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      setMensagem('Erro ao redefinir a senha.');
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
      {mensagem && <p className="mensagem-feedback">{mensagem}</p>}
        </div>

        <button className="btn-submit-esqueci" onClick={handleLogin}>ENVIAR CÓDIGO</button>
      </div>



      <ModalCodigoConfirmacao
        isOpen={mostrarModal}
        onClose={() => setMostrarModal(false)}
        codigoAPI="123-456" // código vindo da "API"
      />
      <Rodape />
    </>
  );
};

export default EsqueciMinhaSenha;