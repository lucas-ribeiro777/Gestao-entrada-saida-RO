import { useEffect, useState } from 'react';
import './VisualizarSolicitacaoAluno.css';
import Rodape from '../../components/Rodape/Rodape';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import { Link, useNavigate } from 'react-router-dom';
import Botao from '../../components/Botao/Botao';
import ModalQRCode from '../../components/ModalQRCode/ModalQRCode'; // importe o modal

function VisualizarSolicitacaoAluno() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
   const alunoId = localStorage.getItem('usuarioId'); // pegar do localStorage no seu caso real
  const navigate = useNavigate();

  useEffect(() => {
    async function buscarSolicitacoes() {
      try {
        const res = await fetch('http://localhost:3000/solicitacoes');
        const dados = await res.json();

        const solicitacoesDoAluno = dados.filter(s => Number(s.alunoId) === alunoId);
        setSolicitacoes(solicitacoesDoAluno);
      } catch (erro) {
        console.error('Erro ao buscar solicitações:', erro);
      }
    }

    buscarSolicitacoes();
  }, []);

  // Função para abrir modal e buscar QR Code da API
  async function abrirModalQRCode(solicitacaoId) {
    try {
      // Ajuste essa URL para seu endpoint real que retorna o QR code da solicitação
      const res = await fetch(`http://localhost:3000/solicitacoes/${solicitacaoId}/qrcode`);
      const data = await res.json();

      // Supondo que a API retorne um URL da imagem do QR code
      setQrCodeUrl(data.qrCodeUrl);
      setModalAberto(true);
    } catch (erro) {
      console.error('Erro ao buscar QR code:', erro);
      alert('Erro ao carregar QR code.');
    }
  }

//   async function abrirModalQRCode(solicitacaoId) {
//   try {
//     // Simulação de delay para parecer real
//     await new Promise(resolve => setTimeout(resolve, 500));

//     // Simulação da URL do QR code — pode ser uma imagem local ou qualquer URL pública
//     const qrCodeMockUrl = '/images/qrcode.svg'; // coloque uma imagem QR code na sua pasta public/images

//     setQrCodeUrl(qrCodeMockUrl);
//     setModalAberto(true);
//   } catch (erro) {
//     console.error('Erro ao buscar QR code:', erro);
//     alert('Erro ao carregar QR code.');
//   }
// }


  function fecharModal() {
    setModalAberto(false);
    setQrCodeUrl('');
  }

  function irParaNovaPagina() {
    navigate('/inicialAluno');
  }

  return (
    <>
      <CabecalhoPages>
        <li><Link to="/InicialAluno">Início</Link></li>
        {/* <li><Link to="/visualizarocorrenciasaluno">Ocorrências</Link></li> */}
        <li><Link to="/visualizarsolicitacaoaluno">Solicitações</Link></li>
        <li><Link to="/VisualizarContaaluno">Conta</Link></li>
      </CabecalhoPages>

      <h1 className='titulo-sol-alunos'>Status das Minhas Solicitações</h1>
      <div className="container-solicitacoes-aluno">

        {solicitacoes.length === 0 ? (
          <p>Nenhuma solicitação encontrada.</p>
        ) : (
          solicitacoes.map(s => {
            const dataHora = new Date(s.datahora);
            const data = dataHora.toLocaleDateString('pt-BR');
            const hora = dataHora.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            });

            const liberada = s.professorAutorizou && s.responsavelAutorizou && s.coordenadorAutorizou;

            return (
              <div key={s.id} className="card-solicitacao">
                <h2>{s.tipo}</h2>
                <p><strong>Motivo:</strong> {s.motivo}</p>
                <p><strong>Data:</strong> {data} às {hora}</p>
                <div className="status-aprovacoes">
                  <p>
                    Professor:
                    <img
                      src={s.professorAutorizou ? '/images/check.png' : '/images/time 1.png'}
                      alt={s.professorAutorizou ? 'autorizado' : 'Aguardando'}
                      className="icone-status"
                    />
                    {s.professorAutorizou ? ' autorizado' : ' Aguardando'}
                  </p>

                  <p>
                    Responsável:
                    <img
                      src={s.responsavelAutorizou ? '/images/check.png' : '/images/time 1.png'}
                      alt={s.responsavelAutorizou ? 'Aprovado' : 'Aguardando'}
                      className="icone-status"
                    />
                    {s.responsavelAutorizou ? ' Aprovado' : ' Aguardando'}
                  </p>

                  <p>
                    Coordenador:
                    <img
                      src={s.coordenadorAutorizou ? '/images/check.png' : '/images/time 1.png'}
                      alt={s.coordenadorAutorizou ? 'Aprovado' : 'Aguardando'}
                      className="icone-status"
                    />
                    {s.coordenadorAutorizou ? ' Aprovado' : ' Aguardando'}
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

                {/* Botão para abrir QR Code se liberada */}
                {liberada && (
                  <button
                    className="btn-abrir-qrcode"
                    onClick={() => abrirModalQRCode(s.id)}
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
          imagem="/images/mais.png" // opcional
          onClick={irParaNovaPagina}
        />
      </div>

      <ModalQRCode aberto={modalAberto} onClose={fecharModal} qrCodeUrl={qrCodeUrl} />

      <Rodape />
    </>
  );
}

export default VisualizarSolicitacaoAluno;

