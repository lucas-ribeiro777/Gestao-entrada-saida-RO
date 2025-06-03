import './MenuCadastro.css';
import { Link } from 'react-router-dom';

function MenuCadastro() {
  return (
    <>
      <div className="topo">
        <img src="./images/SENAI_logo_texto.png" alt="SENAI" />
      </div>
      <div className="menu">
        <ul>
          <li><Link to="/">SOU ALUNO</Link></li>
          <li>|</li>
          <li><Link to="/docente">SOU DOCENTE</Link></li>
          <li>|</li>
          <li><Link to="/responsavel">SOU RESPONSÁVEL</Link></li>
          <li>|</li>
          <li><Link to="/coordenacao">SOU COORDENAÇÃO</Link></li>
        </ul>
      </div>
    </>
  );
}

export default MenuCadastro;
