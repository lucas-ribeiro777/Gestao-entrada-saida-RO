  import './BoxAluno.css';
  import PropTypes from 'prop-types';
  import { Link } from 'react-router-dom';

  function BoxAluno({ imagem, nome, curso, onVisualizar, cor = 'escuro' }) {
    return (
      <div className={`box-aluno ${cor}`}>
        <img className="aluno-foto" src={imagem} alt={`Foto de ${nome}`} />
        <div className="aluno-info">
          <p className="aluno-nome">{nome}</p>
          <p className="aluno-curso">{curso}</p>
        </div>
        <Link to="#" onClick={onVisualizar} className="aluno-visualizar">
          Visualizar
        </Link>
      </div>
    );
  }

  BoxAluno.propTypes = {
    imagem: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    curso: PropTypes.string.isRequired,
    onVisualizar: PropTypes.func,
    cor: PropTypes.oneOf(['claro', 'escuro']),
  };
  export default BoxAluno;
