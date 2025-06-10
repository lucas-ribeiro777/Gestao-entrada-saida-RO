import React from 'react';
import './InicialAluno.css';
import Rodape from '../../components/Rodape/Rodape';

function InicialAluno() {
  return (
    <div className="pagina-inicial">
      <div className="logo-container">
        <img src="./images/LogoSenaiSemAsEscritaDoLado.png" alt="Logo" />
      </div>

      <div className="novo-container">
        <p className="inicio">Início</p>
        <p>Ocorrências</p>
        <p>Solicitações</p>
        <p>Conta</p>
      </div>

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

      <main></main>

<Rodape />
</div>
  );
}

export default InicialAluno;
