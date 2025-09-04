import './DetalhesAluno.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ModalRecado from '../ModalRecado/ModalRecado';
import { API_BASE_URL } from '../../constantes';

function DetalhesAluno({ idAluno, curso }) {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagemModal, setMensagemModal] = useState("");
  const [tituloModal, setTituloModal] = useState("Aviso");

  useEffect(() => {
    if (!idAluno) return;

    const fetchSolicitacoes = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}api/Solicitacao/aluno/${idAluno}`);
        if (!res.ok) throw new Error('Erro ao buscar solicitações do aluno');

        const data = await res.json();
        setSolicitacoes(data);
      } catch (err) {
        console.error(err);
        setTituloModal("Erro");
        setMensagemModal("Falha ao carregar solicitações do aluno.");
        setModalAberto(true);
      }
    };

    fetchSolicitacoes();
  }, [idAluno]);

  const formatarDataHora = (isoString) => {
    const dateObj = new Date(isoString);
    const data = dateObj.toLocaleDateString('pt-BR');
    const hora = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return { data, hora };
  };

  const autorizarResponsavel = async (idSolicitacao) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}api/Solicitacao/atualizar-status/${idSolicitacao}?statusResponsavel=Sim`,
        { method: 'PUT' }
      );

      if (!res.ok) throw new Error('Erro ao autorizar solicitação');

      setSolicitacoes(prev =>
        prev.map(s =>
          s.idSolicitacao === idSolicitacao ? { ...s, statusResponsavel: 'Sim' } : s
        )
      );

      setTituloModal("Sucesso");
      setMensagemModal("Solicitação autorizada com sucesso!");
      setModalAberto(true);
    } catch (err) {
      console.error(err);
      setTituloModal("Erro");
      setMensagemModal("Falha ao autorizar solicitação.");
      setModalAberto(true);
    }
  };

  return (
    <div className="detalhes-aluno">
      {solicitacoes.length === 0 && <p>Nenhuma solicitação encontrada para este aluno.</p>}
      {solicitacoes.map((s, i) => {
        const { data, hora } = formatarDataHora(s.dataHora);

        // Determina a classe correta: entrada ou saida
        const tipoSolicitacao = s.tipo.toLowerCase() === 'entrada' ? 'entrada' : 'saida';
        const liberado = s.statusResponsavel === 'Sim';

        return (
          <div className={`box-${tipoSolicitacao}`} key={i}>
            <strong>{s.tipo}</strong>
            <span>Data: {data}</span>
            <span>Hora: {hora}</span>
            <span>Autorizado: {s.statusResponsavel}</span>

            {!liberado && (
              <button onClick={() => autorizarResponsavel(s.idSolicitacao)} className='btn-autorizar-resp'>
                Autorizar {s.tipo}
              </button>
            )}
          </div>
        );
      })}

      <ModalRecado
        aberto={modalAberto}
        titulo={tituloModal}
        mensagem={mensagemModal}
        aoFechar={() => setModalAberto(false)}
      />
    </div>
  );
}

DetalhesAluno.propTypes = {
  idAluno: PropTypes.number.isRequired,
  curso: PropTypes.string.isRequired,
};

export default DetalhesAluno;
