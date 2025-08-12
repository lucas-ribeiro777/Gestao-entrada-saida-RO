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
        {/* <li><Link to="/visualizarocorrenciasaluno">Ocorrências</Link></li> */}
        <li><Link to="/visualizarsolicitacaoaluno">Solicitações</Link></li>
        <li><Link to="/VisualizarContaaluno">Conta</Link></li>
      </CabecalhoPages>

       <div className="pagina-inicial"> {/* <- ADICIONE ISSO AQUI */}
    <main className="content-area">
      <div className="caixas">
        {historico.length > 0 ? (
        <CaixaInfos titulo="HISTÓRICO DO DIA" itens={historico} />
          ) : (
          <div className="caixa-vazia">
            <div className="titulo-caixa"><h2>HISTÓRICO DO DIA</h2></div>
            <img src="/images/lupa.png" alt="Nenhuma solicitação" />
            <img src="/images/joia-baixa.png" alt="Nenhuma solicitação" />
            <p>Nenhuma solicitação registrada hoje.</p>
          </div>
    )}

        <CaixaInfos titulo="RESPONSÁVEIS DO ALUNO" itens={responsaveis} />
      </div>
    </main>

  </div>

      <Rodape />
    </>
  );
}

export default InicialAluno;
