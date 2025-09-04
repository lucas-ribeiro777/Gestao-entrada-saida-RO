import './InicialProfessor.css';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Rodape from '../../components/Rodape/Rodape';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import { API_BASE_URL } from '../../constantes';

function InicialProfessor() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [professorCursos, setProfessorCursos] = useState([]);

  useEffect(() => {
    async function fetchDados() {
      try {
        const usuarioId = Number(localStorage.getItem("usuarioId"));

        // Buscar professor logado
        const resProfessor = await fetch(`${API_BASE_URL}api/Professor/${usuarioId}`);
        if (!resProfessor.ok) throw new Error("Erro ao buscar professor");
        const dadosProfessor = await resProfessor.json();
        setProfessorCursos(dadosProfessor.cursosIds);

        // Buscar solicitações dos últimos 7 dias
        const resSolicitacoes = await fetch(`${API_BASE_URL}api/Solicitacao/periodo/7dias`);
        if (!resSolicitacoes.ok) throw new Error("Erro ao buscar solicitações");
        const dadosSolicitacoes = await resSolicitacoes.json();

        // Buscar alunos
        const resAlunos = await fetch(`${API_BASE_URL}api/Aluno`);
        if (!resAlunos.ok) throw new Error("Erro ao buscar alunos");
        const dadosAlunos = await resAlunos.json();
        setAlunos(dadosAlunos);

        // Buscar cursos
        const resCursos = await fetch(`${API_BASE_URL}api/Grafico/cursos`);
        if (!resCursos.ok) throw new Error("Erro ao buscar cursos");
        const dadosCursos = await resCursos.json();
        setCursos(dadosCursos);

        // Filtrar apenas solicitações do dia e do curso do professor
        const hoje = new Date().toISOString().split("T")[0];
        const solicitacoesHoje = dadosSolicitacoes
          .filter(s => s.dataHora.startsWith(hoje))
          .filter(s => dadosProfessor.cursosIds.includes(s.idNomeCurso));

        // Mapear nomes de aluno e curso
        const solicitacoesComNomes = solicitacoesHoje.map(s => {
          const aluno = dadosAlunos.find(a => Number(a.idAlunos) === Number(s.idAlunos));
          const curso = dadosCursos.find(c => Number(c.idCurso) === Number(s.idNomeCurso));
          return {
            ...s,
            nome: aluno ? aluno.nome : "Aluno não informado",
            nomeCurso: curso ? curso.nomeCurso : "Curso não informado"
          };
        });

        setSolicitacoes(solicitacoesComNomes);

      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }

    fetchDados();
  }, []);

  return (
    <>
      <CabecalhoPages>
        <li key="inicio"><Link to="/InicialProfessor">Início</Link></li>
        <li key="solicitacoes"><Link to="/solicitacaoprofessor">Solicitações</Link></li>
        <li key="conta"><Link to="/VisualizarContaprofessor">Conta</Link></li>
      </CabecalhoPages>

      <div className="content-area-professor">
        <section className="secao-solicitacoes-professor">
          <h2>SOLICITAÇÕES DE HOJE</h2>
          <div className="tabela-professor">
            <div className="linha-professor header-professor">
              <span>ALUNO</span>
              <span>CURSO</span>
            </div>
            {solicitacoes.length === 0 ? (
              <div className="linha-professor vazio-professor">
                <span>Ainda não houve solicitações hoje...</span>
              </div>
            ) : (
              solicitacoes.map((s, i) => (
                <div className="linha-professor" key={i}>
                  <span>{s.nome}</span>
                  <span>{s.nomeCurso}</span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <Rodape />
    </>
  );
}

export default InicialProfessor;
