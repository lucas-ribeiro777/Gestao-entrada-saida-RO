import './InicialProfessor.css';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Rodape from '../../components/Rodape/Rodape';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import { useNavigate } from "react-router-dom"; 

function InicialProfessor() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [ocorrencias, setOcorrencias] = useState([]);

  useEffect(() => {
    async function fetchDados() {
      try {
        const [solRes, alunosRes] = await Promise.all([
          fetch('http://localhost:3000/solicitacoes'),
          fetch('http://localhost:3000/alunos')
        ]);

        const solicitacoesData = await solRes.json();
        const alunosData = await alunosRes.json();

        const hoje = new Date().toISOString().split("T")[0];

        const solicitacoesDoDia = solicitacoesData.filter(s =>
          s.datahora.startsWith(hoje)
        );

        const solicitacoesComDados = solicitacoesDoDia.map(s => {
          const aluno = alunosData.find(a => String(a.id) === String(s.alunoId));
          return {
            ...s,
            nomeAluno: aluno ? aluno.nome : "Desconhecido",
            curso: aluno ? aluno.curso : "Desconhecido",
          };
        });

        setSolicitacoes(solicitacoesComDados);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }

    fetchDados();
  }, []);

  useEffect(() => {
    const fetchOcorrencias = async () => {
      const resOcorrencias = await fetch("http://localhost:3000/ocorrencias");
      const resAlunos = await fetch("http://localhost:3000/alunos");
      const ocorrenciasData = await resOcorrencias.json();
      const alunosData = await resAlunos.json();

      const hoje = new Date().toISOString().split("T")[0];
      const ocorrenciasHoje = ocorrenciasData
        .filter(o => o.datahora.startsWith(hoje))
        .map(o => {
          const aluno = alunosData.find(a => a.id == o.id_aluno);
          return {
            ...o,
            nomeAluno: aluno?.nome || "Aluno não encontrado",
            curso: aluno?.curso || "Curso desconhecido",
          };
        });

      setOcorrencias(ocorrenciasHoje);
    };

    fetchOcorrencias();
  }, []);


  const navigate = useNavigate();

  const handleAddOcorrencia = () => {
    navigate("/adicionarOcorrencia");
  };

  return (
    <>
      <CabecalhoPages>
        <li key="2"><Link to="/InicialProfessor">Início</Link></li>
        <li key="3"><Link to="/solicitacaoprofessor">Solicitações</Link></li>
        <li key="4"><Link to="/VisualizarContaprofessor">Conta</Link></li>
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
                  <span>{s.nomeAluno}</span>
                  <span>{s.curso}</span>

                </div>
              ))
            )}
          </div>
        </section>

        <section className="secao-ocorrencias-professor">
          <h2>OCORRÊNCIAS DE HOJE</h2>
          <div className="tabela-professor">
            <div className="linha-professor header-professor">
              <span>ALUNO</span>
              <span>CURSO</span>
            </div>
            {ocorrencias.length === 0 ? (
              <div className="linha-professor vazio-professor">
                <span>Ainda não houve ocorrências hoje...</span>
              </div>
            ) : (
              ocorrencias.map((o, i) => (
                <div className="linha-professor" key={i}>
                  <span>{o.nomeAluno}</span>
                  <span>{o.curso}</span>
                  <span>
                    <label className="switch-professor switch-orange-professor">
                      <input type="checkbox" defaultChecked={o.encerramento === 1} />
                      <span className="slider-professor round-professor"></span>
                    </label>
                  </span>
                </div>
              ))
            )}

          </div>

          {/* <button
            className="btn-adicionar-ocorrencia-professor"
            onClick={handleAddOcorrencia}
          >
            ADICIONAR NOVA OCORRÊNCIA
          </button> */}
        </section>
      </div>

      <Rodape />
    </>
  );
}

export default InicialProfessor;
