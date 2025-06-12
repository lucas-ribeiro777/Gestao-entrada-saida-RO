import React, { useEffect, useState } from 'react';
import Rodape from '../../components/Rodape/Rodape';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import Foto from '../../components/Foto/Foto';
import './VisualizarOcorrenciasAluno.css';

const VisualizarOcorrenciasAluno = () => {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [fotoUrl, setFotoUrl] = useState('');
  const [nomeAluno, setNomeAluno] = useState('');

  useEffect(() => {
    // Ocorrências
    fetch('http://localhost:3001/ocorrencias')
      .then((res) => res.json())
      .then((data) => setOcorrencias(data))
      .catch((err) => console.error('Erro ao carregar ocorrências:', err));

    // Foto do aluno
    fetch('http://localhost:3002/foto')
      .then((res) => res.json())
      .then((data) => setFotoUrl(data.foto))
      .catch((err) => console.error('Erro ao carregar foto do aluno:', err));

    // Nome do aluno
    fetch('http://localhost:3003/alunos')
      .then((res) => res.json())
      .then((data) => {
        const alunosArray = Array.isArray(data) ? data : data.alunos;
        if (Array.isArray(alunosArray)) {
          const aluno = alunosArray.find((a) => a.id === "5");
          if (aluno) {
            setNomeAluno(aluno.nome);
          } else {
            console.warn("Aluno com id 5 não encontrado.");
            setNomeAluno("Aluno não encontrado");
          }
        } else {
          console.warn("Formato de dados inválido.");
        }
      })
      .catch((err) => console.error('Erro ao carregar nome do aluno:', err));

  }, []);

  return (
    <>
      <CabecalhoPages />
      <div className="container-ocorrencias">
        <div className="perfil-aluno-ocorrencias">
          <Foto 
            imagem={fotoUrl}
            titulo="ALUNO"
            textoBotao={nomeAluno}
            onFotoSelecionada={() => {}}
            desativarUpload={true}
          />
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