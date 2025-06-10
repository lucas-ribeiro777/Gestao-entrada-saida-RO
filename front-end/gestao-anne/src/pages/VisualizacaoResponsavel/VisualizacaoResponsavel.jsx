import React, { useEffect, useState } from "react";
import Rodape from "../../components/Rodape/Rodape";
import { FaUser, FaBirthdayCake, FaAt, FaPhone, FaUserFriends, FaEdit } from "react-icons/fa";
import "./VisualizacaoResponsavel.css";

const VisualizacaoResponsavel = () => {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/alunos")
      .then((res) => res.json())
      .then((data) =>
        setDados({
          nome: data.name,
          nascimento: "22/05/1970", // mock
          email: data.email,
          telefone: data.phone,
          responsavel: "Giovana Santos Silva", // mock
        })
      );
  }, []);

  if (!dados) {
    return <div className="loading">Carregando dados...</div>;
  }

  return (
    <div className="container">
      <main className="content">
        <div className="card">
          <Item icon={<FaUser />} text={dados.nome} bg="blue" />
          <Item icon={<FaBirthdayCake />} text={dados.nascimento} bg="light-blue" />
          <Item icon={<FaAt />} text={dados.email} bg="blue" />
          <Item icon={<FaPhone />} text={dados.telefone} bg="light-blue" />
          <Item icon={<FaUserFriends />} text={dados.responsavel} bg="blue" />
        </div>
      </main>
      <Rodape />
    </div>
  );
};

const Item = ({ icon, text, bg }) => (
  <div className={`item ${bg}`}>
    <div className="flex items-center gap-2">
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </div>
    <button className="edit">
      <FaEdit />
    </button>
  </div>
);

export default VisualizacaoResponsavel;
