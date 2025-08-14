import React, { useState, useEffect } from 'react';
import Rodape from '../../components/Rodape/Rodape';
import InfoBox from '../../components/InfoBox/InfoBox';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CriarAssinatura from '../../components/CriarAssinatura/CriarAssinatura'; // importe o modal assinatura

const VisualizarContaCoordenador = () => {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false); // controle do modal
  const API_URL = 'http://localhost:3000/coordenadores/1';
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

  // Funções para abrir e fechar o modal
  const abrirModalAssinatura = () => setModalAberto(true);
  const fecharModalAssinatura = () => setModalAberto(false);

  // Salvar assinatura e fechar modal
  const salvarAssinatura = (assinaturaBase64) => {
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

    fecharModalAssinatura();
  };

  if (carregando || !dados) {
    return <p>Carregando dados...</p>;
  }

  return (
    <>
      <CabecalhoPages rotaAtual={location.pathname}>
        <li><Link to="/InicialCoordenador">Início</Link></li>
        <li><Link to="/VisualizarSolicitacoes">Solicitações</Link></li>
        <li>
          <input
            className="input-pesquisar-aluno"
            type="text"
            placeholder="Pesquise um Aluno"
            onClick={() => navigate("/PesquisarAluno")}
          />
        </li>
        <li><Link to="/VisualizarContaCoordenador">Conta</Link></li>
        <li>
          <Link to="/docente">
            <img src="/images/engrenagem.png" alt="" />
          </Link>
        </li>
      </CabecalhoPages>

      <div className="dados-box-coordenador">
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

        {(!dados.assinatura || dados.assinatura.trim() === "") ? (
          <div className="assinatura-box">
            <button
              className="btn-adicionar-assinatura"
              onClick={abrirModalAssinatura}
            >
              ➕ Adicionar Assinatura
            </button>
          </div>
        ) : (
          <InfoBox
            icone={<img src="/images/assinatura.png" alt="Assinatura" />}
            texto={
              <img
                src={dados.assinatura}
                alt="Assinatura"
                style={{ maxWidth: '150px', maxHeight: '50px', borderRadius: '70px' }}
              />
            }
            editavel={false}
            cor="claro"
          />
        )}
      </div>

      {modalAberto && (
        <CriarAssinatura
          aberto={modalAberto}
          aoFechar={fecharModalAssinatura}
          aoSalvar={salvarAssinatura}
        />
      )}

      <Rodape />
    </>
  );
};

export default VisualizarContaCoordenador;
