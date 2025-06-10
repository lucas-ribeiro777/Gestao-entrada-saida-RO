import './VisualizarContaAluno.css';
import { useState } from 'react';
import Rodape from '../../components/Rodape/Rodape';
import Foto from '../../components/Foto/Foto';

import { FaIdBadge, FaPhoneAlt, FaUserFriends, FaEdit } from 'react-icons/fa';
import { FaBirthdayCake } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';

const VisualizarContaAluno = () => {
  const [dados, setDados] = useState({
    nome: 'Giovanna Santos Silva',
    nascimento: '29/10/2006',
    email: 'giovanna.santos@gmail.com',
    telefone: '(14) 99849-2576',
    responsavel: 'José Antônio Silva',
  });



  const handleEditar = (campo) => {
    const valorAtual = dados[campo];
    const novoValor = prompt(`Editar ${campo}:`, valorAtual);
    if (novoValor !== null && novoValor.trim() !== '') {
      setDados((prevDados) => ({
        ...prevDados,
        [campo]: novoValor.trim(),
      }));
    }
  };

  return (
    <div className="conta-container-aluno">
      <div className="conteudo-conta-aluno">
        <div className="dados-box">

          <div className="dado-linha">
            <span><FaIdBadge />{dados.nome}</span>
            <button className="editar" onClick={() => handleEditar('nome')}>
              <FaEdit />
            </button>
          </div>

          <div className="dado-linha-aluno">
            <span><FaBirthdayCake /> {dados.nascimento}</span>
            <button className="editar" onClick={() => handleEditar('nascimento')}>
              <FaEdit />
            </button>
          </div>


          <div className="dado-linha">
            <span><MdAlternateEmail />{dados.email}</span>
            <button className="editar" onClick={() => handleEditar('email')}>
              <FaEdit />
            </button>
          </div>

          <div className="dado-linha">
            <span><FaPhoneAlt />{dados.telefone}</span>
            <button className="editar" onClick={() => handleEditar('telefone')}>
              <FaEdit />
            </button>
          </div>

          <div className="dado-linha">
            <span><FaUserFriends />{dados.responsavel}</span>
            <button className="editar" onClick={() => handleEditar('responsavel')}>
              <FaEdit />
            </button>
          </div>

        </div>
      </div>
      <Foto />
      <Rodape />
    </div>
  );
};

export default VisualizarContaAluno;