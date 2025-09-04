import './EsqueciMinhaSenha.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rodape from '../../components/Rodape/Rodape';
import MenuCadastro from '../../components/MenuCadastro/MenuCadastro';
import ModalCodigoConfirmacao from '../../components/ModalCodigoConfirmacao/ModalCodigoConfirmacao';
import CampoTexto from '../../components/CampoTexto/CampoTexto';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import { API_BASE_URL } from '../../constantes';

const EsqueciMinhaSenha = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const navigate = useNavigate();

  // Envia email + senha + confirmação para solicitar o código de recuperação
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
      const resposta = await fetch(`${API_BASE_URL}api/Email/solicitar-recuperacao-senha`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          novaSenha: senha,         // Corrigido: usa 'novaSenha'
          confirmarSenha: confirmar,
        }),
      });

      if (!resposta.ok) {
        const erro = await resposta.json();
        setMensagem(erro?.mensagem || 'Erro ao enviar código. Verifique os dados.');
        return;
      }

      setMensagem('Código enviado para seu e-mail!');
      setModalAberto(true);

    } catch (error) {
      console.error(error);
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  // Valida o código digitado no modal para concluir a troca da senha
  const confirmarCodigo = async (codigoDigitado) => {
    try {
      const resposta = await fetch(`${API_BASE_URL}api/Email/confirmar-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: codigoDigitado
        }),
      });

      if (resposta.ok) {
        setMensagem('Senha redefinida com sucesso!');
        setModalAberto(false);
        navigate('/login');
      } else {
        const erro = await resposta.json();
        console.log('Erro da API validar-token:', erro);
        setMensagem(erro?.mensagem || 'Código inválido ou expirado.');
      }
    } catch (error) {
      console.error(error);
      setMensagem('Erro ao confirmar o código.');
    }
  };


  return (
    <>
      <CabecalhoPages />
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
            label="Nova Senha"
            placeholder="Digite sua nova senha..."
            valor={senha}
            onChange={(e) => setSenha(e.target.value)}
            type="password"
          />

          <CampoTexto
            label="Confirmar Senha"
            placeholder="Confirme sua nova senha..."
            valor={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            type="password"
          />

          <p>Enviaremos um código de verificação ao seu e-mail para confirmar a redefinição de senha.</p>

          {mensagem && <p className="mensagem-esqueci">{mensagem}</p>}
        </div>

        <button className="btn-submit-esqueci" onClick={enviarCodigo}>
          ENVIAR CÓDIGO
        </button>
      </div>

      <ModalCodigoConfirmacao
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onCodigoCorreto={confirmarCodigo}
      />

      <Rodape />
    </>
  );
};

export default EsqueciMinhaSenha;
