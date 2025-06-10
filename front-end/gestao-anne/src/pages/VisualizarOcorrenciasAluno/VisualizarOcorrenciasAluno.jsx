import React, { useState, useEffect } from 'react';
import Rodape from '../../components/Rodape/Rodape';
import './VisualizarOcorrenciasAluno.css';

const VisualizarOcorrenciasAluno = () => {
  const [ocorrencias, setOcorrencias] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/ocorrencias')
      .then((res) => res.json())
      .then((data) => setOcorrencias(data))
      .catch((err) => console.error('Erro ao carregar ocorrências:', err));
  }, []);

  return (
    <>
      <div className="container-ocorrencias">
        <div className="perfil-aluno">
          <p className="titulo-perfil">ALUNO</p>
          <img src="/images/aluno.png" alt="Aluno" className="foto-aluno" />
          <p className="nome-aluno">GIOVANNA SANTOS SILVA</p>
        </div>

        <div className="tabela-ocorrencias">
          <h3 className="titulo-tabela">Notificações de Registro de Ocorrências</h3>
          <table>
            <thead>
              <tr>
                <th>NOME</th>
                <th>CURSO</th>
                <th>MOTIVO</th>
              </tr>
            </thead>
            <tbody>
              {ocorrencias.map((item, index) => (
                <tr key={index}>
                  <td>{item.nome}</td>
                  <td>{item.curso}</td>
                  <td>{item.motivo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Rodape />
    </>
  );
};

export default VisualizarOcorrenciasAluno;