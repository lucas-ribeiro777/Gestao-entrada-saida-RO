import { useEffect, useState } from 'react';
import './VisualizarSolicitacaoAluno.css';
import Rodape from '../../components/Rodape/Rodape';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import { Link, useNavigate } from 'react-router-dom';
import Botao from '../../components/Botao/Botao';
import ModalQRCode from '../../components/ModalQRCode/ModalQRCode';

function VisualizarSolicitacaoAluno() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const alunoId = Number(localStorage.getItem('usuarioId')); // converte pra número
  const navigate = useNavigate();

  useEffect(() => {
    async function buscarSolicitacoes() {
      try {
        const res = await fetch('http://10.90.146.16:5121/api/Solicitacao');
        const dados = await res.json();

        // Ajuste: campo correto é idAluno
        const solicitacoesDoAluno = dados.filter(s => s.idAluno === alunoId);
        setSolicitacoes(solicitacoesDoAluno);
      } catch (erro) {
        console.error('Erro ao buscar solicitações:', erro);
      }
    }

    buscarSolicitacoes();
  }, [alunoId]);

  async function abrirModalQRCode(solicitacaoId) {
    try {
      const res = await fetch(`http://localhost:3000/solicitacoes/${solicitacaoId}/qrcode`);
      const data = await res.json();
      setQrCodeUrl(data.qrCodeUrl);
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
            const dataHora = new Date(s.dataHora); // ajuste H maiúsculo
            const data = dataHora.toLocaleDateString('pt-BR');
            const hora = dataHora.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            });

            const liberada =
              s.statusProfessor === 'Aprovado' &&
              s.statusResponsavel === 'Aprovado' &&
              s.statusCoordenador === 'Aprovado';

            return (
              <div key={s.idSolicitacao} className="card-solicitacao">
                <h2>{s.tipo}</h2>
                <p><strong>Motivo:</strong> {s.motivo}</p>
                <p><strong>Data:</strong> {data} às {hora}</p>

                <div className="status-aprovacoes">
                  <p>
                    Professor:
                    <img
                      src={s.statusProfessor === 'Aprovado' ? '/images/check.png' : '/images/time 1.png'}
                      alt={s.statusProfessor === 'Aprovado' ? 'autorizado' : 'Aguardando'}
                      className="icone-status"
                    />
                    {s.statusProfessor === 'Aprovado' ? ' autorizado' : ' Aguardando'}
                  </p>

                  <p>
                    Responsável:
                    <img
                      src={s.statusResponsavel === 'Aprovado' ? '/images/check.png' : '/images/time 1.png'}
                      alt={s.statusResponsavel === 'Aprovado' ? 'Aprovado' : 'Aguardando'}
                      className="icone-status"
                    />
                    {s.statusResponsavel === 'Aprovado' ? ' Aprovado' : ' Aguardando'}
                  </p>

                  <p>
                    Coordenador:
                    <img
                      src={s.statusCoordenador === 'Aprovado' ? '/images/check.png' : '/images/time 1.png'}
                      alt={s.statusCoordenador === 'Aprovado' ? 'Aprovado' : 'Aguardando'}
                      className="icone-status"
                    />
                    {s.statusCoordenador === 'Aprovado' ? ' Aprovado' : ' Aguardando'}
                  </p>
                </div>

                <p className="status-final">
                  <img
                    src={liberada ? '/images/check.png' : '/images/time 1.png'}
                    alt={liberada ? 'Liberado' : 'Aguardando'}
                    className="icone-status-final"
                  />
                  {liberada ? ' Saída Liberada' : ' Aguardando liberações'}
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
