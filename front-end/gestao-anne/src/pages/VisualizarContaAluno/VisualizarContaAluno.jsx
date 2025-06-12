import './VisualizarContaAluno.css';
import { useState } from 'react';
import Rodape from '../../components/Rodape/Rodape';
import Foto from '../../components/Foto/Foto';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';

import { FaIdBadge, FaPhoneAlt, FaUserFriends, FaEdit } from 'react-icons/fa';
import { FaBirthdayCake } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import InfoBox from '../../components/InfoBox/InfoBox';

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
    <>
      <CabecalhoPages>
        <li key="inicio" ><a href="/#">Início</a></li>
        <li key="ocorrencias" ><a href="/#">Ocorrências</a></li>
        <li key="solicitacoes"><a href="/#">Solicitações</a></li>
        <li key="conta"><a href="/VisualizarContaCoordenador">Conta</a></li>
      </CabecalhoPages>

      <div className="container-central">
      <Foto />  
        <div className="dados-box">
          <InfoBox
            icone={<img src="/images/nome.png" alt="Aluno" />}
            texto={dados.nome}
            onEditar={() => handleEditar('nome')}
            editavel={true}
            cor="escuro"
          />
          <InfoBox
            icone={<img src="/images/niver.png" alt="Aluno" />}
            texto={dados.nascimento}
            onEditar={() => handleEditar('email')}
            editavel={false}
            cor="claro"
          />
          <InfoBox
            icone={<img src="/images/email.png" alt="Aluno" />}
            texto={dados.email}
            onEditar={() => handleEditar('email')}
            editavel={true}
            cor="escuro"
          />
          <InfoBox
            icone={<img src="/images/telefoneconta.png" alt="Aluno" />}
            texto={dados.telefone}
            onEditar={() => handleEditar('telefone')}
            editavel={true}
            cor="claro"
          />
          <InfoBox
            icone={<img src="/images/family.png" alt="Aluno" />}
            texto={dados.responsavel}
            onEditar={() => handleEditar('responsavel')}
            editavel={false}
            cor="escuro"
          />
        </div>
      </div>
      <Rodape />
    </>
  );
};

export default VisualizarContaAluno;