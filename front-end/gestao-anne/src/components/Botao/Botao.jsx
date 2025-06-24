import './Botao.css';

function Botao(props, imagem) {
    return(
        <button className='botao-principal'>
            {props.descricao}
            {imagem && <img src={imagem} alt="ícone" className="icone-botao" />}
        </button>
    )
}

export default Botao;