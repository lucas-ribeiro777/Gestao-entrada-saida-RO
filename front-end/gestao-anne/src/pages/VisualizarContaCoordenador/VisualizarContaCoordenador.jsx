import './VisualizarContaCoordenador.css';
import { useState } from 'react';
import Rodape from '../../components/Rodape/Rodape';
import InfoBox from '../../components/InfoBox/InfoBox';


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

