import React, { useEffect, useState } from "react";
import { FaUser, FaBirthdayCake, FaAt, FaPhone, FaUsers, FaPen } from "react-icons/fa";
import CabecalhoPages from "../../components/CabecalhoPages/CabecalhoPages";
import Rodape from "../../components/Rodape/Rodape";
import "./VisualizacaoResponsavel.css";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Conta = () => {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/alunos") 
      .then((res) => res.json())
      .then((data) =>
        setDados({
          nome: data.name,
          nascimento: "22/05/1970", // Mock (não tem no jsonplaceholder)
          email: data.email,
          telefone: data.phone,
          responsavel: "Giovana Santos Silva", // Mock
        })
      );
  }, []);

  if (!dados) {
    return <div className="text-center mt-10 text-gray-600">Carregando dados...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <CabecalhoPages />

      <main className="flex-1 flex justify-center items-center py-10 bg-white">
        <div className="space-y-4 w-full max-w-md px-4">
          <Item bg="bg-[#1b4e8a]" icon={<FaUser />} text={dados.nome} />
          <Item bg="bg-[#87a9d6]" icon={<FaBirthdayCake />} text={dados.nascimento} />
          <Item bg="bg-[#1b4e8a]" icon={<FaAt />} text={dados.email} />
          <Item bg="bg-[#87a9d6]" icon={<FaPhone />} text={dados.telefone} />
          <Item bg="bg-[#1b4e8a]" icon={<FaUsers />} text={dados.responsavel} />
        </div>
      </main>

      <Rodape />
    </div>
  );
};

const Item = ({ icon, text, bg }) => (
  <div className={`flex items-center justify-between p-4 rounded-lg shadow-md ${bg}`}>
    <div className="flex items-center space-x-4">
      <div className="text-white text-2xl">{icon}</div>
      <span className="text-white font-semibold">{text}</span>
    </div>
    <button className="text-white hover:underline">
      <FaPen />
    </button>
  </div>
);

export default Conta;
