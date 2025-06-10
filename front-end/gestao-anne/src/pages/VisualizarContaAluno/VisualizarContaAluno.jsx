import './VisualizarContaAluno.css';
import { useState } from 'react';
import Rodape from '../../components/Rodape/Rodape';

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
      <div className="topo-nav">
        <button className="nav-btn">Início</button>
        <button className="nav-btn">Ocorrências</button>
        <button className="nav-btn">Solicitações</button>
        <button className="nav-btn active">Conta</button>
      </div>

      <div className="conteudo-conta-aluno">
        <div className="dados-box">
          <div className="dado-linha">
            <span>{dados.nome}</span>
            <button className="editar" onClick={() => handleEditar('nome')}>Editar</button>
          </div>

          <div className="dado-linha-aluno">
            <span>{dados.nascimento}</span>
            <button className="editar" onClick={() => handleEditar('nascimento')}>Editar</button>
          </div>

          <div className="dado-linha">
            <span>{dados.email}</span>
            <button className="editar" onClick={() => handleEditar('email')}>Editar</button>
          </div>

          <div className="dado-linha">
            <span>{dados.telefone}</span>
            <button className="editar" onClick={() => handleEditar('telefone')}>Editar</button>
          </div>

          <div className="dado-linha">
            <span>{dados.responsavel}</span>
            <button className="editar" onClick={() => handleEditar('responsavel')}>Editar</button>
          </div>
        </div>
      </div>
      <Rodape />
    </div>
  );
};

export default VisualizarContaAluno;