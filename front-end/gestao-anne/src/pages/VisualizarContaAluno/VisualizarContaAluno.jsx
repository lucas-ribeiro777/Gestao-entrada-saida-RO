import './VisualizarContaAluno.css';
import { useState } from 'react';
import { FaUser, FaEdit, FaCalendarAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import Rodape from '../../components/Rodape/Rodape';
import Foto from '../../components/Foto/Foto';

const VisualizarContaAluno = () => {
  const [dados, setDados] = useState({
    nome: 'Giovanna Santos Silva',
    nascimento: '29/10/2006',
    email: 'giovanna.santos@gmail.com',
    telefone: '(14) 99849-2576',
    responsavel: 'José Antônio Silva',
  });

  return (

    <div className="conta-container-aluno">
      <div className="topo-nav">
        <button className="nav-btn">Início</button>
        <button className="nav-btn">Ocorrências</button>
        <button className="nav-btn">Solicitações</button>
        <button className="nav-btn active">Conta</button>
      </div>

      <div className="conteudo-conta-aluno">
        <div className="dados-box">
          <div className="dado-linha">
            <FaUser className="icon" />
            <span>{dados.nome}</span>
            <FaEdit className="editar" onClick={() => handleEditar('nome')} />
          </div>

          <div className="dado-linha-aluno">
            <FaCalendarAlt className="icon" />
            <span>{dados.nascimento}</span>
            <FaEdit className="editar" onClick={() => handleEditar('nascimento')} />
          </div>

          <div className="dado-linha">
            <FaEnvelope className="icon" />
            <span>{dados.email}</span>
            <FaEdit className="editar" onClick={() => handleEditar('email')} />
          </div>

          <div className="dado-linha">
            <FaPhone className="icon" />
            <span>{dados.telefone}</span>
            <FaEdit className="editar" onClick={() => handleEditar('telefone')} />
          </div>

          <div className="dado-linha">
            <FaUser className="icon" />
            <span>{dados.responsavel}</span>
            <FaEdit className="editar" onClick={() => handleEditar('responsavel')} />
          </div>
        </div>
      </div>

      <Rodape />
      <Foto />

    </div>

  );
};

export default VisualizarContaAluno;