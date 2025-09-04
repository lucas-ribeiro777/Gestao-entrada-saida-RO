import './Ranking.css';
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from '../../constantes';

function Ranking() {
  const [ranking, setRanking] = useState({ entradas: [], saidas: [] });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarSolicitacoes() {
      try {
        const res = await fetch(`${API_BASE_URL}api/Solicitacao/periodo/1mes`);
        if (!res.ok) throw new Error("Erro ao buscar solicitações");
        const dados = await res.json();
        console.log("Dados recebidos:", dados); // <--- Aqui


        const idsAlunos = [...new Set(dados.map(s => s.idAlunos))];

        const mapIdNome = {};
        await Promise.all(idsAlunos.map(async id => {
          try {
            const resAluno = await fetch(`${API_BASE_URL}api/Aluno/${id}`);
            if (!resAluno.ok) throw new Error("Erro ao buscar aluno");
            const aluno = await resAluno.json();
            mapIdNome[id] = aluno.nome || `Aluno ${id}`;
          } catch {
            mapIdNome[id] = `Aluno ${id}`;
          }
        }));

        // Map de nomeAluno para contagem
        const mapEntradas = {};
        const mapSaidas = {};

        for (let s of dados) {
          const nomeAluno = mapIdNome[s.idAlunos];
          if (s.tipo === "Entrada") {
            mapEntradas[nomeAluno] = (mapEntradas[nomeAluno] || 0) + 1;
          } else if (s.tipo === "Saída") {
            mapSaidas[nomeAluno] = (mapSaidas[nomeAluno] || 0) + 1;
          }
        }

        const entradas = Object.entries(mapEntradas)
          .map(([nome, quantidade]) => ({ nome, quantidade }))
          .sort((a, b) => b.quantidade - a.quantidade)
          .slice(0, 5); // Top 5

        const saidas = Object.entries(mapSaidas)
          .map(([nome, quantidade]) => ({ nome, quantidade }))
          .sort((a, b) => b.quantidade - a.quantidade)
          .slice(0, 5); // Top 5

        setRanking({ entradas, saidas });
        setCarregando(false);
      } catch (err) {
        console.error(err);
        setCarregando(false);
      }
    }

    buscarSolicitacoes();
  }, []);

  if (carregando) return <p>Carregando ranking...</p>;

  return (
    <>
    <h2>Ranking de Solicitações</h2>
    <div className="ranking-container">

      <div className="divisoes">
        <div className="ranking-section">
          <h3>Solicitações de entrada</h3>
          {ranking.entradas.length === 0 ? (
            <p className="ranking-empty">Nenhuma solicitação encontrada.</p>
          ) : (
            <ul className="ranking-list">
              {ranking.entradas.map((aluno, i) => (
                <li key={i}>
                  <span>{aluno.nome}</span>
                  <span>{aluno.quantidade}x</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="ranking-section saidas">
          <h3>Solicitações de saída</h3>
          {ranking.saidas.length === 0 ? (
            <p className="ranking-empty">Nenhuma solicitação encontrada.</p>
          ) : (
            <ul className="ranking-list">
              {ranking.saidas.map((aluno, i) => (
                <li key={i}>
                  <span>{aluno.nome}</span>
                  <span>{aluno.quantidade}x</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default Ranking;
