import React from 'react';
import './ModalRecado.css';

function ModalRecado({ aberto, titulo = "Aviso", mensagem, aoFechar }) {
  if (!aberto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-recado">
        <h2>{titulo}</h2>
        <p>{mensagem}</p>
        <button onClick={aoFechar} className="botao-fechar">Fechar</button>
      </div>
    </div>
  );
}

export default ModalRecado;
