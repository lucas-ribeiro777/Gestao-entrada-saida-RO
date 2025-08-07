
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


  const InicialResponsavel = () => {
    return (
      <div className="InicialResponsavel">
        <CabecalhoPages>
          <ul className="menu-links">
            <li>
              <NavLink to="/InicialResponsavel" className={({ isActive }) => (isActive ? "ativo" : "nativo")}>INÍCIO</NavLink>
            </li>
            <li>
              <NavLink to="/autorizarEntradaSaida" className={({ isActive }) => (isActive ? "ativo" : "nativo")}>AUTORIZAR ENTRADA/SAÍDA</NavLink>
            </li>
            <li>
              <NavLink to="/VisualizacaoResponsavel" className={({ isActive }) => (isActive ? "ativo" : "nativo")}>CONTA</NavLink>
            </li>
          </ul>
        </CabecalhoPages>

        <main>
          <div className="container">
            {[{
              nome: "Pedro Rocha Carvalho",
              curso: ["Banco de Dados", "Lógica de Programação"],
              imagem: homemImg,
              registros: [
                { tipo: "saida", data: "25/05/2025", hora: "09:43", detalhe: "Banco de Dados" },
                { tipo: "saida", data: "28/05/2025", hora: "09:59", detalhe: "Lógica de Programação" },
                { tipo: "entrada", data: "31/05/2025", hora: "08:23", detalhe: "Lógica de Programação" },
                { tipo: "ocorrencia", data: "21/04/2025", hora: "11:23", detalhe: "Carlos Cavaleiro" },
                { tipo: "ocorrencia", data: "21/04/2025", hora: "11:23", detalhe: "Keylla Andrade" }
              ]
            }, {
              nome: "Bruna Rocha Carvalho",
              curso: ["Técnico em Administração"],
              imagem: mulherImg,
              registros: [
                { tipo: "saida", data: "25/05/2025", hora: "09:43", detalhe: "Técnico em Administração" },
                { tipo: "saida", data: "28/05/2025", hora: "09:59", detalhe: "Técnico em Administração" },
                { tipo: "entrada", data: "31/05/2025", hora: "08:23", detalhe: "Técnico em Administração" },
                { tipo: "ocorrencia", data: "21/04/2025", hora: "11:23", detalhe: "Carlos Cavaleiro" },
                { tipo: "ocorrencia", data: "21/04/2025", hora: "11:23", detalhe: "Keylla Andrade" }
              ]
            }].map((aluno, index) => (
              <div className="aluno-card" key={index}>
                <div className="aluno-header">
                  <img src={aluno.imagem} alt={`Foto de ${aluno.nome}`} className="aluno-foto" />
                  <div className="aluno-info">
                    <h3>{aluno.nome}</h3>
                    {aluno.curso.map((curso, i) => (
                      <p key={i}>{curso}</p>
                    ))}
                  </div>
                  <a href="#" className="visualizar-link">Visualizar</a>
                </div>
                <div className="registros">
                  {aluno.registros.map((reg, i) => (
                    <div className={`registro ${reg.tipo}`} key={i}>
                      <span>{reg.tipo.charAt(0).toUpperCase() + reg.tipo.slice(1)}</span>
                      <span>{reg.data}</span>
                      <span>{reg.hora}</span>
                      <span>{reg.detalhe}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>

        <Rodape />
      </div>
    );
  };

  return (
    <>
      <CabecalhoPages rotaAtual={location.pathname}>
        <li key="inicio">
          <Link to="/#">Início</Link>
        </li>
        <li key="ocorrencias">
          <Link to="/#">Ocorrências</Link>
        </li>
        <li key="solicitacoes">
          <Link to="/#">Solicitações</Link>
        </li>
        <li key="conta">
          <Link to="/VisualizarContaResponsavel">Conta</Link>
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
