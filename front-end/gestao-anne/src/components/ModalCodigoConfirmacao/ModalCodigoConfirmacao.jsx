import { useState } from 'react';
import './ModalCodigoConfirmacao.css';

function ModalCodigoConfirmacao({ isOpen, onClose, onCodigoCorreto }) {
  const [inputs, setInputs] = useState(['', '', '', '', '', '']);
  const [erro, setErro] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;

    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    const nextInput = document.getElementById(`input-${index + 1}`);
    if (value && nextInput) {
      nextInput.focus();
    }
  };

  const handleConfirm = () => {
    const codigoDigitado = inputs.join('');
    if (codigoDigitado.length < 6) {
      setErro('Por favor, preencha todos os dígitos do código.');
      return;
    }
    setErro('');
    onCodigoCorreto(codigoDigitado); // envia o código para o backend validar
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Digite o código enviado por e-mail, caso não receba, verifique a caixa de spam!</p>
        
        <div className="code-inputs">
          {inputs.map((val, i) => (
            <input
              key={i}
              id={`input-${i}`}
              maxLength={1}
              value={val}
              onChange={(e) => handleInputChange(i, e.target.value)}
              autoFocus={i === 0}
            />
          ))}
        </div>

        {erro && <p style={{ color: 'red', marginTop: '8px' }}>{erro}</p>}

        <div className="resend" /* aqui pode implementar reenvio */>Enviar novamente</div>
        
        <div className="modal-actions">
          <button onClick={handleConfirm}>FINALIZAR</button>
          <button onClick={onClose}>CANCELAR</button>
        </div>
      </div>
    </div>
  );
}

export default ModalCodigoConfirmacao;
