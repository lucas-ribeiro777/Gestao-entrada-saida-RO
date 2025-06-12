import './CampoTexto.css';

function CampoTexto({ id, label, tipo = "text", valor, onChange, placeholder }) {
  return (
    <div className="campo-texto">
      <label htmlFor={id}>{label}</label>
      <input 
        id={id}
        type={tipo}
        placeholder={placeholder} 
        value={valor} 
        onChange={onChange} 
        required 
      />
    </div>
  );
}

export default CampoTexto;
