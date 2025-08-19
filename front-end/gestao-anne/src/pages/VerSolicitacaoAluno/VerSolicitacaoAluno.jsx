import React, { useEffect, useState } from 'react';
import './VerSolicitacaoAluno.css';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import Rodape from '../../components/Rodape/Rodape';
import FormSolicitacao from '../../components/FormSolicitacao/FormSolicitacao';
import { Link, useNavigate } from 'react-router-dom';

const VerSolicitacaoAluno = () => {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    fetch('/Mocks/SolicitacaoAluno.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => setDados(json))
    .catch(err => console.error('Erro ao carregar dados mock:', err));
  }, []);

  if (!dados) return <p>Carregando dados...</p>;

  return (
    <div className="pagina-solicitacao">
    <CabecalhoPages>
      <li key="inicio"><Link to="/InicialAluno">Início</Link></li>
      {/* <li key="ocorrencias"><Link to="/visualizarocorrenciasaluno">Ocorrências</Link></li> */}
      <li key="solicitacoes"><Link to="/visualizarsolicitacaoaluno">Solicitações</Link></li>
      <li key="conta"><Link to="/VisualizarContaaluno">Conta</Link></li>
    </CabecalhoPages>

      <FormSolicitacao dados={dados} tipoUsuario="aluno"/>

      <Rodape />
    </div>
  );
};

export default VerSolicitacaoAluno;