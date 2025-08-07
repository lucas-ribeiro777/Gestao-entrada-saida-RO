import PropTypes from 'prop-types';
import { useState } from 'react';
import './CardSolicitacao.css';

function CardSolicitacao({ aluno, onAutorizar }) {
  const [mostrarModal, setMostrarModal] = useState(false);

  const confirmarAutorizacao = () => {
    onAutorizar(aluno.id);
    setMostrarModal(false);
  };

  const statusProfessor = aluno.professorAutorizou
    ? '✅ Autorizado'
    : '⌛ Aguardando';

  return (
    <div className="card-solicitacao1">
      <img
        className="foto-aluno"
        src={aluno.imagem || '/images/user-default.png'}
        alt={`Foto de ${aluno.aluno}`}
      />

      <div className="info-aluno">
        <p><strong>Nome:</strong> {aluno.aluno}</p>
        <p><strong>Curso:</strong> {aluno.curso}</p>
        <p><strong>Tipo:</strong> {aluno.tipo}</p>
        <p><strong>Motivo:</strong> {aluno.motivo}</p>
        <p><strong>Data e Hora:</strong> {new Date(aluno.datahora).toLocaleString('pt-BR')}</p>
        <p><strong>Status do Professor:</strong> {statusProfessor}</p>
      </div>

      {!aluno.professorAutorizou && (
        <button onClick={() => setMostrarModal(true)} className="btn-autorizar">
          Autorizar
        </button>
      )}

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Tem certeza que deseja autorizar esta {aluno.tipo?.toLowerCase()}?</p>
            <div className="modal-buttons">
              <button onClick={confirmarAutorizacao} className="btn-confirmar">Sim</button>
              <button onClick={() => setMostrarModal(false)} className="btn-cancelar">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

CardSolicitacao.propTypes = {
  aluno: PropTypes.shape({
    id: PropTypes.number.isRequired,
    aluno: PropTypes.string.isRequired,
    curso: PropTypes.string.isRequired,
    tipo: PropTypes.string,
    motivo: PropTypes.string,
    datahora: PropTypes.string,
    imagem: PropTypes.string,
    professorAutorizou: PropTypes.bool.isRequired
  }).isRequired,
  onAutorizar: PropTypes.func.isRequired,
};

export default CardSolicitacao;
