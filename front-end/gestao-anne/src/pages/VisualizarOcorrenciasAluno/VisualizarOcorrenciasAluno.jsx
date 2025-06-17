import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rodape from '../../components/Rodape/Rodape';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import Foto from '../../components/Foto/Foto';
import './VisualizarOcorrenciasAluno.css';

const VisualizarOcorrenciasAluno = () => {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [fotoUrl, setFotoUrl] = useState('');
  const [nomeAluno, setNomeAluno] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/ocorrencias')
      .then((res) => res.json())
      .then((data) => setOcorrencias(data))
      .catch((err) => console.error('Erro ao carregar ocorrências:', err));

    fetch('http://localhost:3002/foto')
      .then((res) => res.text())
      .then((data) => setFotoUrl(data))
      .catch((err) => console.error('Erro ao carregar foto do aluno:', err));

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
      <CabecalhoPages>
        <li key="inicio"><Link to="/InicialAluno">Início</Link></li>
        <li key="ocorrencias"><Link to="/visualizarocorrenciasaluno">Ocorrências</Link></li>
        <li key="solicitacoes"><Link to="/visualizarsolicitacaoaluno">Solicitações</Link></li>
        <li key="conta"><Link to="/visualizarcontaaluno">Conta</Link></li>
      </CabecalhoPages>

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
              {ocorrencias.map((item) => (
                <tr key={item.id || `${item.nome}-${item.curso}`}>
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