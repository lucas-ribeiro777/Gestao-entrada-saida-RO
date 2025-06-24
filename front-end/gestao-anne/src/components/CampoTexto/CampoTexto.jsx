import { useState } from 'react';
import './CampoTexto.css';

function CampoTexto({ id, label, tipo = "text", valor, onChange, placeholder, senha = false }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Se for campo senha, o tipo depende do estado mostrarSenha
  const tipoInput = senha ? (mostrarSenha ? "text" : "password") : tipo;

  return (
    <div className="campo-texto" style={{ position: 'relative' }}>
      <label htmlFor={id}>{label}</label>
      <input 
        id={id}
        type={tipoInput}
        placeholder={placeholder} 
        value={valor} 
        onChange={onChange} 
        required 
        style={{ paddingRight: senha ? '0.0em' : undefined }} // espaço para o botão
      />
      {senha && (
        <button 
          type="button" 
          onClick={() => setMostrarSenha(!mostrarSenha)} 
          style={{
            position: 'absolute',
            right: '0.5em',
            top: '50%',
            transform: 'translateY(-5%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2em',
            padding: 0,
            userSelect: 'none',
          }}
          aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {mostrarSenha ? <img src="images/visao-off.png" alt="Eye" /> : <img src="images/visao-on.png" alt="Eye" />}
        </button>
      )}
    </div>
  );
}

export default CampoTexto;
