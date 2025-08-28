import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Botao from '../Botao/Botao';
import CampoTexto from '../CampoTexto/CampoTexto';
import CriarAssinatura from '../CriarAssinatura/CriarAssinatura';
import Termos from '../Termos/Termos';
import ModalRecado from '../ModalRecado/ModalRecado'; // import do modal de recados
import './FormCadastroAluno.css';

function FormCadastroAluno({ tipo, campos, fotoSelecionada }) {
  const navigate = useNavigate();

  const [modalAberto, setModalAberto] = useState(false);
  const [assinaturaImg, setAssinaturaImg] = useState(null);
  const [nomeArquivoAssinatura, setNomeArquivoAssinatura] = useState(null);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [datanasc, setDataNasc] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [termosValidos, setTermosValidos] = useState(false);

  // Estados para o modal de recado
  const [modalMensagem, setModalMensagem] = useState('');
  const [modalRecadoAberto, setModalRecadoAberto] = useState(false);

  function mostrarRecado(msg) {
    setModalMensagem(msg);
    setModalRecadoAberto(true);
  }

function aoSalvarAssinatura(arquivo, base64Img) {
  setAssinaturaImg(base64Img); // para mostrar a imagem no form
  setNomeArquivoAssinatura(arquivo.name); // para enviar o arquivo pro backend
  setModalAberto(false);
}



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

async function handleSubmit(event) {
  event.preventDefault();

  // Validação básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    mostrarRecado('Por favor, insira um e-mail válido.');
    return;
  }

  // Validação de data nascimento dd/mm/yyyy
  const dataRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const matchData = datanasc.match(dataRegex);
  if (!matchData) {
    mostrarRecado('Data de nascimento inválida. Use o formato dd/mm/aaaa.');
    return;
  } else {
    const dia = parseInt(matchData[1], 10);
    const mes = parseInt(matchData[2], 10);
    const ano = parseInt(matchData[3], 10);
    const hoje = new Date();
    if (ano < 1900 || ano > hoje.getFullYear()) {
      mostrarRecado('Ano de nascimento inválido.');
      return;
    }
    if (mes < 1 || mes > 12) {
      mostrarRecado('Mês de nascimento inválido.');
      return;
    }
    const diasNoMes = new Date(ano, mes, 0).getDate();
    if (dia < 1 || dia > diasNoMes) {
      mostrarRecado('Dia de nascimento inválido.');
      return;
    }
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
    mostrarRecado('As senhas não conferem!');
    return;
  }

  if (!termosValidos) {
    mostrarRecado('Você precisa aceitar os termos obrigatórios.');
    return;
  }

  if (!fotoSelecionada) {
    mostrarRecado('Por favor, selecione uma foto de perfil.');
    return;
  }

  // Continua a lógica do envio do form
  const formData = new FormData();
  formData.append('Nome', nome);
  formData.append('Email', email);
  formData.append('DataNascimento', datanasc.replaceAll('/', '-'));
  formData.append('Telefone', telefone);
  formData.append('Senha', senha);
  formData.append('Imagem', fotoSelecionada);

  if (assinaturaImg && nomeArquivoAssinatura) {
    formData.append('Assinatura', dataURLtoFile(assinaturaImg, nomeArquivoAssinatura));
  }

  try {
    const resp = await fetch('http://10.90.146.16:5121/api/Aluno/cadastro', {
      method: 'POST',
      body: formData,
    });
    if (!resp.ok) {
      const erro = await resp.text();
      throw new Error('Erro ao cadastrar aluno:\n' + erro);
    }
    await resp.json();
    mostrarRecado('Cadastro realizado com sucesso!');
    setNome('');
    setEmail('');
    setDataNasc('');
    setTelefone('');
    setSenha('');
    setConfirmarSenha('');
    setAssinaturaImg(null);
    setNomeArquivoAssinatura(null);
    navigate('/');
  } catch (error) {
    mostrarRecado(error.message);
  }
}


  function irParaLogin(e) {
    e.preventDefault();
    navigate('/');
  }

  return (
    <>
      <form className="formulario" onSubmit={handleSubmit}>
        <h2 className="titulo">Preencha os dados para se cadastrar como ALUNO</h2>
        <div className="campos">
          <CampoTexto valor={nome} label="Nome" placeholder="Digite Algo..." onChange={e => setNome(e.target.value)} />
          <CampoTexto valor={email} label="E-mail" placeholder="Digite Algo..." onChange={e => setEmail(e.target.value)} />
          <div className="linha1">
            <CampoTexto valor={datanasc} label="Data de Nascimento" placeholder="__/__/____" onChange={e => setDataNasc(e.target.value)} />
            <CampoTexto valor={telefone} label="Telefone" placeholder="(14 ...)" onChange={e => setTelefone(e.target.value)} />
          </div>
          <div className="linha2">
            <CampoTexto valor={senha} label="Senha" placeholder="Digite Sua Senha..." onChange={e => setSenha(e.target.value)} />
            <CampoTexto valor={confirmarSenha} label="Confirmar Senha" placeholder="Confirme Sua Senha..." onChange={e => setConfirmarSenha(e.target.value)} />
          </div>
        </div>

        <div className="container-botao-assinar">
          <button type="button" onClick={() => setModalAberto(true)} className="botao-assinar">
            Criar uma assinatura
          </button>
        </div>

        {assinaturaImg && (
          <div className="container-assinatura">
            <img src={assinaturaImg} alt="Assinatura" className="img-assinatura" style={{ width: '200px', marginTop: '10px' }} />
          </div>
        )}

        <CriarAssinatura
          aberto={modalAberto}
          aoFechar={() => setModalAberto(false)}
          aoSalvar={aoSalvarAssinatura}
        />

        <Termos onValidadeChange={setTermosValidos} />

        <div className="form-cadastro">
          <span>
            Já possui uma conta?{' '}
            <a href="#" onClick={irParaLogin}>Faça seu Login.</a>
          </span>
        </div>

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

export default FormCadastroAluno;
