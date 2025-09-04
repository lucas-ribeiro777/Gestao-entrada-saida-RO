import React, { useEffect, useState } from 'react';
import './SolicitacaoProfessor.css';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import Rodape from '../../components/Rodape/Rodape';
import { Link } from 'react-router-dom';
import CardSolicitacao from '../../components/CardSolicitacao/CardSolicitacao';
import { API_BASE_URL } from '../../constantes';

const SolicitacaoProfessor = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const usuarioId = localStorage.getItem('usuarioId');
        if (!usuarioId) throw new Error("Professor não logado");

        const professorRes = await fetch(`${API_BASE_URL}api/Professor/${usuarioId}`);
        if (!professorRes.ok) throw new Error("Erro ao buscar dados do professor");
        const professorData = await professorRes.json();

        const cursosDoProfessor = professorData.cursosIds; 

        const res = await fetch(`${API_BASE_URL}api/Solicitacao/periodo/7dias`);
        if (!res.ok) throw new Error('Erro ao buscar solicitações');
        const data = await res.json();

        const solicitacoesFiltradas = data.filter(
          s => s.statusProfessor === "Pendente" && cursosDoProfessor.includes(s.idNomeCurso)
        );

        const solicitacoesComAluno = await Promise.all(
          solicitacoesFiltradas.map(async (s) => {
            try {
              const alunoRes = await fetch(`${API_BASE_URL}api/Aluno/${s.idAlunos}`);
              if (!alunoRes.ok) throw new Error("Erro ao buscar aluno");
              const alunoData = await alunoRes.json();

              const cursoRes = await fetch(`${API_BASE_URL}api/Grafico/${s.idNomeCurso}`);
              if (!cursoRes.ok) throw new Error("Erro ao buscar curso");
              const cursoData = await cursoRes.json();

              return {
                ...s,
                nomeAluno: alunoData.nome,
                imagemAluno: alunoData.imagem ? `${API_BASE_URL}${alunoData.imagem}` : '',
                nomeCurso: cursoData.nomeCurso
              };
            } catch (err) {
              console.error("Erro ao buscar aluno/curso:", err);
              return s;
            }
          })
        );

        setSolicitacoes(solicitacoesComAluno);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSolicitacoes();
  }, []);


  const autorizarSolicitacao = async (idSolicitacao) => {
    try {
      const url = `${API_BASE_URL}api/solicitacao/atualizar-status/${idSolicitacao}?statusProfessor=Sim`;
      
      const res = await fetch(url, {
        method: 'PUT'
      });

      if (!res.ok) throw new Error('Erro ao autorizar solicitação na API');

      setSolicitacoes(prev => prev.filter(s => s.idSolicitacao !== idSolicitacao));

    } catch (err) {
      console.error(err);
      alert('Erro ao autorizar solicitação');
    }
  };



  return (
    <div className="tabela-container">
      <CabecalhoPages>
        <li key="inicial"><Link to="/InicialProfessor">Início</Link></li>
        <li key="sol"><Link to="/solicitacaoprofessor">Solicitações</Link></li>
        <li key="visuconta"><Link to="/VisualizarContaprofessor">Conta</Link></li>
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
      ) : (
        <div className="painel-grid">
        {solicitacoes.map((solicitacao, index) => (
            <CardSolicitacao
              key={`${solicitacao.idSolicitacao}-${index}`}
              aluno={solicitacao}
              onAutorizar={autorizarSolicitacao}
            />
          ))}

        </div>
      )}

      <Rodape />
    </div>
  );
};

export default SolicitacaoProfessor;
