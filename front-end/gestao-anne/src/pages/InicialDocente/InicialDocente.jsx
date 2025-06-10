import React from 'react';
import './InicialDocente.css';
import Rodape from '../../components/Rodape/Rodape';

const InicialDocente = () => {
  return (
    <div className="InicialDocente">
      <header className="header">
        <img src="senai-logo.png" alt="SENAI Logo" className="logo" />
        <nav className="navbar">
          <a href="#inicio">Início</a>
          <a href="#ocorrencias">Ocorrências</a>
          <a href="#solicitacoes">Solicitações</a>
          <a href="#conta">Conta</a>
        </nav>
      </header>
      <main>
        <section className="solicitacoes">
          <h2>SOLICITAÇÕES DE HOJE</h2>
          <table>
            <thead>
              <tr>
                <th>ALUNO</th>
                <th>CURSO</th>
                <th>AUTORIZAR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="3">Ainda não houve solicitações hoje...</td>
              </tr>
            </tbody>
          </table>
          <div className="toggle-switch">
            <input type="checkbox" id="authorize" />
            <label htmlFor="authorize">AUTORIZAR</label>
          </div>
        </section>
        <section className="ocorrencias">
          <h2>OCORRÊNCIAS DE HOJE</h2>
          <table>
            <thead>
              <tr>
                <th>ALUNO</th>
                <th>CURSO</th>
                <th>DEVOLUTIVA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Larissa Oliveira</td>
                <td>Automação Industrial</td>
                <td>
                  <div className="toggle-switch">
                    <input type="checkbox" id="feedback" checked />
                    <label htmlFor="feedback">DEVOLUTIVA</label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <button className="add-occurrence">ADICIONAR NOVA OCORRÊNCIA</button>
      </main>
      <Rodape />
    </div>
  );
};

export default InicialDocente;