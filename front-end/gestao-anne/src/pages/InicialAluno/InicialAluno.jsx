import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InicialAluno.css';
import Rodape from '../../components/Rodape/Rodape';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import { Link } from 'react-router-dom';

function InicialAluno() {

  return (
    <>
      <CabecalhoPages>
        <li key="inicio"><Link to="/InicialAluno">Início</Link></li>
        <li key="ocorrencias"><Link to="/visualizarocorrenciasaluno">Ocorrências</Link></li>
        <li key="solicitacoes"><Link to="/visualizarsolicitacaoaluno">Solicitações</Link></li>
        <li key="conta"><Link to="/VisualizarContaaluno">Conta</Link></li>
      </CabecalhoPages>

      <div className="content-area">
        <div className="caixas">
          <div className="caixa">
            <div className="titulo-caixa">HISTÓRICO DO DIA</div>
            <div className="item">07:50 - Entrada Autorizada</div>
            <div className="linha"></div>
            <div className="item">09:51 - Saída Autorizada</div>
          </div>

          <div className="caixa">
            <div className="titulo-caixa">RESPONSÁVEIS DO ALUNO</div>
            <div className="item">Antônio Carlos Marçal</div>
            <div className="linha"></div>
            <div className="item">Maria De Lurdes</div>
          </div>
        </div>
      </div>

      <main></main>

      <Rodape />
    </>
  );
}

export default InicialAluno;
