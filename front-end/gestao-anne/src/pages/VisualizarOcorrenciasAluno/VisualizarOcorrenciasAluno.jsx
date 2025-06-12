import React, { useEffect, useState } from 'react';
import Rodape from '../../components/Rodape/Rodape';
import Foto from '../../components/Foto/Foto';
import './VisualizarOcorrenciasAluno.css';

const VisualizarOcorrenciasAluno = () => {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [fotoUrl, setFotoUrl] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/ocorrencias')
      .then((res) => res.json())
      .then((data) => setOcorrencias(data))
      .catch((err) => console.error('Erro ao carregar ocorrências:', err));

    fetch('http://localhost:3001/ocorrencias')
      .then((res) => res.json())
      .then((data) => setFotoUrl(data.foto))
      .catch((err) => console.error('Erro ao carregar foto do aluno:', err));
  }, []);

  return (
    <>
      <div className="container-ocorrencias">
        <div className="perfil-aluno-ocorrencias">
          <Foto imagem={fotoUrl} />
          <p className="nome-aluno-ocorrencias">GIOVANNA SANTOS SILVA</p>
        </div>

        <div className="tabela-ocorrencias">
          <h3 className="titulo-tabela-ocorrencias">Notificações de Registro de Ocorrências</h3>
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