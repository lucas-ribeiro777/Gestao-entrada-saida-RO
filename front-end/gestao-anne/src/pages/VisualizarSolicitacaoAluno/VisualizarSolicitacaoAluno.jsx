import { useEffect, useState } from 'react';
import './VisualizarSolicitacaoAluno.css';
import Rodape from '../../components/Rodape/Rodape';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import { Link, useNavigate } from 'react-router-dom';
import Botao from '../../components/Botao/Botao';
import ModalQRCode from '../../components/ModalQRCode/ModalQRCode';
import { API_BASE_URL } from '../../constantes';

function VisualizarSolicitacaoAluno() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const alunoId = Number(localStorage.getItem('usuarioId'));
  const navigate = useNavigate();


  // Buscar solicitações do aluno
  useEffect(() => {
    async function buscarSolicitacoes() {
      try {
        const res = await fetch(`${API_BASE_URL}api/Solicitacao/aluno/${alunoId}`);
        if (!res.ok) throw new Error('Erro na requisição');
        const dados = await res.json();

        const agora = new Date();

        // Filtrar solicitações com até 7 dias de idade
        const filtradas = dados.filter(s => {
          const dataCriacao = new Date(s.dataHora);
          const diffMs = agora - dataCriacao; // diferença em milissegundos
          const diffDias = diffMs / (1000 * 60 * 60 * 24);
          return diffDias <= 7;
        });

        // Para cada solicitação filtrada, buscar o nome do curso
        const solicitacoesComCurso = await Promise.all(
          filtradas.map(async s => {
            try {
              const cursoRes = await fetch(`${API_BASE_URL}api/Grafico/${s.idNomeCurso}`);
              if (!cursoRes.ok) throw new Error("Erro ao buscar curso");
              const cursoData = await cursoRes.json();
              return { ...s, nomeCurso: cursoData.nomeCurso };
            } catch (err) {
              console.error("Erro ao buscar curso:", err);
              return { ...s, nomeCurso: "Curso não encontrado" };
            }
          })
        );

        setSolicitacoes(solicitacoesComCurso);
      } catch (erro) {
        console.error('Erro ao buscar solicitações:', erro);
      }
    }

    buscarSolicitacoes();
  }, [alunoId]);



  // Abrir modal do QR Code
  async function abrirModalQRCode(solicitacaoId) {
    try {
      const res = await fetch(`${API_BASE_URL}api/QrCode/gerar/${solicitacaoId}`, {
        method: 'POST' // se a API exigir POST
      });
      const data = await res.json();
      setQrCodeUrl(`${API_BASE_URL}${data.registro.caminhoArquivo}`);
      setModalAberto(true);
    } catch (erro) {
      console.error('Erro ao buscar QR code:', erro);
      alert('Erro ao carregar QR code.');
    }
  }


  function fecharModal() {
    setModalAberto(false);
    setQrCodeUrl('');
  }

  function irParaNovaPagina() {
    navigate('/VerSolicitacaoAluno');
  }

  return (
    <>
      <CabecalhoPages>
        <li key="inicio"><Link to="/InicialAluno">Início</Link></li>
        <li key="solicitacoes"><Link to="/visualizarsolicitacaoaluno">Solicitações</Link></li>
        <li key="conta"><Link to="/VisualizarContaaluno">Conta</Link></li>
      </CabecalhoPages>

      <h1 className='titulo-sol-alunos'>Status das Minhas Solicitações</h1>

      <div className="container-solicitacoes-aluno">
        {solicitacoes.length === 0 ? (
          <p className='nenhuma-sol'>Nenhuma solicitação encontrada.</p>
        ) : (
          solicitacoes.map(s => {
            const dataHora = new Date(s.dataHora);
            const data = dataHora.toLocaleDateString('pt-BR');
            const hora = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

            const statusProfessor = s.statusProfessor;
            const statusResponsavel = s.statusResponsavel;
            const statusCoordenador = s.statusCoordenador;

            const liberada = statusProfessor === 'Sim' &&
                              statusResponsavel === 'Sim' &&
                              statusCoordenador === 'Sim';

            const statusFinal = liberada ? 'Autorizada' : 'Pendente';

            return (
              <div key={s.idSolicitacao} className="card-solicitacao">
                <h2>{s.tipo.toUpperCase()}</h2>
                <p><strong>Curso:</strong> {s.nomeCurso}</p>
                <p><strong>Motivo:</strong> {s.motivo}</p>
                <p><strong>Data:</strong> {data} às {hora}</p>

                <div className="status-aprovacoes">
                  <p>
                    Professor:
                    <img
                      src={statusProfessor === 'Sim' ? '/images/check.png' : '/images/time 1.png'}
                      alt={statusProfessor}
                      className="icone-status"
                    />
                    {statusProfessor === 'Sim' ? ' Autorizado' : ' Aguardando'}
                  </p>

                  <p>
                    Responsável:
                    <img
                      src={statusResponsavel === 'Sim' ? '/images/check.png' : '/images/time 1.png'}
                      alt={statusResponsavel}
                      className="icone-status"
                    />
                    {statusResponsavel === 'Sim' ? ' Aprovado' : ' Aguardando'}
                  </p>

                  <p>
                    Coordenador:
                    <img
                      src={statusCoordenador === 'Sim' ? '/images/check.png' : '/images/time 1.png'}
                      alt={statusCoordenador}
                      className="icone-status"
                    />
                    {statusCoordenador === 'Sim' ? ' Aprovado' : ' Aguardando'}
                  </p>
                </div>

                <p className="status-final">
                  <img
                    src={liberada ? '/images/check.png' : '/images/time 1.png'}
                    alt={liberada ? 'Liberado' : 'Aguardando'}
                    className="icone-status-final"
                  />
                  {statusFinal}
                </p>
                {liberada && (
                    <button
                      className="btn-abrir-qrcode"
                      onClick={() => abrirModalQRCode(s.idSolicitacao)}
                    >
                      Abrir QR Code
                    </button>
                )}
              </div>
            );
          })
        )}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }} className='botao-criar-nova-solicitacao'>
        <Botao
          descricao="Criar nova solicitação"
          imagem="/images/mais.png"
          onClick={irParaNovaPagina}
        />
      </div>

      <ModalQRCode aberto={modalAberto} onClose={fecharModal} qrCodeUrl={qrCodeUrl} />
      <Rodape />
    </>
  );
}

export default VisualizarSolicitacaoAluno;
