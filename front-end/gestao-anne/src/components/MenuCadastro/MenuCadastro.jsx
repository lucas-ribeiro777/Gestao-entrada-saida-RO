import './MenuCadastro.css';

function MenuCadastro() {
  return (
    <>
      <div className="topo">
        <img src="./images/SENAI_logo_texto.png" alt="SENAI"/>
      </div>
      <div className="menu">
          <ul>
              <li>SOU ALUNO</li>
              <li>|</li>
              <li>SOU DOCENTE</li>
              <li>|</li>
              <li>SOU RESPONSÁVEL</li>
              <li>|</li>
              <li>SOU COORDENAÇÃO</li>
          </ul>
      </div>
    </>
  );
}

export default MenuCadastro;