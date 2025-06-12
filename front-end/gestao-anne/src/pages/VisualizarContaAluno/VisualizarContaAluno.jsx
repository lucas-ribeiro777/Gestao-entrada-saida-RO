import './VisualizarContaAluno.css';
import { useState, useEffect } from 'react';
import Rodape from '../../components/Rodape/Rodape';
import Foto from '../../components/Foto/Foto';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';

import InfoBox from '../../components/InfoBox/InfoBox';

const VisualizarContaAluno = () => {
  const [dados, setDados] = useState({
    nome: '',
    nascimento: '',
    email: '',
    telefone: '',
    responsavel: '',
  });

  const [imagemPerfil, setImagemPerfil] = useState('');

  useEffect(() => {
    const buscarDadosDoAluno = async () => {
      try {
        const resposta = await fetch('http://localhost:3000/alunos/1'); // Ajuste conforme sua API/JSON
        const aluno = await resposta.json();

        setDados({
          nome: aluno.nome,
          nascimento: aluno.nascimento,
          email: aluno.email,
          telefone: aluno.telefone,
          responsavel: aluno.responsavel,
        });

        setImagemPerfil(aluno.imagem); // Exemplo: "/images/giovanna.png" ou uma URL
      } catch (erro) {
        console.error('Erro ao buscar dados do aluno:', erro);
      }
    };

    buscarDadosDoAluno();
  }, []);

  const handleEditar = (campo) => {
    const valorAtual = dados[campo];
    const novoValor = prompt(`Editar ${campo}:`, valorAtual);
    if (novoValor !== null && novoValor.trim() !== '') {
      setDados((prevDados) => ({
        ...prevDados,
        [campo]: novoValor.trim(),
      }));
    }
  };

  return (
    <>
      <CabecalhoPages>
        <li key="inicio"><a href="/#">Início</a></li>
        <li key="ocorrencias"><a href="/#">Ocorrências</a></li>
        <li key="solicitacoes"><a href="/#">Solicitações</a></li>
        <li key="conta"><a href="/VisualizarContaCoordenador">Conta</a></li>
      </CabecalhoPages>

      <div className="container-central">
        <Foto 
          titulo="Foto de Perfil"
          imagem={imagemPerfil}
        />

        <div className="dados-box">
          <InfoBox
            icone={<img src="/images/nome.png" alt="Nome" />}
            texto={dados.nome}
            onEditar={() => handleEditar('nome')}
            editavel={true}
            cor="escuro"
          />
          <InfoBox
            icone={<img src="/images/niver.png" alt="Nascimento" />}
            texto={dados.nascimento}
            onEditar={() => handleEditar('nascimento')}
            editavel={false}
            cor="claro"
          />
          <InfoBox
            icone={<img src="/images/email.png" alt="Email" />}
            texto={dados.email}
            onEditar={() => handleEditar('email')}
            editavel={true}
            cor="escuro"
          />
          <InfoBox
            icone={<img src="/images/telefoneconta.png" alt="Telefone" />}
            texto={dados.telefone}
            onEditar={() => handleEditar('telefone')}
            editavel={true}
            cor="claro"
          />
          <InfoBox
            icone={<img src="/images/family.png" alt="Responsável" />}
            texto={dados.responsavel}
            onEditar={() => handleEditar('responsavel')}
            editavel={false}
            cor="escuro"
          />
        </div>
      </div>

      <Rodape />
    </>
  );
};

export default VisualizarContaAluno;
