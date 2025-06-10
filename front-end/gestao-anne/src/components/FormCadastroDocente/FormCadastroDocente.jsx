import Botao from '../Botao/Botao';
import CampoTexto from '../CampoTexto/CampoTexto';
import CriarAssinatura from '../CriarAssinatura/CriarAssinatura';
import Termos from '../Termos/Termos';
import './FormCadastroDocente.css';
import React, { useState } from 'react';

function FormCadastroDocente({ tipo, campos, fotoSelecionada }) {
  const [modalAberto, setModalAberto] = useState(false);
  const [assinaturaImg, setAssinaturaImg] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfimarSenha] = useState('');

  const [termosValidos, setTermosValidos] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (senha !== confirmarSenha) {
      alert("Senhas não conferem!");
      return;
    }

    if (!assinaturaImg) {
      alert("Por favor, crie sua assinatura.");
      return;
    }

    if (!termosValidos) {
      alert('Você precisa aceitar todos os termos obrigatórios para continuar.');
      return;
    }

    const nomeArquivoAssinatura = `assinatura_${Date.now()}.png`;


    const docente = {
      nome,
      email,
      telefone,
      senha,
      assinatura: nomeArquivoAssinatura,
    };

    try {
      const response = await fetch('http://localhost:3000/Docente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(docente),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        setNome('');
        setEmail('');
        setTelefone('');
        setSenha('');
        setConfimarSenha('');
        setAssinaturaImg(null);
        setModalAberto(false);
      } else {
        alert("Erro no cadastro.");
      }
    } catch (error) {
      alert("Erro na comunicação com a API.");
      console.error(error);
    }
  }

  return (
    <>
      <form className="formulario" onSubmit={handleSubmit}>
        <h2 className="titulo">Preencha os dados para se cadastrar DOCENTE</h2>

        <div className="campos">
          <CampoTexto
            valor={nome}
            aoAlterar={e => setNome(e.target.value)}
            label="Nome"
            placeholder="Digite Algo..."
          />
          <CampoTexto
            valor={email}
            aoAlterar={e => setEmail(e.target.value)}
            label="E-mail"
            placeholder="Digite Algo..."
          />
          <div className="linha2">
            <CampoTexto
              valor={senha}
              aoAlterar={e => setSenha(e.target.value)}
              label="Senha"
              placeholder="Digite Sua Senha..."
            />
            <CampoTexto
              valor={confirmarSenha}
              aoAlterar={e => setConfimarSenha(e.target.value)}
              label="Confirmar Senha"
              placeholder="Confirme Sua Senha..."
            />
          </div>
          <div className="linha1-docente">
            <CampoTexto
              valor={telefone}
              aoAlterar={e => setTelefone(e.target.value)}
              label="Telefone"
              placeholder="+55 ()"
            />
          </div>
        </div>

        <div className="container-botao-assinar">
          <button
            type="button"
            onClick={() => setModalAberto(true)}
            className="botao-assinar"
          >
            Criar uma assinatura
          </button>
        </div>

        <div className="container-assinatura">
          {assinaturaImg && (
            <img
              src={assinaturaImg}
              alt="Assinatura"
              className="img-assinatura"
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
    </>
  );
}

export default FormCadastroDocente;