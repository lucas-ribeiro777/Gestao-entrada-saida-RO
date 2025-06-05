import './MenuCadastro.css';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


function MenuCadastro() {
  return (
    <>
      <div className="topo">
        <img src="./images/SENAI_logo_texto.png" alt="SENAI" />
      </div>
      <div className="menu">
        <ul>
          <li>  <NavLink
          to="/"
          className={({ isActive }) => isActive ? "ativo" : "nativo"}
        >
          SOU ALUNO
        </NavLink></li>
          <li>|</li>
          <li>  <NavLink
            to="/docente"
            className={({ isActive }) => isActive ? "ativo" : "nativo"}
          >
            SOU DOCENTE
          </NavLink></li>
          <li>|</li>
          <li>  <NavLink
            to="/responsavel"
            className={({ isActive }) => isActive ? "ativo" : "nativo"}
          >
            SOU RESPONSÁVEL
          </NavLink></li>
          <li>|</li>
          <li>  <NavLink
            to="/coordenacao"
            className={({ isActive }) => isActive ? "ativo" : "nativo"}
          >
            SOU COORDENAÇÃO
          </NavLink></li>
        </ul>
      </div>
    </>
  );
}

export default MenuCadastro;
