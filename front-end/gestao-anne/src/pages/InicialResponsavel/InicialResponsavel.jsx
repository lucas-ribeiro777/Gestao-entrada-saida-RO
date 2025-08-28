import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./InicialResponsavel.css";
import CabecalhoPages from "../../components/CabecalhoPages/CabecalhoPages";
import Rodape from "../../components/Rodape/Rodape";
import BoxAluno from "../../components/BoxAluno/BoxAluno";
import DetalhesAluno from "../../components/DetalhesAluno/DetalhesAluno";

function InicialResponsavel() {
  const [responsavel, setResponsavel] = useState(null);
  const [alunos, setAlunos] = useState([]);
  const [alunoExpandido, setAlunoExpandido] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // --- Verifica login ---
  const idResponsavelLogado = localStorage.getItem("usuarioId");
  useEffect(() => {
    if (!idResponsavelLogado) {
      navigate("/Login"); // redireciona se não estiver logado
    }
  }, [idResponsavelLogado, navigate]);

  // --- Buscar dados do responsável e alunos ---
  useEffect(() => {
    if (!idResponsavelLogado) return;

    const buscarResponsavel = async () => {
      try {
        // 1. Buscar responsável
        const res = await fetch(
          `http://10.90.146.16:5121/api/Responsaveis/${idResponsavelLogado}`
        );
        if (!res.ok) throw new Error("Falha ao buscar responsável");
        const resp = await res.json();
        setResponsavel(resp);

        console.log("Dados do responsável:", resp);

        // 2. Pegar IDs dos alunos do responsável
        const idsAlunos = Array.isArray(resp.idsAlunos)
          ? resp.idsAlunos
          : resp.idsAlunos !== undefined
          ? [resp.idsAlunos]
          : [];

        console.log("IDs dos alunos:", idsAlunos);

        // 3. Buscar dados dos alunos e normalizar objeto
        const dadosAlunos = await Promise.all(
          idsAlunos.map(async (idAluno) => {
            const resAluno = await fetch(
              `http://10.90.146.16:5121/api/Aluno/${idAluno}`
            );
            if (!resAluno.ok) throw new Error("Falha ao buscar aluno");
            const alunoData = await resAluno.json();

            // Normaliza sempre para ter aluno.id
            return {
              id: alunoData.id ?? alunoData.idAluno ?? idAluno,
              nome: alunoData.nome,
              curso: alunoData.curso,
              imagem: alunoData.imagem,
            };
          })
        );

        setAlunos(dadosAlunos);
      } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
      }
    };
    buscarResponsavel();
  }, [idResponsavelLogado]);

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
        {alunos.length === 0 && (
          <p>Nenhum aluno encontrado para este responsável.</p>
        )}

        <div className="lista-alunos">
          {alunos.map((aluno, index) => (
            <div key={aluno.id}>
              <BoxAluno
                imagem={
                  aluno.imagem
                    ? `http://10.90.146.16:5121${aluno.imagem}`
                    : "/images/perfil.png"
                }
                nome={aluno.nome}
                curso={aluno.curso}
                onVisualizar={() =>
                  setAlunoExpandido(
                    alunoExpandido === aluno.id ? null : aluno.id
                  )
                }
                cor={index % 2 === 0 ? "claro" : "escuro"}
              />

              {alunoExpandido === aluno.id && (
                <DetalhesAluno idAluno={aluno.id} curso={aluno.curso} />
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
