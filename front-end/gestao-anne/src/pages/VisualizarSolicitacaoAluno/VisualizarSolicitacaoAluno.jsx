import { useEffect, useState } from 'react';
import './VisualizarSolicitacaoAluno.css';
import Rodape from '../../components/Rodape/Rodape';
import CabecalhoPages from '../../components/CabecalhoPages/CabecalhoPages';
import { Link, useNavigate } from 'react-router-dom';
import Botao from '../../components/Botao/Botao';

function VisualizarSolicitacaoAluno() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const alunoId = 1; // aluno logado
  const navigate = useNavigate(); // necessário para redirecionamento com botão

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

  function irParaNovaPagina() {
    navigate('/inicialAluno'); // redireciona para a página inicial do aluno
  }

  return (
    <>
      <CabecalhoPages>
        <li><Link to="/InicialAluno">Início</Link></li>
        <li><Link to="/visualizarocorrenciasaluno">Ocorrências</Link></li>
        <li><Link to="/visualizarsolicitacaoaluno">Solicitações</Link></li>
        <li><Link to="/VisualizarContaaluno">Conta</Link></li>
      </CabecalhoPages>

      <div className="container-solicitacoes-aluno">
        <h1>Status das Minhas Solicitações</h1>

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
                    alt={liberada ? '' : ''}
                    className="icone-status-final"
                />
                {liberada ? ' Saída Liberada' : ' Aguardando liberações'}
                </p>

              </div>
            );
          })
        )}

        <div style={{ marginTop: '30px', textAlign: 'center' }} className='botao-criar-nova-solicitacao'>
          <Botao
            descricao="Criar nova solicitação"
            imagem="/images/mais.png" // opcional
            onClick={irParaNovaPagina}
          />
        </div>
      </div>

      <Rodape />
    </>
  );
}

export default VisualizarSolicitacaoAluno;
