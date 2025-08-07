// Botao.jsx
import './Botao.css';

function Botao(props) {
    return (
        <button className='botao-principal' onClick={props.onClick}>
            {props.descricao}
            {props.imagem && <img src={props.imagem} alt="ícone" className="icone-botao" />}
        </button>
    );
}

export default Botao;
