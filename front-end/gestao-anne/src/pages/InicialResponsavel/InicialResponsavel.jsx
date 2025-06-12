import React from 'react';
import './InicialResponsavel.css';
import { NavLink } from 'react-router-dom';
import Rodape from '../../components/Rodape/Rodape';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';

const InicialResponsavel = () => {
  return (
    <div className="InicialResponsavel">
      <CabecalhoPages>
        <ul className="menu-links">
          <li>
            <NavLink
              to="/InicialResponsavel"
              className={({ isActive }) => (isActive ? "ativo" : "nativo")}
            >
              INÍCIO
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/autorizarEntradaSaida"
              className={({ isActive }) => (isActive ? "ativo" : "nativo")}
            >
              AUTORIZAR ENTRADA/SAÍDA
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/VisualizacaoResponsavel"
              className={({ isActive }) => (isActive ? "ativo" : "nativo")}
            >
              CONTA
            </NavLink>
          </li>
        </ul>
      </CabecalhoPages>

      <main>
        <div className="container">

          {/* Aluno Pedro */}
          <div className="aluno-card">
            <div className="aluno-header">
              <div className="aluno-info">
                <img src="/caminho/para/foto.jpg" alt="Pedro Rocha Carvalho" className="aluno-foto" />
                <div className="aluno-texto">
                  <h3>Pedro Rocha Carvalho</h3>
                  <p>Banco de Dados</p>
                  <p>Lógica de Programação</p>
                </div>
              </div>
              <a href="#" className="visualizar-link">Visualizar</a>
            </div>

            <div className="registro saida">
              <span>Saída</span>
              <span>25/05/2025</span>
              <span>09:43</span>
              <span>Banco de Dados</span>
            </div>
            <div className="registro saida">
              <span>Saída</span>
              <span>28/05/2025</span>
              <span>09:59</span>
              <span>Lógica de Programação</span>
            </div>
            <div className="registro entrada">
              <span>Entrada</span>
              <span>31/05/2025</span>
              <span>08:23</span>
              <span>Lógica de Programação</span>
            </div>
            <div className="registro ocorrencia">
              <span>Ocorrência</span>
              <span>21/04/2025</span>
              <span>11:23</span>
              <span>Carlos Cavaleiro</span>
            </div>
            <div className="registro ocorrencia">
              <span>Ocorrência</span>
              <span>21/04/2025</span>
              <span>11:23</span>
              <span>Keylla Andrade</span>
            </div>
          </div>

          {/* Aluno Bruna */}
          <div className="aluno-card">
            <div className="aluno-header">
              <div className="aluno-info">
                <img src="/caminho/para/foto-bruna.jpg" alt="Bruna Rocha Carvalho" className="aluno-foto" />
                <div className="aluno-texto">
                  <h3>Bruna Rocha Carvalho</h3>
                  <p>Técnico em Administração</p>
                </div>
              </div>
              <a href="#" className="visualizar-link">Visualizar</a>
            </div>

            <div className="registro saida">
              <span>Saída</span>
              <span>25/05/2025</span>
              <span>09:43</span>
              <span>Técnico em Administração</span>
            </div>
            <div className="registro saida">
              <span>Saída</span>
              <span>28/05/2025</span>
              <span>09:59</span>
              <span>Técnico em Administração</span>
            </div>
            <div className="registro entrada">
              <span>Entrada</span>
              <span>31/05/2025</span>
              <span>08:23</span>
              <span>Técnico em Administração</span>
            </div>
            <div className="registro ocorrencia">
              <span>Ocorrência</span>
              <span>21/04/2025</span>
              <span>11:23</span>
              <span>Carlos Cavaleiro</span>
            </div>
            <div className="registro ocorrencia">
              <span>Ocorrência</span>
              <span>21/04/2025</span>
              <span>11:23</span>
              <span>Keylla Andrade</span>
            </div>
          </div>
        </div>
      </main>

      <Rodape />
    </div>
  );
};

export default InicialResponsavel;
