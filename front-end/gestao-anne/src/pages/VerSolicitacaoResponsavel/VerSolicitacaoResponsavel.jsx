import React, { useEffect, useState } from 'react';
import './VerSolicitacaoResponsavel.css';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import Rodape from '../../components/Rodape/Rodape';
import FormSolicitacao from '../../components/FormSolicitacao/FormSolicitacao';
import { Link, useNavigate } from "react-router-dom";

const VerSolicitacaoResponsavel = () => {
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
      <strong><p className='infos-sol'>Preencha para liberar com antecedência a saída do seu filho(a)</p></strong>
      <FormSolicitacao dados={dados} tipoUsuario="responsavel"/>

      <Rodape />
    </div>
  );
};

export default VerSolicitacaoResponsavel;