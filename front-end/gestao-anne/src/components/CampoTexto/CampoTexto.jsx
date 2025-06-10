import './CampoTexto.css';

function CampoTexto(props) {
    return (
        <div className="campo-texto">
            <label>{props.label}</label>
            <input 
                type="text" 
                placeholder={props.placeholder} 
                value={props.valor} 
                onChange={props.aoAlterar} 
                required 
            />
        </div>
    );
}

export default CampoTexto;
