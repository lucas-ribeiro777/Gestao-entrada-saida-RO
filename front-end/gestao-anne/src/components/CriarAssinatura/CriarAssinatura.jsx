  import React, { useRef, useEffect, useState } from 'react';
  import SignaturePad from 'signature_pad';
  import './CriarAssinatura.css';

  function CriarAssinatura({ aberto, aoFechar, aoSalvar }) {
    const canvasRef = useRef(null);
    const signaturePadRef = useRef(null);

    useEffect(() => {
      if (aberto && canvasRef.current) {
        const pad = new SignaturePad(canvasRef.current, {
          backgroundColor: 'rgb(255,255,255)',
          penColor: 'black',
        });
        signaturePadRef.current = pad;
      }
    }, [aberto]);

    const limpar = () => {
      if (signaturePadRef.current) {
        signaturePadRef.current.clear();
      }
    };

const salvar = () => {
  if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
    const dataURL = signaturePadRef.current.toDataURL('image/png');

    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    const arquivo = new File([blob], 'assinatura.png', { type: mimeString });

    // ⚡ envia **File** e **base64**
    aoSalvar(arquivo, dataURL);

    aoFechar();
  } else {
    alert('Por favor, assine antes de salvar.');
  }
};





    if (!aberto) return null;

    return (
      <div className="modal-assinatura">
        <div className="conteudo-modal">
          <h3>Assine abaixo</h3>
          <canvas ref={canvasRef} className="canvas" />
          <div className="botoes">
            <button onClick={limpar}>Limpar</button>
            <button onClick={salvar}>Salvar</button>
            <button onClick={aoFechar}>Fechar</button>
          </div>
        </div>
      </div>
    );
  }

  export default CriarAssinatura;
