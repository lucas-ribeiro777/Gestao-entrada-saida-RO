import React from 'react';
import './InicialResponsavel.css';
import Rodape from '../../components/Rodape/Rodape';

const InicialResponsavel = () => {
  return (
    <div className="InicialResponsavel">
      <header className="header">
        <img src="senai-logo.png" alt="SENAI Logo" className="logo" />
        <h1>GESTÃO DE ENTRADAS E SAÍDAS</h1>
      </header>

      <main>
        <div className="container">
          <h2>Registros de Alunos</h2>
          <table className="registro-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Curso</th>
                <th>Saídas</th>
                <th>Entradas</th>
                <th>Ocorrências</th>
                <th>Detalhes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pedro Rocha Carvalho</td>
                <td>Banco de Dados | Lógica de Programação</td>
                <td>25/05 - 09:43 | 28/05 - 09:59</td>
                <td>31/05 - 08:23</td>
                <td>21/04 - 11:23 (Carlos Cavaleiro) | 21/04 - 11:23 (Keylla Andrade)</td>
                <td><button className="visualizar">Visualizar</button></td>
              </tr>
              <tr>
                <td>Bruna Rocha Carvalho</td>
                <td>Técnico em Administração</td>
                <td>25/05 - 09:43 | 28/05 - 09:59</td>
                <td>31/05 - 08:23</td>
                <td>21/04 - 11:23 (Carlos Cavaleiro) | 21/04 - 11:23 (Keylla Andrade)</td>
                <td><button className="visualizar">Visualizar</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default InicialResponsavel;