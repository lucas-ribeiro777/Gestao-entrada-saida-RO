import './Botao.css';

function Botao(props){
    return(
        <button className='botao-principal'>
            {props.descricao}
        </button>
    )
}

export default Botao;