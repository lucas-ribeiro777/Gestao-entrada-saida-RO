import React from 'react';
import { FaUser, FaBirthdayCake, FaEnvelope, FaPhone, FaMale } from 'react-icons/fa';
import './VisualizarContaAluno.css';

function SenaiConta() {
  const dados = {
    nome: 'Giovanna Santos Silva',
    nascimento: '29/10/2006',
    email: 'giovanna.santos@gmail.com',
    telefone: '(14) 99849-2576',
    responsavel: 'José Antônio Silva'
  };

  return (
    <div className="container">
      <header className="header">
        <nav>
          <ul>
            <li>Início</li>
            <li>Ocorrências</li>
            <li>Solicitações</li>
            <li className="active">Conta</li>
          </ul>
        </nav>
      </header>

      <main className="content">
        <div className="infoCard">
          <div className="item"><FaUser /> {dados.nome}</div>
          <div className="item"><FaBirthdayCake /> {dados.nascimento}</div>
          <div className="item"><FaEnvelope /> {dados.email}</div>
          <div className="item"><FaPhone /> {dados.telefone}</div>
          <div className="item"><FaMale /> {dados.responsavel}</div>
        </div>
      </main>

    <Rodape />

    </div>


  );
}

export default VisualizarContaAluno;