import React, { useEffect, useState } from "react";
import Rodape from "../../components/Rodape/Rodape";
import "./VisualizacaoResponsavel.css";

const VisualizacaoResponsavel = () => {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/alunos")
      .then((res) => res.json())
      .then((data) => {
        const alunos = data.alunos || data;
        const aluno = alunos?.[0];
        if (aluno) {
          setDados({
            nome: aluno.nome,
            email: aluno.email,
            telefone: aluno.telefone,
            nascimento: formatarData(aluno.data_nasc)
          });
        }
      })
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, []);

  const formatarData = (dataStr) => {
    if (!dataStr) return "";
    if (dataStr.includes("/")) return dataStr;
    const [ano, mes, dia] = dataStr.split("-");
    if (!ano || !mes || !dia) return "";
    return `${dia}/${mes}/${ano}`;
  };

  if (!dados) {
    return <div className="loading">Carregando dados...</div>;
  }

  return (
    <div className="container">
      <main className="content">
        <div className="card">
          <Item text={dados.nome} bg="blue" />
          <Item text={dados.nascimento} bg="light-blue" />
          <Item text={dados.email} bg="blue" />
          <Item text={dados.telefone} bg="light-blue" />
        </div>
      </main>
      <Rodape />
    </div>
  );
};

const Item = ({ text, bg }) => (
  <div className={`item ${bg}`}>
    <span className="text">{text}</span>
  </div>
);

export default VisualizacaoResponsavel;
