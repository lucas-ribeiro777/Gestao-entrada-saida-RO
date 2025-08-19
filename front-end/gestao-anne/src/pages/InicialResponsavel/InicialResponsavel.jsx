
  import React from 'react';
  import './InicialResponsavel.css';
  import { NavLink } from 'react-router-dom';
  import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
  import homemImg from './imagens/homen.jpg';
  import mulherImg from './imagens/mulher.jpg';
import { useEffect, useState } from "react";
import Rodape from "../../components/Rodape/Rodape";
import BoxAluno from "../../components/BoxAluno/BoxAluno";
import DetalhesAluno from "../../components/DetalhesAluno/DetalhesAluno";
import { Link, useLocation } from "react-router-dom";
import "./InicialResponsavel.css";

function InicialResponsavel() {
  const [responsaveis, setResponsaveis] = useState([]);
  const [responsavel, setResponsavel] = useState(null);
  const [alunos, setAlunos] = useState([]);
  const [alunoExpandido, setAlunoExpandido] = useState(null);

  const location = useLocation();

  // Exemplo: id do responsável logado (pode vir do contexto, auth, etc)
  const idResponsavelLogado = 1;

  // Buscar responsáveis
  useEffect(() => {
    fetch("http://localhost:3000/responsaveis")
      .then((res) => res.json())
      .then((data) => setResponsaveis(data))
      .catch((err) => console.error("Erro ao buscar responsáveis:", err));
  }, []);

  // Encontrar responsável logado e buscar alunos filhos
  useEffect(() => {
    if (responsaveis.length === 0) return;

    // Encontrar responsável, convertendo id para number para garantir
    const resp = responsaveis.find(
      (r) => Number(r.id) === idResponsavelLogado
    );
    setResponsavel(resp);

    if (!resp) {
      setAlunos([]);
      return;
    }

    // Pega o(s) id(s) dos alunos do responsável (suporta array ou único)
    const idsAlunos = Array.isArray(resp.id_aluno)
      ? resp.id_aluno
      : [resp.id_aluno];

    // Buscar dados dos alunos filhos
    Promise.all(
      idsAlunos.map((idAluno) =>
        fetch(`http://localhost:3000/alunos/${idAluno}`).then((res) => res.json())
      )
    )
      .then((dadosAlunos) => setAlunos(dadosAlunos))
      .catch((err) => console.error("Erro ao buscar alunos:", err));
  }, [responsaveis]);



  return (
    <>
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
      <div className="space"></div>
      <div className="container-responsavel">
        {alunos.length === 0 && <p>Nenhum aluno encontrado para este responsável.</p>}

        <div className="lista-alunos">
          {alunos.map((aluno, index) => (
            <div key={aluno.id}>
              <BoxAluno
                imagem={aluno.imagem || "/images/perfil.png"}
                nome={aluno.nome}
                curso={aluno.curso}
                onVisualizar={() =>
                  setAlunoExpandido(alunoExpandido === aluno.id ? null : aluno.id)
                }
                cor={index % 2 === 0 ? "claro" : "escuro"}
              />
              {alunoExpandido === aluno.id && (
                <DetalhesAluno idAluno={Number(aluno.id)} curso={aluno.curso} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="space"></div>

      <Rodape />
    </>
  );
}

  export default InicialResponsavel;
