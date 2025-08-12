import React from 'react';
import './ModalQRCode.css';

function ModalQRCode({ aberto, onClose, qrCodeUrl }) {
  if (!aberto) return null;

  return (
    <div className="modal-overlay3" onClick={onClose}>
      <div className="modal-content3" onClick={e => e.stopPropagation()}>
        <button className="modal-close3" onClick={onClose}>X</button>
        <h2>QR Code da Saída</h2>
        <img src={qrCodeUrl} alt="QR Code" style={{ width: '300px', height: '300px' }} />
        <p>Mostre na portaria para a validação</p>
      </div>
    </div>
  );
}

export default ModalQRCode;
