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
      const imagem = signaturePadRef.current.toDataURL('image/png');
      aoSalvar(imagem);
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
        <canvas ref={canvasRef} width={400} height={200} className="canvas" />
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
