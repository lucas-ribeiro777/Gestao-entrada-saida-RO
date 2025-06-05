import './InicialAluno.css';

function InicialAluno() {
  return (
    <>
      <header>
        <img src="logo.png" alt="Logo" className="logo" />
      </header>

      <nav>
        <div className="novo-container">
          <p className="inicio">Início</p>
          <p>Ocorrências</p>
          <p>Solicitações</p>
          <p>Conta</p>
        </div>
      </nav>

      <main>
        <div className="profile-section">
          <div>
            <img src="perfil.png" alt="Foto" className="profile-pic" />
            <h2>Giovanna Santos</h2>
          </div>

          <div className="info-cards">
            <div className="card">
              <div className="card-title">HISTÓRICO DO DIA</div>
              <div className="card-content">
                <p>07:50 - Entrada Autorizada</p>
                <p>09:51 - Saída Autorizada</p>
              </div>
            </div>

            <div className="card">
              <div className="card-title">RESPONSÁVEIS DO ALUNO</div>
              <div className="card-content">
                <p>Antônio Carlos Marçal</p>
                <p>Maria De Lurdes</p>
              </div>
            </div>
          </div>
        </div>
      </main>

            <footer>
        <div className="footer-coluna">
          <div className="titulo-duvidas">DÚVIDAS? ENTRE EM CONTATO!</div>
          <div className="infos">
            <div className="contato">(XX) XXXXX-XXXX</div>
            <div className="contato">📞 (XX) XXXX-XXXX</div>
            <div className="contato">(XX) XXXX-XXXX</div>
          </div>
        </div>
        <div className="footer-coluna">
          <div className="venha">VENHA NOS VISITAR!</div>
          <div className="infos">
            <div>
              R. Aristeu Rodrigues Sampaio, 271 - Jardim das Nações, Lençóis Paulista - SP, 18685-730
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default InicialAluno;
