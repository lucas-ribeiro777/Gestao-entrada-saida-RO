import './VisualizarContaProfessor.css';
import { useState, useEffect } from 'react';
import Rodape from '../../components/Rodape/Rodape';
import InfoBox from '../../components/InfoBox/InfoBox';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import { Link, useNavigate } from 'react-router-dom';
import CriarAssinatura from '../../components/CriarAssinatura/CriarAssinatura';

const VisualizarContaProfessor = () => {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const API_URL = 'http://localhost:3000/professores/1'; // Ajuste o ID conforme necessário
  const navigate = useNavigate();

useEffect(() => {
  fetch(API_URL)
    .then((res) => {
      console.log('Status:', res.status);
      return res.json();
    })
    .then((data) => {
      console.log('DATA:', data);
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

  const handleSalvarAssinatura = (assinaturaBase64) => {
    const novosDados = { ...dados, assinatura: assinaturaBase64 };
    setDados(novosDados);

    fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novosDados),
    }).catch((err) => {
      console.error('Erro ao salvar assinatura:', err);
      alert('Erro ao salvar assinatura no servidor');
    });

    setModalAberto(false);
  };

  if (carregando || !dados) {
    return <p>Carregando dados...</p>;
  }

  return (
    <>
      <CabecalhoPages rotaAtual={location.pathname}>
        <li><Link to="/InicialProfessor">Início</Link></li>
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

        {/* Se não tiver assinatura, mostra botão para adicionar */}
        {(!dados.assinatura || dados.assinatura.trim() === '') ? (
          <div className="assinatura-box">
            <button className="btn-adicionar-assinatura" onClick={() => setModalAberto(true)}>
              <strong>➕ Adicionar Assinatura</strong>
            </button>
          </div>
        ) : (
          <InfoBox
            icone={<img src="/images/assinatura.png" alt="Assinatura" />}
            texto={<img src={dados.assinatura} alt="Assinatura" style={{ maxWidth: '150px', maxHeight: '50px', borderRadius: '70px'}} />}
            editavel={false}
            cor="claro"
          />
        )}
      </div>
      {/* Modal para adicionar assinatura */}
      <CriarAssinatura
        aberto={modalAberto}
        aoFechar={() => setModalAberto(false)}
        aoSalvar={handleSalvarAssinatura}
      />


      <Rodape />
    </>
  );
};

export default VisualizarContaProfessor;
 