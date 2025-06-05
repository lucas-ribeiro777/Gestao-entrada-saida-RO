import React from "react";
import "./inicioAluno.css";

function InicialAluno() {
  return (
    <div className="pagina-inicial">
      {/* LOGO */}
      <div className="logo-container">
        <img src="./images/LogoSenaiSemAsEscritaDoLado.png" alt="Logo" />
      </div>

      {/* CU */}
      <div className="novo-container">
        <p className="inicio">Início</p>
        <p>Ocorrências</p>
        <p>Solicitações</p>
        <p>Conta</p>
      </div>

      {/* CAIXAS MODAL SEI LA */}
      <div className="caixas">
        {/* CAIXA HISTORICO */}
        <div className="caixa">
          <div className="titulo-caixa">HISTÓRICO DO DIA</div>
          <div className="item">07:50 - Entrada Autorizada</div>
          <div className="linha"></div>
          <div className="item">09:51 - Saída Autorizada</div>
        </div>

        {/* CAIXA RESPONSAVEIS */}
        <div className="caixa">
          <div className="titulo-caixa">RESPONSÁVEIS DO ALUNO</div>
          <div className="item">Antônio Carlos Marçal</div>
          <div className="linha"></div>
          <div className="item">Maria De Lurdes</div>
        </div>
      </div>

      {/* MAIN */}
      <main>
        <h1></h1>
      </main>

      {/* RODAPE */}
      <footer>
        <div className="footer-coluna">
          <p className="titulo-duvidas">DÚVIDAS? ENTRE EM CONTATO!</p>
          <div className="infos">
            <div className="contato">(XX) XXXXX-XXXX</div>
            <div className="contato">📞 (XX) XXXX-XXXX</div>
          </div>
        </div>
        <div className="footer-coluna">
          <p className="venha">VENHA NOS VISITAR!</p>
          <p>
            <strong>R. Aristeu Rodrigues Sampaio, 271 - Jardim das</strong>
          </p>
          <p>Nacoes, Lençóis Paulista - SP, 18685-730</p>
        </div>
      </footer>
    </div>
  );
}

export default InicialAluno;
