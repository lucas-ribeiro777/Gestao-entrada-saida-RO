import React, { useEffect, useState } from 'react';
import './VerSolicitacaoResponsavel.css';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import Rodape from '../../components/Rodape/Rodape';
import FormSolicitacao from '../../components/FormSolicitacao/FormSolicitacao';
import { Link } from "react-router-dom";

const VerSolicitacaoResponsavel = () => {
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const responsavelId = localStorage.getItem("usuarioId");

    fetch(`http://10.90.146.16:5121/api/Responsaveis/${responsavelId}`)
      .then((res) => res.json())
      .then(async (data) => {
        console.log("Responsável:", data);

        const alunosPromises = data.idsAlunos.map(id =>
          fetch(`http://10.90.146.16:5121/api/Aluno/${id}`).then(res => res.json())
        );
        console.log("Promises dos alunos:", data.idsAlunos, alunosPromises);
        const alunosData = await Promise.all(alunosPromises);
        setAlunos(alunosData);
      })
      .catch((err) => console.error("Erro ao carregar:", err));

  }, []);


  return (
    <div className="pagina-solicitacao">
      <CabecalhoPages rotaAtual={location.pathname}>
        <li key="inicio">
          <Link to="/InicialResponsavel">Início</Link>
        </li>
        <li key="solicitacoes">
          <Link to="/VerSolicitacaoResponsavel">Solicitações</Link>
        </li>
        <li key="conta">
          <Link to="/VisualizacaoResponsavel">Conta</Link>
        </li>
      </CabecalhoPages>

      <strong>
        <p className='infos-sol'>
          Preencha para liberar com antecedência a saída do seu filho(a)
        </p>
      </strong>

      <FormSolicitacao
        tipoUsuario="responsavel"
      />

      <Rodape />
    </div>
  );
};

export default VerSolicitacaoResponsavel;
