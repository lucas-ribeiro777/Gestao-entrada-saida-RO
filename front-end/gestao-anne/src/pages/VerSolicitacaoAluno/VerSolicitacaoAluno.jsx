import React, { useEffect, useState } from 'react';
import './VerSolicitacaoAluno.css';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import Rodape from '../../components/Rodape/Rodape';
import FormSolicitacao from '../../components/FormSolicitacao/FormSolicitacao';

const VerSolicitacaoAluno = () => {
  const [dados, setDados] = useState(null);

    useEffect(() => {
    fetch('/Mocks/SolicitacaoAluno.json')
      .then(response => response.json())
      .then(data => setDados(data))
      .catch(error => console.error('Erro ao carregar dados:', error));
  }, []);

  if (!dados) return <p>Carregando...</p>;

  return (
    <div className="pagina-solicitacao">
      <CabecalhoPages />

      <div className="container-solicitacao1">
        <FormSolicitacao dados={dados} />
      </div>

      <Rodape />
    </div>
  );
};

export default VerSolicitacaoAluno;