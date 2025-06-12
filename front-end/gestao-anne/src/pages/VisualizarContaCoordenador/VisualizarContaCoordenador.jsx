import './VisualizarContaCoordenador.css';
import { useState } from 'react';
import Rodape from '../../components/Rodape/Rodape';

const VisualizarContaCoordenador = () => {
  const [dados, setDados] = useState({
    nome: '📝   Anne Karine Lemos Rocha',
    nascimento: '📅    25/01/1989',
    email: '@   anne.rocha@coordenador.senai.br',
    telefone: '☎   (14) 99700-6543',
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
    <div className="conta-container-coordenador">
      <div className="topo-nav-coordenador">
        <button className="nav-btn-coordenador">Início</button>
        <button className="nav-btn-coordenador">Ocorrências</button>
        <button className="nav-btn-coordenador">Solicitações</button>
        <button className="nav-btn active-coordenador">Conta</button>
      </div>

      <div className="conteudo-conta-coordenador">
        <div className="dados-box-coordenador">
          <div className="dado-linha-coordenador">
            <span>{dados.nome}</span>
            <button className="editar-coordenador" onClick={() => handleEditar('nome')}>✎</button>
          </div>

          <div className="dado-linha-coordenador">
            <span>{dados.nascimento}</span>
            <button className="editar-coordenador" onClick={() => handleEditar('nascimento')}>✎</button>
          </div>

          <div className="dado-linha-coordenador">
            <span>{dados.email}</span>
            <button className="editar-coordenador" onClick={() => handleEditar('email')}>✎</button>
          </div>

          <div className="dado-linha-coordenador">
            <span>{dados.telefone}</span>
            <button className="editar-coordenador" onClick={() => handleEditar('telefone')}>✎</button>
          </div>
        </div>
      </div>
      <Rodape />
    </div>
  );
};

export default VisualizarContaCoordenador;

