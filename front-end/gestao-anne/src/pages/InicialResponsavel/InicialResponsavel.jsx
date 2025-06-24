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
            <NavLink to="/InicialResponsavel" className={({ isActive }) => (isActive ? "ativo" : "nativo")}>INÍCIO</NavLink>
          </li>
          <li>
            <NavLink to="/autorizarEntradaSaida" className={({ isActive }) => (isActive ? "ativo" : "nativo")}>AUTORIZAR ENTRADA/SAÍDA</NavLink>
          </li>
          <li>
            <NavLink to="/VisualizacaoResponsavel" className={({ isActive }) => (isActive ? "ativo" : "nativo")}>CONTA</NavLink>
          </li>
        </ul>
      </CabecalhoPages>

      <main>
        <div className="container">
          {[{
            nome: "Pedro Rocha Carvalho",
            curso: ["Banco de Dados", "Lógica de Programação"],
            imagem: "/caminho/para/foto.jpg",
            registros: [
              { tipo: "saida", data: "25/05/2025", hora: "09:43", detalhe: "Banco de Dados" },
              { tipo: "saida", data: "28/05/2025", hora: "09:59", detalhe: "Lógica de Programação" },
              { tipo: "entrada", data: "31/05/2025", hora: "08:23", detalhe: "Lógica de Programação" },
              { tipo: "ocorrencia", data: "21/04/2025", hora: "11:23", detalhe: "Carlos Cavaleiro" },
              { tipo: "ocorrencia", data: "21/04/2025", hora: "11:23", detalhe: "Keylla Andrade" }
            ]
          }, {
            nome: "Bruna Rocha Carvalho",
            curso: ["Técnico em Administração"],
            imagem: "/caminho/para/foto-bruna.jpg",
            registros: [
              { tipo: "saida", data: "25/05/2025", hora: "09:43", detalhe: "Técnico em Administração" },
              { tipo: "saida", data: "28/05/2025", hora: "09:59", detalhe: "Técnico em Administração" },
              { tipo: "entrada", data: "31/05/2025", hora: "08:23", detalhe: "Técnico em Administração" },
              { tipo: "ocorrencia", data: "21/04/2025", hora: "11:23", detalhe: "Carlos Cavaleiro" },
              { tipo: "ocorrencia", data: "21/04/2025", hora: "11:23", detalhe: "Keylla Andrade" }
            ]
          }].map((aluno, index) => (
            <div className="aluno-card" key={index}>
              <div className="aluno-header">
                <img src={aluno.imagem} alt={`Foto de ${aluno.nome}`} className="aluno-foto" />
                <div className="aluno-info">
                  <h3>{aluno.nome}</h3>
                  {aluno.curso.map((curso, i) => (
                    <p key={i}>{curso}</p>
                  ))}
                </div>
                <a href="#" className="visualizar-link">Visualizar</a>
              </div>
              <div className="registros">
                {aluno.registros.map((reg, i) => (
                  <div className={`registro ${reg.tipo}`} key={i}>
                    <span>{reg.tipo.charAt(0).toUpperCase() + reg.tipo.slice(1)}</span>
                    <span>{reg.data}</span>
                    <span>{reg.hora}</span>
                    <span>{reg.detalhe}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Rodape />
    </div>
  );
};

export default InicialResponsavel;
