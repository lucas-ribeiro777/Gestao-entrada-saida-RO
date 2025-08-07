import React, { useState } from 'react';
import './SolicitacaoProfessor.css';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import Rodape from '../../components/Rodape/Rodape';

const SolicitacaoProfessor = () => {
  const [solicitacoes, setSolicitacoes] = useState([
    { id: 1, aluno: 'Giovanna Santos', curso: 'Desenvolvimento de Sistemas', autorizado: false },
    { id: 2, aluno: 'Luan Gabriel Lemes', curso: 'Desenvolvimento de Sistemas', autorizado: true },
    { id: 3, aluno: 'Lorena Gabrielly Mendes', curso: 'Desenvolvimento de Sistemas', autorizado: true },
    { id: 4, aluno: 'Milena Miriam Correia', curso: 'Desenvolvimento de Sistemas', autorizado: false },
  ]);

  const toggleAutorizacao = (id) => {
    const atualizadas = solicitacoes.map((s) =>
      s.id === id ? { ...s, autorizado: !s.autorizado } : s
    );
    setSolicitacoes(atualizadas);
  };

  return (
    <div className="tabela-container">
      <CabecalhoPages />

      <h2>SOLICITAÇÕES</h2>

      <div className="painel-grid">
        <div className="painel-item tabela">
          <table>
            <thead>
              <tr>
                <th>ALUNO</th>
                <th>CURSO</th>
                <th>AUTORIZAR</th>
              </tr>
            </thead>
            <tbody>
              {solicitacoes.map((s) => (
                <tr key={s.id}>
                  <td>{s.aluno}</td>
                  <td>{s.curso}</td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={s.autorizado}
                        onChange={() => toggleAutorizacao(s.id)}
                      />
                      <span className="slider"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Aqui você pode adicionar mais painéis no futuro */}
        {/* <div className="painel-item outro">Outro conteúdo</div> */}
      </div>

      <Rodape />
    </div>
  );
};

export default SolicitacaoProfessor;
