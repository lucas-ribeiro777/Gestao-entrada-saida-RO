import React, { useState } from 'react';
import Botao from '../Botao/Botao';
import CampoTexto from '../CampoTexto/CampoTexto';
import CriarAssinatura from '../CriarAssinatura/CriarAssinatura';
import Termos from '../Termos/Termos';
import ModalRecado from '../ModalRecado/ModalRecado'; // Importa o modal de recados
import './FormCadastroCoordenador.css';

function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

function FormCadastroCoordenador() {
  const [modalAberto, setModalAberto] = useState(false);
  const [assinaturaImg, setAssinaturaImg] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [termosValidos, setTermosValidos] = useState(false);

  // Estado para controlar mensagem do modal
  const [modalMensagem, setModalMensagem] = useState('');
  const [modalRecadoAberto, setModalRecadoAberto] = useState(false);

  // Função para abrir modal com mensagem personalizada
  function mostrarRecado(msg) {
    setModalMensagem(msg);
    setModalRecadoAberto(true);
  }

async function handleSubmit(event) {
  event.preventDefault();

  // Validação básica do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    mostrarRecado('Por favor, insira um e-mail válido.');
    return;
  }

  // Validação telefone - só números, 10 ou 11 dígitos
  const telNumeros = telefone.replace(/\D/g, '');
  if (!(telNumeros.length === 10 || telNumeros.length === 11)) {
    mostrarRecado('Telefone inválido. Use 10 ou 11 dígitos (somente números).');
    return;
  }

  // Validação senha - mínimo 6 caracteres, pelo menos 1 número
  if (senha.length < 6) {
    mostrarRecado('Senha deve ter no mínimo 6 caracteres.');
    return;
  }
  if (!/\d/.test(senha)) {
    mostrarRecado('Senha deve conter pelo menos um número.');
    return;
  }

  if (senha !== confirmarSenha) {
    mostrarRecado("Senhas não conferem!");
    return;
  }

  if (!termosValidos) {
    mostrarRecado('Você precisa aceitar todos os termos obrigatórios para continuar.');
    return;
  }

  const nomeArquivoAssinatura = `assinatura_${Date.now()}.png`;
  const formData = new FormData();
  formData.append("Nome", nome);
  formData.append("Email", email);
  formData.append("Telefone", telefone);
  formData.append("Senha", senha);

  if (assinaturaImg) {
    const arquivoAssinatura = dataURLtoFile(assinaturaImg, nomeArquivoAssinatura);
    formData.append("Assinatura", arquivoAssinatura);
  }

  try {
    const response = await fetch('http://10.90.146.16:5121/api/Coordenadores/criar', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      mostrarRecado("Cadastro realizado com sucesso!");
      setNome('');
      setEmail('');
      setTelefone('');
      setSenha('');
      setConfirmarSenha('');
      setAssinaturaImg(null);
      setModalAberto(false);
    } else {
      mostrarRecado("Erro no cadastro.");
    }
  } catch (error) {
    mostrarRecado("Erro na comunicação com a API.");
    console.error(error);
  }
}


  return (
    <>
      <form className="formulario" onSubmit={handleSubmit}>
        <h2 className="titulo">Preencha os dados para cadastrar um COORDENADOR</h2>

        <div className="campos">
          <CampoTexto
            valor={nome}
            onChange={e => setNome(e.target.value)}
            label="Nome"
            placeholder="Digite Algo..."
          />
          <CampoTexto
            valor={email}
            onChange={e => setEmail(e.target.value)}
            label="E-mail"
            placeholder="Digite Algo..."
          />
          <div className="linha2">
            <CampoTexto
              id="senha"
              label="Senha"
              valor={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="Digite Sua Senha..."
              senha={true}
            />
            <CampoTexto
              id="confirmarSenha"
              label="Confirmar Senha"
              valor={confirmarSenha}
              onChange={e => setConfirmarSenha(e.target.value)}
              placeholder="Confirme Sua Senha..."
              senha={true}
            />
          </div>
          <div className="linha1-docente">
            <CampoTexto
              valor={telefone}
              onChange={e => setTelefone(e.target.value)}
              label="Telefone"
              placeholder="+55 ()"
            />
          </div>
        </div>

        <div className="container-botao-assinar">
          <button
            type="button"
            onClick={() => setModalAberto(true)}
            className='botao-assinar'
          >
            Criar uma assinatura
          </button>
        </div>

        <div className="container-assinatura">
          {assinaturaImg && (
            <img
              src={assinaturaImg}
              alt="Assinatura"
              className='img-assinatura'
              style={{ width: '200px', marginTop: '10px' }}
            />
          )}
        </div>

        <CriarAssinatura
          aberto={modalAberto}
          aoFechar={() => setModalAberto(false)}
          aoSalvar={(img) => setAssinaturaImg(img)}
        />

        <Termos onValidadeChange={setTermosValidos} />

        <Botao descricao="Concluir Cadastro" type="submit" />
      </form>

      <ModalRecado
        aberto={modalRecadoAberto}
        mensagem={modalMensagem}
        aoFechar={() => setModalRecadoAberto(false)}
      />
    </>
  );
}

export default FormCadastroCoordenador;
