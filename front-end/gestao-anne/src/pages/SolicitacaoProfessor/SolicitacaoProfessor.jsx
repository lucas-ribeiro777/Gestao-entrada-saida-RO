import React, { useEffect, useState } from 'react';
import './SolicitacaoProfessor.css';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import Rodape from '../../components/Rodape/Rodape';
import { Link } from 'react-router-dom';
import CardSolicitacao from '../../components/CardSolicitacao/CardSolicitacao';

const SolicitacaoProfessor = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/solicitacoes')
      .then(res => res.json())
      .then(data => {
        const solicitacoesOrdenadas = data
          .filter(s => s.datahora) // (opcional) só pra garantir que datahora existe
          .sort((a, b) => b.datahora.localeCompare(a.datahora)); // mais recente em cima
        setSolicitacoes(solicitacoesOrdenadas);
      })
      .catch(err => console.error('Erro ao buscar solicitações:', err));
  }, []);

  const autorizarSolicitacao = (id) => {
    const novasSolicitacoes = solicitacoes.map(s =>
      s.id === id ? { ...s, professorAutorizou: true } : s
    );
    setSolicitacoes(novasSolicitacoes);

    fetch(`http://localhost:3000/solicitacoes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ professorAutorizou: true }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Erro ao autorizar solicitação');
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="tabela-container">
      <CabecalhoPages>
        <li><Link to="/InicialProfessor">Início</Link></li>
        <li><Link to="/solicitacaoprofessor">Solicitações</Link></li>
        <li><Link to="/VisualizarContaprofessor">Conta</Link></li>
      </CabecalhoPages>

      <h2>SOLICITAÇÕES</h2>

      {solicitacoes.length === 0 ? (
        <div className="sem-solicitacoes">
          <div className="imagens-busca">
            <img src="/images/lupa.png" alt="Sem solicitações" />
            <img src="/images/joia-baixa.png" alt="Sem solicitações" />
          </div>
          <p>Nenhuma solicitação no momento.</p>
        </div>
<<<<<<< HEAD
      </div>
=======

      ) : (
        <div className="painel-grid">
          {solicitacoes.map((solicitacao) => (
            <CardSolicitacao
              key={solicitacao.id}
              aluno={solicitacao}
              onAutorizar={autorizarSolicitacao}
            />
          ))}
        </div>
      )}
>>>>>>> 3bdbeb0d1a9ece898e6426be19fcbd67a0b2c5aa

      <Rodape />
    </div>
  );
};

export default SolicitacaoProfessor;
