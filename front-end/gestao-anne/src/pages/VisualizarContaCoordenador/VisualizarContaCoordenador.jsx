import React, { useState, useEffect } from 'react';
import Rodape from '../../components/Rodape/Rodape';
import InfoBox from '../../components/InfoBox/InfoBox';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CriarAssinatura from '../../components/CriarAssinatura/CriarAssinatura'; // importe o modal assinatura
import './VisualizarContaCoordenador.css';

const VisualizarContaCoordenador = () => {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false); // controle do modal
  const API_URL = 'http://10.90.146.16:5121/api/Coordenador/' + localStorage.getItem('usuarioId');
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
  
  const abrirModalAssinatura = () => setModalAberto(true);
  const fecharModalAssinatura = () => setModalAberto(false);

  const salvarAssinatura = (arquivo) => {
    const API_URL_ASSINATURA = `http://10.90.146.16:5121/api/Coordenador/${dados.id}/assinatura`;

    const formData = new FormData();
    formData.append('assinatura', arquivo); // 'assinatura' é o nome do campo que a API espera

    fetch(API_URL_ASSINATURA, {
      method: 'POST',
      body: formData, // multipart/form-data é detectado automaticamente pelo fetch
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao salvar assinatura');
        return res.json(); // ou text(), depende do que a API retorna
      })
      .then(data => {
        // Atualiza o estado com o caminho retornado pela API
        setDados(prev => ({ ...prev, assinatura: data })); 
      })
      .catch(err => console.error(err));
  };


  if (carregando || !dados) {
    return <p>Carregando dados...</p>;
  }

  return (
    <>
      <CabecalhoPages rotaAtual={location.pathname}>
        <li key="inicio"><Link to="/InicialCoordenador">Início</Link></li>
        <li key="sol"><Link to="/VisualizarSolicitacoes">Solicitações</Link></li>
        {/* <li>
          <input
            className="input-pesquisar-aluno"
            type="text"
            placeholder="Pesquise um Aluno"
            onClick={() => navigate('/PesquisarAluno')}
          />
        </li> */}
        <li key="conta"><Link to="/VisualizarContaCoordenador">Conta</Link></li>
        <li key="config">
          <Link to="/docente">
            <img src="/images/engrenagem.png" alt="Configurações" />
          </Link>
        </li>
      </CabecalhoPages>

      <div className="dados-box-coordenador">
        <InfoBox
          icone={<img src="/images/nome.png" alt="Coordenador" />}
          texto={dados.nome}
          onEditar={() => handleEditar('nome')}
          editavel={false }
          cor="escuro"
        />
        <InfoBox
          icone={<img src="/images/email.png" alt="Coordenador" />}
          texto={dados.email}
          onEditar={() => handleEditar('email')}
          editavel={false}
          cor="claro"
        />
        <InfoBox
          icone={<img src="/images/telefoneconta.png" alt="Coordenador" />}
          texto={dados.telefone}
          onEditar={() => handleEditar('telefone')}
          editavel={false}
          cor="escuro"
        />

        {(!dados.assinatura || (typeof dados.assinatura === 'string' && dados.assinatura.trim() === "")) ? (
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
              src={`http://10.90.146.16:5121${dados.assinatura}`}
              alt="Assinatura"
              style={{ maxWidth: '150px', maxHeight: '50px', borderRadius: '70px' }}
              id='assinatura-coordenador'
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
