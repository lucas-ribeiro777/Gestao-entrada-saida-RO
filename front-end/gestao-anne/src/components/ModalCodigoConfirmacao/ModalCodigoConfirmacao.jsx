import { useState } from 'react';
import './ModalCodigoConfirmacao.css';
import { useNavigate } from 'react-router-dom';
import Botao from '../Botao/Botao';

function ModalCodigoConfirmacao({ isOpen, onClose, codigoAPI, onCodigoCorreto }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(['', '', '', '', '', '']);
  const [erro, setErro] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;

    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    // Passa automaticamente para o próximo input
    const nextInput = document.getElementById(`input-${index + 1}`);
    if (value && nextInput) {
      nextInput.focus();
    }
  };

  const handleConfirm = () => {
    const codigoDigitado = inputs.join('');
    const codigoEsperado = codigoAPI.replace('-', '');

    if (codigoDigitado === codigoEsperado) {
      onCodigoCorreto(); // chama a função do pai para atualizar a senha
      onClose();          // fecha o modal
    } else {
      setErro('Código incorreto. Tente novamente.');
    }
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
            />
          ))}
        </div>

        {erro && <p style={{ color: 'red', marginTop: '8px' }}>{erro}</p>}

        <div className="resend">Enviar novamente</div>
        <div className="modal-actions">
          <button onClick={handleConfirm}>FINALIZAR</button>
        </div>
      </div>
    </div>
  );
}

export default ModalCodigoConfirmacao;

