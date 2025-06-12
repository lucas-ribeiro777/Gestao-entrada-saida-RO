import './VisualizarContaAluno.css';
import { useState, useEffect } from 'react';
import Rodape from '../../components/Rodape/Rodape';
import Foto from '../../components/Foto/Foto';

import { FaIdBadge, FaPhoneAlt, FaUserFriends, FaEdit } from 'react-icons/fa';
import { FaBirthdayCake } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';

import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';

const VisualizarContaAluno = () => {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/alunos')
      .then((response) => {
        if (!response.ok) throw new Error('Falha ao buscar o arquivo JSON');
        return response.json();
      })
      .then((data) => {
        const aluno = data[0];
        setDados({
          nome: aluno.nome,
          nascimento: aluno.data_nasc || aluno.dataNascimento || '',
          email: aluno.email,
          telefone: aluno.telefone,
          responsavel: 'Responsável não informado',
        });
      })
      .catch((error) => {
        console.error('Erro ao carregar dados do aluno:', error);
      });
  }, []);

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

  if (!dados) return <p>Carregando dados...</p>;

  return (
    <div className="conta-container-aluno">
      {/* Passa a prop para ativar o menu "Conta" */}
      <CabecalhoPages menuAtivo="Conta" />

      <div className="conteudo-conta-aluno">
        <Foto />
        <div className="dados-box">
          <div className="dado-linha">
            <span><FaIdBadge /> {dados.nome}</span>
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
            <span><MdAlternateEmail /> {dados.email}</span>
            <button className="editar" onClick={() => handleEditar('email')}>
              <FaEdit />
            </button>
          </div>

          <div className="dado-linha">
            <span><FaPhoneAlt /> {dados.telefone}</span>
            <button className="editar" onClick={() => handleEditar('telefone')}>
              <FaEdit />
            </button>
          </div>

          <div className="dado-linha">
            <span><FaUserFriends /> {dados.responsavel}</span>
            <button className="editar" onClick={() => handleEditar('responsavel')}>
              <FaEdit />
            </button>
          </div>
        </div>
      </div>

      <Rodape />
    </div>
  );
};

export default VisualizarContaAluno;
