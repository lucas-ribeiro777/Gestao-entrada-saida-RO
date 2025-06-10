import './CabecalhoPages.css';
import { NavLink } from 'react-router-dom';

function CabecalhoPages() {
  return (
    <>
      <div className="topo-responsavel">
        <img src="./images/LogoSenaiSemAsEscritaDoLado.png" alt="SENAI" />
      </div>
      <div className="menu-responsavel">
        <ul>
          <li>
            <NavLink
              to="/InicialResponsavel"
              className={({ isActive }) => isActive ? "ativo" : "nativo"}
            >
              INICIO
            </NavLink>
            <li>|</li>
          </li>
          <li>
            <NavLink
              to="/autorizacao"
              className={({ isActive }) => isActive ? "ativo" : "nativo"}
            >
              AUTORIZAR ENTRADA/SAÍDA
            </NavLink>
            <li>|</li>
          </li>
          <li>
            <NavLink
              to="/VisualizacaoResponsavel"
              className={({ isActive }) => isActive ? "ativo" : "nativo"}
            >
              CONTA
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default CabecalhoPages;
