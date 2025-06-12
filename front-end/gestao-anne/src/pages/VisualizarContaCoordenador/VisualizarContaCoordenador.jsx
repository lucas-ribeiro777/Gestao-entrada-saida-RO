import './VisualizarContaCoordenador.css';
import { useState } from 'react';
import Rodape from '../../components/Rodape/Rodape';
import InfoBox from '../../components/InfoBox/InfoBox';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';


const VisualizarContaCoordenador = () => {
  const [dados, setDados] = useState({
    nome: 'Anne Karine Lemos Rocha',
    nascimento: '25/01/1989',
    email: 'anne.rocha@coordenador.senai.br',
    telefone: '(14) 99700-6543',
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
    <>
      <CabecalhoPages>
        <li><a href="/#">Início</a></li>
        <li><a href="/#">Ocorrências</a></li>
        
        <li><a href="/#">Solicitações</a></li>
        <li><a href="/VisualizarContaCoordenador">Conta</a></li>
      </CabecalhoPages>
      <div className="dados-box-coordenador">
        <InfoBox
          icone={<span>📝</span>}
          texto={dados.nome}
          onEditar={() => handleEditar('nome')}
          editavel={true}
          cor="escuro"
        />
        <InfoBox
          icone={<span>📅</span>}
          texto={dados.nascimento}
          onEditar={() => handleEditar('nascimento')}
          editavel={true}
          cor="escuro"
        />
        <InfoBox
          icone={<span>@</span>}
          texto={dados.email}
          onEditar={() => handleEditar('email')}
          editavel={true}
          cor="escuro"
        />
        <InfoBox
          icone={<span>☎</span>}
          texto={dados.telefone}
          onEditar={() => handleEditar('telefone')}
          editavel={true}
          cor="escuro"
        />
      </div>
      <Rodape/>
    </>
  );
};

export default VisualizarContaCoordenador;

