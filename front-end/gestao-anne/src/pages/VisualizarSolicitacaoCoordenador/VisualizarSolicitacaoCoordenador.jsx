import { useEffect, useState } from 'react';
import BoxSolicitacao from '../../components/BoxSolicitacao/BoxSolicitacao';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import Rodape from '../../components/Rodape/Rodape';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './VisualizarSolicitacaoCoordenador.css';
import { API_BASE_URL } from '../../constantes';

function VisualizarSolicitacaoCoordenador() {
  const location = useLocation();
  const navigate = useNavigate();
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [desaparecendo, setDesaparecendo] = useState([]); // IDs em fade out

  async function autorizarSolicitacao(idSolicitacao) {
    setDesaparecendo(prev => [...prev, idSolicitacao]);
    try {
      fetch(`${API_BASE_URL}api/Solicitacao/atualizar-status/${idSolicitacao}?statusCoordenador=Sim`, {
        method: 'PUT'
      })

      setSolicitacoes(prev => prev.filter(s => s.idSolicitacao !== idSolicitacao));
      setDesaparecendo(prev => prev.filter(did => did !== idSolicitacao));
    } catch (err) {
      console.error('Erro ao autorizar solicitação:', err);
      setDesaparecendo(prev => prev.filter(did => did !== idSolicitacao));
    }
  }



  useEffect(() => {
    async function carregarDados() {
      try {
        // 1️⃣ Buscar as solicitações
        const resSolic = await fetch(`${API_BASE_URL}api/Solicitacao/periodo/7dias`);
        const solicitacoes = await resSolic.json();

        // 2️⃣ Filtrar apenas as solicitações que o coordenador ainda não aprovou
        const solicitacoesPendentes = solicitacoes.filter(s => s.statusCoordenador !== 'Sim');

        // 3️⃣ Buscar dados de cada aluno + curso
        const solicitacoesComAluno = await Promise.all(
          solicitacoesPendentes.map(async s => {
            try {
              // 🔹 Buscar aluno
              const resAluno = await fetch(`${API_BASE_URL}api/Aluno/${s.idAlunos}`);
              if (!resAluno.ok) throw new Error('Erro ao buscar aluno');
              const aluno = await resAluno.json();

              // 🔹 Buscar curso diretamente pelo idCurso que vem na solicitação
              let nomeCurso = 'N/A';
              if (s.idNomeCurso) {
                try {
                  const resCurso = await fetch(`${API_BASE_URL}api/Grafico/${s.idNomeCurso}`);
                  if (resCurso.ok) {
                    const curso = await resCurso.json();
                    // pode ser nomeCurso ou nome, dependendo do JSON do endpoint
                    nomeCurso = curso.nomeCurso || curso.nome || 'N/A';
                  }
                } catch (err) {
                  console.error(`Erro ao buscar curso ${s.idNomeCurso}:`, err);
                }
              }

              return {
                ...s,
                aluno: {
                  nome: aluno.nome || 'Desconhecido',
                  curso: nomeCurso,
                  imagem: aluno.imagem ? `${API_BASE_URL}${aluno.imagem}` : '/images/perfil.png'
                }
              };
            } catch (err) {
              console.error(`Erro ao buscar aluno ${s.idAlunos}:`, err);
              return {
                ...s,
                aluno: { nome: 'Desconhecido', curso: 'N/A', imagem: '/images/default.png' }
              };
            }
          })
        );

        console.log('Solicitações carregadas:', solicitacoesComAluno);

        setSolicitacoes(solicitacoesComAluno);
      } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
      }
    }

    carregarDados();
  }, []);



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

      <div className="details">
        <h1>Visualização de Solicitações</h1>
        <h2>*Clique no card para AUTORIZAR*</h2>
      </div>

      <div className="solicitacoes-container">
        {solicitacoes.map((s, index) => {
          const dataHora = new Date(s.dataHora); // corrigido de s.datahora
          const dataFormatada = dataHora.toLocaleDateString('pt-BR');
          const horaFormatada = dataHora.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
          });

          let cor = '';
          const posicaoNoCiclo = index % 4; // ciclo de 4 posições
          if (posicaoNoCiclo <= 1) cor = 'escuro'; // posições 0 e 1
          else cor = 'claro'; // posições 2 e 3

          return (
            <div
              key={s.idSolicitacao} // usar idSolicitacao
              onClick={() => autorizarSolicitacao(s.idSolicitacao)} // usar idSolicitacao
              style={{ cursor: 'pointer' }}
              className={desaparecendo.includes(s.idSolicitacao) ? 'fade-out' : ''}
            >
            <BoxSolicitacao
              imagem={s.aluno.imagem}
              nome={s.aluno.nome}
              curso={s.aluno.curso}
              data={dataFormatada}
              horario={horaFormatada}
              motivo={s.motivo}
              tipo={s.tipo}
              statusProfessor={s.statusProfessor}
              statusResponsavel={s.statusResponsavel}
              statusCoordenador={s.statusCoordenador}
              cor={cor}
            />
            </div>
          );
        })}
      </div>


      <Rodape />
    </>
  );
}

export default VisualizarSolicitacaoCoordenador;

