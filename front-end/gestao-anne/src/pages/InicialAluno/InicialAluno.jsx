import './InicialAluno.css';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import CaixaInfos from "../../components/CaixaInfos/CaixaInfos";
import Rodape from '../../components/Rodape/Rodape';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';

function InicialAluno() {
  const [historico, setHistorico] = useState([]);
  const [responsaveis, setResponsaveis] = useState([]);

  const idAluno = 1; 

  useEffect(() => {
    fetch(`http://localhost:3000/solicitacoes?id_aluno=${idAluno}`)
      .then(res => res.json())
      .then(data => {
        const hoje = new Date().toISOString().split("T")[0];
        const historicoDoDia = data.filter((s) => s.datahora.startsWith(hoje));

        const textosFormatados = historicoDoDia.map(s => {
          const hora = s.datahora.slice(11, 16); 
          return `${hora} - ${s.tipo} Autorizada`;
        });

        setHistorico(textosFormatados);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/responsaveis?id_aluno=${idAluno}`)
      .then(res => res.json())
      .then(data => {
        const nomes = data.map(r => r.nome);
        setResponsaveis(nomes);
      });
  }, []);

  return (
    <>
      <CabecalhoPages>
        <li><Link to="/InicialAluno">Início</Link></li>
        <li><Link to="/visualizarocorrenciasaluno">Ocorrências</Link></li>
        <li><Link to="/visualizarsolicitacaoaluno">Solicitações</Link></li>
        <li><Link to="/VisualizarContaaluno">Conta</Link></li>
      </CabecalhoPages>

      <div className="content-area">
        <div className="caixas">
          <CaixaInfos titulo="HISTÓRICO DO DIA" itens={historico} />
          <CaixaInfos titulo="RESPONSÁVEIS DO ALUNO" itens={responsaveis} />
        </div>
      </div>

      <Rodape />
    </>
  );
}

export default InicialAluno;
