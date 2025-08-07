import { useEffect, useState } from 'react';
import BoxSolicitacao from '../../components/BoxSolicitacao/BoxSolicitacao';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import Rodape from '../../components/Rodape/Rodape';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './VisualizarSolicitacaoCoordenador.css';

function VisualizarSolicitacaoCoordenador() {
  const location = useLocation();
  const navigate = useNavigate();
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [desaparecendo, setDesaparecendo] = useState([]); // IDs em fade out

    function removerSolicitacao(id) {
    setDesaparecendo(prev => [...prev, id]);
    
    // após 500ms (tempo da animação), remove de fato
    setTimeout(() => {
        setSolicitacoes(prev => prev.filter(s => s.id !== id));
        setDesaparecendo(prev => prev.filter(did => did !== id));
    }, 500);
    }


  useEffect(() => {
    async function carregarDados() {
      try {
        const resSolic = await fetch('http://localhost:3000/solicitacoes');
        const solicitacoes = await resSolic.json();

        const resAlunos = await fetch('http://localhost:3000/alunos');
        const alunos = await resAlunos.json();

        const solicitacoesComAluno = solicitacoes
          .filter(s => !s.coordenadorId)
          .map(s => {
            const aluno = alunos.find(a => Number(a.id) === Number(s.id_aluno));
            return {
              ...s,
              aluno: aluno || { nome: 'Desconhecido', curso: 'N/A', imagem: '/images/default.png' }
            };
          });

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

      <div className="details">
        <h1>Visualização de Solicitações</h1>
        <h2>*Clique no card para AUTORIZAR*</h2>
      </div>

      <div className="solicitacoes-container">
        {solicitacoes.map((s, index) => {
          const dataHora = new Date(s.datahora);
          const dataFormatada = dataHora.toLocaleDateString('pt-BR');
          const horaFormatada = dataHora.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
          });

          let cor = '';
          const posicaoNoCiclo = index % 6;
          if (posicaoNoCiclo <= 1) cor = 'escuro';
          else if (posicaoNoCiclo <= 3) cor = 'claro';
          else cor = 'laranja';

          return (
            <div
            key={s.id}
            onClick={() => removerSolicitacao(s.id)}
            style={{ cursor: 'pointer' }}
            className={desaparecendo.includes(s.id) ? 'fade-out' : ''}
            >
              <BoxSolicitacao
                imagem={s.aluno.imagem}
                nome={s.aluno.nome}
                curso={s.aluno.curso}
                data={dataFormatada}
                horario={horaFormatada}
                motivo={s.motivo}
                tipo={s.tipo}
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

