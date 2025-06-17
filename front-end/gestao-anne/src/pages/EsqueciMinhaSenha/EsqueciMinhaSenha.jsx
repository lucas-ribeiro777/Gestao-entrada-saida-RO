import './EsqueciMinhaSenha.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rodape from '../../components/Rodape/Rodape';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';
import ModalCodigoConfirmacao from '../../components/ModalCodigoConfirmacao/ModalCodigoConfirmacao';
import CampoTexto from '../../components/CampoTexto/CampoTexto';

const EsqueciMinhaSenha = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarioParaAtualizar, setUsuarioParaAtualizar] = useState(null);
  const navigate = useNavigate();

  const codigoSimulado = '123456';

  const enviarCodigo = async () => {
    if (!email || !senha || !confirmar) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmar) {
      setMensagem('As senhas não coincidem.');
      return;
    }

    try {
      const resposta = await fetch('http://localhost:3000/alunos');
      const usuarios = await resposta.json();

      const usuarioEncontrado = usuarios.find((u) => u.email === email);

      if (!usuarioEncontrado) {
        setMensagem('E-mail não encontrado.');
        return;
      }

      setUsuarioParaAtualizar(usuarioEncontrado);

      setMensagem('Código enviado para seu e-mail!');

      setModalAberto(true);

    } catch (error) {
      console.error(error);
      setMensagem('Erro ao verificar os dados.');
    }
  };

  const atualizarSenha = async () => {
    if (!usuarioParaAtualizar) {
      setMensagem('Usuário não encontrado para atualizar a senha.');
      return;
    }

    try {
      const resposta = await fetch(`http://localhost:3000/alunos/${usuarioParaAtualizar.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha }),
      });

      if (resposta.ok) {
        setMensagem('Senha redefinida com sucesso!');
        setModalAberto(false);
        navigate('/login');
      } else {
        setMensagem('Erro ao redefinir a senha.');
      }
    } catch (error) {
      console.error(error);
      setMensagem('Erro ao atualizar a senha.');
    }
  };

  return (
    <>
      <MenuCadastro />

      <div className="esqueci-wrapper">
        <h3 className="esqueci-title">Preencha os dados para redefinir sua senha</h3>

        <div className="esqueci-container">
          <CampoTexto
            label="E-mail"
            placeholder="Digite seu e-mail..."
            valor={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />

          <CampoTexto
            label="Senha"
            placeholder="Digite sua senha..."
            valor={senha}
            onChange={(e) => setSenha(e.target.value)}
            type="password"
          />

          <CampoTexto
            label="Confirmar Senha"
            placeholder="Confirme sua senha..."
            valor={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            type="password"
          />

          <p>Enviaremos um código de verificação para redefinição de senha ao e-mail cadastrado em sua conta.</p>

          {mensagem && <p className="mensagem-esqueci">{mensagem}</p>}
        </div>

        <button className="btn-submit-esqueci" onClick={enviarCodigo}>
          ENVIAR CÓDIGO
        </button>
        
      </div>

      <ModalCodigoConfirmacao
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        codigoAPI={codigoSimulado}
        onCodigoCorreto={atualizarSenha}
      />

      <Rodape />
    </>
  );
};

export default EsqueciMinhaSenha;
