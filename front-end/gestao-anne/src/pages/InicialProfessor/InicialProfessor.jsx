import './InicialProfessor.css';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Rodape from '../../components/Rodape/Rodape';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';

function InicialProfessor() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [ocorrencias, setOcorrencias] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/solicitacoes')
      .then(res => res.json())
      .then(data => {
        const hoje = new Date().toISOString().split("T")[0];
        const solicitacoesDoDia = data.filter((s) =>
          s.datahora.startsWith(hoje)
        );
        setSolicitacoes(solicitacoesDoDia);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/ocorrencias')
      .then(res => res.json())
      .then(data => {
        const hoje = new Date().toISOString().split("T")[0];
        const ocorrenciasDoDia = data.filter((o) =>
          o.datahora.startsWith(hoje)
        );
        setOcorrencias(ocorrenciasDoDia);
      });
  }, []);

  const handleAddOcorrencia = () => {
    const nome = prompt('Nome do aluno:');
    if (!nome) return;
    const curso = prompt('Curso do aluno:');
    if (!curso) return;
    const nova = {
      nomeAluno: nome,
      curso: curso,
      datahora: new Date().toISOString(),
    };
    setOcorrencias(prev => [...prev, nova]);
  };

  return (
    <>
      <CabecalhoPages>
        <li><Link to="/InicialProfessor">Início</Link></li>
        <li><Link to="/visualizarocorrenciasprofessor">Ocorrências</Link></li>
        <li><Link to="/visualizarsolicitacoesprofessor">Solicitações</Link></li>
        <li><Link to="/VisualizarContaprofessor">Conta</Link></li>
      </CabecalhoPages>

      <div className="content-area-professor">
        <section className="secao-solicitacoes-professor">
          <h2>SOLICITAÇÕES DE HOJE</h2>
          <div className="tabela-professor">
            <div className="linha-professor header-professor">
              <span>ALUNO</span>
              <span>CURSO</span>
              <span>AUTORIZAR</span>
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
                  <span>
                    <label className="switch-professor">
                      <input type="checkbox" />
                      <span className="slider-professor round-professor"></span>
                    </label>
                  </span>
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
              <span>DEVOLUTIVA</span>
            </div>
            {ocorrencias.map((o, i) => (
              <div className="linha-professor" key={i}>
                <span>{o.nomeAluno}</span>
                <span>{o.curso}</span>
                <span>
                  <label className="switch-professor switch-orange-professor">
                    <input type="checkbox" defaultChecked />
                    <span className="slider-professor round-professor"></span>
                  </label>
                </span>
              </div>
            ))}
          </div>

          <button
            className="btn-adicionar-ocorrencia-professor"
            onClick={handleAddOcorrencia}
          >
            ADICIONAR NOVA OCORRÊNCIA
          </button>
        </section>
      </div>

      <Rodape />
    </>
  );
}

export default InicialProfessor;
