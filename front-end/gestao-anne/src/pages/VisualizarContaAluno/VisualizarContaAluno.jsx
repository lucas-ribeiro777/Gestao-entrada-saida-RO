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
        <li key="pesquisar-aluno">
          <input
            className="input-pesquisar-aluno"
            type="text"
            placeholder="Pesquise um Aluno"
          />
        </li>
        <li key="solicitacoes"><a href="/#">Solicitações</a></li>
        <li key="conta"><a href="/VisualizarContaCoordenador">Conta</a></li>
      </CabecalhoPages>

      <div className="conteudo-conta-aluno">
        <div className="dados-box">
        <InfoBox
          icone={<img src="/images/nome.png" alt="Coordenador" />}
          texto={dados.nome}
          onEditar={() => handleEditar('nome')}
          editavel={true}
          cor="escuro"
        />
        <InfoBox
          icone={<img src="/images/email.png" alt="Coordenador" />}
          texto={dados.email}
          onEditar={() => handleEditar('email')}
          editavel={true}
          cor="claro"
        />
        <InfoBox
          icone={<img src="/images/telefoneconta.png" alt="Coordenador" />}
          texto={dados.telefone}
          onEditar={() => handleEditar('telefone')}
          editavel={true}
          cor="escuro"
        />
        <InfoBox
          icone={<img src="/images/niver.png" alt="Coordenador" />}
          texto={dados.assinatura}
          onEditar={() => handleEditar('assinatura')}
          editavel={true}
          cor="claro"
        />

        </div>
      </div>
      <Foto />
      <Rodape />
    </>
  );
};

export default VisualizarContaAluno;