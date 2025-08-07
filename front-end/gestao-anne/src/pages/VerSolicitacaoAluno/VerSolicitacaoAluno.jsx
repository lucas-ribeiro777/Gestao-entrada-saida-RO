import React, { useEffect, useState } from 'react';
import './VerSolicitacaoAluno.css';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import Rodape from '../../components/Rodape/Rodape';
import FormSolicitacao from '../../components/FormSolicitacao/FormSolicitacao';

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
      <CabecalhoPages />
      <FormSolicitacao dados={dados} />

      <Rodape />
    </div>
  );
};

export default VerSolicitacaoAluno;