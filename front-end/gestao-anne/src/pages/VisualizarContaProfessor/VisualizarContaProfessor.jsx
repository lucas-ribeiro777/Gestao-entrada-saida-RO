import './VisualizarContaProfessor.css';
import { useState, useEffect } from 'react';
import Rodape from '../../components/Rodape/Rodape';
import InfoBox from '../../components/InfoBox/InfoBox';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const VisualizarContaProfessor = () => {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const API_URL = 'http://localhost:3000/professores/1'; // Ajuste o ID conforme necessário
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setDados(data);
        setCarregando(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar dados:', err);
        setCarregando(false);
      });
  }, []);

  const handleEditar = (campo) => {
    const valorAtual = dados[campo];
    const novoValor = prompt(`Editar ${campo}:`, valorAtual);
    if (novoValor !== null && novoValor.trim() !== '') {
      const novosDados = { ...dados, [campo]: novoValor.trim() };
      setDados(novosDados);

      fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novosDados),
      }).catch((err) => {
        console.error('Erro ao salvar alterações:', err);
        alert('Erro ao salvar no servidor');
      });
    }
  };

  if (carregando || !dados) {
    return <p>Carregando dados...</p>;
  }

  return (
    <>
      <CabecalhoPages rotaAtual={location.pathname}>
        <li><Link to="/InicialProfessor">Início</Link></li>
        {/* <li><Link to="/VisualizarOcoorrenciaProfessor">Ocorrências</Link></li> */}
        <li><Link to="/solicitacaoprofessor">Solicitações</Link></li>
        <li><Link to="/VisualizarContaProfessor">Conta</Link></li>
      </CabecalhoPages>

      <div className="dados-box-professor">
        <InfoBox
          icone={<img src="/images/nome.png" alt="Professor" />}
          texto={dados.nome}
          onEditar={() => handleEditar('nome')}
          editavel={true}
          cor="escuro"
        />
        <InfoBox
          icone={<img src="/images/email.png" alt="Professor" />}
          texto={dados.email}
          onEditar={() => handleEditar('email')}
          editavel={true}
          cor="claro"
        />
        <InfoBox
          icone={<img src="/images/telefoneconta.png" alt="Professor" />}
          texto={dados.telefone}
          onEditar={() => handleEditar('telefone')}
          editavel={true}
          cor="escuro"
        />
        <InfoBox
          icone={<img src="/images/niver.png" alt="Professor" />}
          texto={dados.nascimento}
          onEditar={() => handleEditar('nascimento')}
          editavel={true}
          cor="claro"
        />
      </div>

      <Rodape />
    </>
  );
};

export default VisualizarContaProfessor;
