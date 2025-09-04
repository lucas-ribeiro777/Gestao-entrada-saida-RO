  import './VisualizarContaProfessor.css';
  import { useState, useEffect } from 'react';
  import Rodape from '../../components/Rodape/Rodape';
  import InfoBox from '../../components/InfoBox/InfoBox';
  import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
  import { Link, useNavigate } from 'react-router-dom';
  import CriarAssinatura from '../../components/CriarAssinatura/CriarAssinatura';
  import { API_BASE_URL } from '../../constantes';

  const VisualizarContaProfessor = () => {
    const [dados, setDados] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [modalAberto, setModalAberto] = useState(false);
    const navigate = useNavigate();

    // Recupera dados do login
    const professorLogado = JSON.parse(localStorage.getItem("usuarioId"));

    useEffect(() => {
      if (!professorLogado) {
        console.log('Usuário não logado ou ID inválido:', professorLogado);
        // navigate("/login");
        return;
      }

      const API_URL = `${API_BASE_URL}api/Professor/${professorLogado}`;

      fetch(API_URL)
        .then((res) => {
          console.log('Status:', res.status);
          if (!res.ok) throw new Error("Erro ao buscar dados");
          return res.json();
        })
        .then((data) => {
          console.log('DATA:', data);
          setDados(data);
        })
        .catch((err) => {
          console.error('Erro ao buscar dados:', err);
        })
        .finally(() => setCarregando(false));
    }, [navigate, professorLogado]);

    const handleEditar = (campo) => {
      const valorAtual = dados[campo];
      const novoValor = prompt(`Editar ${campo}:`, valorAtual);
      if (novoValor !== null && novoValor.trim() !== '') {
        const novosDados = { ...dados, [campo]: novoValor.trim() };
        setDados(novosDados);

        const API_URL = `${API_BASE_URL}api/Professores/${professorLogado.id}`;
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

const handleSalvarAssinatura = (assinaturaBlob) => {
  const formData = new FormData();
  const arquivo = new File([assinaturaBlob], "assinatura.png", { type: "image/png" });
  formData.append("assinatura", arquivo);
  formData.append("id", professorLogado.id);

  const API_URL = `${API_BASE_URL}api/Professor/${professorLogado}/assinatura`;

  fetch(API_URL, {
    method: 'POST',
    body: formData,
  })
  .then(res => {
    if (!res.ok) throw new Error(`Status ${res.status}`);
    alert('Assinatura salva com sucesso!');
  })
  .catch((err) => {
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
        <CabecalhoPages>
          <li key="2"><Link to="/InicialProfessor">Início</Link></li>
          <li key="3"><Link to="/solicitacaoprofessor">Solicitações</Link></li>
          <li key="4"><Link to="/VisualizarContaprofessor">Conta</Link></li>
        </CabecalhoPages>

        <div className="dados-box-professor">
          <InfoBox
            icone={<img src="/images/nome.png" alt="Professor" />}
            texto={dados.nome}
            onEditar={() => handleEditar('nome')}
            editavel={false}
            cor="escuro"
          />
          <InfoBox
            icone={<img src="/images/email.png" alt="Professor" />}
            texto={dados.email}
            onEditar={() => handleEditar('email')}
            editavel={false}
            cor="claro"
          />
          <InfoBox
            icone={<img src="/images/telefoneconta.png" alt="Professor" />}
            texto={dados.telefone}
            onEditar={() => handleEditar('telefone')}
            editavel={false}
            cor="escuro"
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
            texto={<img 
                    src={`${API_BASE_URL}${dados.assinatura}`} 
                    alt="Assinatura" 
                    id='assinatura-do-professor'
                  />}
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
