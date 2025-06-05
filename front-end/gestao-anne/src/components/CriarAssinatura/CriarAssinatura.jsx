import React, { useRef, useEffect, useState } from 'react';
import SignaturePad from 'signature_pad';
import './CriarAssinatura.css';

function CriarAssinatura({ aberto, aoFechar, aoSalvar }) {
  const canvasRef = useRef(null);
  const [signaturePad, setSignaturePad] = useState(null);

  useEffect(() => {
    if (aberto && canvasRef.current) {
      const pad = new SignaturePad(canvasRef.current);
      setSignaturePad(pad);
    }
  }, [aberto]);

  const salvarAssinatura = () => {
    if (signaturePad && !signaturePad.isEmpty()) {
      const imagem = signaturePad.toDataURL();
      aoSalvar(imagem);
      aoFechar();
    } else {
      alert('Assine antes de salvar!');
    }
  };

  const limpar = () => {
    signaturePad.clear();
  };

  if (!aberto) return null;

  return (
    <div className="modal-assinatura">
      <div className="conteudo-modal">
        <h3>Assine abaixo</h3>
        <canvas ref={canvasRef} width={400} height={200} className="canvas" />
        <div className="botoes">
          <button onClick={limpar}>Limpar</button>
          <button onClick={salvarAssinatura}>Salvar</button>
          <button onClick={aoFechar}>Fechar</button>
        </div>
      </div>
    </div>
  );
}

export default CriarAssinatura;