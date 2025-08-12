import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Rodape from '../../components/Rodape/Rodape';
import Foto from '../../components/Foto/Foto';
import './VisualizarOcorrenciasAluno.css';

const VisualizarOcorrenciasAluno = () => {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [fotoUrl, setFotoUrl] = useState('');
  const [nomeAluno, setNomeAluno] = useState('');
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:3000/ocorrencias')
      .then((res) => res.json())
      .then((data) => setOcorrencias(data))
      .catch((err) => console.error('Erro ao carregar ocorrências:', err));

    fetch('http://localhost:3000foto')
      .then((res) => res.text())
      .then((data) => setFotoUrl(data))
      .catch((err) => console.error('Erro ao carregar foto do aluno:', err));

    fetch('http://localhost:3000/alunos')
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

  const children = [
    <li key="inicio"><Link to="/InicialAluno">Início</Link></li>,
    <li key="ocorrencias"><Link to="/visualizarocorrenciasaluno">Ocorrências</Link></li>,
    <li key="solicitacoes"><Link to="/visualizarsolicitacaoaluno">Solicitações</Link></li>,
    <li key="conta"><Link to="/visualizarcontaaluno">Conta</Link></li>,
  ];

  const childrenComClasses = children.map((child) => {
    if (!React.isValidElement(child)) return child;

    const innerChild = child.props.children;

    if (React.isValidElement(innerChild) && innerChild.props?.to) {
      const isAtivo = location.pathname === innerChild.props.to;

      return React.cloneElement(child, {
        children: React.cloneElement(innerChild, {
          className: isAtivo ? 'ativo' : 'nativo',
        }),
      });
    }

    return child;
  });

  return (
    <>
      <div className="topo-pages">
        <img src="/images/LogoSenaiSemAsEscritaDoLado.png" alt="SENAI" />
      </div>
      <div className="menu-pages">
        <ul>{childrenComClasses}</ul>
      </div>

      <div className="container-ocorrencias">
        <Foto 
          titulo="Aluno" 
          textoBotao={nomeAluno} 
          onFotoSelecionada={(arquivo) => console.log(arquivo)} 
        />

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